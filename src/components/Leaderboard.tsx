import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { quizService, type LeaderboardEntry } from '../services/quizService';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const entries = await quizService.getLeaderboard();
      setLeaderboard(entries);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white">{rank}</div>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600";
      default:
        return "bg-white/10";
    }
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Loading leaderboard...</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <Card className="p-8 bg-white/10 backdrop-blur-md border-white/20 text-center">
        <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">No scores yet!</h3>
        <p className="text-gray-300">Be the first to complete a quiz and claim the top spot.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <div className="text-center mb-6">
        <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Top Performers</h2>
        <p className="text-gray-300">See how you stack up against other players</p>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry, index) => {
          const rank = index + 1;
          const percentage = Math.round((entry.score / entry.totalQuestions) * 100);
          
          return (
            <div
              key={index}
              className={`p-4 rounded-lg ${getRankBadgeColor(rank)} border border-white/20 animate-fade-in hover:scale-105 transition-transform duration-200`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getRankIcon(rank)}
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {entry.playerName}
                    </div>
                    <div className="text-sm text-gray-200">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">
                    {entry.score}/{entry.totalQuestions}
                  </div>
                  <div className="text-sm text-gray-200">
                    {percentage}%
                  </div>
                </div>
                
                <Badge variant="secondary" className="ml-4">
                  {entry.category}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {leaderboard.length >= 10 && (
        <div className="text-center mt-6 text-gray-300 text-sm">
          Showing top 10 scores
        </div>
      )}
    </Card>
  );
};

export default Leaderboard;