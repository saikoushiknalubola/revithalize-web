import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, Clock, Zap, MapPin, Bell, Bike } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { IoTInsights } from '@/components/features/IoTInsights';
import { EcoScore } from '@/components/features/EcoScore';
import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const { isMobile, isTablet } = useScreenSize();
  
  // Check for authentication and get user data
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

  // Function handlers for quick actions
  const handleFindChargingStations = () => {
    toast.info('Finding nearby charging stations');
    navigate('/map');
  };

  const handleRemoteCharging = () => {
    toast.success('Remote charging initiated', {
      description: 'Your vehicle will begin charging shortly'
    });
  };

  const handleSetChargeAlert = () => {
    toast.success('Charge alert set', {
      description: 'You will be notified when the battery is fully charged'
    });
  };

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

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-4 sm:space-y-6 px-2 sm:px-4 pb-16 md:pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={itemVariants} className="animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">Welcome back, {userName}</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Here's the current status of your EV</p>
        </motion.header>

        {/* Vehicle status overview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4"
          variants={itemVariants}
        >
          {/* Vehicle status cards */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md rounded-lg overflow-hidden transition-all duration-300"
          >
            <CardHeader className="pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <Battery className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-revithalize-green" />
                Battery Level
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
              <div className="flex items-center">
                <div className="relative w-full h-2 sm:h-3 bg-gray-800 rounded-full overflow-hidden mr-2 sm:mr-3">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full transition-all duration-1000" style={{ width: '75%' }} />
                </div>
                <span className="text-lg sm:text-2xl font-bold text-white">75%</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Estimated Range: 110 km</p>
            </CardContent>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md rounded-lg overflow-hidden transition-all duration-300"
          >
            <CardHeader className="pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <Bolt className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-revithalize-blue" />
                Power Output
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
              <p className="text-lg sm:text-2xl font-bold text-white">51.2 V</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">45 Ah Battery</p>
            </CardContent>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md rounded-lg overflow-hidden transition-all duration-300"
          >
            <CardHeader className="pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <ThermometerSnowflake className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                Temperature
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
              <p className="text-lg sm:text-2xl font-bold text-white">32°C</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">Battery Temperature</p>
            </CardContent>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)' }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-md rounded-lg overflow-hidden transition-all duration-300"
          >
            <CardHeader className="pb-1 px-2 sm:px-3 pt-2 sm:pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <Gauge className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                Health
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
              <p className="text-lg sm:text-2xl font-bold text-white">98%</p>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">System Optimal</p>
            </CardContent>
          </motion.div>
        </motion.div>

        {/* Vehicle Information */}
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
            <CardHeader className="pb-3 pt-3 px-3 sm:pb-4 sm:pt-4 sm:px-4">
              <CardTitle className="text-white flex items-center text-lg sm:text-xl">
                <Bike className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-revithalize-green" />
                Hero Honda Passion AP02SK2409
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                <div className="bg-gray-800/60 p-2 sm:p-3 rounded-lg backdrop-blur-md hover:bg-gray-800/80 transition-colors">
                  <p className="text-gray-400 text-xs sm:text-sm">Battery Type</p>
                  <p className="text-white font-medium mt-1 text-sm sm:text-base truncate">51.2V 45Ah Lithium-Ion</p>
                </div>
                <div className="bg-gray-800/60 p-2 sm:p-3 rounded-lg backdrop-blur-md hover:bg-gray-800/80 transition-colors">
                  <p className="text-gray-400 text-xs sm:text-sm">Range</p>
                  <p className="text-white font-medium mt-1 text-sm sm:text-base">Up to 110 km</p>
                </div>
                <div className="bg-gray-800/60 p-2 sm:p-3 rounded-lg backdrop-blur-md hover:bg-gray-800/80 transition-colors">
                  <p className="text-gray-400 text-xs sm:text-sm">Charging Time</p>
                  <p className="text-white font-medium mt-1 text-sm sm:text-base">3-4 Hours</p>
                </div>
                <div className="bg-gray-800/60 p-2 sm:p-3 rounded-lg backdrop-blur-md hover:bg-gray-800/80 transition-colors">
                  <p className="text-gray-400 text-xs sm:text-sm">Max Speed</p>
                  <p className="text-white font-medium mt-1 text-sm sm:text-base">55 km/h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6" 
          variants={itemVariants}
        >
          <BatteryMetrics />
          <ChargingScheduler />
        </motion.div>

        {/* EcoScore Component */}
        <motion.div variants={itemVariants}>
          <EcoScore score={87} scoreChange={3} />
        </motion.div>

        {/* Additional Analytics */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6" 
          variants={itemVariants}
        >
          <div className="lg:col-span-2">
            <IoTInsights />
          </div>

          <div>
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
              <CardHeader className="pb-3 pt-3 px-3 sm:pb-4 sm:pt-4 sm:px-4">
                <CardTitle className="text-white text-lg sm:text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 px-3 pb-3 sm:px-4 sm:pb-4">
                <motion.button 
                  onClick={handleFindChargingStations}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-between group transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-revithalize-green" />
                    Find Charging Stations
                  </span>
                  <span className="text-revithalize-green group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
                
                <motion.button 
                  onClick={handleRemoteCharging}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-between group transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Bolt className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-revithalize-blue" />
                    Start Remote Charging
                  </span>
                  <span className="text-revithalize-blue group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
                
                <motion.button 
                  onClick={handleSetChargeAlert}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg flex items-center justify-between group transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Bell className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-400" />
                    Set Charge Alert
                  </span>
                  <span className="text-yellow-400 group-hover:translate-x-1 transition-transform">→</span>
                </motion.button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
