
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, TrendingUp, Zap, Leaf, AlertTriangle, Target, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AIInsight {
  id: string;
  type: 'optimization' | 'prediction' | 'alert' | 'recommendation';
  title: string;
  description: string;
  impact: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high';
  action?: string;
}

export function AIInsights() {
  const [insights] = useState<AIInsight[]>([
    {
      id: '1',
      type: 'optimization',
      title: 'Charging Schedule Optimization',
      description: 'Switch to night charging (11 PM - 6 AM) for 35% cost savings',
      impact: 'Save ₹1,250/month',
      confidence: 94,
      priority: 'high',
      action: 'Apply Schedule'
    },
    {
      id: '2',
      type: 'prediction',
      title: 'Battery Health Prediction',
      description: 'Current usage pattern suggests 8.5 years optimal battery life',
      impact: '2.5 years above average',
      confidence: 87,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Efficiency Decline Alert',
      description: 'Vehicle efficiency dropped 3% this week. Check tire pressure.',
      impact: 'Potential ₹500/month extra cost',
      confidence: 91,
      priority: 'high',
      action: 'Schedule Check'
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Route Optimization',
      description: 'Alternative route via Ring Road saves 12% energy during rush hours',
      impact: '15 km extra range',
      confidence: 88,
      priority: 'medium',
      action: 'Use Route'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return Zap;
      case 'prediction': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'recommendation': return Lightbulb;
      default: return Brain;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'optimization': return 'text-green-400 bg-green-400/20';
      case 'prediction': return 'text-blue-400 bg-blue-400/20';
      case 'alert': return 'text-red-400 bg-red-400/20';
      case 'recommendation': return 'text-purple-400 bg-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Brain className="mr-3 h-6 w-6 text-purple-400" />
          AI Insights & Predictions
          <div className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">AI POWERED</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* AI Performance */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-lg font-bold text-white">94%</span>
            </div>
            <div className="text-xs text-gray-400">Accuracy Rate</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="h-4 w-4 text-purple-400 mr-1" />
              <span className="text-lg font-bold text-white">127</span>
            </div>
            <div className="text-xs text-gray-400">Insights Generated</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="flex items-center justify-center mb-2">
              <Leaf className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-lg font-bold text-white">₹18K</span>
            </div>
            <div className="text-xs text-gray-400">Savings Found</div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Brain className="mr-2 h-5 w-5 text-purple-400" />
            Latest AI Insights
          </h3>
          
          {insights.map((insight, index) => {
            const Icon = getTypeIcon(insight.type);
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border border-gray-600/30"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={cn("p-2 rounded-lg", getTypeColor(insight.type))}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-white font-medium">{insight.title}</h4>
                        <span className={cn("text-xs font-medium", getPriorityColor(insight.priority))}>
                          {insight.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{insight.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-xs text-revithalize-green font-medium">{insight.impact}</span>
                        <span className="text-xs text-gray-500">
                          {insight.confidence}% confidence
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {insight.action && (
                    <Button 
                      size="sm" 
                      className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border-purple-500/50"
                    >
                      {insight.action}
                    </Button>
                  )}
                </div>

                {/* Confidence Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Confidence Level</span>
                    <span className="text-xs text-gray-400">{insight.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-500/80 hover:to-purple-400/80 text-white">
            <Brain className="h-4 w-4 mr-2" />
            Train AI Model
          </Button>
          <Button className="bg-gradient-to-r from-pink-600/80 to-pink-500/80 hover:from-pink-500/80 hover:to-pink-400/80 text-white">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        {/* AI Learning Status */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">AI Learning Progress</h4>
            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Learning</span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <div>• Pattern recognition: 94% complete</div>
            <div>• Predictive models: 87% accuracy</div>
            <div>• Optimization algorithms: Continuously improving</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
