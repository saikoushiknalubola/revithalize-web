
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Calendar, Shield, TrendingUp, AlertTriangle, Thermometer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { useScreenSize } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface BatteryPredictionProps {
  className?: string;
  showFullCard?: boolean;
}

export function BatteryPrediction({ className, showFullCard = true }: BatteryPredictionProps) {
  const { isMobile } = useScreenSize();
  const [predictionTimeframe, setPredictionTimeframe] = useState('year');
  
  // Battery health prediction data
  const monthlyPredictionData = [
    { month: 'Jan', health: 100, temp: 28 },
    { month: 'Feb', health: 99, temp: 29 },
    { month: 'Mar', health: 98, temp: 31 },
    { month: 'Apr', health: 97, temp: 33 },
    { month: 'May', health: 97, temp: 35 },
    { month: 'Jun', health: 96, temp: 36 },
    { month: 'Jul', health: 95, temp: 34 },
    { month: 'Aug', health: 94, temp: 32 },
    { month: 'Sep', health: 93, temp: 30 },
    { month: 'Oct', health: 92, temp: 28 },
    { month: 'Nov', health: 91, temp: 27 },
    { month: 'Dec', health: 90, temp: 26 },
  ];
  
  const yearlyPredictionData = [
    { year: '2025', health: 97, temp: 32 },
    { year: '2026', health: 90, temp: 31 },
    { year: '2027', health: 84, temp: 30 },
    { year: '2028', health: 78, temp: 32 },
    { year: '2029', health: 73, temp: 31 },
  ];
  
  const predictionData = predictionTimeframe === 'month' ? monthlyPredictionData : yearlyPredictionData;
  
  // Health status calculation based on prediction
  const currentHealth = 97;
  const projectedHealth = predictionTimeframe === 'month' ? 90 : 73;
  const healthLoss = currentHealth - projectedHealth;
  const timeframe = predictionTimeframe === 'month' ? '12 months' : '5 years';
  
  let healthStatus = 'Excellent';
  let healthColor = 'text-green-500';
  
  if (projectedHealth < 75) {
    healthStatus = 'Attention Needed';
    healthColor = 'text-yellow-500';
  } else if (projectedHealth < 85) {
    healthStatus = 'Good';
    healthColor = 'text-blue-500';
  }
  
  return (
    <Card className={cn("bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden", className)}>
      {showFullCard && (
        <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
          <CardTitle className="text-white text-lg sm:text-xl flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-revithalize-green" />
            Battery Health Prediction
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs sm:text-sm">AI-powered battery health forecast</CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn("px-3 pb-3 sm:px-4 sm:pb-4 relative", !showFullCard && "pt-3 sm:pt-4")}>
        <div className="absolute inset-0 bg-gradient-to-br from-revithalize-green/5 to-revithalize-blue/5 pointer-events-none"></div>
        
        {/* Prediction timeframe toggle */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-md bg-gray-800 p-1">
            <button 
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${predictionTimeframe === 'month' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setPredictionTimeframe('month')}
            >
              Monthly
            </button>
            <button 
              className={`px-3 py-1.5 text-xs rounded-md transition-all ${predictionTimeframe === 'year' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setPredictionTimeframe('year')}
            >
              Yearly
            </button>
          </div>
        </div>
        
        {/* Current health status */}
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-between p-3 bg-gray-800/70 rounded-lg border border-gray-700/50 backdrop-blur-sm">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center mr-3">
              <Battery className="h-5 w-5 text-revithalize-green" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Current Health</p>
              <p className="text-lg font-medium text-white">{currentHealth}%</p>
            </div>
          </div>
          
          <div className="h-0 w-full border-t border-gray-700/50 my-2 sm:h-10 sm:w-0 sm:border-l sm:border-t-0 sm:mx-4"></div>
          
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center mr-3">
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Projected in {timeframe}</p>
              <p className={`text-lg font-medium ${healthColor}`}>{projectedHealth}%</p>
            </div>
          </div>
        </div>
        
        {/* Prediction chart */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-white mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-revithalize-blue" />
            Battery Health Trajectory ({predictionTimeframe === 'month' ? '12 Months' : '5 Years'})
          </h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart
                data={predictionData}
                margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
              >
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FB923C" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis 
                  dataKey={predictionTimeframe === 'month' ? 'month' : 'year'} 
                  stroke="#666" fontSize={10} 
                />
                <YAxis 
                  yAxisId="health"
                  stroke="#666" 
                  domain={[predictionTimeframe === 'month' ? 85 : 65, 100]} 
                  fontSize={10} 
                  width={25} 
                />
                <YAxis 
                  yAxisId="temp"
                  orientation="right"
                  stroke="#666" 
                  domain={[20, 40]} 
                  fontSize={10} 
                  width={25} 
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px' }}
                  labelStyle={{ color: '#eee' }}
                  formatter={(value: any, name: any) => {
                    if (name === 'health') return [`${value}%`, 'Health'];
                    if (name === 'temp') return [`${value}°C`, 'Temp'];
                    return [value, name];
                  }}
                />
                <Area
                  yAxisId="health"
                  type="monotone"
                  dataKey="health"
                  stroke="#4ADE80"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#healthGradient)"
                />
                <Area
                  yAxisId="temp"
                  type="monotone"
                  dataKey="temp"
                  stroke="#FB923C"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Prediction insights */}
        <div className="space-y-2 text-sm">
          <div className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
            </div>
            <div>
              <p className="text-white text-xs">Estimated {healthLoss}% capacity loss over {timeframe}</p>
              <p className="text-gray-400 text-xs">Based on your current riding and charging patterns</p>
            </div>
          </div>
          
          {projectedHealth < 85 && (
            <div className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-500/20 flex items-center justify-center mr-2">
                <AlertTriangle className="h-3 w-3 text-yellow-500" />
              </div>
              <div>
                <p className="text-white text-xs">Recommended battery check in 6 months</p>
                <p className="text-gray-400 text-xs">Preventive maintenance can extend battery life</p>
              </div>
            </div>
          )}
          
          <div className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
              <Thermometer className="h-3 w-3 text-blue-500" />
            </div>
            <div>
              <p className="text-white text-xs">Temperature impact on battery health</p>
              <p className="text-gray-400 text-xs">Higher temperatures during summer months may accelerate degradation</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
