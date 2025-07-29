import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, MapPin, Bell, Building2, Activity, Wrench, Users, TrendingUp, Zap, Leaf, Shield, ChevronRight, Wifi, AlertTriangle, CheckCircle, Clock, Truck, Monitor, Brain, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { IoTInsights } from '@/components/features/IoTInsights';
import { EcoScore } from '@/components/features/EcoScore';
import { FleetOverview } from '@/components/features/FleetOverview';
import { useNavigate, useParams } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RealTimeStatusCard } from '@/components/professional/RealTimeStatusCard';
import { ProfessionalQuickActions } from '@/components/professional/ProfessionalQuickActions';
import { MobileVehicleStatus } from '@/components/mobile/MobileVehicleStatus';
import { MobileBottomSheet } from '@/components/mobile/MobileBottomSheet';

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('User');
  const { isMobile, isTablet } = useScreenSize();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  // Static data for consistent professional experience
  const batteryLevel = 82;
  const voltage = 51.2;
  const temperature = 32;
  const health = 98;
  const range = 118;
  const powerConsumption = 42;
  const chargingStatus = 'Not Charging';
  const connectionStatus = 'Connected';
  const lastUpdated = new Date();
  
  // Professional metrics (static for consistency)
  const efficiencyScore = 87;
  const totalDistance = 2847;
  const carbonSaved = 234.5;
  const energyCost = 3745.50;

  // Check for authentication and get user data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/auth');
    } else {
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

  // Personal EV Features for Individual Users
  const personalFeatures = [
    {
      id: 'eco',
      title: "Eco Program",
      description: "Track your environmental impact and savings",
      icon: Leaf,
      route: "/eco-program",
      color: "from-green-900/80 to-green-600/40",
      iconColor: "text-green-300",
      stats: "234kg CO₂ saved"
    },
    {
      id: 'range',
      title: "Smart Range",
      description: "AI-powered range prediction and planning",
      icon: TrendingUp,
      route: "/range-prediction",
      color: "from-blue-900/80 to-blue-600/40",
      iconColor: "text-blue-300",
      stats: "118km remaining"
    },
    {
      id: 'maintenance',
      title: "Maintenance AI",
      description: "Intelligent maintenance scheduling and alerts",
      icon: Wrench,
      route: "/maintenance-ai",
      color: "from-orange-900/80 to-orange-600/40",
      iconColor: "text-orange-300",
      stats: "Next: 2 weeks"
    },
    {
      id: 'energy',
      title: "Energy Network",
      description: "Connect with other EV owners and share energy",
      icon: Users,
      route: "/energy-network",
      color: "from-purple-900/80 to-purple-600/40",
      iconColor: "text-purple-300",
      stats: "Join 2.4k users"
    }
  ];

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
    <DashboardLayout activeFeature={activeFeature} setActiveFeature={setActiveFeature}>
      <motion.div 
        className="space-y-4 sm:space-y-6 px-2 sm:px-4 pb-20 md:pb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header with Natural Tone */}
        <motion.header variants={itemVariants} className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
                Hey {userName}! 👋
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Your Hero Honda Passion Pro is doing great • Last sync: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border",
                connectionStatus === 'Connected' 
                  ? "bg-green-500/20 text-green-400 border-green-500/30" 
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              )}>
                <Wifi className="h-3 w-3" />
                <span>{connectionStatus}</span>
              </div>
              <div className="bg-revithalize-dark/50 px-3 py-1.5 rounded-full border border-revithalize-green/30 backdrop-blur-sm">
                <span className="text-xs font-medium text-revithalize-green">Individual Plan</span>
              </div>
              {isMobile && (
                <button
                  onClick={() => setShowBottomSheet(true)}
                  className="p-2 rounded-full bg-revithalize-green/20 hover:bg-revithalize-green/30 transition-colors border border-revithalize-green/30"
                >
                  <ChevronRight className="h-4 w-4 text-revithalize-green" />
                </button>
              )}
            </div>
          </div>
        </motion.header>

        {/* Mobile-Optimized Vehicle Status with Static Data */}
        {isMobile ? (
          <MobileVehicleStatus 
            batteryLevel={batteryLevel}
            voltage={voltage}
            temperature={temperature}
            health={health}
            range={range}
            powerConsumption={powerConsumption}
            chargingStatus={chargingStatus}
            efficiencyScore={efficiencyScore}
          />
        ) : (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <RealTimeStatusCard
              icon={Battery}
              label="Battery Level"
              value={`${batteryLevel.toFixed(0)}%`}
              subtext={`Range: ${range.toFixed(0)} km • ${chargingStatus}`}
              color="text-revithalize-green"
              progress={batteryLevel}
            />
            
            <RealTimeStatusCard
              icon={Bolt}
              label="Power System"
              value={`${voltage.toFixed(1)} V`}
              subtext={`Consumption: ${powerConsumption.toFixed(0)} Ah`}
              color="text-blue-400"
            />
            
            <RealTimeStatusCard
              icon={ThermometerSnowflake}
              label="Temperature"
              value={`${temperature.toFixed(0)}°C`}
              subtext={temperature > 40 ? 'Hot' : temperature > 35 ? 'Warm' : 'Optimal'}
              color="text-purple-400"
            />
            
            <RealTimeStatusCard
              icon={Gauge}
              label="System Health"
              value={`${health.toFixed(0)}%`}
              subtext={health > 95 ? 'Excellent' : health > 90 ? 'Good' : 'Fair'}
              color="text-amber-400"
              progress={health}
            />
          </motion.div>
        )}

        {/* Personal EV Features */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center">
              <Leaf className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-revithalize-green" />
              Your EV Features
            </h2>
            <button
              onClick={() => navigate('/eco-program')}
              className="text-sm text-gray-400 hover:text-revithalize-green transition-colors flex items-center group"
            >
              Explore All
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {personalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
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
                    `bg-gradient-to-br ${feature.color} border border-gray-600/30 rounded-2xl p-4 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm relative overflow-hidden group`
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className={cn(
                        "bg-black/40 p-3 rounded-xl group-hover:bg-black/50 transition-all duration-300 border border-white/10",
                        "group-hover:scale-110"
                      )}>
                        <Icon className={`h-5 w-5 ${feature.iconColor} group-hover:animate-pulse`} />
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors group-hover:translate-x-1 transform duration-300" />
                    </div>
                    
                    <h3 className="text-white font-bold text-sm mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-3">{feature.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500 bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {feature.stats}
                      </div>
                      <div className="h-1 w-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full group-hover:from-white/30 group-hover:to-white/10 transition-all duration-300"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Core Dashboard Analytics */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8" 
          variants={itemVariants}
        >
          <BatteryMetrics />
          <ChargingScheduler />
        </motion.div>

        {/* Performance Metrics and Fleet Overview */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" 
          variants={itemVariants}
        >
          <EcoScore score={efficiencyScore} scoreChange={3} />
          <FleetOverview />
        </motion.div>

        {/* Professional Quick Actions and Analytics */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6" 
          variants={itemVariants}
        >
          <div className="lg:col-span-2">
            <IoTInsights />
          </div>

          <ProfessionalQuickActions 
            totalDistance={totalDistance}
            energyCost={energyCost}
            onFindChargingStations={() => {
              toast.info('Finding optimal charging stations');
              navigate('/map');
            }}
            onRemoteCharging={() => {
              toast.success('Remote charging initiated', {
                description: 'Your vehicle will begin charging shortly'
              });
            }}
            onSetChargeAlert={() => {
              toast.success('Smart charge alert configured', {
                description: 'AI will optimize charging based on your schedule'
              });
            }}
          />
        </motion.div>

        {/* Mobile Bottom Sheet */}
        <MobileBottomSheet 
          isOpen={showBottomSheet} 
          onClose={() => setShowBottomSheet(false)} 
        />
      </motion.div>
    </DashboardLayout>
  );
}
