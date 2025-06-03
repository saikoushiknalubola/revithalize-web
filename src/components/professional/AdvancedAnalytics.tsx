
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Zap, Calendar, Download, Filter, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockAnalyticsData = [
  { month: 'Jan', efficiency: 87, cost: 2500, distance: 1200 },
  { month: 'Feb', efficiency: 89, cost: 2300, distance: 1350 },
  { month: 'Mar', efficiency: 91, cost: 2100, distance: 1400 },
  { month: 'Apr', efficiency: 88, cost: 2400, distance: 1300 },
  { month: 'May', efficiency: 93, cost: 2000, distance: 1500 },
  { month: 'Jun', efficiency: 95, cost: 1900, distance: 1600 }
];

export function AdvancedAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState('efficiency');
  const [timeRange, setTimeRange] = useState('6months');

  const metrics = [
    { key: 'efficiency', label: 'Efficiency %', color: '#00ff94', icon: TrendingUp },
    { key: 'cost', label: 'Cost (₹)', color: '#60a5fa', icon: Zap },
    { key: 'distance', label: 'Distance (km)', color: '#f59e0b', icon: BarChart3 }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="mr-3 h-6 w-6 text-blue-400" />
            Advanced Analytics
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" className="text-xs">
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Metric Selection */}
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.button
                key={metric.key}
                onClick={() => setSelectedMetric(metric.key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedMetric === metric.key
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-3 w-3" />
                <span>{metric.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockAnalyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1f2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey={selectedMetric}
                stroke={metrics.find(m => m.key === selectedMetric)?.color}
                fill={`${metrics.find(m => m.key === selectedMetric)?.color}20`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="text-lg font-bold text-green-400">+12%</div>
            <div className="text-xs text-gray-400">This Month</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="text-lg font-bold text-blue-400">94.2%</div>
            <div className="text-xs text-gray-400">Avg Efficiency</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="text-lg font-bold text-amber-400">₹2,050</div>
            <div className="text-xs text-gray-400">Avg Cost</div>
          </div>
        </div>

        {/* Export Options */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Last updated: {new Date().toLocaleString()}
          </div>
          <Button size="sm" className="bg-revithalize-green/20 hover:bg-revithalize-green/30 text-revithalize-green">
            <Download className="h-4 w-4 mr-1" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
