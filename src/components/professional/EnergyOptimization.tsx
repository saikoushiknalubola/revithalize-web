
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, TrendingDown, Target, Lightbulb, Battery, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const energyData = [
  { time: '6AM', consumption: 12, optimization: 8, savings: 4 },
  { time: '9AM', consumption: 25, optimization: 18, savings: 7 },
  { time: '12PM', consumption: 45, optimization: 32, savings: 13 },
  { time: '3PM', consumption: 38, optimization: 28, savings: 10 },
  { time: '6PM', consumption: 52, optimization: 38, savings: 14 },
  { time: '9PM', consumption: 28, optimization: 22, savings: 6 }
];

const optimizationSuggestions = [
  {
    id: 1,
    title: "Off-Peak Charging",
    description: "Schedule charging during 2-6 AM for 30% cost savings",
    impact: "High",
    savings: "₹450/month",
    icon: Battery
  },
  {
    id: 2,
    title: "Route Optimization",
    description: "Use AI-suggested routes to reduce energy consumption by 15%",
    impact: "Medium",
    savings: "₹280/month",
    icon: Target
  },
  {
    id: 3,
    title: "Smart Grid Integration",
    description: "Sell excess energy back to grid during peak hours",
    impact: "High",
    savings: "₹320/month",
    icon: Zap
  }
];

export function EnergyOptimization() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const periods = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Zap className="mr-3 h-6 w-6 text-revithalize-green" />
          Energy Optimization
          <div className="ml-auto bg-revithalize-green/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-revithalize-green">Smart AI</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Intelligent energy management and cost optimization
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Period Selector with improved visibility */}
        <div className="flex space-x-2">
          {periods.map((period) => (
            <Button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              variant={selectedPeriod === period.id ? "default" : "outline"}
              size="sm"
              className={selectedPeriod === period.id
                ? "bg-revithalize-green hover:bg-revithalize-green/80 text-black font-medium border-0"
                : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 hover:text-white"
              }
            >
              {period.label}
            </Button>
          ))}
        </div>

        {/* Energy Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-600/30">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="h-5 w-5 text-green-400" />
              <span className="text-xs text-gray-400">OPTIMIZATION</span>
            </div>
            <div className="text-2xl font-bold text-white">24%</div>
            <div className="text-xs text-green-400">Energy Savings</div>
          </div>

          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-600/30">
            <div className="flex items-center justify-between mb-2">
              <Zap className="h-5 w-5 text-blue-400" />
              <span className="text-xs text-gray-400">CONSUMPTION</span>
            </div>
            <div className="text-2xl font-bold text-white">156 kWh</div>
            <div className="text-xs text-blue-400">Today's Usage</div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-600/30">
            <div className="flex items-center justify-between mb-2">
              <Target className="h-5 w-5 text-purple-400" />
              <span className="text-xs text-gray-400">EFFICIENCY</span>
            </div>
            <div className="text-2xl font-bold text-white">92%</div>
            <div className="text-xs text-purple-400">System Efficiency</div>
          </div>
        </div>

        {/* Energy Consumption Chart */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-revithalize-blue" />
            Energy Consumption vs Optimization
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={energyData}>
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
              <Bar dataKey="consumption" fill="#6B7280" name="Normal Consumption" />
              <Bar dataKey="optimization" fill="#00ff94" name="Optimized Consumption" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Optimization Suggestions with improved buttons */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
            AI Optimization Suggestions
          </h3>
          {optimizationSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-xl p-4 border border-gray-600/30 hover:border-revithalize-green/50 transition-all group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-black/30 p-2 rounded-lg group-hover:bg-revithalize-green/20 transition-colors">
                    <Icon className="h-5 w-5 text-revithalize-green" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{suggestion.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          suggestion.impact === 'High' ? 'bg-green-500/20 text-green-400' :
                          suggestion.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {suggestion.impact} Impact
                        </span>
                        <span className="text-sm font-semibold text-revithalize-green">
                          {suggestion.savings}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{suggestion.description}</p>
                    <Button
                      size="sm"
                      className="bg-revithalize-green hover:bg-revithalize-green/80 text-black font-medium"
                    >
                      Apply Optimization
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
