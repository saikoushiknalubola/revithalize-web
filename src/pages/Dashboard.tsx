
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, Clock, Zap, MapPin, Bell, Bike } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { IoTInsights } from '@/components/features/IoTInsights';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  
  // Check for authentication and get user data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.fullName || user.name || 'User');
      }
    }
  }, [navigate]);

  return (
    <DashboardLayout>
      <div className="space-y-6 px-2 sm:px-4 pb-16 md:pb-4">
        <header className="animate-fade-in">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Welcome back, {userName}</h1>
          <p className="text-gray-400 mt-1">Here's the current status of your EV</p>
        </header>

        {/* Vehicle status overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-2 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center">
                <Battery className="mr-2 h-4 w-4 text-revithalize-green" />
                Battery Level
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="flex items-center">
                <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden mr-3">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full transition-all duration-1000" style={{ width: '75%' }} />
                </div>
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
              <p className="text-sm text-gray-400 mt-2">Estimated Range: 110 km</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md animate-fade-in" style={{ animationDelay: '150ms' }}>
            <CardHeader className="pb-2 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center">
                <Bolt className="mr-2 h-4 w-4 text-revithalize-blue" />
                Power Output
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-2xl font-bold text-white">51.2 V</p>
              <p className="text-sm text-gray-400 mt-2">45 Ah Battery</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-2 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center">
                <ThermometerSnowflake className="mr-2 h-4 w-4 text-blue-400" />
                Temperature
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-2xl font-bold text-white">32°C</p>
              <p className="text-sm text-gray-400 mt-2">Battery Temperature</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md animate-fade-in" style={{ animationDelay: '250ms' }}>
            <CardHeader className="pb-2 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center">
                <Gauge className="mr-2 h-4 w-4 text-yellow-400" />
                Health
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-sm text-gray-400 mt-2">System Performing Optimally</p>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Information */}
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bike className="mr-3 h-5 w-5 text-revithalize-green" />
              Hero Honda Passion AP02SK2409
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/60 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Battery Type</p>
                <p className="text-white font-medium mt-1">51.2V 45Ah Lithium-Ion</p>
              </div>
              <div className="bg-gray-800/60 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Range</p>
                <p className="text-white font-medium mt-1">Up to 110 km</p>
              </div>
              <div className="bg-gray-800/60 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Charging Time</p>
                <p className="text-white font-medium mt-1">3-4 Hours</p>
              </div>
              <div className="bg-gray-800/60 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Max Speed</p>
                <p className="text-white font-medium mt-1">55 km/h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '350ms' }}>
          <BatteryMetrics />
          <ChargingScheduler />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <div className="lg:col-span-2">
            <IoTInsights />
          </div>

          <div>
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between group transition-all duration-300 shadow-md hover:shadow-lg">
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-revithalize-green" />
                    Find Charging Stations
                  </span>
                  <span className="text-revithalize-green group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between group transition-all duration-300 shadow-md hover:shadow-lg">
                  <span className="flex items-center">
                    <Bolt className="mr-2 h-5 w-5 text-revithalize-blue" />
                    Start Remote Charging
                  </span>
                  <span className="text-revithalize-blue group-hover:translate-x-1 transition-transform">→</span>
                </button>
                
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-between group transition-all duration-300 shadow-md hover:shadow-lg">
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
