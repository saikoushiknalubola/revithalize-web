
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, MapPin, Bell, Shield, Leaf, ScanLine, Cpu, Brain, Users, Building2, Activity, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { IoTInsights } from '@/components/features/IoTInsights';
import { EcoScore } from '@/components/features/EcoScore';
import { VirtualBatteryTwin } from '@/components/features/VirtualBatteryTwin';
import { EcoGamification } from '@/components/features/EcoGamification';
import { AdaptiveRangePrediction } from '@/components/features/AdaptiveRangePrediction';
import { SmartGridIntegration } from '@/components/features/SmartGridIntegration';
import { CompanyVision } from '@/components/features/CompanyVision';
import { CarbonImpactTracker } from '@/components/features/CarbonImpactTracker';
import { PredictiveMaintenance } from '@/components/features/PredictiveMaintenance';
import { SocialEnergyNetwork } from '@/components/features/SocialEnergyNetwork';
import { useNavigate, useParams } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('User');
  const { isMobile, isTablet } = useScreenSize();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
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

  // Set active feature from URL parameter if present
  useEffect(() => {
    if (feature) {
      setActiveFeature(feature);
    }
  }, [feature]);

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

  // ALL FEATURES - including dashboard features and smart features
  const allFeatures = [
    // Dashboard Features
    {
      id: 'company-vision',
      title: "Company Vision",
      description: "Learn about ReVithalize's mission and impact",
      icon: Building2,
      color: "bg-gradient-to-br from-indigo-900/40 to-indigo-800/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-600/20",
      component: CompanyVision
    },
    {
      id: 'carbon-tracker',
      title: "Carbon Impact Tracker",
      description: "Monitor your real-time environmental impact and earn carbon credits",
      icon: Activity,
      color: "bg-gradient-to-br from-emerald-900/40 to-emerald-800/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-600/20",
      component: CarbonImpactTracker
    },
    {
      id: 'predictive-maintenance',
      title: "AI Maintenance Assistant",
      description: "Predictive maintenance powered by machine learning",
      icon: Wrench,
      color: "bg-gradient-to-br from-orange-900/40 to-orange-800/20",
      iconColor: "text-orange-400",
      borderColor: "border-orange-600/20",
      component: PredictiveMaintenance
    },
    {
      id: 'social-energy',
      title: "Energy Network",
      description: "Connect with the community and share energy insights",
      icon: Users,
      color: "bg-gradient-to-br from-cyan-900/40 to-cyan-800/20",
      iconColor: "text-cyan-400",
      borderColor: "border-cyan-600/20",
      component: SocialEnergyNetwork
    },
    // Smart Features
    {
      id: 'battery-twin',
      title: "Virtual Battery Twin",
      description: "Real-time 3D visualization of battery cell health",
      icon: Shield,
      color: "bg-gradient-to-br from-blue-900/40 to-blue-800/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-600/20",
      component: VirtualBatteryTwin
    },
    {
      id: 'eco-program',
      title: "Eco Riding Program",
      description: "Complete challenges and earn rewards for eco-friendly riding",
      icon: Leaf,
      color: "bg-gradient-to-br from-purple-900/40 to-purple-800/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-600/20",
      component: EcoGamification
    },
    {
      id: 'range-prediction',
      title: "AI Range Prediction",
      description: "Accurate range forecasting with adaptive learning",
      icon: ScanLine,
      color: "bg-gradient-to-br from-green-900/40 to-green-800/20",
      iconColor: "text-green-400", 
      borderColor: "border-green-600/20",
      component: AdaptiveRangePrediction
    },
    {
      id: 'smart-grid',
      title: "Smart Grid Integration",
      description: "Optimize charging and participate in grid energy sharing",
      icon: Cpu,
      color: "bg-gradient-to-br from-red-900/40 to-red-800/20",
      iconColor: "text-red-400",
      borderColor: "border-red-600/20",
      component: SmartGridIntegration
    }
  ];

  // Smart features only (for the Smart Features section display)
  const smartFeatures = allFeatures.filter(f => 
    ['battery-twin', 'eco-program', 'range-prediction', 'smart-grid'].includes(f.id)
  );

  return (
    <DashboardLayout activeFeature={activeFeature} setActiveFeature={setActiveFeature}>
      <motion.div 
        className="space-y-4 sm:space-y-6 px-2 sm:px-4 pb-16 md:pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header variants={itemVariants} className="animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">Welcome back, {userName}</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Here's the current status of your EV</p>
        </motion.header>

        {/* Vehicle status overview - simplified and consolidated */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          variants={itemVariants}
        >
          {/* Battery Level */}
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

          {/* Power Output */}
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

          {/* Temperature */}
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

          {/* Health */}
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

        {/* Show active feature component */}
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-2 border-gray-800/50 p-4 rounded-lg shadow-lg"
          >
            {allFeatures.find(f => f.id === activeFeature)?.component && 
              React.createElement(allFeatures.find(f => f.id === activeFeature)?.component as React.ComponentType)}
          </motion.div>
        )}

        {/* Analytics Section - Hide when a feature is active on mobile */}
        {(!activeFeature || !isMobile) && (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6" 
            variants={itemVariants}
          >
            <BatteryMetrics />
            <ChargingScheduler />
          </motion.div>
        )}

        {/* EcoScore Component - Hide when a feature is active on mobile */}
        {(!activeFeature || !isMobile) && (
          <motion.div variants={itemVariants}>
            <EcoScore score={87} scoreChange={3} />
          </motion.div>
        )}

        {/* Additional Analytics - Hide when a feature is active on mobile */}
        {(!activeFeature || !isMobile) && (
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
        )}

        {/* Smart Features Section - STREAMLINED */}
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center mb-4">
            <Shield className="mr-2 h-5 w-5 text-revithalize-green" />
            Smart Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {smartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
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
                  onClick={() => setActiveFeature(isActive ? null : feature.id)}
                  className={cn(
                    feature.color, 
                    `border ${feature.borderColor} rounded-lg p-5 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`,
                    isActive ? 'ring-2 ring-white/30' : ''
                  )}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "bg-black/30 p-3 rounded-lg mr-4",
                      isActive ? "bg-black/50" : ""
                    )}>
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
