
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Battery, 
  Zap, 
  TrendingUp, 
  Activity,
  Info,
  AlertCircle
} from 'lucide-react';
import { useScreenSize } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  target: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
}

interface EcoScoreProps {
  score: number;
  scoreChange?: number;
  className?: string;
  showHeader?: boolean;
}

export function EcoScore({ 
  score = 87,
  scoreChange = 3,
  className,
  showHeader = true
}: EcoScoreProps) {
  const { isMobile } = useScreenSize();
  
  // Professional performance metrics
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'efficiency',
      name: 'Energy Efficiency',
      value: 87,
      unit: '%',
      target: 85,
      status: 'excellent'
    },
    {
      id: 'consumption',
      name: 'Power Consumption',
      value: 42,
      unit: 'Wh/km',
      target: 45,
      status: 'good'
    },
    {
      id: 'regeneration',
      name: 'Regenerative Braking',
      value: 23,
      unit: '%',
      target: 20,
      status: 'excellent'
    },
    {
      id: 'range',
      name: 'Range Optimization',
      value: 94,
      unit: '%',
      target: 90,
      status: 'excellent'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20';
      case 'good': return 'bg-blue-500/20';
      case 'warning': return 'bg-yellow-500/20';
      case 'critical': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };
  return (
    <Card className={cn("bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-lg overflow-hidden", className)}>
      {showHeader && (
        <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
          <CardTitle className="text-white text-lg sm:text-xl flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-blue-400" />
              Performance Metrics
            </div>
            <div className="flex items-center text-sm bg-blue-500/20 px-2 py-0.5 rounded-full">
              <TrendingUp className="h-3.5 w-3.5 text-blue-400 mr-1" />
              <span className="text-white">Efficiency: {score}%</span>
            </div>
          </CardTitle>
          <CardDescription className="text-gray-400 text-xs sm:text-sm">
            Real-time vehicle performance and efficiency analytics
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={cn("px-3 pb-3 sm:px-4 sm:pb-4", !showHeader && "pt-3 sm:pt-4")}>
        <div className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/30 relative overflow-hidden">
          
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative">
              <motion.div 
                className="h-28 w-28 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 border-2 border-blue-500/50 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              >
                <motion.div 
                  className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <circle 
                      cx="50" cy="50" r="46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" cy="50" r="46" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.7)" 
                      strokeWidth="8" 
                      strokeDasharray={`${score * 2.89} 1000`} 
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  {score}
                </motion.div>
              </motion.div>
              {scoreChange !== 0 && (
                <motion.div 
                  className={cn(
                    "absolute -bottom-1 -right-1 text-black text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center",
                    scoreChange > 0 ? "bg-green-500" : "bg-red-500"
                  )}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  {scoreChange > 0 ? `+${scoreChange}` : scoreChange}
                </motion.div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-white font-medium mb-1 text-center md:text-left flex items-center justify-center md:justify-start gap-2">
                <span>Overall Efficiency</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="w-60 p-2">
                      <p className="text-xs">Overall efficiency score based on energy consumption, regenerative braking, and range optimization metrics.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h3>
              <div className="relative h-3 bg-gray-700/70 rounded-full mb-2 overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-blue-400 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Target: 85%</span>
                <span>{score}% Achieved</span>
              </div>
            </div>
          </div>
          
          {/* Professional Performance Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            {performanceMetrics.map((metric) => (
              <motion.div 
                key={metric.id}
                className={`bg-gray-900/60 p-3 rounded-lg border border-gray-700/30 relative`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * performanceMetrics.indexOf(metric) }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white text-sm font-medium">{metric.name}</h4>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    getStatusBg(metric.status)
                  )}>
                    <div className={cn(
                      "w-full h-full rounded-full",
                      metric.status === 'excellent' ? 'bg-green-400' :
                      metric.status === 'good' ? 'bg-blue-400' :
                      metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    )}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={cn("text-lg font-bold", getStatusColor(metric.status))}>
                    {metric.value}{metric.unit}
                  </span>
                  <span className="text-xs text-gray-400">
                    Target: {metric.target}{metric.unit}
                  </span>
                </div>
                
                <div className="mt-2 relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      metric.status === 'excellent' ? 'bg-green-500' :
                      metric.status === 'good' ? 'bg-blue-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    )}
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-900/40 rounded-lg border border-gray-700/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Fleet Average:</span>
              <span className="text-white font-medium">82% efficiency</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-gray-400">Industry Benchmark:</span>
              <span className="text-white font-medium">79% efficiency</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
