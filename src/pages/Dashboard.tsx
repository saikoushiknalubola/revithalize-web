import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Bolt, Gauge, ThermometerSnowflake, MapPin, Bell, Building2, Activity, Wrench, Users, TrendingUp, Zap, Leaf, Shield, ChevronRight, Wifi, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
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
import { RealTimeStatusCard } from '@/components/professional/RealTimeStatusCard';
import { ProfessionalQuickActions } from '@/components/professional/ProfessionalQuickActions';
import { MobileVehicleStatus } from '@/components/mobile/MobileVehicleStatus';
import { FleetManagement } from '@/components/professional/FleetManagement';
import { ChargingIntelligence } from '@/components/professional/ChargingIntelligence';
import { NotificationCenter } from '@/components/professional/NotificationCenter';
import { MobileBottomSheet } from '@/components/mobile/MobileBottomSheet';
import { CustomerManagement } from '@/components/professional/CustomerManagement';
import { SecurityManager } from '@/components/professional/SecurityManager';
import { ReportsExport } from '@/components/professional/ReportsExport';
import { AIInsights } from '@/components/professional/AIInsights';
import { AdvancedAnalytics } from '@/components/professional/AdvancedAnalytics';
import { SystemMonitoring } from '@/components/professional/SystemMonitoring';
import { EnergyOptimization } from '@/components/professional/EnergyOptimization';

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('User');
  const { isMobile, isTablet } = useScreenSize();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  
  // Enhanced real-time data states with professional metrics
  const [batteryLevel, setBatteryLevel] = useState(78);
  const [voltage, setVoltage] = useState(51.2);
  const [temperature, setTemperature] = useState(32);
  const [health, setHealth] = useState(98);
  const [range, setRange] = useState(118);
  const [powerConsumption, setPowerConsumption] = useState(42);
  const [chargingStatus, setChargingStatus] = useState('Not Charging');
  const [connectionStatus, setConnectionStatus] = useState('Connected');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Professional metrics (converted to INR)
  const [efficiencyScore, setEfficiencyScore] = useState(87);
  const [totalDistance, setTotalDistance] = useState(2847);
  const [carbonSaved, setCarbonSaved] = useState(234.5);
  const [energyCost, setEnergyCost] = useState(3745.50); // Converted to INR

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

  // Enhanced real-time data simulation with professional metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 1.5)));
      setVoltage(prev => Math.max(48, Math.min(54, prev + (Math.random() - 0.5) * 0.3)));
      setTemperature(prev => Math.max(25, Math.min(45, prev + (Math.random() - 0.5) * 1.5)));
      setHealth(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 0.05)));
      setRange(prev => Math.max(50, Math.min(150, prev + (Math.random() - 0.5) * 3)));
      setPowerConsumption(prev => Math.max(30, Math.min(60, prev + (Math.random() - 0.5) * 2)));
      setEfficiencyScore(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 0.5)));
      setLastUpdated(new Date());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Set active feature from URL parameter if present
  useEffect(() => {
    if (feature) {
      setActiveFeature(feature);
    }
  }, [feature]);

  // Enhanced Dashboard Features with professional data (removed arrows)
  const dashboardFeatures = [
    {
      id: 'company-vision',
      title: "Company Vision",
      description: "Discover ReVithalize's mission to revolutionize EV retrofitting",
      icon: Building2,
      color: "bg-gradient-to-br from-indigo-900/80 to-indigo-600/40",
      iconColor: "text-indigo-300",
      borderColor: "border-indigo-500/40",
      route: "/company-vision",
      stats: "Global Impact",
      value: "50K+ Vehicles",
      professional: true,
      badge: "Mission"
    },
    {
      id: 'carbon-tracker',
      title: "Carbon Impact Tracker",
      description: "Real-time environmental impact monitoring with carbon credits marketplace",
      icon: Activity,
      color: "bg-gradient-to-br from-emerald-900/80 to-emerald-600/40",
      iconColor: "text-emerald-300",
      borderColor: "border-emerald-500/40",
      route: "/carbon-tracker",
      stats: "CO₂ Saved Today",
      value: `${carbonSaved.toFixed(1)} kg`,
      professional: true,
      badge: "Environmental"
    },
    {
      id: 'predictive-maintenance',
      title: "AI Maintenance Assistant",
      description: "Predictive maintenance powered by advanced machine learning algorithms",
      icon: Wrench,
      color: "bg-gradient-to-br from-orange-900/80 to-orange-600/40",
      iconColor: "text-orange-300",
      borderColor: "border-orange-500/40",
      route: "/maintenance-ai",
      stats: "Next Service",
      value: "42 days",
      professional: true,
      badge: "AI Powered"
    },
    {
      id: 'social-energy',
      title: "Energy Network",
      description: "Connect with EV community and participate in energy trading marketplace",
      icon: Users,
      color: "bg-gradient-to-br from-cyan-900/80 to-cyan-600/40",
      iconColor: "text-cyan-300",
      borderColor: "border-cyan-500/40",
      route: "/energy-network",
      stats: "Network Users",
      value: "47.2K Active",
      professional: true,
      badge: "Community"
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
        {/* Enhanced Header with Professional Branding */}
        <motion.header variants={itemVariants} className="animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
                Welcome back, {userName}
              </h1>
              <p className="text-gray-400 mt-1 text-sm sm:text-base">
                Hero Honda Passion Pro • Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={cn(
                "flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium",
                connectionStatus === 'Connected' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
              )}>
                <Wifi className="h-3 w-3" />
                <span>{connectionStatus}</span>
              </div>
              <div className="bg-revithalize-dark/50 px-3 py-1.5 rounded-full">
                <span className="text-xs font-medium text-revithalize-green">Pro Plan</span>
              </div>
              {isMobile && (
                <button
                  onClick={() => setShowBottomSheet(true)}
                  className="p-2 rounded-full bg-revithalize-green/20 hover:bg-revithalize-green/30 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-revithalize-green" />
                </button>
              )}
            </div>
          </div>
        </motion.header>

        {/* Mobile-Optimized Vehicle Status */}
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

        {/* Professional Dashboard Features */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center">
              <Shield className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-revithalize-green" />
              Professional Features
            </h2>
            <div className="flex items-center text-sm text-gray-400">
              <TrendingUp className="mr-2 h-4 w-4 text-revithalize-green" />
              <span className="hidden sm:inline">Enterprise Grade</span>
              <span className="sm:hidden">Pro</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {dashboardFeatures.map((feature, index) => {
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
                    feature.color, 
                    `border ${feature.borderColor} rounded-2xl p-4 sm:p-6 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm relative overflow-hidden group`
                  )}
                >
                  {/* Professional badge */}
                  <div className="absolute top-3 right-3">
                    <span className="bg-black/40 text-xs px-2 py-1 rounded-full text-gray-300 font-medium">
                      {feature.badge}
                    </span>
                  </div>
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "bg-black/40 p-3 sm:p-4 rounded-xl group-hover:bg-black/50 transition-all duration-300",
                        "group-hover:scale-110 group-hover:rotate-3"
                      )}>
                        <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor} group-hover:animate-pulse`} />
                      </div>
                    </div>
                    
                    <h3 className="text-white font-bold text-base sm:text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">{feature.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">{feature.stats}</div>
                        <div className={`text-sm font-bold ${feature.iconColor}`}>{feature.value}</div>
                      </div>
                      <div className="flex items-center text-xs text-gray-500 group-hover:text-gray-300 transition-all duration-300">
                        <span className="hidden sm:inline">Explore Feature</span>
                        <span className="sm:hidden">Open</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Advanced Analytics & System Monitoring */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8" 
          variants={itemVariants}
        >
          <AdvancedAnalytics />
          <SystemMonitoring />
        </motion.div>

        {/* Energy Optimization */}
        <motion.div variants={itemVariants}>
          <EnergyOptimization />
        </motion.div>

        {/* New Professional Components */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8" 
          variants={itemVariants}
        >
          <FleetManagement />
          <NotificationCenter />
        </motion.div>

        {/* Customer Management & Security */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" 
          variants={itemVariants}
        >
          <CustomerManagement />
          <SecurityManager />
        </motion.div>

        {/* Charging Intelligence */}
        <motion.div variants={itemVariants}>
          <ChargingIntelligence />
        </motion.div>

        {/* Reports & AI Insights */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6" 
          variants={itemVariants}
        >
          <ReportsExport />
          <AIInsights />
        </motion.div>

        {/* Professional Analytics Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-8" 
          variants={itemVariants}
        >
          <BatteryMetrics />
          <ChargingScheduler />
        </motion.div>

        {/* Enhanced EcoScore Component */}
        <motion.div variants={itemVariants}>
          <EcoScore score={efficiencyScore} scoreChange={3} />
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
              setChargingStatus('Charging...');
              toast.success('Remote charging initiated', {
                description: 'Your vehicle will begin charging shortly'
              });
              setTimeout(() => setChargingStatus('Charging'), 2000);
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
