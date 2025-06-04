
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Zap, Target, TrendingUp, Settings, Play } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const performanceMetrics = [
  { name: 'Efficiency', current: 87, optimal: 95, unit: '%' },
  { name: 'Power Usage', current: 142, optimal: 135, unit: 'kW' },
  { name: 'Range', current: 385, optimal: 420, unit: 'km' },
  { name: 'Charging Speed', current: 78, optimal: 85, unit: '%' }
];

const optimizationTrends = [
  { time: '00:00', before: 78, after: 85, target: 90 },
  { time: '04:00', before: 82, after: 88, target: 90 },
  { time: '08:00', before: 75, after: 87, target: 90 },
  { time: '12:00', before: 80, after: 92, target: 90 },
  { time: '16:00', before: 77, after: 89, target: 90 },
  { time: '20:00', before: 85, after: 94, target: 90 }
];

const optimizationSuggestions = [
  {
    id: 1,
    title: "Regenerative Braking Optimization",
    description: "Adjust regenerative braking parameters for 12% efficiency gain",
    impact: "High",
    savings: "₹180/week",
    status: "ready"
  },
  {
    id: 2,
    title: "Motor Control Tuning",
    description: "Fine-tune motor control algorithms for optimal power delivery",
    impact: "Medium",
    savings: "₹95/week",
    status: "analyzing"
  },
  {
    id: 3,
    title: "Thermal Management",
    description: "Optimize cooling system for better battery performance",
    impact: "High",
    savings: "₹220/week",
    status: "ready"
  }
];

export function PerformanceOptimization() {
  const [activeOptimization, setActiveOptimization] = useState<number | null>(null);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Gauge className="mr-3 h-6 w-6 text-revithalize-green" />
          Performance Optimization
          <div className="ml-auto bg-orange-500/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-orange-400">Live Tuning</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          AI-powered vehicle performance tuning and optimization
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => {
            const improvement = ((metric.optimal - metric.current) / metric.current * 100).toFixed(1);
            return (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-600/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-300">{metric.name}</h4>
                  <Target className="h-4 w-4 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-white">
                    {metric.current}{metric.unit}
                  </div>
                  <div className="text-xs text-gray-400">
                    Target: {metric.optimal}{metric.unit}
                  </div>
                  <div className="text-xs text-revithalize-green">
                    +{improvement}% potential
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Optimization Trends */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
            Real-time Optimization Impact
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={optimizationTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="before" 
                stroke="#6B7280" 
                strokeDasharray="5 5"
                name="Before Optimization"
              />
              <Line 
                type="monotone" 
                dataKey="after" 
                stroke="#00ff94" 
                strokeWidth={2}
                name="After Optimization"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#0066ff" 
                strokeDasharray="3 3"
                name="Target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Optimization Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Settings className="mr-2 h-5 w-5 text-purple-400" />
            Available Optimizations
          </h3>
          {optimizationSuggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-xl p-4 border border-gray-600/30 hover:border-revithalize-green/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <Zap className="h-4 w-4 text-revithalize-green" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-gray-400">{suggestion.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      suggestion.impact === 'High' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {suggestion.impact} Impact
                    </span>
                    <span className="text-revithalize-green font-medium">{suggestion.savings}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      suggestion.status === 'ready' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {suggestion.status === 'ready' ? 'Ready to Apply' : 'Analyzing...'}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setActiveOptimization(suggestion.id)}
                  disabled={suggestion.status !== 'ready'}
                  className={`ml-4 ${
                    suggestion.status === 'ready'
                      ? 'bg-revithalize-green hover:bg-revithalize-green/80 text-black'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }`}
                  size="sm"
                >
                  <Play className="h-4 w-4 mr-1" />
                  {suggestion.status === 'ready' ? 'Apply' : 'Processing'}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
