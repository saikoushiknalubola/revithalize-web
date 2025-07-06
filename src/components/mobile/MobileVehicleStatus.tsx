
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Battery, Bolt, Gauge, ThermometerSnowflake, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileVehicleStatusProps {
  batteryLevel?: number;
  voltage?: number;
  temperature?: number;
  health?: number;
  range?: number;
  powerConsumption?: number;
  chargingStatus?: string;
  efficiencyScore?: number;
}

export function MobileVehicleStatus({
  batteryLevel = 82,
  voltage = 51.2,
  temperature = 32,
  health = 98,
  range = 118,
  powerConsumption = 42,
  chargingStatus = 'Not Charging',
  efficiencyScore = 87
}: MobileVehicleStatusProps) {
  const [currentCard, setCurrentCard] = useState(0);

  const statusCards = [
    {
      icon: Battery,
      label: "Battery",
      value: `${batteryLevel.toFixed(0)}%`,
      subtext: `${range.toFixed(0)} km range`,
      status: chargingStatus,
      color: "text-revithalize-green",
      progress: batteryLevel,
      gradient: "from-revithalize-green/30 to-revithalize-blue/20",
      bgGradient: "from-gray-900/95 to-gray-800/95"
    },
    {
      icon: Bolt,
      label: "Power",
      value: `${voltage.toFixed(1)} V`,
      subtext: `${powerConsumption.toFixed(0)} Ah consumption`,
      status: "Active",
      color: "text-blue-400",
      gradient: "from-blue-400/30 to-blue-600/20",
      bgGradient: "from-blue-900/80 to-gray-800/95"
    },
    {
      icon: Gauge,
      label: "Health",
      value: `${health.toFixed(0)}%`,
      subtext: health > 95 ? 'Excellent' : health > 90 ? 'Good' : 'Fair',
      status: "Optimal",
      color: "text-amber-400",
      progress: health,
      gradient: "from-amber-400/30 to-yellow-500/20",
      bgGradient: "from-amber-900/60 to-gray-800/95"
    },
    {
      icon: TrendingUp,
      label: "Efficiency",
      value: `${efficiencyScore.toFixed(0)}%`,
      subtext: "Driving efficiency",
      status: "Excellent",
      color: "text-emerald-400",
      progress: efficiencyScore,
      gradient: "from-emerald-400/30 to-green-500/20",
      bgGradient: "from-emerald-900/60 to-gray-800/95"
    }
  ];

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % statusCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + statusCards.length) % statusCards.length);
  };

  const currentCardData = statusCards[currentCard];
  const Icon = currentCardData.icon;

  return (
    <div className="space-y-4">
      {/* Main Status Card with Enhanced Colors */}
      <Card className={cn(
        "bg-gradient-to-br shadow-2xl overflow-hidden relative border-2",
        currentCardData.bgGradient,
        "border-gray-600/50 backdrop-blur-sm"
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-20",
          currentCardData.gradient
        )} />
        
        <CardContent className="p-6 relative z-10">
          {/* Card Navigation */}
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={prevCard}
              className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors shadow-lg border border-gray-600/30"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </motion.button>
            
            <div className="flex space-x-3">
              {statusCards.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300 shadow-sm",
                    index === currentCard 
                      ? "bg-white shadow-lg" 
                      : "bg-gray-500/60 hover:bg-gray-400/80"
                  )}
                />
              ))}
            </div>

            <motion.button
              onClick={nextCard}
              className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors shadow-lg border border-gray-600/30"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </motion.button>
          </div>

          {/* Animated Card Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCard}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="bg-black/40 p-5 rounded-3xl shadow-xl border border-gray-600/30 backdrop-blur-sm">
                  <Icon className={cn("h-10 w-10", currentCardData.color)} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-gray-300 uppercase tracking-wider font-medium">
                  {currentCardData.label}
                </div>
                <div className="text-4xl font-bold text-white drop-shadow-lg">
                  {currentCardData.value}
                </div>
                <div className="text-base text-gray-200 font-medium">
                  {currentCardData.subtext}
                </div>
                
                {/* Enhanced Progress Bar */}
                {currentCardData.progress && (
                  <div className="mt-6">
                    <div className="w-full h-3 bg-gray-800/80 rounded-full overflow-hidden shadow-inner border border-gray-700/50">
                      <motion.div 
                        className={cn("h-full rounded-full bg-gradient-to-r shadow-sm", 
                          currentCardData.progress > 80 ? "from-revithalize-green to-revithalize-blue" :
                          currentCardData.progress > 60 ? "from-yellow-500 to-orange-500" :
                          "from-red-500 to-red-600"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${currentCardData.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                )}

                {/* Enhanced Status Badge */}
                <div className={cn(
                  "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mt-4 shadow-lg",
                  "bg-black/50 text-white border border-gray-600/30 backdrop-blur-sm"
                )}>
                  <div className={cn("w-3 h-3 rounded-full mr-3 shadow-sm", 
                    currentCardData.status === 'Charging...' ? "bg-yellow-400 animate-pulse" :
                    currentCardData.status === 'Charging' ? "bg-green-400 animate-pulse" :
                    "bg-green-400"
                  )} />
                  {currentCardData.status}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Enhanced Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 border-gray-600/50 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <ThermometerSnowflake className="h-6 w-6 text-purple-400" />
            <span className="text-sm text-gray-300 font-medium">TEMP</span>
          </div>
          <div className="text-2xl font-bold text-white drop-shadow-sm">{temperature.toFixed(0)}°C</div>
          <div className="text-sm text-gray-300 font-medium">
            {temperature > 40 ? 'Hot' : temperature > 35 ? 'Warm' : 'Optimal'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-2 border-gray-600/50 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <Bolt className="h-6 w-6 text-blue-400" />
            <span className="text-sm text-gray-300 font-medium">POWER</span>
          </div>
          <div className="text-2xl font-bold text-white drop-shadow-sm">{powerConsumption.toFixed(0)} Ah</div>
          <div className="text-sm text-gray-300 font-medium">Consumption</div>
        </div>
      </div>
    </div>
  );
}
