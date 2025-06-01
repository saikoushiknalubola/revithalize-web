
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Shield, Leaf, ScanLine, Cpu, Battery, Thermometer, Zap, Activity, Calendar, Award, Wifi, Settings, Car, MapPin, BarChart3 } from 'lucide-react';
import { VirtualBatteryTwin } from '@/components/features/VirtualBatteryTwin';
import { EcoGamification } from '@/components/features/EcoGamification';
import { AdaptiveRangePrediction } from '@/components/features/AdaptiveRangePrediction';
import { SmartGridIntegration } from '@/components/features/SmartGridIntegration';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { EcoScore } from '@/components/features/EcoScore';
import { IoTInsights } from '@/components/features/IoTInsights';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('User');
  const { isMobile, isTablet } = useScreenSize();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Check for authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
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

  // Set active feature from URL parameter if present
  useEffect(() => {
    if (feature) {
      setActiveFeature(feature);
    }
  }, [feature]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Smart features definition with navigation to separate pages
  const smartFeatures = [
    {
      id: 'battery-twin',
      title: "Virtual Battery Twin",
      description: "Real-time 3D visualization of battery cell health",
      icon: Shield,
      color: "bg-gradient-to-br from-blue-900/40 to-blue-800/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-600/20",
      route: '/battery-twin'
    },
    {
      id: 'eco-program',
      title: "Eco Riding Program",
      description: "Complete challenges and earn rewards for eco-friendly riding",
      icon: Leaf,
      color: "bg-gradient-to-br from-purple-900/40 to-purple-800/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-600/20",
      route: '/eco-program'
    },
    {
      id: 'range-prediction',
      title: "AI Range Prediction",
      description: "Accurate range forecasting with adaptive learning",
      icon: ScanLine,
      color: "bg-gradient-to-br from-green-900/40 to-green-800/20",
      iconColor: "text-green-400", 
      borderColor: "border-green-600/20",
      route: '/range-prediction'
    },
    {
      id: 'smart-grid',
      title: "Smart Grid Integration",
      description: "Optimize charging and participate in grid energy sharing",
      icon: Cpu,
      color: "bg-gradient-to-br from-red-900/40 to-red-800/20",
      iconColor: "text-red-400",
      borderColor: "border-red-600/20",
      route: '/smart-grid'
    }
  ];

  // Battery status data
  const batteryStatus = {
    level: 75,
    powerOutput: 2.4,
    temperature: 32,
    health: 92
  };

  return (
    <DashboardLayout activeFeature={activeFeature} setActiveFeature={setActiveFeature}>
      <motion.div 
        className="space-y-4 sm:space-y-6 px-2 sm:px-4 pb-16 md:pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Header */}
        <motion.div 
          className="text-center py-4"
          variants={itemVariants}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-400 mt-2">Your Hero Honda Passion is ready for the road</p>
        </motion.div>

        {/* Battery Status Cards */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border-blue-600/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm font-medium">Battery Level</p>
                  <p className="text-2xl font-bold text-white">{batteryStatus.level}%</p>
                </div>
                <Battery className="h-8 w-8 text-blue-400" />
              </div>
              <div className="mt-3 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-300 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${batteryStatus.level}%` }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/40 to-yellow-800/20 border-yellow-600/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm font-medium">Power Output</p>
                  <p className="text-2xl font-bold text-white">{batteryStatus.powerOutput} kW</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/40 to-red-800/20 border-red-600/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm font-medium">Temperature</p>
                  <p className="text-2xl font-bold text-white">{batteryStatus.temperature}°C</p>
                </div>
                <Thermometer className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-green-600/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm font-medium">Battery Health</p>
                  <p className="text-2xl font-bold text-white">{batteryStatus.health}%</p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Smart Features Section - Now with navigation to separate pages */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center mb-4">
            <Shield className="mr-2 h-5 w-5 text-revithalize-green" />
            Smart Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <Link to={feature.route}>
                    <div className={cn(
                      feature.color, 
                      `border ${feature.borderColor} rounded-lg p-5 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`
                    )}>
                      <div className="flex items-start">
                        <div className="bg-black/30 p-3 rounded-lg mr-4">
                          <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                          <p className="text-gray-400 text-sm">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center mb-4">
            <Settings className="mr-2 h-5 w-5 text-revithalize-green" />
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/vehicle">
              <Button variant="outline" className="w-full h-16 bg-gray-900 border-gray-700 hover:bg-gray-800 flex items-center justify-center gap-3">
                <Car className="h-5 w-5 text-revithalize-green" />
                <span className="text-white">Vehicle Details</span>
              </Button>
            </Link>
            
            <Link to="/map">
              <Button variant="outline" className="w-full h-16 bg-gray-900 border-gray-700 hover:bg-gray-800 flex items-center justify-center gap-3">
                <MapPin className="h-5 w-5 text-revithalize-blue" />
                <span className="text-white">Find Stations</span>
              </Button>
            </Link>
            
            <Link to="/analytics">
              <Button variant="outline" className="w-full h-16 bg-gray-900 border-gray-700 hover:bg-gray-800 flex items-center justify-center gap-3">
                <BarChart3 className="h-5 w-5 text-revithalize-green" />
                <span className="text-white">Analytics</span>
              </Button>
            </Link>
            
            <Link to="/settings">
              <Button variant="outline" className="w-full h-16 bg-gray-900 border-gray-700 hover:bg-gray-800 flex items-center justify-center gap-3">
                <Settings className="h-5 w-5 text-revithalize-blue" />
                <span className="text-white">Settings</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
