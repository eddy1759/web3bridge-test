import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, RotateCcw, BarChart3 } from 'lucide-react';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  category: string;
  onPlayAgain: () => void;
  onViewLeaderboard: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  score,
  totalQuestions,
  category,
  onPlayAgain,
  onViewLeaderboard,
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🏆", color: "text-yellow-400" };
    if (percentage >= 75) return { message: "Excellent work! 🌟", color: "text-green-400" };
    if (percentage >= 60) return { message: "Good job! 👍", color: "text-blue-400" };
    if (percentage >= 40) return { message: "Not bad! 🎯", color: "text-orange-400" };
    return { message: "Keep practicing! 💪", color: "text-red-400" };
  };

  const performance = getPerformanceMessage();

  const getScoreColor = () => {
    if (percentage >= 75) return "text-green-400";
    if (percentage >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md border-white/20 text-center animate-fade-in">
        {/* Trophy Icon */}
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
        <p className={`text-2xl font-semibold mb-6 ${performance.color}`}>
          {performance.message}
        </p>

        {/* Score Display */}
        <div className="mb-8">
          <div className="bg-white/10 rounded-lg p-6 mb-4">
            <div className="text-6xl font-bold mb-2">
              <span className={getScoreColor()}>{score}</span>
              <span className="text-white">/{totalQuestions}</span>
            </div>
            <div className="text-3xl font-semibold text-gray-300 mb-2">
              {percentage}%
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {category}
            </Badge>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-sm text-gray-300">Correct</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-400">{totalQuestions - score}</div>
            <div className="text-sm text-gray-300">Wrong</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{percentage}%</div>
            <div className="text-sm text-gray-300">Accuracy</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onPlayAgain}
            className="flex items-center gap-2 px-6 py-3"
            size="lg"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </Button>
          <Button
            onClick={onViewLeaderboard}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
            size="lg"
          >
            <BarChart3 className="w-5 h-5" />
            Leaderboard
          </Button>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg">
          <p className="text-gray-300 text-sm">
            {percentage >= 75 
              ? "You're a quiz master! Challenge yourself with other categories."
              : "Practice makes perfect! Try again to improve your score."
            }
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ResultsScreen;