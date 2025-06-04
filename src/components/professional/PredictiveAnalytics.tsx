
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const predictionData = [
  { month: 'Current', actual: 95, predicted: 95, confidence: 98 },
  { month: 'Next', actual: null, predicted: 92, confidence: 95 },
  { month: 'Month+2', actual: null, predicted: 89, confidence: 88 },
  { month: 'Month+3', actual: null, predicted: 94, confidence: 82 },
  { month: 'Month+4', actual: null, predicted: 91, confidence: 75 },
  { month: 'Month+5', actual: null, predicted: 96, confidence: 68 }
];

const maintenancePredictions = [
  {
    id: 1,
    component: "Battery Module A",
    prediction: "Degradation detected",
    probability: 87,
    timeframe: "2-3 weeks",
    severity: "medium",
    action: "Schedule inspection"
  },
  {
    id: 2,
    component: "Cooling System",
    prediction: "Optimal performance",
    probability: 96,
    timeframe: "6+ months",
    severity: "low",
    action: "Continue monitoring"
  },
  {
    id: 3,
    component: "Motor Controller",
    prediction: "Efficiency decline",
    probability: 73,
    timeframe: "4-5 weeks",
    severity: "high",
    action: "Immediate attention"
  }
];

export function PredictiveAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const timeframes = [
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Brain className="mr-3 h-6 w-6 text-revithalize-green" />
          Predictive Analytics
          <div className="ml-auto bg-purple-500/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-purple-400">AI Forecast</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Machine learning powered predictions and forecasting
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timeframe Selector */}
        <div className="flex space-x-2">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe.id}
              onClick={() => setSelectedTimeframe(timeframe.id)}
              variant={selectedTimeframe === timeframe.id ? "default" : "outline"}
              size="sm"
              className={selectedTimeframe === timeframe.id 
                ? "bg-revithalize-green hover:bg-revithalize-green/80 text-black font-medium" 
                : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
              }
            >
              {timeframe.label}
            </Button>
          ))}
        </div>

        {/* Performance Prediction Chart */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-blue-400" />
            Performance Forecast
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={predictionData}>
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
                dataKey="predicted" 
                stroke="#00ff94" 
                fill="url(#predictedGradient)"
                name="Predicted"
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                stroke="#0066ff" 
                fill="url(#actualGradient)"
                name="Actual"
              />
              <defs>
                <linearGradient id="predictedGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff94" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#00ff94" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066ff" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#0066ff" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Predictions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
            <Activity className="mr-2 h-5 w-5 text-purple-400" />
            AI Maintenance Predictions
          </h3>
          {maintenancePredictions.map((prediction, index) => (
            <motion.div
              key={prediction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-xl p-4 border border-gray-600/30 hover:border-revithalize-green/50 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      prediction.severity === 'high' ? 'bg-red-500/20' :
                      prediction.severity === 'medium' ? 'bg-yellow-500/20' :
                      'bg-green-500/20'
                    }`}>
                      {prediction.severity === 'high' ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : prediction.severity === 'medium' ? (
                        <Target className="h-4 w-4 text-yellow-400" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{prediction.component}</h4>
                      <p className="text-sm text-gray-400">{prediction.prediction}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-gray-300">
                      Confidence: <span className="text-revithalize-green font-medium">{prediction.probability}%</span>
                    </span>
                    <span className="text-gray-300">
                      Timeframe: <span className="text-blue-400 font-medium">{prediction.timeframe}</span>
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-revithalize-green/20 hover:bg-revithalize-green/30 text-revithalize-green border border-revithalize-green/50 hover:border-revithalize-green"
                >
                  {prediction.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
