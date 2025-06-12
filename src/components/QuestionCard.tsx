import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Clock } from 'lucide-react'
import { type Question} from '../services/quizService';


interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  onAnswer: (answerIndex: number) => void;
  timeRemaining: number;
  onTimeUp: () => void;
  setTimeRemaining: (time: number) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  onAnswer,
  timeRemaining,
  onTimeUp,
  setTimeRemaining,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 0 && !isAnswered) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, isAnswered, onTimeUp, setTimeRemaining]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question.id]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    // Add a small delay for visual feedback before moving to next question
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 1500);
  };

  const getTimerColor = () => {
    if (timeRemaining > 20) return 'bg-green-500';
    if (timeRemaining > 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getButtonVariant = (index: number) => {
    if (!isAnswered) return 'outline';
    if (index === question.correctAnswer) return 'default';
    if (index === selectedAnswer && index !== question.correctAnswer) return 'destructive';
    return 'outline';
  };

  const getButtonClassName = (index: number) => {
    let baseClass = 'p-4 text-left h-auto transition-all duration-200 hover:scale-105';
    
    if (!isAnswered) {
      baseClass += ' hover:bg-white/20';
    } else {
      if (index === question.correctAnswer) {
        baseClass += ' bg-green-500 hover:bg-green-600 text-white animate-pulse';
      } else if (index === selectedAnswer && index !== question.correctAnswer) {
        baseClass += ' bg-red-500 hover:bg-red-600 text-white';
      } else {
        baseClass += ' opacity-50';
      }
    }
    
    return baseClass;
  };

  return (
    <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 animate-fade-in">
      {/* Timer */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white">
          <Clock className="w-5 h-5" />
          <span className="text-lg font-semibold">{timeRemaining}s</span>
        </div>
        <div className="w-32">
          <Progress 
            value={(timeRemaining / 30) * 100} 
            className={`h-2 ${getTimerColor()}`}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {questionNumber}
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight">
            {question.text}
          </h2>
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            variant={getButtonVariant(index)}
            className={getButtonClassName(index)}
            disabled={isAnswered}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-lg">{option}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Feedback */}
      {isAnswered && (
        <div className="mt-6 p-4 rounded-lg bg-white/10 animate-fade-in">
          <p className="text-white text-center">
            {selectedAnswer === question.correctAnswer ? (
              <span className="text-green-400 font-semibold">🎉 Correct! Well done!</span>
            ) : (
              <span className="text-red-400 font-semibold">
                ❌ Wrong! The correct answer was: {question.options[question.correctAnswer]}
              </span>
            )}
          </p>
          {question.explanation && (
            <p className="text-gray-300 text-sm mt-2 text-center">
              {question.explanation}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default QuestionCard;