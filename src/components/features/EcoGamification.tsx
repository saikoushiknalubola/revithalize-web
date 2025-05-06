
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Trophy, Star, Clock, Calendar, Target, TrendingUp, Users, Gift, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: string;
  progress: number;
  deadline: string;
  icon: React.ElementType;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export function EcoGamification() {
  const [activeTab, setActiveTab] = useState<'challenges' | 'achievements' | 'leaderboard'>('challenges');
  
  const challenges: Challenge[] = [
    {
      id: 'c1',
      title: 'Energy Efficient Week',
      description: 'Maintain 95% energy efficiency for 7 consecutive days',
      reward: '150 Eco Points',
      progress: 71,
      deadline: '4 days left',
      icon: TrendingUp,
      difficulty: 'medium',
      completed: false
    },
    {
      id: 'c2',
      title: 'Perfect Regeneration',
      description: 'Recover 40% energy through regenerative braking in a single trip',
      reward: '100 Eco Points',
      progress: 88,
      deadline: '2 days left',
      icon: Award,
      difficulty: 'easy',
      completed: false
    },
    {
      id: 'c3',
      title: 'Range Master',
      description: 'Complete a journey of 100+ km on a single charge',
      reward: '200 Eco Points + Badge',
      progress: 50,
      deadline: 'Ongoing',
      icon: Target,
      difficulty: 'hard',
      completed: false
    },
    {
      id: 'c4',
      title: 'Eco Weekend Rider',
      description: 'Use your EV for at least 3 trips during the weekend',
      reward: '75 Eco Points',
      progress: 100,
      deadline: 'Completed',
      icon: Calendar,
      difficulty: 'easy',
      completed: true
    }
  ];
  
  const achievements: Achievement[] = [
    {
      id: 'a1',
      title: 'First Charge',
      description: 'Completed your first full charge cycle',
      icon: CheckCircle,
      date: '3 months ago',
      rarity: 'common'
    },
    {
      id: 'a2',
      title: 'Energy Saver',
      description: 'Achieved 90%+ efficiency for 10 consecutive trips',
      icon: Star,
      date: '2 weeks ago',
      rarity: 'rare'
    },
    {
      id: 'a3',
      title: 'Century Club',
      description: 'Completed 100 charge cycles',
      icon: Trophy,
      date: '5 days ago',
      rarity: 'epic'
    },
    {
      id: 'a4',
      title: 'Green Pioneer',
      description: 'Among the first 100 users to join the eco-riding program',
      icon: Sparkles,
      date: '4 months ago',
      rarity: 'legendary'
    }
  ];
  
  const leaderboardData = [
    { rank: 1, name: 'Rahul M.', points: 1250, change: 0 },
    { rank: 2, name: 'Priya S.', points: 1120, change: 2 },
    { rank: 3, name: 'Amit D.', points: 980, change: -1 },
    { rank: 4, name: 'Neha G.', points: 910, change: -1 },
    { rank: 5, name: 'Vikram T.', points: 880, change: 0 },
    { rank: 6, name: 'Current User', points: 745, change: 3 }
  ];
  
  const rarityColors = {
    common: 'from-gray-500 to-gray-400',
    rare: 'from-blue-500 to-purple-400',
    epic: 'from-purple-500 to-pink-400',
    legendary: 'from-yellow-500 to-amber-400'
  };
  
  const difficultyColors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="mr-2 h-5 w-5 text-yellow-400" />
            Eco Riding Program
          </div>
          <div className="flex items-center text-sm bg-purple-500/20 px-2 py-0.5 rounded-full">
            <Star className="h-3.5 w-3.5 text-purple-300 mr-1" />
            <span className="text-white">745 points</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Complete challenges and earn rewards for eco-friendly riding
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-1">
        {/* Tabs Navigation */}
        <div className="flex space-x-1 mb-4 bg-gray-800/70 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('challenges')}
            className={cn(
              "flex-1 py-1.5 text-xs rounded-md transition-colors",
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={cn(
              "flex-1 py-1.5 text-xs rounded-md transition-colors",
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white font-medium'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Achievements
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={cn(
              "flex-1 py-1.5 text-xs rounded-md transition-colors",
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium'
                : 'text-gray-400 hover:text-white'
            )}
          >
            Leaderboard
          </button>
        </div>
        
        {/* Active Challenges */}
        {activeTab === 'challenges' && (
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                className={cn(
                  "bg-gray-800/60 p-3 rounded-lg border",
                  challenge.completed ? "border-green-500/30" : "border-gray-700/30"
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex">
                  <div className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                    challenge.completed ? "bg-green-500/20" : "bg-gray-700/50"
                  )}>
                    <challenge.icon className={cn(
                      "h-5 w-5",
                      challenge.completed ? "text-green-400" : "text-gray-300"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white text-sm flex items-center">
                        {challenge.title}
                        <span className={cn(
                          "ml-2 h-2 w-2 rounded-full",
                          difficultyColors[challenge.difficulty]
                        )} />
                      </h4>
                      <span className="text-xs text-gray-400">{challenge.deadline}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{challenge.description}</p>
                    
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-white">{challenge.progress}%</span>
                      </div>
                      <Progress 
                        value={challenge.progress} 
                        className="h-1.5 bg-gray-700" 
                        indicatorClassName={
                          challenge.completed 
                            ? "bg-gradient-to-r from-green-500 to-green-400" 
                            : "bg-gradient-to-r from-blue-500 to-purple-500"
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs">
                        <Gift className="h-3 w-3 text-purple-400 mr-1" />
                        <span className="text-purple-300">{challenge.reward}</span>
                      </div>
                      
                      {challenge.completed ? (
                        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </span>
                      ) : (
                        <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center">
                          Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="text-center mt-2">
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                View all challenges
              </button>
            </div>
          </div>
        )}
        
        {/* Achievements */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.id}
                className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={cn(
                    "h-14 w-14 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br",
                    rarityColors[achievement.rarity]
                  )}>
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-white text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{achievement.description}</p>
                  <div className="mt-2 flex items-center text-xs">
                    <Clock className="h-3 w-3 text-gray-500 mr-1" />
                    <span className="text-gray-400">{achievement.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="col-span-2 text-center mt-2">
              <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                View all achievements
              </button>
            </div>
          </div>
        )}
        
        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div>
            <div className="bg-gray-800/60 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-gray-800 py-2 px-3 text-xs font-medium text-gray-400">
                <div className="col-span-1">#</div>
                <div className="col-span-7">Rider</div>
                <div className="col-span-4 text-right">Points</div>
              </div>
              
              <div className="divide-y divide-gray-700/50">
                {leaderboardData.map((user) => (
                  <motion.div
                    key={user.rank}
                    className={cn(
                      "grid grid-cols-12 py-3 px-3 text-sm",
                      user.name === 'Current User' ? "bg-purple-900/20" : ""
                    )}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="col-span-1 flex items-center">
                      {user.rank <= 3 ? (
                        <div className={cn(
                          "h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold",
                          user.rank === 1 ? "bg-yellow-500 text-yellow-900" :
                          user.rank === 2 ? "bg-gray-300 text-gray-800" :
                          "bg-amber-700 text-amber-100"
                        )}>
                          {user.rank}
                        </div>
                      ) : (
                        <span className="text-gray-400">{user.rank}</span>
                      )}
                    </div>
                    <div className="col-span-7 flex items-center">
                      {user.name === 'Current User' ? (
                        <span className="font-medium text-purple-300">You</span>
                      ) : (
                        <span className="text-white">{user.name}</span>
                      )}
                      
                      {user.change > 0 && (
                        <span className="ml-2 text-xs text-green-400 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-0.5" />
                          {user.change}
                        </span>
                      )}
                      
                      {user.change < 0 && (
                        <span className="ml-2 text-xs text-red-400">↓{Math.abs(user.change)}</span>
                      )}
                    </div>
                    <div className="col-span-4 text-right font-medium text-white">
                      {user.points}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-800/30 p-3 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-500/20 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Weekly Challenge</h4>
                  <p className="text-gray-400 text-xs">
                    Complete 5 eco-friendly trips to enter the raffle for a free charging station visit!
                  </p>
                </div>
              </div>
              <div className="mt-2 ml-12">
                <button className="text-sm bg-purple-600 hover:bg-purple-700 text-white py-1 px-4 rounded-full transition-colors">
                  Join Challenge
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
