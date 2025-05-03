
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Battery, 
  RefreshCw, 
  Timer, 
  Zap, 
  Award, 
  TrendingUp, 
  Shield, 
  Star, 
  Leaf, 
  Droplet,
  Heart,
  Info,
  CircleCheck
} from 'lucide-react';
import { useScreenSize } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Achievement {
  id: string;
  name: string;
  icon: React.ElementType;
  level: number;
  maxLevel: number;
  color: string;
  description?: string;
  unlockRequirement?: string;
  isNew?: boolean;
}

interface Reward {
  id: string;
  name: string;
  points: number;
  icon: React.ElementType;
  description: string;
  unlocked: boolean;
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
      description: 'Efficient energy consumption pattern',
      unlockRequirement: 'Maintain 85% energy efficiency for 5 rides'
    },
    {
      id: 'regenerator',
      name: 'Regenerator',
      icon: RefreshCw,
      level: 2,
      maxLevel: 5,
      color: 'blue',
      description: 'Effective use of regenerative braking',
      unlockRequirement: 'Recover 30% energy through regeneration'
    },
    {
      id: 'battery-pro',
      name: 'Battery Pro',
      icon: Battery,
      level: 4,
      maxLevel: 5,
      color: 'green',
      description: 'Optimal battery maintenance',
      unlockRequirement: 'Keep battery temperature optimal for 20 rides'
    },
    {
      id: 'eco-driver',
      name: 'Eco Driver',
      icon: Timer,
      level: 3,
      maxLevel: 5,
      color: 'yellow',
      description: 'Environment-friendly riding style',
      unlockRequirement: 'Complete 10 rides in eco mode'
    },
    {
      id: 'eco-explorer',
      name: 'Eco Explorer',
      icon: Leaf,
      level: 2,
      maxLevel: 5,
      color: 'emerald',
      description: 'Discover new eco-friendly routes',
      unlockRequirement: 'Find 5 energy-efficient routes',
      isNew: true
    },
    {
      id: 'range-master',
      name: 'Range Master',
      icon: TrendingUp,
      level: 1,
      maxLevel: 5,
      color: 'pink',
      description: 'Maximize range on single charge',
      unlockRequirement: 'Exceed expected range by 15%'
    }
  ]
}: EcoScoreProps) {
  const { isMobile } = useScreenSize();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [activeTab, setActiveTab] = useState('achievements');
  
  // Additional rewards section
  const rewards: Reward[] = [
    {
      id: 'free-charge',
      name: 'Free Charging Session',
      points: 500,
      icon: Zap,
      description: 'Earn a free charging session at participating stations',
      unlocked: true
    },
    {
      id: 'battery-check',
      name: 'Premium Battery Checkup',
      points: 1200,
      icon: Battery,
      description: 'Get a comprehensive battery health assessment',
      unlocked: false
    },
    {
      id: 'eco-badge',
      name: 'Digital Eco Badge',
      points: 300,
      icon: Award,
      description: 'Showcase your commitment to eco-friendly riding',
      unlocked: true
    },
    {
      id: 'extended-warranty',
      name: 'Extended Warranty',
      points: 5000,
      icon: Shield,
      description: 'One month warranty extension on battery components',
      unlocked: false
    }
  ];

  const ecoPoints = 750;
  
  const achievementLevelColors = {
    1: 'from-gray-500/40 to-gray-400/40',
    2: 'from-blue-500/40 to-blue-400/40',
    3: 'from-green-500/40 to-green-400/40',
    4: 'from-purple-500/40 to-purple-400/40',
    5: 'from-yellow-500/40 to-yellow-400/40'
  };

  return (
    <Card className={cn("bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-lg overflow-hidden", className)}>
      {showHeader && (
        <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
          <CardTitle className="text-white text-lg sm:text-xl flex items-center justify-between">
            <div className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-purple-400" />
              Eco Score & Achievements
            </div>
            <div className="flex items-center text-sm bg-gray-800/80 px-2 py-0.5 rounded-full">
              <Star className="h-3.5 w-3.5 text-yellow-400 mr-1" />
              <span className="text-white">{ecoPoints} pts</span>
            </div>
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs sm:text-sm">Track your riding efficiency and earn rewards</CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn("px-3 pb-3 sm:px-4 sm:pb-4", !showHeader && "pt-3 sm:pt-4")}>
        <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/30 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl -ml-20 -mb-20"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative">
              <motion.div 
                className="h-28 w-28 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/50 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                <motion.div 
                  className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Circular progress indicator */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" cy="50" r="46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.7)" 
                      strokeWidth="8" 
                      strokeDasharray={`${score * 2.89} 1000`} 
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {score}
                </motion.div>
              </motion.div>
              {scoreChange !== 0 && (
                <motion.div 
                  className={cn(
                    "absolute -bottom-1 -right-1 text-black text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center",
                    scoreChange > 0 ? "bg-green-500" : "bg-red-500"
                  )}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  {scoreChange > 0 ? `+${scoreChange}` : scoreChange}
                </motion.div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                <span>Your Eco Score</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="w-60 p-2">
                      <p className="text-xs">Your Eco Score reflects how efficiently you ride your EV. Improve your score by maintaining consistent speeds and using regenerative braking.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <div className="relative h-3 bg-gray-700/70 rounded-full mb-2 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                ></motion.div>
                
                {/* Score threshold markers */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between px-2 pointer-events-none">
                  {[25, 50, 75].map((threshold) => (
                    <div 
                      key={threshold}
                      className="h-full w-0.5 bg-gray-600"
                      style={{ marginLeft: `${threshold}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Energy Efficient</span>
                <span>{score}/100</span>
              </div>
              
              <div className="mt-2 text-xs flex items-center justify-center md:justify-start">
                <span className="mr-3 text-gray-500">Next reward in:</span>
                <div className="text-purple-400 font-medium bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  250 points
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs navigation */}
          <div className="flex space-x-1 mb-4 bg-gray-900/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('achievements')}
              className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
                activeTab === 'achievements' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Achievements
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex-1 py-1.5 text-xs rounded-md transition-colors ${
                activeTab === 'rewards' 
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Rewards
            </button>
          </div>
          
          {activeTab === 'achievements' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {achievements.map((achievement) => (
                <motion.div 
                  key={achievement.id}
                  className={`bg-gray-900/60 p-3 rounded-lg flex flex-col items-center border border-${achievement.color}-500/30 relative cursor-pointer group`}
                  onClick={() => setSelectedAchievement(
                    selectedAchievement?.id === achievement.id ? null : achievement
                  )}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * (achievements.indexOf(achievement) % 3) }}
                >
                  {achievement.isNew && (
                    <span className="absolute -top-2 -right-2 bg-blue-500 text-xs text-white px-1.5 py-0.5 rounded-full">
                      New
                    </span>
                  )}
                  
                  <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${achievementLevelColors[achievement.level]} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                    <achievement.icon className={`h-6 w-6 text-${achievement.color}-400`} />
                  </div>
                  
                  <p className="text-xs text-white text-center font-medium">{achievement.name}</p>
                  
                  <div className="mt-1 w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${achievement.color}-500 rounded-full`}
                      style={{ width: `${(achievement.level/achievement.maxLevel) * 100}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-xs text-gray-400 mt-1">Level {achievement.level}/{achievement.maxLevel}</p>
                  
                  {selectedAchievement?.id === achievement.id && (
                    <motion.div 
                      className="mt-2 text-xs text-gray-300 bg-gray-800/80 p-2 rounded-md border border-gray-700/50"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{achievement.description}</p>
                      <div className="mt-1 pt-1 border-t border-gray-700/30 flex items-center">
                        <CircleCheck className="h-3 w-3 text-green-400 mr-1" />
                        <span className="text-green-300 text-[10px]">{achievement.unlockRequirement}</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.map((reward) => (
                <motion.div 
                  key={reward.id}
                  className={`bg-gray-900/60 p-3 rounded-lg flex items-center gap-3 border ${
                    reward.unlocked 
                      ? 'border-green-500/30' 
                      : 'border-gray-700/30'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * rewards.indexOf(reward) }}
                >
                  <div className={`h-10 w-10 rounded-full ${
                    reward.unlocked 
                      ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20' 
                      : 'bg-gray-800/50'
                  } flex items-center justify-center`}>
                    <reward.icon className={`h-5 w-5 ${
                      reward.unlocked ? 'text-green-400' : 'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white font-medium">{reward.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        reward.unlocked 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {reward.unlocked ? 'Unlocked' : `${reward.points} pts`}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{reward.description}</p>
                  </div>
                </motion.div>
              ))}
              
              <div className="text-center mt-4">
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  Redeem Rewards
                </button>
              </div>
            </div>
          )}
          
          <div className="mt-4 text-xs text-gray-500 text-center">
            Improve your scores by maintaining consistent riding patterns and efficient energy usage
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
