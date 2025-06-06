
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Enhanced Header */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 backdrop-blur-sm">
                <Leaf className="h-8 w-8 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold flex items-center gap-3">
                  Real-Time Carbon Impact Tracker
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                    LIVE
                  </Badge>
                </CardTitle>
                <p className="text-slate-400 text-base mt-2">
                  Monitor your environmental impact and earn carbon credits in real-time
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRealTimeActive(!isRealTimeActive)}
                className={cn(
                  "border-slate-600 transition-all duration-200",
                  isRealTimeActive 
                    ? "bg-green-600 hover:bg-green-500 text-white border-green-500 shadow-lg shadow-green-500/25" 
                    : "bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600"
                )}
              >
                <Activity className="h-4 w-4 mr-2" />
                {isRealTimeActive ? 'Live' : 'Paused'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600 shadow-lg"
              >
                <Download className="h-4 w-4 mr-2" />
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
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-slate-800/50 p-3 rounded-xl group-hover:bg-slate-700/50 transition-colors border border-slate-700">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        metric.trend === 'up' ? 'bg-green-400' :
                        metric.trend === 'down' ? 'bg-red-400' : 'bg-yellow-400'
                      )} />
                      <span className="text-xs text-slate-400 capitalize font-medium">{metric.trend}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`text-3xl font-bold ${metric.color}`}
                    >
                      {metric.value}
                    </motion.div>
                    
                    <h4 className="text-white text-sm font-semibold">{metric.title}</h4>
                    
                    <div className="space-y-2">
                      <p className="text-slate-300 text-xs font-medium">{metric.change}</p>
                      <p className="text-slate-400 text-xs">{metric.equivalent}</p>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-bold">{metric.percentage}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-3 border border-slate-700">
                        <motion.div 
                          className={cn(
                            "h-3 rounded-full shadow-lg",
                            metric.color.includes('green') ? "bg-gradient-to-r from-green-600 to-green-400 shadow-green-500/50" :
                            metric.color.includes('blue') ? "bg-gradient-to-r from-blue-600 to-blue-400 shadow-blue-500/50" :
                            metric.color.includes('purple') ? "bg-gradient-to-r from-purple-600 to-purple-400 shadow-purple-500/50" :
                            "bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-yellow-500/50"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.percentage}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
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

      {/* Enhanced Time Period Selector */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg flex items-center">
              <Calendar className="mr-3 h-5 w-5 text-blue-400" />
              View Period
            </h3>
            <div className="flex space-x-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700">
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPeriod(option.value)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-lg transition-all duration-200 font-medium",
                    selectedPeriod === option.value
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-400 hover:text-white hover:bg-slate-700"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Achievements Section */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-xl font-bold flex items-center">
            <Award className="mr-3 h-6 w-6 text-yellow-400" />
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
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                    achievement.earned 
                      ? "bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-yellow-900/20 border-yellow-600/30 hover:border-yellow-500/50 shadow-lg hover:shadow-yellow-500/25" 
                      : "bg-slate-800/30 border-slate-700/50 opacity-60 hover:opacity-80"
                  )}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className={cn(
                      "h-5 w-5",
                      achievement.earned ? "text-yellow-400" : "text-slate-500"
                    )} />
                    {achievement.earned ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-slate-500" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {achievement.title}
                  </div>
                  <div className="text-xs text-slate-400">
                    {achievement.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Impact Summary */}
      <Card className="bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 border border-green-600/20 shadow-2xl backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <Globe className="h-8 w-8 text-green-400" />
              <h3 className="text-white font-bold text-2xl">Environmental Impact Milestone</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2 p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                <div className="text-3xl font-bold text-green-400">23 Days</div>
                <div className="text-sm text-slate-300 font-medium">Car off the road equivalent</div>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                <div className="text-3xl font-bold text-blue-400">2,800</div>
                <div className="text-sm text-slate-300 font-medium">Trees planted equivalent</div>
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-slate-800/30 border border-slate-700">
                <div className="text-3xl font-bold text-purple-400">450kg</div>
                <div className="text-sm text-slate-300 font-medium">Total CO₂ prevented</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-3 pt-4">
              <Zap className="h-5 w-5 text-yellow-400" />
              <p className="text-slate-300 text-base font-medium">
                You're making a real difference for our planet! 🌱
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Quick Actions */}
      <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button size="sm" className="bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/25">
              <BarChart3 className="h-4 w-4 mr-2" />
              Detailed Analytics
            </Button>
            <Button size="sm" variant="outline" className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600 shadow-lg">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm" variant="outline" className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600 shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Set Goals
            </Button>
            <Button size="sm" variant="outline" className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600 shadow-lg">
              <Activity className="h-4 w-4 mr-2" />
              Live Monitoring
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
