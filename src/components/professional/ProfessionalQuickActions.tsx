
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Bolt, Bell, TrendingUp, DollarSign, Route, Zap, Settings, Activity, FileText } from 'lucide-react';
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
      label: "Find Charging",
      subtitle: "Nearest stations",
      action: onFindChargingStations,
      color: "text-blue-400"
    },
    {
      icon: Bolt,
      label: "Start Charging",
      subtitle: "Remote control",
      action: onRemoteCharging,
      color: "text-green-400"
    },
    {
      icon: Activity,
      label: "Health Check",
      subtitle: "System status",
      action: onSetChargeAlert,
      color: "text-purple-400"
    },
    {
      icon: Bell,
      label: "Smart Alerts",
      subtitle: "Charge notifications",
      action: () => {},
      color: "text-amber-400"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4 pt-5 px-5">
        <CardTitle className="text-white text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-green-400" />
            <span>Quick Actions</span>
          </div>
          <div className="bg-green-500/20 px-2 py-1 rounded text-xs text-green-400 font-medium">
            PERSONAL
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
            <div className="text-sm font-bold text-white">₹{energyCost.toFixed(2)}</div>
            <div className="text-xs text-gray-400">Energy Cost</div>
          </div>
        </div>

        {/* Professional Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {actionItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button 
                key={index}
                onClick={item.action}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 hover:from-gray-700/70 hover:to-gray-600/70 text-white font-medium py-3 px-3 rounded-xl flex flex-col items-center justify-center group transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30 min-h-[80px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-black/30 p-2 rounded-lg mb-2 group-hover:bg-black/40 transition-colors">
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <div className="text-center">
                  <div className="text-xs font-medium">{item.label}</div>
                  <div className="text-[10px] text-gray-400">{item.subtitle}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
