
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart, Activity, Brain, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { motion } from 'framer-motion';

const performanceData = [
  { month: 'Jan', efficiency: 85, cost: 1200, distance: 450 },
  { month: 'Feb', efficiency: 88, cost: 1150, distance: 520 },
  { month: 'Mar', efficiency: 92, cost: 1080, distance: 580 },
  { month: 'Apr', efficiency: 89, cost: 1100, distance: 520 },
  { month: 'May', efficiency: 94, cost: 1020, distance: 620 },
  { month: 'Jun', efficiency: 96, cost: 980, distance: 680 }
];

const usageData = [
  { name: 'City Driving', value: 65, color: '#00ff94' },
  { name: 'Highway', value: 25, color: '#0066ff' },
  { name: 'Idle Time', value: 10, color: '#ff6b6b' }
];

export function AdvancedAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState('efficiency');

  const metrics = [
    { id: 'efficiency', label: 'Efficiency Trends', icon: TrendingUp, color: 'text-green-400' },
    { id: 'cost', label: 'Cost Analysis', icon: BarChart3, color: 'text-blue-400' },
    { id: 'usage', label: 'Usage Patterns', icon: PieChart, color: 'text-purple-400' }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Brain className="mr-3 h-6 w-6 text-revithalize-green" />
          Advanced Analytics
          <div className="ml-auto bg-revithalize-blue/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-revithalize-blue">AI-Powered</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Deep insights and predictive analytics for your EV fleet
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Metric Selector */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                  selectedMetric === metric.id
                    ? 'bg-revithalize-green/20 border-revithalize-green text-revithalize-green'
                    : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:border-gray-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm font-medium">{metric.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Trends */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-400" />
              Performance Trends
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke="#00ff94" 
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff94" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00ff94" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Usage Distribution */}
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Target className="mr-2 h-5 w-5 text-blue-400" />
              Usage Distribution
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <RechartsPieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {usageData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 rounded-lg p-4 border border-green-600/30">
            <div className="text-green-400 text-2xl font-bold">+12%</div>
            <div className="text-xs text-gray-400">Efficiency Improvement</div>
            <div className="text-xs text-green-400 mt-1">vs last month</div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 rounded-lg p-4 border border-blue-600/30">
            <div className="text-blue-400 text-2xl font-bold">₹2.2K</div>
            <div className="text-xs text-gray-400">Cost Savings</div>
            <div className="text-xs text-blue-400 mt-1">this quarter</div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-600/30">
            <div className="text-purple-400 text-2xl font-bold">94%</div>
            <div className="text-xs text-gray-400">Optimal Usage</div>
            <div className="text-xs text-purple-400 mt-1">AI recommendation</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
