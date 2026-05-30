import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Gauge, Map, Activity, Shield, TrendingUp, ArrowRight, Bell, Settings, Leaf, Zap, Wrench } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { BikeHeroSection } from '@/components/features/BikeHeroSection';
import { BikeStatCard } from '@/components/mobile/BikeStatCard';
import { BikeBottomNav } from '@/components/layout/BikeBottomNav';
import { Logo } from '@/components/branding/Logo';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { ChargingScheduler } from '@/components/features/ChargingScheduler';
import { EcoScore } from '@/components/features/EcoScore';
import { IoTInsights } from '@/components/features/IoTInsights';
import { ProfessionalQuickActions } from '@/components/professional/ProfessionalQuickActions';

// Static data
const batteryLevel = 82;
const health = 98;
const range = 118;
const efficiencyScore = 87;
const totalDistance = 12450;
const energyCost = 3745.50;

const recentRides = [
  { id: 1, route: 'Home → Office', distance: '14.2 km', date: 'Today, 9:15 AM', duration: '32 min' },
  { id: 2, route: 'Office → Market', distance: '6.8 km', date: 'Yesterday, 6:30 PM', duration: '18 min' },
  { id: 3, route: 'Market → Home', distance: '15.1 km', date: 'Yesterday, 8:00 PM', duration: '37 min' },
];

const quickAccessFeatures = [
  { id: 'battery', title: 'Battery Health', icon: Shield, route: '/battery-twin', color: 'from-emerald-900/60 to-emerald-700/20', iconColor: 'text-revithalize-green', stats: '98% healthy' },
  { id: 'eco', title: 'Eco Impact', icon: Leaf, route: '/eco-program', color: 'from-green-900/60 to-green-700/20', iconColor: 'text-revithalize-green', stats: '234kg CO₂ saved' },
  { id: 'charging', title: 'Charging', icon: Zap, route: '/charging-intelligence', color: 'from-emerald-900/60 to-teal-700/20', iconColor: 'text-revithalize-green', stats: 'Smart schedule' },
  { id: 'service', title: 'Service', icon: Wrench, route: '/maintenance-ai', color: 'from-teal-900/60 to-emerald-700/20', iconColor: 'text-revithalize-green', stats: 'Next: 320 km' },
];

export default function Dashboard() {


  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('Rider');
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name, user_type')
        .eq('id', user.id)
        .maybeSingle();
      if (data?.user_type === 'fleet') {
        navigate('/fleet-dashboard', { replace: true });
        return;
      }
      if (data?.full_name) {
        const first = data.full_name.split(' ')[0];
        setUserName(first);
      }
    })();
  }, [navigate]);

  useEffect(() => {
    if (feature) setActiveFeature(feature);
  }, [feature]);


  if (isMobile) {
    return (
      <div className="min-h-screen bg-black pb-28">
        <div className="max-w-[420px] mx-auto px-4">
          {/* Header with Logo */}
          <header className="flex items-center justify-between pt-5 pb-4">
            <Logo size="lg" className="h-10" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/notification-center')}
                aria-label="Notifications"
                className="w-10 h-10 rounded-full bg-[#111111] border border-[#1F1F23] flex items-center justify-center active:scale-95 transition"
              >
                <Bell className="w-4 h-4 text-gray-300" />
              </button>
              <button
                onClick={() => navigate('/settings')}
                aria-label="Settings"
                className="w-10 h-10 rounded-full bg-[#111111] border border-[#1F1F23] flex items-center justify-center active:scale-95 transition"
              >
                <Settings className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </header>

          {/* Greeting */}
          <div className="mb-4">
            <p className="text-xs text-gray-500">Welcome back,</p>
            <h1 className="text-2xl font-bold text-white tracking-tight">{userName}</h1>
          </div>

          {/* Hero Battery Section */}
          <div className="bg-gradient-to-b from-[#0D0D0D] to-[#070707] border border-[#1F1F23] rounded-3xl p-6 mb-4 shadow-xl shadow-emerald-500/5">
            <BikeHeroSection
              bikeName="Hero Honda Passion Pro"
              batteryLevel={batteryLevel}
              range={range}
              isConnected={true}
            />
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <BikeStatCard icon={Battery} value={`${batteryLevel}%`} label="Battery" iconColor="#00FF94" />
            <BikeStatCard icon={Gauge} value={`${health}%`} label="Engine Health" iconColor="#00FF94" />
            <BikeStatCard icon={Map} value={`${range} km`} label="Range" iconColor="#00B8FF" />
            <BikeStatCard icon={Activity} value={`${totalDistance.toLocaleString()}`} label="Total km" iconColor="#00B8FF" />
          </div>

          {/* Quick Access */}
          <section className="mb-5">
            <h3 className="text-sm font-semibold text-white mb-3 tracking-wide uppercase text-gray-400">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickAccessFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.button
                    key={feat.id}
                    onClick={() => navigate(feat.route)}
                    whileTap={{ scale: 0.97 }}
                    className={`bg-gradient-to-br ${feat.color} border border-[#1F1F23] rounded-2xl p-4 text-left`}
                  >
                    <Icon className={`w-5 h-5 ${feat.iconColor} mb-2`} />
                    <p className="text-sm font-semibold text-white leading-tight">{feat.title}</p>
                    <p className="text-[11px] text-gray-400 mt-1">{feat.stats}</p>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* Recent Rides */}
          <section className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400">Recent Rides</h3>
              <button
                onClick={() => navigate('/advanced-analytics')}
                className="text-xs text-revithalize-green font-medium"
              >
                See all
              </button>
            </div>
            <div className="space-y-2">
              {recentRides.map((ride) => (
                <div key={ride.id} className="bg-[#0F0F0F] border border-[#1F1F23] rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{ride.route}</span>
                    <span className="text-xs text-revithalize-green font-semibold">{ride.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">{ride.date}</span>
                    <span className="text-[11px] text-gray-500">{ride.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

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

        <div className="grid grid-cols-1 gap-6">
          <EcoScore score={efficiencyScore} scoreChange={3} />
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
