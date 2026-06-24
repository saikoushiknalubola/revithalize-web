import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
  Lock, Navigation, Route, Wrench, Leaf, Zap, Shield, Map as MapIcon,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { ChargingHero } from '@/components/dashboard/ChargingHero';
import { HealthRing } from '@/components/dashboard/HealthRing';
import { ServiceCard } from '@/components/dashboard/ServiceCard';
import { StatTile } from '@/components/ui/stat-tile';
import { SectionHeader } from '@/components/ui/section-header';
import { QuickActionChip } from '@/components/ui/quick-action-chip';
import { GlassCard } from '@/components/ui/glass-card';

// Static demo data
const batteryLevel = 82;
const range = 118;
const totalDistance = 12450;
const energyCost = 3745.5;

const recentRides = [
  { id: 1, route: 'Home → Office', distance: '14.2', date: 'Today, 9:15 AM', duration: '32 min' },
  { id: 2, route: 'Office → Market', distance: '6.8', date: 'Yesterday, 6:30 PM', duration: '18 min' },
  { id: 3, route: 'Market → Home', distance: '15.1', date: 'Yesterday, 8:00 PM', duration: '37 min' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('Rider');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

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
      if (data?.full_name) setUserName(data.full_name.split(' ')[0]);
    })();
  }, [navigate]);

  useEffect(() => { if (feature) setActiveFeature(feature); }, [feature]);

  const quickActions = [
    { icon: Lock, label: 'Lock', onClick: () => toast.success('Vehicle locked') },
    { icon: Navigation, label: 'Locate', onClick: () => navigate('/map') },
    { icon: Route, label: 'Trip', onClick: () => navigate('/analytics') },
    { icon: Wrench, label: 'Service', onClick: () => navigate('/maintenance-ai') },
  ];

  const shortcuts = [
    { id: 'battery', title: 'Battery', icon: Shield, route: '/battery-twin', stat: '98% health' },
    { id: 'eco', title: 'Eco', icon: Leaf, route: '/eco-program', stat: '234 kg CO₂' },
    { id: 'charging', title: 'Charging', icon: Zap, route: '/charging-intelligence', stat: 'Smart schedule' },
    { id: 'map', title: 'Stations', icon: MapIcon, route: '/map', stat: '12 nearby' },
  ];

  return (
    <DashboardLayout activeFeature={activeFeature} setActiveFeature={setActiveFeature}>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-5"
      >
        {/* Greeting */}
        <div>
          <p className="text-eyebrow">Welcome back</p>
          <h1 className="text-display text-2xl sm:text-3xl text-foreground">{userName}</h1>
        </div>

        {/* Hero */}
        <ChargingHero
          vehicleName="Hero Honda Passion Pro"
          socPct={batteryLevel}
          rangeKm={range}
          charging
          etaMinutes={84}
          savedToday="₹38"
        />

        {/* Quick actions */}
        <div className="surface-card p-4">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map(a => (
              <QuickActionChip key={a.label} icon={a.icon} label={a.label} onClick={a.onClick} />
            ))}
          </div>
        </div>

        {/* Today metrics */}
        <section>
          <SectionHeader eyebrow="Today" title="At a glance" to="/advanced-analytics" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatTile label="Distance" value="24" unit="km" delta={12} accent />
            <StatTile label="Saved" value="₹38" delta={8.4} />
            <StatTile label="CO₂ avoided" value="4.2" unit="kg" delta={6.1} />
            <StatTile label="Efficiency" value="96" unit="%" delta={2.3} accent />
          </div>
        </section>

        {/* Vehicle health */}
        <HealthRing
          segments={[
            { label: 'Battery pack', value: 98, to: '/battery-twin' },
            { label: 'Motor & drivetrain', value: 94, to: '/vehicle' },
            { label: 'Brakes', value: 88, to: '/maintenance-ai' },
          ]}
        />

        {/* Next service */}
        <ServiceCard description="Inspection due in 412 km · scheduled this week" />

        {/* Shortcuts */}
        <section>
          <SectionHeader eyebrow="Tools" title="Smart features" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {shortcuts.map(s => {
              const Icon = s.icon;
              return (
                <GlassCard
                  key={s.id}
                  interactive
                  onClick={() => navigate(s.route)}
                  role="button"
                  className="cursor-pointer"
                >
                  <Icon className="w-5 h-5 text-primary mb-3" />
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.stat}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Trips */}
        <section>
          <SectionHeader eyebrow="History" title="Recent trips" to="/analytics" />
          <div className="space-y-2">
            {recentRides.map(r => (
              <div key={r.id} className="surface-card p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{r.route}</p>
                  <p className="text-[11px] text-muted-foreground tabular">{r.date} · {r.duration}</p>
                </div>
                <span className="tabular text-sm text-primary font-semibold shrink-0">{r.distance} km</span>
              </div>
            ))}
          </div>
        </section>

        {/* Lifetime stats */}
        <section className="grid grid-cols-2 gap-3">
          <StatTile label="Lifetime distance" value={totalDistance.toLocaleString()} unit="km" />
          <StatTile label="Energy spend" value={`₹${energyCost.toLocaleString()}`} accent />
        </section>
      </motion.div>
    </DashboardLayout>
  );
}
