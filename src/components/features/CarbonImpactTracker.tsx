
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, TrendingUp, Globe, Award, Target, Activity, Zap, Calendar, Download, BarChart3, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarbonMetric {
  title: string;
  value: string;
  icon: any;
  color: string;
  change: string;
  equivalent: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

export function CarbonImpactTracker() {
  const [todayImpact, setTodayImpact] = useState(2.3);
  const [weeklyImpact, setWeeklyImpact] = useState(15.7);
  const [totalImpact, setTotalImpact] = useState(450.2);
  const [carbonCredits, setCarbonCredits] = useState(12.5);
  const [isRealTimeActive, setIsRealTimeActive] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  // Simulate real-time carbon impact calculation
  useEffect(() => {
    if (!isRealTimeActive) return;

    const interval = setInterval(() => {
      setTodayImpact(prev => prev + Math.random() * 0.1);
      setWeeklyImpact(prev => prev + Math.random() * 0.05);
      setTotalImpact(prev => prev + Math.random() * 0.02);
      setCarbonCredits(prev => prev + Math.random() * 0.01);
    }, 3000);

    return () => clearInterval(interval);
  }, [isRealTimeActive]);

  const impactMetrics: CarbonMetric[] = [
    {
      title: "Today's CO₂ Saved",
      value: `${todayImpact.toFixed(1)} kg`,
      icon: Leaf,
      color: "text-green-400",
      change: "+2.3kg from yesterday",
      equivalent: "≈ 15 trees planted",
      trend: 'up',
      percentage: 87
    },
    {
      title: "Weekly Impact",
      value: `${weeklyImpact.toFixed(1)} kg`,
      icon: TrendingUp,
      color: "text-blue-400",
      change: "+8.5kg from last week",
      equivalent: "≈ 95 trees planted",
      trend: 'up',
      percentage: 92
    },
    {
      title: "Lifetime Savings",
      value: `${totalImpact.toFixed(1)} kg`,
      icon: Globe,
      color: "text-purple-400",
      change: "Top 5% of users",
      equivalent: "≈ 2,800 trees planted",
      trend: 'stable',
      percentage: 94
    },
    {
      title: "Carbon Credits Earned",
      value: `₹${carbonCredits.toFixed(2)}`,
      icon: Award,
      color: "text-yellow-400",
      change: "Available for withdrawal",
      equivalent: "Tradeable on carbon market",
      trend: 'up',
      percentage: 76
    }
  ];

  const achievements = [
    { title: "Eco Warrior", description: "Saved 100kg+ CO₂", icon: Target, earned: true },
    { title: "Green Champion", description: "30 days streak", icon: Activity, earned: true },
    { title: "Climate Hero", description: "1000kg+ lifetime", icon: Globe, earned: false },
    { title: "Carbon Neutral", description: "Monthly goal", icon: Leaf, earned: true }
  ];

  const periodOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' }
  ];

  return (
    <div className="space-y-6">
      {/* Professional Header */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-3 rounded-lg border border-green-500/30">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-white flex items-center">
                  Real-Time Carbon Impact Tracker
                  <Badge className="ml-3 bg-green-500/20 text-green-400 border border-green-500/30">
                    LIVE
                  </Badge>
                </CardTitle>
                <p className="text-gray-400 text-sm mt-1">
                  Monitor your environmental impact and earn carbon credits in real-time
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRealTimeActive(!isRealTimeActive)}
                className={cn(
                  "border-gray-600 transition-colors",
                  isRealTimeActive 
                    ? "bg-green-600 hover:bg-green-500 text-white border-green-500" 
                    : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                )}
              >
                <Activity className="h-3 w-3 mr-1" />
                {isRealTimeActive ? 'Live' : 'Paused'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
              >
                <Download className="h-3 w-3 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Enhanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-black/30 p-2 rounded-lg group-hover:bg-black/40 transition-colors">
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        metric.trend === 'up' ? 'bg-green-400' :
                        metric.trend === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                      )} />
                      <span className="text-xs text-gray-400 capitalize">{metric.trend}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-2xl font-bold ${metric.color}`}
                    >
                      {metric.value}
                    </motion.div>
                    
                    <h4 className="text-white text-sm font-medium">{metric.title}</h4>
                    
                    <div className="space-y-1">
                      <p className="text-gray-400 text-xs">{metric.change}</p>
                      <p className="text-gray-500 text-xs">{metric.equivalent}</p>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{metric.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <motion.div 
                          className={cn(
                            "h-2 rounded-full",
                            metric.color.includes('green') ? "bg-gradient-to-r from-green-600 to-green-400" :
                            metric.color.includes('blue') ? "bg-gradient-to-r from-blue-600 to-blue-400" :
                            metric.color.includes('purple') ? "bg-gradient-to-r from-purple-600 to-purple-400" :
                            "bg-gradient-to-r from-yellow-600 to-yellow-400"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Time Period Selector */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-medium flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-blue-400" />
              View Period
            </h3>
            <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1">
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPeriod(option.value)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-md transition-colors",
                    selectedPeriod === option.value
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-gray-700"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-400" />
            Environmental Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "p-3 rounded-lg border transition-all duration-300",
                    achievement.earned 
                      ? "bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-600/30 hover:border-yellow-500/50" 
                      : "bg-gray-800/50 border-gray-700/50 opacity-60"
                  )}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className={cn(
                      "h-4 w-4",
                      achievement.earned ? "text-yellow-400" : "text-gray-500"
                    )} />
                    {achievement.earned ? (
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-gray-500" />
                    )}
                  </div>
                  <div className="text-sm font-medium text-white mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {achievement.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Impact Summary */}
      <Card className="bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30 border border-green-600/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Globe className="h-6 w-6 text-green-400" />
              <h3 className="text-white font-semibold text-lg">Environmental Impact Milestone</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-400">23 Days</div>
                <div className="text-sm text-gray-300">Car off the road equivalent</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-blue-400">2,800</div>
                <div className="text-sm text-gray-300">Trees planted equivalent</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-purple-400">450kg</div>
                <div className="text-sm text-gray-300">Total CO₂ prevented</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 pt-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <p className="text-gray-300 text-sm">
                You're making a real difference for our planet! 🌱
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white">
              <BarChart3 className="h-3 w-3 mr-1" />
              Detailed Analytics
            </Button>
            <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
              <Download className="h-3 w-3 mr-1" />
              Export Report
            </Button>
            <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
              <Target className="h-3 w-3 mr-1" />
              Set Goals
            </Button>
            <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
              <Activity className="h-3 w-3 mr-1" />
              Live Monitoring
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
