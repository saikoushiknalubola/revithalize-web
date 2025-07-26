import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Battery, Zap, TrendingUp, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface VehicleStatus {
  id: string;
  name: string;
  batteryLevel: number;
  location: string;
  status: 'charging' | 'driving' | 'parked' | 'maintenance';
  efficiency: number;
}

export function FleetOverview() {
  const fleetStats = {
    totalVehicles: 12,
    activeVehicles: 10,
    chargingVehicles: 2,
    maintenanceVehicles: 0,
    averageEfficiency: 84,
    totalDistance: 2847,
    energySaved: 234.5
  };

  const vehicles: VehicleStatus[] = [
    {
      id: 'EV001',
      name: 'Hero Honda Passion Pro #1',
      batteryLevel: 82,
      location: 'Bangalore - Electronic City',
      status: 'driving',
      efficiency: 87
    },
    {
      id: 'EV002',
      name: 'Hero Honda Passion Pro #2',
      batteryLevel: 95,
      location: 'Bangalore - Whitefield',
      status: 'parked',
      efficiency: 91
    },
    {
      id: 'EV003',
      name: 'Hero Honda Passion Pro #3',
      batteryLevel: 23,
      location: 'Bangalore - Koramangala',
      status: 'charging',
      efficiency: 78
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'charging': return <Zap className="h-4 w-4 text-blue-400" />;
      case 'driving': return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'parked': return <CheckCircle className="h-4 w-4 text-gray-400" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'charging': return 'text-blue-400 bg-blue-500/20';
      case 'driving': return 'text-green-400 bg-green-500/20';
      case 'parked': return 'text-gray-400 bg-gray-500/20';
      case 'maintenance': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <CardTitle className="text-white text-lg sm:text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Truck className="mr-2 h-5 w-5 text-blue-400" />
            Fleet Overview
          </div>
          <div className="flex items-center text-sm bg-blue-500/20 px-2 py-0.5 rounded-full">
            <CheckCircle className="h-3.5 w-3.5 text-blue-400 mr-1" />
            <span className="text-white">{fleetStats.activeVehicles}/{fleetStats.totalVehicles} Active</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400 text-xs sm:text-sm">
          Real-time fleet status and performance metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
        {/* Fleet Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/30">
            <div className="flex items-center justify-between mb-1">
              <Truck className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-gray-400">Fleet</span>
            </div>
            <div className="text-lg font-bold text-white">{fleetStats.totalVehicles}</div>
            <div className="text-xs text-gray-400">Total Vehicles</div>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/30">
            <div className="flex items-center justify-between mb-1">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-400">Avg</span>
            </div>
            <div className="text-lg font-bold text-white">{fleetStats.averageEfficiency}%</div>
            <div className="text-xs text-gray-400">Efficiency</div>
          </div>
          
          <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/30">
            <div className="flex items-center justify-between mb-1">
              <Zap className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-gray-400">Today</span>
            </div>
            <div className="text-lg font-bold text-white">{fleetStats.totalDistance}</div>
            <div className="text-xs text-gray-400">km Driven</div>
          </div>
        </div>

        {/* Vehicle List */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
            Active Vehicles
          </h4>
          
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className="bg-gray-800/60 p-3 rounded-lg border border-gray-700/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-blue-500/20 p-1.5 rounded-lg mr-3">
                    <Battery className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-white">{vehicle.name}</h5>
                    <p className="text-xs text-gray-400">{vehicle.id}</p>
                  </div>
                </div>
                <div className={cn(
                  "flex items-center px-2 py-1 rounded-full text-xs font-medium",
                  getStatusColor(vehicle.status)
                )}>
                  {getStatusIcon(vehicle.status)}
                  <span className="ml-1 capitalize">{vehicle.status}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <span>{vehicle.location}</span>
                <span>Efficiency: {vehicle.efficiency}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Battery</span>
                <div className="flex items-center">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden mr-2">
                    <div 
                      className={cn(
                        "h-full rounded-full",
                        vehicle.batteryLevel > 50 ? "bg-green-500" :
                        vehicle.batteryLevel > 20 ? "bg-yellow-500" : "bg-red-500"
                      )}
                      style={{ width: `${vehicle.batteryLevel}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-medium">{vehicle.batteryLevel}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View Full Fleet Dashboard
          </button>
        </div>
      </CardContent>
    </Card>
  );
}