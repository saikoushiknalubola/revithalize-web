
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, Clock, Zap, MapPin, Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { IoTInsights } from '@/components/features/IoTInsights';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Check for authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 pb-16 md:pb-4">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Welcome back, Alex</h1>
          <p className="text-gray-400 mt-1">Here's the current status of your EV</p>
        </header>

        {/* Vehicle status overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Battery className="mr-2 h-4 w-4" />
                Battery Level
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden mr-3">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Estimated Range: 120 km</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Bolt className="mr-2 h-4 w-4" />
                Power Output
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">5.2 kW</p>
              <p className="text-sm text-gray-400 mt-2">Current Consumption</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <ThermometerSnowflake className="mr-2 h-4 w-4" />
                Temperature
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">32°C</p>
              <p className="text-sm text-gray-400 mt-2">Battery Temperature</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Gauge className="mr-2 h-4 w-4" />
                Health
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-sm text-gray-400 mt-2">System Performing Optimally</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BatteryMetrics />
          <ChargingScheduler />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <IoTInsights />
          </div>

          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full bg-revithalize-dark hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between group transition-colors">
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-revithalize-green" />
                    Find Charging Stations
                  </span>
                  <span className="text-revithalize-green group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <button className="w-full bg-revithalize-dark hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between group transition-colors">
                  <span className="flex items-center">
                    <Bolt className="mr-2 h-5 w-5 text-revithalize-blue" />
                    Start Remote Charging
                  </span>
                  <span className="text-revithalize-blue group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <button className="w-full bg-revithalize-dark hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between group transition-colors">
                  <span className="flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-yellow-400" />
                    Set Charge Alert
                  </span>
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
