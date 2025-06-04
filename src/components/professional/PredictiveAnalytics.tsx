
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, AlertTriangle, Target, Calendar, Zap, Activity, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '@/lib/utils';

interface Prediction {
  id: string;
  title: string;
  type: 'maintenance' | 'performance' | 'energy' | 'cost';
  confidence: number;
  timeline: string;
  impact: 'low' | 'medium' | 'high';
  recommendation: string;
}

const mockPredictiveData = [
  { week: 'Week 1', efficiency: 89, predicted: 91, maintenance: 95 },
  { week: 'Week 2', efficiency: 87, predicted: 89, maintenance: 92 },
  { week: 'Week 3', efficiency: 85, predicted: 87, maintenance: 89 },
  { week: 'Week 4', efficiency: 83, predicted: 85, maintenance: 85 },
];

export function PredictiveAnalytics() {
  const [selectedView, setSelectedView] = useState<'overview' | 'detailed'>('overview');
  
  const [predictions] = useState<Prediction[]>([
    {
      id: '1',
      title: 'Battery Degradation Alert',
      type: 'maintenance',
      confidence: 94,
      timeline: '2-3 weeks',
      impact: 'medium',
      recommendation: 'Schedule battery health check and potential cell replacement'
    },
    {
      id: '2',
      title: 'Performance Optimization',
      type: 'performance',
      confidence: 87,
      timeline: '1 week',
      impact: 'low',
      recommendation: 'Update motor controller firmware for 5% efficiency gain'
    },
    {
      id: '3',
      title: 'Energy Cost Spike',
      type: 'energy',
      confidence: 91,
      timeline: 'Next month',
      impact: 'high',
      recommendation: 'Switch to off-peak charging schedule to save ₹800/month'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance': return Activity;
      case 'performance': return TrendingUp;
      case 'energy': return Zap;
      case 'cost': return Target;
      default: return Brain;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-3 h-6 w-6 text-purple-400" />
            Predictive Analytics
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-500/20 text-purple-400">
              AI Powered
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Configure
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* View Toggle */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedView('overview')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedView === 'overview'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedView('detailed')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              selectedView === 'detailed'
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
            )}
          >
            Detailed Forecast
          </button>
        </div>

        {/* Predictive Chart */}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockPredictiveData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="week" stroke="#9ca3af" />
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
                dataKey="efficiency"
                stackId="1"
                stroke="#8b5cf6"
                fill="#8b5cf620"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stackId="2"
                stroke="#06d6a0"
                fill="#06d6a020"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Predictions List */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
            AI Predictions
          </h4>
          <div className="space-y-3">
            {predictions.map((prediction, index) => {
              const Icon = getTypeIcon(prediction.type);
              return (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="text-sm font-medium text-white">{prediction.title}</div>
                        <div className="text-xs text-gray-400">{prediction.timeline}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-purple-400 font-medium">
                        {prediction.confidence}% confident
                      </div>
                      <Badge className={cn("text-xs", getImpactColor(prediction.impact))}>
                        {prediction.impact}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 bg-gray-800/50 p-2 rounded">
                    💡 {prediction.recommendation}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Insights Summary */}
        <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">AI Analysis Summary</div>
              <div className="text-xs text-gray-400">Based on 6 months of data patterns</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-purple-400">₹3,200</div>
              <div className="text-xs text-purple-400">Potential monthly savings</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
