
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, TrendingUp, Settings, Play, Pause, RotateCcw, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizationRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  savings: number;
  type: 'charging' | 'performance' | 'route';
}

export function EnergyOptimization() {
  const [optimizationMode, setOptimizationMode] = useState<'eco' | 'balanced' | 'performance'>('balanced');
  const [autoOptimize, setAutoOptimize] = useState(true);

  const [rules] = useState<OptimizationRule[]>([
    {
      id: '1',
      name: 'Smart Charging Schedule',
      description: 'Charge during off-peak hours for better rates',
      status: 'active',
      savings: 23,
      type: 'charging'
    },
    {
      id: '2',
      name: 'Route Optimization',
      description: 'AI-powered route planning for efficiency',
      status: 'active',
      savings: 18,
      type: 'route'
    },
    {
      id: '3',
      name: 'Performance Tuning',
      description: 'Optimize motor settings for current conditions',
      status: 'pending',
      savings: 12,
      type: 'performance'
    },
    {
      id: '4',
      name: 'Predictive Maintenance',
      description: 'Prevent efficiency loss through proactive care',
      status: 'active',
      savings: 15,
      type: 'performance'
    }
  ]);

  const modes = [
    { key: 'eco', label: 'Eco Mode', color: 'text-green-400', description: 'Maximum efficiency' },
    { key: 'balanced', label: 'Balanced', color: 'text-blue-400', description: 'Optimal balance' },
    { key: 'performance', label: 'Performance', color: 'text-orange-400', description: 'Maximum power' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'inactive': return 'text-gray-400 bg-gray-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'charging': return '⚡';
      case 'route': return '🗺️';
      case 'performance': return '⚙️';
      default: return '💡';
    }
  };

  const totalSavings = rules.filter(r => r.status === 'active').reduce((sum, rule) => sum + rule.savings, 0);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="mr-3 h-6 w-6 text-yellow-400" />
            Energy Optimization
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-400">
              {totalSavings}% savings
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Settings
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Optimization Modes */}
        <div>
          <h4 className="text-white font-medium mb-3">Optimization Mode</h4>
          <div className="grid grid-cols-3 gap-2">
            {modes.map((mode) => (
              <motion.button
                key={mode.key}
                onClick={() => setOptimizationMode(mode.key as any)}
                className={cn(
                  "p-3 rounded-lg border text-center transition-all",
                  optimizationMode === mode.key
                    ? "border-blue-500/40 bg-blue-500/20 text-blue-400"
                    : "border-gray-600/30 bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn("text-sm font-medium", mode.color)}>{mode.label}</div>
                <div className="text-xs text-gray-400 mt-1">{mode.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Auto Optimization Toggle */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg border border-gray-600/30">
          <div className="flex items-center space-x-3">
            <Lightbulb className="h-5 w-5 text-yellow-400" />
            <div>
              <div className="text-sm font-medium text-white">Auto Optimization</div>
              <div className="text-xs text-gray-400">Let AI optimize your energy usage automatically</div>
            </div>
          </div>
          <button
            onClick={() => setAutoOptimize(!autoOptimize)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              autoOptimize ? "bg-green-500" : "bg-gray-600"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                autoOptimize ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Optimization Rules */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
            Active Optimizations
          </h4>
          <div className="space-y-3">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getTypeIcon(rule.type)}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{rule.name}</div>
                    <div className="text-xs text-gray-400">{rule.description}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-400">+{rule.savings}%</div>
                    <Badge className={cn("text-xs", getStatusColor(rule.status))}>
                      {rule.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    {rule.status === 'active' ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-green-600/80 to-green-500/80 hover:from-green-500/80 hover:to-green-400/80 text-white">
            <Play className="h-4 w-4 mr-2" />
            Run Optimization
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Settings
          </Button>
        </div>

        {/* Savings Summary */}
        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Total Monthly Savings</div>
              <div className="text-xs text-gray-400">Based on current optimizations</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">₹{(energyCost * totalSavings / 100).toFixed(0)}</div>
              <div className="text-xs text-green-400">{totalSavings}% efficiency gain</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
