import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, TrendingUp, Activity, Battery, Users, Bell, Settings, ArrowRight, AlertTriangle, CheckCircle2, IndianRupee, Wrench, Brain, BarChart2, Monitor } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BikeStatCard } from '@/components/mobile/BikeStatCard';
import { FleetManagement as FleetManagementComponent } from '@/components/professional/FleetManagement';

export default function FleetDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ full_name?: string; company_name?: string; fleet_size?: number } | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name, company_name, fleet_size, user_type')
        .eq('id', user.id)
        .maybeSingle();
      if (data?.user_type && data.user_type !== 'fleet') {
        navigate('/dashboard', { replace: true });
        return;
      }
      setProfile(data ?? null);
    })();
  }, [navigate]);

  const fleetSize = profile?.fleet_size ?? 12;
  const activeVehicles = Math.max(1, Math.floor(fleetSize * 0.83));
  const inMaintenance = Math.max(0, Math.floor(fleetSize * 0.08));
  const avgBattery = 76;
  const monthlySavings = 184500;

  const fleetTools = [
    { id: 'analytics', title: 'Advanced Analytics', icon: TrendingUp, route: '/advanced-analytics', stat: '24 Reports', color: 'from-blue-900/70 to-blue-600/30', iconColor: 'text-blue-300' },
    { id: 'monitoring', title: 'System Monitoring', icon: Monitor, route: '/system-monitoring', stat: 'All systems OK', color: 'from-green-900/70 to-green-600/30', iconColor: 'text-green-300' },
    { id: 'predictive', title: 'Predictive Analytics', icon: Brain, route: '/predictive-analytics', stat: '5 risk alerts', color: 'from-purple-900/70 to-purple-600/30', iconColor: 'text-purple-300' },
    { id: 'maintenance', title: 'Maintenance AI', icon: Wrench, route: '/maintenance-ai', stat: `${inMaintenance} due`, color: 'from-orange-900/70 to-orange-600/30', iconColor: 'text-orange-300' },
    { id: 'customers', title: 'Customer Management', icon: Users, route: '/customer-management', stat: 'Manage', color: 'from-pink-900/70 to-pink-600/30', iconColor: 'text-pink-300' },
    { id: 'reports', title: 'Reports & Export', icon: BarChart2, route: '/reports', stat: 'Quarterly', color: 'from-teal-900/70 to-teal-600/30', iconColor: 'text-teal-300' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        className="space-y-6 px-2 pb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-revithalize-green/80 font-semibold">Fleet Operations</p>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-poppins">
              {profile?.company_name || 'Fleet Control Center'}
            </h1>
            <p className="text-gray-400 mt-1 text-sm">
              Welcome back, {profile?.full_name || 'Fleet Manager'} • Real-time fleet intelligence
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/30">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live · {activeVehicles}/{fleetSize} vehicles online
            </div>
          </div>
        </header>

        {/* KPI grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <BikeStatCard icon={Truck} value={`${fleetSize}`} label="Total Vehicles" iconColor="#1E6BFF" />
          <BikeStatCard icon={CheckCircle2} value={`${activeVehicles}`} label="Active Now" iconColor="#22C55E" />
          <BikeStatCard icon={Battery} value={`${avgBattery}%`} label="Avg Battery" iconColor="#F59E0B" />
          <BikeStatCard icon={IndianRupee} value={`₹${(monthlySavings / 1000).toFixed(0)}k`} label="Saved this month" iconColor="#A855F7" />
        </div>

        {/* Alerts strip */}
        {inMaintenance > 0 && (
          <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/30 rounded-xl px-4 py-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 shrink-0" />
            <p className="text-sm text-orange-100 flex-1">
              {inMaintenance} vehicle{inMaintenance > 1 ? 's are' : ' is'} due for service this week.
            </p>
            <button
              onClick={() => navigate('/maintenance-ai')}
              className="text-xs font-semibold text-orange-300 hover:text-orange-100 transition-colors"
            >
              Review →
            </button>
          </div>
        )}

        {/* Tools grid */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Fleet Tools</h2>
            <button onClick={() => navigate('/fleet-management')} className="text-xs text-revithalize-green hover:text-revithalize-green/80 flex items-center gap-1">
              Full management <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {fleetTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => navigate(tool.route)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className={`bg-gradient-to-br ${tool.color} border border-[#2A2A2E] rounded-2xl p-4 text-left shadow-xl`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-black/40 p-2 rounded-xl border border-white/10">
                      <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm leading-tight">{tool.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{tool.stat}</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Live fleet table */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-revithalize-green" />
              Live Fleet Status
            </h2>
          </div>
          <div className="bg-[#0d0d0d] border border-[#2A2A2E] rounded-2xl p-2 md:p-4">
            <FleetManagementComponent />
          </div>
        </section>
      </motion.div>
    </DashboardLayout>
  );
}
