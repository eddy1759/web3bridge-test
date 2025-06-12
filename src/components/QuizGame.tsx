import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Trophy, RotateCcw } from 'lucide-react';
import QuestionCard from './QuestionCard';
import ResultsScreen from './ResultsScreen';
import Leaderboard from './Leaderboard';
import { quizService, type Question, type QuizCategory } from  '../services/quizService';
import { useToast } from '../hooks/use-toast';

export interface GameState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  timeRemaining: number;
  gameStarted: boolean;
  gameCompleted: boolean;
  selectedCategory: QuizCategory | null;
}

const QuizGame = () => {
  const { toast } = useToast();
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    timeRemaining: 30,
    gameStarted: false,
    gameCompleted: false,
    selectedCategory: null,
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const availableCategories = await quizService.getCategories();
      setCategories(availableCategories);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load categories:', error);
      toast({
        title: "Error",
        description: "Failed to load quiz categories. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const startGame = async (category: QuizCategory) => {
    try {
      setLoading(true);
      const categoryQuestions = await quizService.getQuestionsByCategory(category.id);
      setQuestions(categoryQuestions);
      setGameState({
        ...gameState,
        gameStarted: true,
        selectedCategory: category,
        timeRemaining: 30,
      });
      setLoading(false);
      
      toast({
        title: "Game Started!",
        description: `Good luck with ${category.name} questions!`,
      });
    } catch (error) {
      console.error('Failed to start game:', error);
      toast({
        title: "Error",
        description: "Failed to load questions. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    const currentQuestion = questions[gameState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newScore = isCorrect ? gameState.score + 1 : gameState.score;
    const newAnswers = [...gameState.answers, answerIndex];

    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Well done! 🎉",
      });
    } else {
      toast({
        title: "Wrong Answer",
        description: `The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`,
        variant: "destructive",
      });
    }

    if (gameState.currentQuestionIndex < questions.length - 1) {
      setGameState({
        ...gameState,
        currentQuestionIndex: gameState.currentQuestionIndex + 1,
        score: newScore,
        answers: newAnswers,
        timeRemaining: 30,
      });
    } else {
      // Game completed
      setGameState({
        ...gameState,
        score: newScore,
        answers: newAnswers,
        gameCompleted: true,
      });
      
      // Save score to leaderboard
      quizService.saveScore({
        playerName: 'Player',
        score: newScore,
        totalQuestions: questions.length,
        category: gameState.selectedCategory!.name,
        timestamp: new Date(),
      });
    }
  };

  const resetGame = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      timeRemaining: 30,
      gameStarted: false,
      gameCompleted: false,
      selectedCategory: null,
    });
    setQuestions([]);
  };

  const handleTimeUp = () => {
    handleAnswer(-1); // -1 indicates no answer selected
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading quiz data...</p>
        </div>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-white">Leaderboard</h1>
            <Button onClick={() => setShowLeaderboard(false)} variant="outline">
              Back to Game
            </Button>
          </div>
          <Leaderboard />
        </div>
      </div>
    );
  }

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              Echo Quiz Master
            </h1>
            <p className="text-xl text-gray-300 animate-fade-in">
              Test your knowledge across various topics!
            </p>
          </div>

          <div className="grid gap-4 mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Choose a Category:</h2>
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => startGame(category)}
                className="p-6 text-left hover:scale-105 transition-transform duration-200"
                variant="outline"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-300">{category.description}</p>
                  </div>
                  <Badge variant="secondary">{category.questionCount} questions</Badge>
                </div>
              </Button>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setShowLeaderboard(true)}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState.gameCompleted) {
    return (
      <ResultsScreen
        score={gameState.score}
        totalQuestions={questions.length}
        category={gameState.selectedCategory!.name}
        onPlayAgain={resetGame}
        onViewLeaderboard={() => setShowLeaderboard(true)}
      />
    );
  }

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = ((gameState.currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button onClick={resetGame} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {gameState.selectedCategory?.name}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-white">
            <div className="text-right">
              <p className="text-sm text-gray-300">Score</p>
              <p className="text-2xl font-bold">{gameState.score}/{questions.length}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">
              Question {gameState.currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-white text-sm">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            questionNumber={gameState.currentQuestionIndex + 1}
            onAnswer={handleAnswer}
            timeRemaining={gameState.timeRemaining}
            onTimeUp={handleTimeUp}
            setTimeRemaining={(time) => setGameState({ ...gameState, timeRemaining: time })}
          />
        )}
      </div>
    </div>
  );
};

export default QuizGame;