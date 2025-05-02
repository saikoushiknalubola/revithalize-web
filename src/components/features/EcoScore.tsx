
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, RefreshCw, Timer, Zap, Award, TrendingUp, Shield } from 'lucide-react';
import { useScreenSize } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  name: string;
  icon: React.ElementType;
  level: number;
  maxLevel: number;
  color: string;
  description?: string;
}

interface EcoScoreProps {
  score: number;
  scoreChange?: number;
  achievements?: Achievement[];
  className?: string;
  showHeader?: boolean;
}

export function EcoScore({ 
  score = 87,
  scoreChange = 3,
  className,
  showHeader = true,
  achievements = [
    {
      id: 'energy-saver',
      name: 'Energy Saver',
      icon: Zap,
      level: 3,
      maxLevel: 5,
      color: 'purple',
      description: 'Efficient energy consumption pattern'
    },
    {
      id: 'regenerator',
      name: 'Regenerator',
      icon: RefreshCw,
      level: 2,
      maxLevel: 5,
      color: 'blue',
      description: 'Effective use of regenerative braking'
    },
    {
      id: 'battery-pro',
      name: 'Battery Pro',
      icon: Battery,
      level: 4,
      maxLevel: 5,
      color: 'green',
      description: 'Optimal battery maintenance'
    },
    {
      id: 'eco-driver',
      name: 'Eco Driver',
      icon: Timer,
      level: 3,
      maxLevel: 5,
      color: 'yellow',
      description: 'Environment-friendly riding style'
    }
  ]
}: EcoScoreProps) {
  const { isMobile } = useScreenSize();

  return (
    <Card className={cn("bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden", className)}>
      {showHeader && (
        <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
          <CardTitle className="text-white text-lg sm:text-xl flex items-center">
            <Award className="mr-2 h-5 w-5 text-purple-400" />
            Eco Score & Achievements
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs sm:text-sm">Track your riding efficiency and earn rewards</CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn("px-3 pb-3 sm:px-4 sm:pb-4", !showHeader && "pt-3 sm:pt-4")}>
        <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700/30">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/50 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                  {score}
                </div>
              </div>
              {scoreChange !== 0 && (
                <div className={cn(
                  "absolute -bottom-1 -right-1 text-black text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center",
                  scoreChange > 0 ? "bg-green-500" : "bg-red-500"
                )}>
                  {scoreChange > 0 ? `+${scoreChange}` : scoreChange}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1 text-center md:text-left">Your Eco Score</h3>
              <div className="relative h-2 bg-gray-700 rounded-full mb-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full" 
                  style={{ width: `${score}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Energy Efficient</span>
                <span>{score}/100</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`bg-gray-900/60 p-2 rounded-md flex flex-col items-center border border-${achievement.color}-500/30`}
              >
                <div className={`h-10 w-10 rounded-full bg-${achievement.color}-500/20 flex items-center justify-center mb-1`}>
                  <achievement.icon className={`h-5 w-5 text-${achievement.color}-400`} />
                </div>
                <p className="text-xs text-white text-center">{achievement.name}</p>
                <p className="text-xs text-gray-400">Level {achievement.level}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-3 text-xs text-gray-500 text-center">
            Improve your scores by maintaining consistent riding patterns and efficient energy usage
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
