
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, TrendingUp, AlertTriangle, CheckCircle, Battery, MapPin, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Vehicle {
  id: string;
  name: string;
  model: string;
  batteryLevel: number;
  status: 'active' | 'charging' | 'maintenance' | 'idle';
  location: string;
  lastUpdated: Date;
  dailyDistance: number;
  efficiency: number;
}

export function FleetManagement() {
  const [vehicles] = useState<Vehicle[]>([
    {
      id: '1',
      name: 'Hero Honda Passion Pro',
      model: 'EV Retrofit',
      batteryLevel: 78,
      status: 'active',
      location: 'Downtown Office',
      lastUpdated: new Date(),
      dailyDistance: 45.2,
      efficiency: 87
    },
    {
      id: '2',
      name: 'Bajaj Pulsar 150',
      model: 'EV Retrofit',
      batteryLevel: 92,
      status: 'charging',
      location: 'Home Garage',
      lastUpdated: new Date(),
      dailyDistance: 28.7,
      efficiency: 91
    },
    {
      id: '3',
      name: 'TVS Apache',
      model: 'EV Retrofit',
      batteryLevel: 34,
      status: 'idle',
      location: 'Service Center',
      lastUpdated: new Date(),
      dailyDistance: 0,
      efficiency: 0
    }
  ]);

  const getStatusColor = (status: Vehicle['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20';
      case 'charging': return 'text-blue-400 bg-blue-400/20';
      case 'maintenance': return 'text-orange-400 bg-orange-400/20';
      case 'idle': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: Vehicle['status']) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'charging': return Battery;
      case 'maintenance': return AlertTriangle;
      case 'idle': return Car;
      default: return Car;
    }
  };

  const fleetStats = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'active').length,
    chargingVehicles: vehicles.filter(v => v.status === 'charging').length,
    averageBattery: Math.round(vehicles.reduce((sum, v) => sum + v.batteryLevel, 0) / vehicles.length),
    totalDistance: vehicles.reduce((sum, v) => sum + v.dailyDistance, 0),
    averageEfficiency: Math.round(vehicles.reduce((sum, v) => sum + v.efficiency, 0) / vehicles.length)
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Car className="mr-3 h-6 w-6 text-revithalize-green" />
          Fleet Management
          <div className="ml-auto bg-revithalize-green/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-revithalize-green">Enterprise</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Monitor and manage your entire vehicle fleet
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Fleet Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <Car className="h-5 w-5 text-blue-400" />
              <span className="text-xs text-gray-400">TOTAL</span>
            </div>
            <div className="text-lg font-bold text-white">{fleetStats.totalVehicles}</div>
            <div className="text-xs text-gray-400">Vehicles</div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-xs text-gray-400">ACTIVE</span>
            </div>
            <div className="text-lg font-bold text-white">{fleetStats.activeVehicles}</div>
            <div className="text-xs text-gray-400">Running</div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center justify-between mb-2">
              <Battery className="h-5 w-5 text-amber-400" />
              <span className="text-xs text-gray-400">AVG BATTERY</span>
            </div>
            <div className="text-lg font-bold text-white">{fleetStats.averageBattery}%</div>
            <div className="text-xs text-gray-400">Fleet Average</div>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3">Active Vehicles</h3>
          {vehicles.map((vehicle, index) => {
            const StatusIcon = getStatusIcon(vehicle.status);
            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <Car className="h-5 w-5 text-revithalize-blue" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{vehicle.name}</div>
                      <div className="text-xs text-gray-400">{vehicle.model}</div>
                    </div>
                  </div>
                  <div className={cn("flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium", getStatusColor(vehicle.status))}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{vehicle.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2">
                    <Battery className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-gray-300">{vehicle.batteryLevel}%</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-gray-300 truncate">{vehicle.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-300">{vehicle.dailyDistance.toFixed(1)} km</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-gray-300">{vehicle.efficiency}% eff</span>
                  </div>
                </div>

                {/* Battery Progress Bar */}
                <div className="mt-3">
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className={cn("h-full rounded-full",
                        vehicle.batteryLevel > 70 ? "bg-gradient-to-r from-green-500 to-green-400" :
                        vehicle.batteryLevel > 30 ? "bg-gradient-to-r from-yellow-500 to-orange-400" :
                        "bg-gradient-to-r from-red-500 to-red-400"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${vehicle.batteryLevel}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
