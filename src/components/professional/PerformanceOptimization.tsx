
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gauge, Zap, Settings, Play, Pause, RotateCcw, TrendingUp, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptimizationProfile {
  id: string;
  name: string;
  description: string;
  efficiency: number;
  power: number;
  range: number;
  active: boolean;
}

interface PerformanceMetric {
  name: string;
  current: number;
  optimized: number;
  unit: string;
  improvement: number;
}

export function PerformanceOptimization() {
  const [activeProfile, setActiveProfile] = useState('balanced');
  const [isOptimizing, setIsOptimizing] = useState(false);

  const [profiles] = useState<OptimizationProfile[]>([
    {
      id: 'eco',
      name: 'Eco Mode',
      description: 'Maximum efficiency, reduced power',
      efficiency: 95,
      power: 70,
      range: 120,
      active: false
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Optimal balance of all parameters',
      efficiency: 87,
      power: 85,
      range: 100,
      active: true
    },
    {
      id: 'performance',
      name: 'Performance',
      description: 'Maximum power and acceleration',
      efficiency: 78,
      power: 100,
      range: 85,
      active: false
    },
    {
      id: 'custom',
      name: 'AI Custom',
      description: 'AI-optimized for your usage patterns',
      efficiency: 92,
      power: 88,
      range: 105,
      active: false
    }
  ]);

  const [metrics] = useState<PerformanceMetric[]>([
    { name: 'Motor Efficiency', current: 87, optimized: 92, unit: '%', improvement: 5.7 },
    { name: 'Battery Usage', current: 42, optimized: 38, unit: 'Ah/100km', improvement: -9.5 },
    { name: 'Acceleration', current: 3.2, optimized: 2.8, unit: 's (0-50)', improvement: -12.5 },
    { name: 'Top Speed', current: 65, optimized: 68, unit: 'km/h', improvement: 4.6 }
  ]);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 3000);
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Gauge className="mr-3 h-6 w-6 text-blue-400" />
            Performance Optimization
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-500/20 text-blue-400">
              {isOptimizing ? 'Optimizing...' : 'Ready'}
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Advanced
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Performance Profiles */}
        <div>
          <h4 className="text-white font-medium mb-3">Performance Profiles</h4>
          <div className="grid grid-cols-2 gap-3">
            {profiles.map((profile) => (
              <motion.button
                key={profile.id}
                onClick={() => setActiveProfile(profile.id)}
                className={cn(
                  "p-3 rounded-lg border text-left transition-all",
                  activeProfile === profile.id
                    ? "border-blue-500/40 bg-blue-500/20 text-blue-400"
                    : "border-gray-600/30 bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium text-sm">{profile.name}</div>
                <div className="text-xs text-gray-400 mt-1">{profile.description}</div>
                <div className="flex space-x-3 mt-2 text-xs">
                  <span>⚡ {profile.power}%</span>
                  <span>🔋 {profile.efficiency}%</span>
                  <span>📍 {profile.range}km</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
            Optimization Metrics
          </h4>
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div>
                  <div className="text-sm font-medium text-white">{metric.name}</div>
                  <div className="text-xs text-gray-400">
                    Current: {metric.current}{metric.unit} → Optimized: {metric.optimized}{metric.unit}
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn("text-sm font-medium", 
                    metric.improvement > 0 ? "text-green-400" : "text-blue-400"
                  )}>
                    {metric.improvement > 0 ? '+' : ''}{metric.improvement.toFixed(1)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-time Optimization */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-white">Real-time Optimization</div>
              <div className="text-xs text-gray-400">AI continuously adjusts performance parameters</div>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className={cn("h-4 w-4", isOptimizing ? "text-green-400 animate-pulse" : "text-gray-400")} />
              <span className="text-xs text-gray-400">{isOptimizing ? 'Active' : 'Standby'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-500/80 hover:to-blue-400/80 text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              {isOptimizing ? 'Optimizing...' : 'Start Optimization'}
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </div>

        {/* Optimization Results */}
        <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Expected Improvements</div>
              <div className="text-xs text-gray-400">After applying optimizations</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-blue-400">+12.3%</div>
              <div className="text-xs text-blue-400">Overall efficiency gain</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
