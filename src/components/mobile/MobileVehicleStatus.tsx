
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Battery, Bolt, Gauge, ThermometerSnowflake, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileVehicleStatusProps {
  batteryLevel: number;
  voltage: number;
  temperature: number;
  health: number;
  range: number;
  powerConsumption: number;
  chargingStatus: string;
  efficiencyScore: number;
}

export function MobileVehicleStatus({
  batteryLevel,
  voltage,
  temperature,
  health,
  range,
  powerConsumption,
  chargingStatus,
  efficiencyScore
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
      gradient: "from-revithalize-green/20 to-revithalize-blue/10"
    },
    {
      icon: Bolt,
      label: "Power",
      value: `${voltage.toFixed(1)} V`,
      subtext: `${powerConsumption.toFixed(0)} Ah consumption`,
      status: "Active",
      color: "text-blue-400",
      gradient: "from-blue-400/20 to-blue-600/10"
    },
    {
      icon: Gauge,
      label: "Health",
      value: `${health.toFixed(0)}%`,
      subtext: health > 95 ? 'Excellent' : health > 90 ? 'Good' : 'Fair',
      status: "Optimal",
      color: "text-amber-400",
      progress: health,
      gradient: "from-amber-400/20 to-yellow-500/10"
    },
    {
      icon: TrendingUp,
      label: "Efficiency",
      value: `${efficiencyScore.toFixed(0)}%`,
      subtext: "Driving efficiency",
      status: "Excellent",
      color: "text-emerald-400",
      progress: efficiencyScore,
      gradient: "from-emerald-400/20 to-green-500/10"
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
      {/* Main Status Card with Swipe Functionality */}
      <Card className={cn(
        "bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl overflow-hidden relative",
        `bg-gradient-to-br ${currentCardData.gradient}`
      )}>
        <CardContent className="p-6">
          {/* Card Navigation */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              onClick={prevCard}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-4 w-4 text-gray-300" />
            </motion.button>
            
            <div className="flex space-x-2">
              {statusCards.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentCard ? "bg-white" : "bg-gray-500"
                  )}
                />
              ))}
            </div>

            <motion.button
              onClick={nextCard}
              className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-4 w-4 text-gray-300" />
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
              <div className="flex items-center justify-center mb-4">
                <div className="bg-black/30 p-4 rounded-2xl">
                  <Icon className={cn("h-8 w-8", currentCardData.color)} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">
                  {currentCardData.label}
                </div>
                <div className="text-3xl font-bold text-white">
                  {currentCardData.value}
                </div>
                <div className="text-sm text-gray-400">
                  {currentCardData.subtext}
                </div>
                
                {/* Progress Bar for applicable cards */}
                {currentCardData.progress && (
                  <div className="mt-4">
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        className={cn("h-full rounded-full bg-gradient-to-r", 
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

                {/* Status Badge */}
                <div className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-3",
                  "bg-black/30 text-gray-300"
                )}>
                  <div className={cn("w-2 h-2 rounded-full mr-2", 
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

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <ThermometerSnowflake className="h-5 w-5 text-purple-400" />
            <span className="text-xs text-gray-400">TEMP</span>
          </div>
          <div className="text-lg font-bold text-white">{temperature.toFixed(0)}°C</div>
          <div className="text-xs text-gray-400">
            {temperature > 40 ? 'Hot' : temperature > 35 ? 'Warm' : 'Optimal'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Bolt className="h-5 w-5 text-blue-400" />
            <span className="text-xs text-gray-400">POWER</span>
          </div>
          <div className="text-lg font-bold text-white">{powerConsumption.toFixed(0)} Ah</div>
          <div className="text-xs text-gray-400">Consumption</div>
        </div>
      </div>
    </div>
  );
}
