
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BarChart2, Calendar, DollarSign, Leaf, Clock, ArrowDownUp, Globe, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

export function SmartGridIntegration() {
  const [gridSharingEnabled, setGridSharingEnabled] = useState(true);
  const [scheduleOptimized, setScheduleOptimized] = useState(true);
  const [energyFlowDirection, setEnergyFlowDirection] = useState<'charging' | 'discharging' | 'idle'>('charging');
  const [gridSavings, setGridSavings] = useState(43.50);
  const [carbonCredits, setCarbonCredits] = useState(28);
  const [optimalChargeTimes, setOptimalChargeTimes] = useState([
    { day: 'Mon', start: '02:00', end: '05:00', price: 2.1, renewable: 68 },
    { day: 'Tue', start: '01:30', end: '04:30', price: 2.3, renewable: 72 },
    { day: 'Wed', start: '03:00', end: '06:00', price: 1.9, renewable: 80 },
    { day: 'Thu', start: '02:30', end: '05:30', price: 2.2, renewable: 65 },
    { day: 'Fri', start: '01:00', end: '04:00', price: 2.0, renewable: 75 }
  ]);
  
  useEffect(() => {
    // Simulate energy flow changes
    const interval = setInterval(() => {
      // Randomly change energy flow direction occasionally
      if (Math.random() > 0.7) {
        const states: Array<'charging' | 'discharging' | 'idle'> = ['charging', 'discharging', 'idle'];
        const randomState = states[Math.floor(Math.random() * states.length)];
        setEnergyFlowDirection(randomState);
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Get different background colors based on energy flow direction
  const getEnergyFlowColor = () => {
    switch (energyFlowDirection) {
      case 'charging':
        return 'from-blue-600/30 to-blue-800/20';
      case 'discharging':
        return 'from-green-600/30 to-green-800/20';
      case 'idle':
        return 'from-gray-700/30 to-gray-800/20';
      default:
        return 'from-gray-700/30 to-gray-800/20';
    }
  };
  
  // Get different icons and labels based on energy flow direction
  const getEnergyFlowInfo = () => {
    switch (energyFlowDirection) {
      case 'charging':
        return {
          icon: <Zap className="h-5 w-5 text-blue-400" />,
          label: 'Charging from Grid',
          color: 'text-blue-400'
        };
      case 'discharging':
        return {
          icon: <Zap className="h-5 w-5 text-green-400 rotate-180" />,
          label: 'Supplying to Grid',
          color: 'text-green-400'
        };
      case 'idle':
        return {
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          label: 'Standby',
          color: 'text-gray-400'
        };
      default:
        return {
          icon: <Clock className="h-5 w-5 text-gray-400" />,
          label: 'Standby',
          color: 'text-gray-400'
        };
    }
  };
  
  const energyFlow = getEnergyFlowInfo();
  
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Globe className="mr-2 h-5 w-5 text-green-400" />
            Smart Grid Integration
          </div>
          <div className="flex items-center gap-1.5">
            <Switch 
              checked={gridSharingEnabled} 
              onCheckedChange={setGridSharingEnabled}
              className="data-[state=checked]:bg-green-600"
            />
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              gridSharingEnabled 
                ? "bg-green-500/20 text-green-300" 
                : "bg-gray-700 text-gray-400"
            )}>
              {gridSharingEnabled ? 'Active' : 'Disabled'}
            </span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Optimize charging and participate in grid energy sharing
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Energy flow visualization */}
        <div className={cn(
          "bg-gradient-to-b px-4 py-3 rounded-lg mb-4 relative overflow-hidden border",
          getEnergyFlowColor(),
          energyFlowDirection === 'charging' ? "border-blue-600/30" : 
          energyFlowDirection === 'discharging' ? "border-green-600/30" : 
          "border-gray-700/30"
        )}>
          <div className="flex items-center">
            <div className="flex-1 flex items-center justify-center">
              <div className="relative h-16 w-16">
                <motion.div 
                  className="absolute inset-0 bg-gray-800 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="h-8 w-8 text-yellow-400" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 border-2 border-yellow-400/30 rounded-full"
                  animate={{ 
                    boxShadow: ['0 0 0 0px rgba(250, 204, 21, 0.1)', '0 0 0 10px rgba(250, 204, 21, 0)']
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
            </div>
            
            <div className="w-28 h-16 relative">
              {energyFlowDirection !== 'idle' && (
                <svg width="100%" height="100%" viewBox="0 0 112 64">
                  <motion.path
                    d={energyFlowDirection === 'charging' 
                      ? "M0,32 L112,32" 
                      : "M112,32 L0,32"
                    }
                    stroke={energyFlowDirection === 'charging' ? "#60a5fa" : "#4ade80"}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: 1,
                      strokeDashoffset: energyFlowDirection === 'charging' ? -100 : 100
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear"
                    }}
                  />
                  
                  <motion.circle
                    cx={energyFlowDirection === 'charging' ? "56" : "56"}
                    cy="32"
                    r="4"
                    fill={energyFlowDirection === 'charging' ? "#60a5fa" : "#4ade80"}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      cx: energyFlowDirection === 'charging' 
                        ? [0, 112, 0] 
                        : [112, 0, 112]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                </svg>
              )}
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <div className="relative h-16 w-16">
                <motion.div 
                  className="absolute inset-0 bg-gray-800 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Globe className="h-8 w-8 text-green-400" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 border-2 border-green-400/30 rounded-full"
                  animate={{ 
                    boxShadow: ['0 0 0 0px rgba(74, 222, 128, 0.1)', '0 0 0 10px rgba(74, 222, 128, 0)']
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.5
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-2 px-6">
            <div className="text-center">
              <div className="text-sm text-yellow-400 font-medium">Your EV</div>
              <div className="text-xs text-gray-400">75% Charged</div>
            </div>
            <div className="text-center">
              <div className={cn("text-sm font-medium", energyFlow.color)}>{energyFlow.label}</div>
              <div className="text-xs text-gray-400">
                {energyFlowDirection === 'charging' ? '1.6 kW In' : 
                 energyFlowDirection === 'discharging' ? '0.8 kW Out' : 'No Transfer'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-green-400 font-medium">Power Grid</div>
              <div className="text-xs text-gray-400">72% Renewable</div>
            </div>
          </div>
        </div>
        
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm">Grid Savings</span>
            </div>
            <p className="text-lg font-semibold text-white">${gridSavings.toFixed(2)}</p>
            <div className="mt-1 text-xs text-green-400">This month</div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <span className="text-white text-sm">Carbon Credits</span>
            </div>
            <p className="text-lg font-semibold text-white">{carbonCredits} kg</p>
            <div className="mt-1 text-xs text-green-400">CO₂ reduced</div>
          </div>
        </div>
        
        {/* Optimal charging schedule */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium text-sm flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-blue-400" />
              Optimal Charging Schedule
            </h3>
            <div className="flex items-center gap-1.5">
              <Switch 
                checked={scheduleOptimized} 
                onCheckedChange={setScheduleOptimized}
                className="data-[state=checked]:bg-blue-600 h-4 w-7"
              />
              <span className="text-xs text-gray-400">Auto-optimize</span>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 py-2 px-3 text-xs font-medium text-gray-400 border-b border-gray-700/50">
              <div className="col-span-2">Day</div>
              <div className="col-span-3">Time</div>
              <div className="col-span-3">Price</div>
              <div className="col-span-4">Renewable %</div>
            </div>
            
            <div className="max-h-44 overflow-y-auto">
              {optimalChargeTimes.map((time, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "grid grid-cols-12 py-2 px-3 text-sm border-b border-gray-700/20",
                    index === 0 ? "bg-blue-900/20" : ""
                  )}
                >
                  <div className="col-span-2 text-white">{time.day}</div>
                  <div className="col-span-3 text-gray-300">{time.start} - {time.end}</div>
                  <div className="col-span-3 text-gray-300">₹{time.price.toFixed(1)}/kWh</div>
                  <div className="col-span-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-700 h-1.5 rounded-full mr-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-300 h-full rounded-full"
                          style={{ width: `${time.renewable}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-green-400">{time.renewable}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Smart grid benefits */}
        <div className="space-y-2">
          <div className="flex items-start p-2 bg-gray-800/60 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-white">Lower electricity costs</p>
              <p className="text-xs text-gray-400">Save by charging during off-peak hours</p>
            </div>
          </div>
          
          <div className="flex items-start p-2 bg-gray-800/60 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-white">Support renewable energy</p>
              <p className="text-xs text-gray-400">Charge when renewable energy is abundant</p>
            </div>
          </div>
          
          <div className="flex items-start p-2 bg-gray-800/60 rounded-lg">
            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <p className="text-sm text-white">Earn by selling back energy</p>
              <p className="text-xs text-gray-400">Provide power to the grid during peak demand</p>
            </div>
          </div>
        </div>
        
        {/* Grid alert */}
        <div className="mt-4 bg-yellow-900/20 border border-yellow-800/30 p-3 rounded-lg">
          <div className="flex items-center">
            <div className="bg-yellow-500/20 p-2 rounded-full mr-3">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="font-medium text-white text-sm">Grid Demand Alert</h4>
              <p className="text-gray-400 text-xs mt-1">
                High energy demand expected tomorrow between 6-8 PM. 
                You can earn 2x credits by supplying power during this time.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
