
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Bolt, Bell, TrendingUp, DollarSign, Route, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfessionalQuickActionsProps {
  totalDistance: number;
  energyCost: number;
  onFindChargingStations: () => void;
  onRemoteCharging: () => void;
  onSetChargeAlert: () => void;
}

export function ProfessionalQuickActions({
  totalDistance,
  energyCost,
  onFindChargingStations,
  onRemoteCharging,
  onSetChargeAlert
}: ProfessionalQuickActionsProps) {
  const actionItems = [
    {
      icon: MapPin,
      label: "Smart Charging Stations",
      subtitle: "AI-optimized locations",
      action: onFindChargingStations,
      color: "text-revithalize-green"
    },
    {
      icon: Bolt,
      label: "Remote Charging",
      subtitle: "Start/schedule charging",
      action: onRemoteCharging,
      color: "text-revithalize-blue"
    },
    {
      icon: Bell,
      label: "Smart Alerts",
      subtitle: "AI-powered notifications",
      action: onSetChargeAlert,
      color: "text-amber-400"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4 pt-5 px-5">
        <CardTitle className="text-white text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
            <span>Professional Dashboard</span>
          </div>
          <div className="bg-revithalize-green/20 px-2 py-1 rounded text-xs text-revithalize-green font-medium">
            PRO
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        {/* Professional Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30">
            <div className="flex items-center justify-between mb-1">
              <Route className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-gray-400">Total</span>
            </div>
            <div className="text-sm font-bold text-white">{totalDistance.toLocaleString()} km</div>
            <div className="text-xs text-gray-400">Distance Driven</div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30">
            <div className="flex items-center justify-between mb-1">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Monthly</span>
            </div>
            <div className="text-sm font-bold text-white">${energyCost.toFixed(2)}</div>
            <div className="text-xs text-gray-400">Energy Cost</div>
          </div>
        </div>

        {/* Professional Quick Actions */}
        <div className="space-y-3">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button 
                key={index}
                onClick={item.action}
                className="w-full bg-gradient-to-r from-gray-800/70 to-gray-700/70 hover:from-gray-700/70 hover:to-gray-600/70 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-between group transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30"
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className="bg-black/30 p-2 rounded-lg mr-3 group-hover:bg-black/40 transition-colors">
                    <Icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-gray-400">{item.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className={`h-3 w-3 ${item.color} opacity-60`} />
                  <span className={`ml-2 text-lg ${item.color} group-hover:translate-x-1 transition-transform`}>→</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
