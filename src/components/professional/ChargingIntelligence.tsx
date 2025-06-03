
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, TrendingDown, Clock, DollarSign, Leaf, MapPin, Brain, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChargingSession {
  id: string;
  location: string;
  startTime: Date;
  duration: number;
  energyAdded: number;
  cost: number;
  efficiency: number;
  renewablePercent: number;
}

export function ChargingIntelligence() {
  const [activeOptimization, setActiveOptimization] = useState<'cost' | 'speed' | 'renewable'>('cost');
  
  const recentSessions: ChargingSession[] = [
    {
      id: '1',
      location: 'Home Garage',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      duration: 180,
      energyAdded: 15.4,
      cost: 2.45,
      efficiency: 94,
      renewablePercent: 78
    },
    {
      id: '2',
      location: 'Office Parking',
      startTime: new Date(Date.now() - 6 * 60 * 60 * 1000),
      duration: 120,
      energyAdded: 8.2,
      cost: 4.20,
      efficiency: 87,
      renewablePercent: 45
    }
  ];

  const optimizationSettings = {
    cost: {
      title: 'Cost Optimized',
      description: 'Charge during off-peak hours',
      savings: '35% cheaper',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20'
    },
    speed: {
      title: 'Time Optimized',
      description: 'Fastest charging available',
      savings: '60% faster',
      icon: Zap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20'
    },
    renewable: {
      title: 'Green Energy',
      description: 'Prioritize renewable sources',
      savings: '90% renewable',
      icon: Leaf,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/20'
    }
  };

  const aiRecommendations = [
    {
      title: 'Optimal Charging Time',
      description: 'Charge between 2:00 AM - 6:00 AM for 40% cost savings',
      impact: 'Save $8.20/week',
      type: 'cost'
    },
    {
      title: 'Route Optimization',
      description: 'Use Station Alpha for your Monday commute - 15% cheaper',
      impact: '3 min detour',
      type: 'efficiency'
    },
    {
      title: 'Battery Health',
      description: 'Limit charging to 80% for daily use to extend battery life',
      impact: '+2 years lifespan',
      type: 'health'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Charging Optimization */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-xl flex items-center">
            <Brain className="mr-3 h-6 w-6 text-revithalize-green" />
            AI Charging Intelligence
            <div className="ml-auto bg-gradient-to-r from-revithalize-green to-revithalize-blue px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-white">AI POWERED</span>
            </div>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Smart optimization based on your usage patterns and preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Optimization Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(optimizationSettings).map(([key, setting]) => {
              const Icon = setting.icon;
              const isActive = activeOptimization === key;
              
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveOptimization(key as any)}
                  className={cn(
                    "p-4 rounded-xl border transition-all text-left",
                    isActive 
                      ? "border-revithalize-green bg-revithalize-green/10" 
                      : "border-gray-600 hover:border-gray-500 bg-gray-800/50"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={cn("p-2 rounded-lg", isActive ? setting.bgColor : "bg-gray-700")}>
                      <Icon className={cn("h-5 w-5", isActive ? setting.color : "text-gray-400")} />
                    </div>
                    <div>
                      <div className={cn("font-medium", isActive ? "text-white" : "text-gray-300")}>
                        {setting.title}
                      </div>
                      <div className="text-xs text-gray-400">{setting.savings}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{setting.description}</p>
                </motion.button>
              );
            })}
          </div>

          {/* AI Recommendations */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Brain className="mr-2 h-5 w-5 text-revithalize-blue" />
              AI Recommendations
            </h3>
            {aiRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border border-gray-600/30"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">{rec.title}</div>
                    <div className="text-sm text-gray-400 mb-2">{rec.description}</div>
                    <div className="text-xs text-revithalize-green font-medium">{rec.impact}</div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-revithalize-green/20 hover:bg-revithalize-green/30 text-revithalize-green border-revithalize-green/50"
                  >
                    Apply
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Charging Sessions */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <Zap className="mr-3 h-5 w-5 text-blue-400" />
            Recent Charging Sessions
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {recentSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-500/20 p-2 rounded-lg">
                    <MapPin className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{session.location}</div>
                    <div className="text-xs text-gray-400">
                      {session.startTime.toLocaleTimeString()} • {session.duration} minutes
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">${session.cost.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">{session.energyAdded.toFixed(1)} kWh</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-3">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Efficiency</div>
                  <div className="text-white font-medium">{session.efficiency}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Renewable</div>
                  <div className="text-emerald-400 font-medium">{session.renewablePercent}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-400">Rate</div>
                  <div className="text-white font-medium">${(session.cost / session.energyAdded).toFixed(2)}/kWh</div>
                </div>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
