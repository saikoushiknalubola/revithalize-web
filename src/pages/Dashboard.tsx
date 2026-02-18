import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Gauge, Map, Activity, Shield, TrendingUp, Truck, Monitor, Brain, ArrowRight, Bell, Settings } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { BikeHeroSection } from '@/components/features/BikeHeroSection';
import { BikeStatCard } from '@/components/mobile/BikeStatCard';
import { BikeBottomNav } from '@/components/layout/BikeBottomNav';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { EcoScore } from '@/components/features/EcoScore';
import { FleetOverview } from '@/components/features/FleetOverview';
import { IoTInsights } from '@/components/features/IoTInsights';
import { ProfessionalQuickActions } from '@/components/professional/ProfessionalQuickActions';

// Static data
const batteryLevel = 82;
const voltage = 51.2;
const temperature = 32;
const health = 98;
const range = 118;
const powerConsumption = 42;
const chargingStatus = 'Not Charging';
const efficiencyScore = 87;
const totalDistance = 12450;
const carbonSaved = 234.5;
const energyCost = 3745.50;

const recentRides = [
  { id: 1, route: 'Home → Office', distance: '14.2 km', date: 'Today, 9:15 AM', duration: '32 min' },
  { id: 2, route: 'Office → Market', distance: '6.8 km', date: 'Yesterday, 6:30 PM', duration: '18 min' },
  { id: 3, route: 'Market → Home', distance: '15.1 km', date: 'Yesterday, 8:00 PM', duration: '37 min' },
];

const quickAccessFeatures = [
  { id: 'fleet', title: "Fleet Management", icon: Truck, route: "/fleet-management", color: "from-blue-900/80 to-blue-600/40", iconColor: "text-blue-300", stats: "12 Vehicles" },
  { id: 'analytics', title: "Advanced Analytics", icon: TrendingUp, route: "/advanced-analytics", color: "from-purple-900/80 to-purple-600/40", iconColor: "text-purple-300", stats: "24 Reports" },
  { id: 'monitoring', title: "System Monitoring", icon: Monitor, route: "/system-monitoring", color: "from-green-900/80 to-green-600/40", iconColor: "text-green-300", stats: "All Systems OK" },
  { id: 'ai-insights', title: "AI Insights", icon: Brain, route: "/ai-insights", color: "from-orange-900/80 to-orange-600/40", iconColor: "text-orange-300", stats: "5 New Insights" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('Koushik');
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (feature) setActiveFeature(feature);
  }, [feature]);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-black pb-28">
        <div className="max-w-[420px] mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between pt-6 pb-4">
            <div>
              <p className="text-xs text-[#A1A1AA] font-poppins">Welcome back,</p>
              <h1 className="text-xl font-bold text-white font-poppins">{userName}</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/notification-center')}
                className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#2A2A2E] flex items-center justify-center"
              >
                <Bell className="w-4 h-4 text-[#A1A1AA]" />
              </button>
              <button
                onClick={() => navigate('/settings')}
                className="w-9 h-9 rounded-full bg-[#1C1C1E] border border-[#2A2A2E] flex items-center justify-center"
              >
                <Settings className="w-4 h-4 text-[#A1A1AA]" />
              </button>
            </div>
          </div>

          {/* Hero Bike Section */}
          <div className="bg-[#0A0A0A] border border-[#2A2A2E] rounded-3xl p-6 mb-4">
            <BikeHeroSection
              bikeName="Hero Honda Passion Pro"
              batteryLevel={batteryLevel}
              range={range}
              isConnected={true}
            />
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <BikeStatCard icon={Battery} value={`${batteryLevel}%`} label="Battery Level" iconColor="#1E6BFF" />
            <BikeStatCard icon={Gauge} value={`${health}%`} label="Engine Health" iconColor="#22C55E" />
            <BikeStatCard icon={Map} value={`${range} km`} label="Range Left" iconColor="#F59E0B" />
            <BikeStatCard icon={Activity} value={`${totalDistance.toLocaleString()} km`} label="Total Distance" iconColor="#A855F7" />
          </div>

          {/* Recent Rides */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white font-poppins">Recent Rides</h3>
              <button
                onClick={() => navigate('/advanced-analytics')}
                className="text-xs text-[#1E6BFF] font-medium"
              >
                See All
              </button>
            </div>
            <div className="space-y-2">
              {recentRides.map((ride) => (
                <div key={ride.id} className="bg-[#1C1C1E] border border-[#2A2A2E] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{ride.route}</span>
                    <span className="text-xs text-[#1E6BFF] font-semibold">{ride.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#A1A1AA]">{ride.date}</span>
                    <span className="text-xs text-[#A1A1AA]">{ride.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white font-poppins mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickAccessFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.button
                    key={feat.id}
                    onClick={() => navigate(feat.route)}
                    whileTap={{ scale: 0.97 }}
                    className={`bg-gradient-to-br ${feat.color} border border-[#2A2A2E] rounded-2xl p-4 text-left`}
                  >
                    <Icon className={`w-5 h-5 ${feat.iconColor} mb-2`} />
                    <p className="text-sm font-semibold text-white leading-tight">{feat.title}</p>
                    <p className="text-xs text-[#A1A1AA] mt-1">{feat.stats}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Nav */}
        <BikeBottomNav />
      </div>
    );
  }

  // Desktop layout (unchanged structure, cleaner)
  return (
    <DashboardLayout activeFeature={activeFeature} setActiveFeature={setActiveFeature}>
      <motion.div
        className="space-y-6 px-4 pb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue font-poppins">
                Welcome back, {userName}
              </h1>
              <p className="text-gray-400 mt-1 text-sm">Hero Honda Passion Pro • {new Date().toLocaleTimeString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Connected
              </div>
              <div className="bg-[#1C1C1E] px-3 py-1.5 rounded-full border border-revithalize-green/30">
                <span className="text-xs font-medium text-revithalize-green">Pro Plan</span>
              </div>
            </div>
          </div>
        </header>

        {/* Desktop Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <BikeStatCard icon={Battery} value={`${batteryLevel}%`} label="Battery Level" iconColor="#1E6BFF" />
          <BikeStatCard icon={Gauge} value={`${health}%`} label="Engine Health" iconColor="#22C55E" />
          <BikeStatCard icon={Map} value={`${range} km`} label="Range Left" iconColor="#F59E0B" />
          <BikeStatCard icon={Activity} value={`${totalDistance.toLocaleString()} km`} label="Total Distance" iconColor="#A855F7" />
        </div>

        {/* Quick Access */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-revithalize-green" />
              Quick Access
            </h2>
            <button onClick={() => navigate('/fleet-management')} className="text-sm text-gray-400 hover:text-revithalize-green transition-colors flex items-center gap-1 group">
              View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {quickAccessFeatures.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.id}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => navigate(feat.route)}
                  className={`bg-gradient-to-br ${feat.color} border border-[#2A2A2E] rounded-2xl p-4 cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-black/40 p-2.5 rounded-xl border border-white/10">
                      <Icon className={`h-5 w-5 ${feat.iconColor}`} />
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{feat.title}</h3>
                  <p className="text-xs text-[#A1A1AA] bg-black/20 px-2 py-0.5 rounded-full inline-block border border-white/10">{feat.stats}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Analytics Row */}
        <div className="grid grid-cols-2 gap-6">
          <BatteryMetrics />
          <ChargingScheduler />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <EcoScore score={efficiencyScore} scoreChange={3} />
          <FleetOverview />
        </div>

        {/* IoT + Quick Actions */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <IoTInsights />
          </div>
          <ProfessionalQuickActions
            totalDistance={totalDistance}
            energyCost={energyCost}
            onFindChargingStations={() => { toast.info('Finding optimal charging stations'); navigate('/map'); }}
            onRemoteCharging={() => { toast.success('Remote charging initiated', { description: 'Your vehicle will begin charging shortly' }); }}
            onSetChargeAlert={() => { toast.success('Smart charge alert configured', { description: 'AI will optimize charging based on your schedule' }); }}
          />
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
