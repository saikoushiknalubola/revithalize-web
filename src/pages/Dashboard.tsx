
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, MapPin, Bell, Building2, Activity, Wrench, Users, TrendingUp, Zap, Leaf, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { IoTInsights } from '@/components/features/IoTInsights';
import { EcoScore } from '@/components/features/EcoScore';
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
  
  // Real-time data states
  const [batteryLevel, setBatteryLevel] = useState(75);
  const [voltage, setVoltage] = useState(51.2);
  const [temperature, setTemperature] = useState(32);
  const [health, setHealth] = useState(98);
  const [range, setRange] = useState(110);
  const [powerConsumption, setPowerConsumption] = useState(45);
  const [chargingStatus, setChargingStatus] = useState('Not Charging');
  
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

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 2)));
      setVoltage(prev => Math.max(48, Math.min(54, prev + (Math.random() - 0.5) * 0.5)));
      setTemperature(prev => Math.max(25, Math.min(45, prev + (Math.random() - 0.5) * 2)));
      setHealth(prev => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 0.1)));
      setRange(prev => Math.max(50, Math.min(150, prev + (Math.random() - 0.5) * 5)));
      setPowerConsumption(prev => Math.max(30, Math.min(60, prev + (Math.random() - 0.5) * 3)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
    setChargingStatus('Charging...');
    toast.success('Remote charging initiated', {
      description: 'Your vehicle will begin charging shortly'
    });
    setTimeout(() => setChargingStatus('Charging'), 2000);
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

  // Enhanced Dashboard Features with better data and navigation
  const dashboardFeatures = [
    {
      id: 'company-vision',
      title: "Company Vision",
      description: "Discover ReVithalize's mission to revolutionize EV retrofitting",
      icon: Building2,
      color: "bg-gradient-to-br from-indigo-900/60 to-indigo-600/30",
      iconColor: "text-indigo-300",
      borderColor: "border-indigo-500/30",
      route: "/company-vision",
      stats: "Global Impact",
      value: "50K+ Vehicles"
    },
    {
      id: 'carbon-tracker',
      title: "Carbon Impact Tracker",
      description: "Real-time environmental impact monitoring with carbon credits",
      icon: Activity,
      color: "bg-gradient-to-br from-emerald-900/60 to-emerald-600/30",
      iconColor: "text-emerald-300",
      borderColor: "border-emerald-500/30",
      route: "/carbon-tracker",
      stats: "CO₂ Saved Today",
      value: "2.3 kg"
    },
    {
      id: 'predictive-maintenance',
      title: "AI Maintenance Assistant",
      description: "Predictive maintenance powered by advanced machine learning",
      icon: Wrench,
      color: "bg-gradient-to-br from-orange-900/60 to-orange-600/30",
      iconColor: "text-orange-300",
      borderColor: "border-orange-500/30",
      route: "/maintenance-ai",
      stats: "Next Service",
      value: "45 days"
    },
    {
      id: 'social-energy',
      title: "Energy Network",
      description: "Connect with EV community and share energy insights",
      icon: Users,
      color: "bg-gradient-to-br from-cyan-900/60 to-cyan-600/30",
      iconColor: "text-cyan-300",
      borderColor: "border-cyan-500/30",
      route: "/energy-network",
      stats: "Network Users",
      value: "45K+ Active"
    }
  ];

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
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Real-time status of your Hero Honda Passion Pro</p>
        </motion.header>

        {/* Enhanced Vehicle Status Overview with Real-time Data */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
          variants={itemVariants}
        >
          {/* Enhanced Battery Level */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)' }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-revithalize-green/20 shadow-lg rounded-xl overflow-hidden transition-all duration-300 group"
          >
            <CardHeader className="pb-1 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <Battery className="mr-2 h-4 w-4 text-revithalize-green group-hover:animate-pulse" />
                Battery Level
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="flex items-center mb-2">
                <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden mr-3">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${batteryLevel}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xl font-bold text-white">{batteryLevel.toFixed(0)}%</span>
              </div>
              <p className="text-xs text-gray-400">Range: {range.toFixed(0)} km • {chargingStatus}</p>
            </CardContent>
          </motion.div>

          {/* Enhanced Power Output */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(59, 130, 246, 0.15)' }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-blue-500/20 shadow-lg rounded-xl overflow-hidden transition-all duration-300 group"
          >
            <CardHeader className="pb-1 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <Bolt className="mr-2 h-4 w-4 text-blue-400 group-hover:animate-pulse" />
                Power System
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-xl font-bold text-white">{voltage.toFixed(1)} V</p>
              <p className="text-xs text-gray-400 mt-1">Consumption: {powerConsumption.toFixed(0)} Ah</p>
            </CardContent>
          </motion.div>

          {/* Enhanced Temperature */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(168, 85, 247, 0.15)' }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-purple-500/20 shadow-lg rounded-xl overflow-hidden transition-all duration-300 group"
          >
            <CardHeader className="pb-1 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <ThermometerSnowflake className="mr-2 h-4 w-4 text-purple-400 group-hover:animate-pulse" />
                Temperature
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-xl font-bold text-white">{temperature.toFixed(0)}°C</p>
              <p className="text-xs text-gray-400 mt-1">{temperature > 40 ? 'Hot' : temperature > 35 ? 'Warm' : 'Optimal'}</p>
            </CardContent>
          </motion.div>

          {/* Enhanced Health */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)' }}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-amber-500/20 shadow-lg rounded-xl overflow-hidden transition-all duration-300 group"
          >
            <CardHeader className="pb-1 px-3 pt-3">
              <CardDescription className="text-gray-400 flex items-center text-xs sm:text-sm">
                <Gauge className="mr-2 h-4 w-4 text-amber-400 group-hover:animate-pulse" />
                System Health
              </CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <p className="text-xl font-bold text-white">{health.toFixed(0)}%</p>
              <p className="text-xs text-gray-400 mt-1">{health > 95 ? 'Excellent' : health > 90 ? 'Good' : 'Fair'}</p>
            </CardContent>
          </motion.div>
        </motion.div>

        {/* Enhanced Dashboard Features Section */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center">
              <Shield className="mr-3 h-6 w-6 text-revithalize-green" />
              ReVithalize Features
            </h2>
            <div className="flex items-center text-sm text-gray-400">
              <TrendingUp className="mr-2 h-4 w-4 text-revithalize-green" />
              Next-Gen EV Experience
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dashboardFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02, y: -8 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.2 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  onClick={() => navigate(feature.route)}
                  className={cn(
                    feature.color, 
                    `border ${feature.borderColor} rounded-2xl p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm relative overflow-hidden group`
                  )}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "bg-black/40 p-4 rounded-xl group-hover:bg-black/50 transition-all duration-300",
                        "group-hover:scale-110 group-hover:rotate-3"
                      )}>
                        <Icon className={`h-7 w-7 ${feature.iconColor} group-hover:animate-pulse`} />
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">{feature.stats}</div>
                        <div className={`text-sm font-bold ${feature.iconColor}`}>{feature.value}</div>
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    
                    {/* Animated arrow */}
                    <div className="flex items-center mt-4 text-xs text-gray-500 group-hover:text-gray-300 transition-all duration-300">
                      <span>Explore Feature</span>
                      <motion.span 
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Analytics Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8" 
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-6" 
          variants={itemVariants}
        >
          <div className="lg:col-span-2">
            <IoTInsights />
          </div>

          <div>
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-white text-xl flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 px-4 pb-4">
                <motion.button 
                  onClick={handleFindChargingStations}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-between group transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5 text-revithalize-green" />
                    Find Charging Stations
                  </span>
                  <span className="text-revithalize-green group-hover:translate-x-1 transition-transform text-lg">→</span>
                </motion.button>
                
                <motion.button 
                  onClick={handleRemoteCharging}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-between group transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Bolt className="mr-3 h-5 w-5 text-revithalize-blue" />
                    Start Remote Charging
                  </span>
                  <span className="text-revithalize-blue group-hover:translate-x-1 transition-transform text-lg">→</span>
                </motion.button>
                
                <motion.button 
                  onClick={handleSetChargeAlert}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-between group transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-600/30"
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center">
                    <Bell className="mr-3 h-5 w-5 text-amber-400" />
                    Set Charge Alert
                  </span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform text-lg">→</span>
                </motion.button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
