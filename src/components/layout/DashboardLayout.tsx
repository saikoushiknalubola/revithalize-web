
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Battery, MapPin, BarChart2, User, Settings, Menu, X, LogOut, Bike, HelpCircle, Info, Shield, Leaf, ScanLine, Cpu, Building2, Activity, Wrench, Users, Truck, TrendingUp, Monitor, Zap, Brain, Plug, FileCheck, BatteryCharging, Bell, UserCheck, Lock, FileBarChart, Lightbulb, Crown, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Logo } from '@/components/branding/Logo';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon: Icon, label, to, active, onClick }: NavItemProps) => {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex w-full items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 font-poppins text-left",
          active 
            ? "bg-gradient-to-r from-revithalize-dark to-gray-800 text-revithalize-green shadow-md" 
            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
        )}
      >
        <Icon size={20} className={cn(
          "transition-all", 
          active ? "text-revithalize-green" : "text-gray-400 group-hover:text-white"
        )} />
        <span className="font-medium">{label}</span>
      </button>
    );
  }
  
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 font-poppins",
        active 
          ? "bg-gradient-to-r from-revithalize-dark to-gray-800 text-revithalize-green shadow-md" 
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
      )}
    >
      <Icon size={20} className={cn(
        "transition-all", 
        active ? "text-revithalize-green" : "text-gray-400 group-hover:text-white"
      )} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeFeature?: string | null;
  setActiveFeature?: (feature: string | null) => void;
}

export function DashboardLayout({ children, activeFeature, setActiveFeature }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useScreenSize();
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState<'individual' | 'fleet'>('individual');

  // Static battery data for consistency
  const batteryData = { level: 82, range: 118 };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Get user data from Supabase (no static localStorage)
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('profiles')
        .select('full_name, user_type')
        .eq('id', user.id)
        .maybeSingle();
      if (data?.full_name) setUserName(data.full_name);
      if (data?.user_type === 'fleet') setUserType('fleet');
    })();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/auth');
  };


  const isFleet = userType === 'fleet';

  const mainNavItems = isFleet
    ? [
        { icon: LayoutDashboard, label: 'Fleet Dashboard', to: '/fleet-dashboard' },
        { icon: Truck, label: 'Fleet Management', to: '/fleet-management' },
        { icon: MapPin, label: 'Live Map', to: '/map' },
        { icon: BarChart2, label: 'Analytics', to: '/advanced-analytics' },
      ]
    : [
        { icon: Home, label: 'Dashboard', to: '/dashboard' },
        { icon: Bike, label: 'My Vehicle', to: '/vehicle' },
        { icon: MapPin, label: 'Map', to: '/map' },
        { icon: BarChart2, label: 'Analytics', to: '/analytics' },
      ];

  // Fleet-only tools (hidden for individual users)
  const fleetTools = [
    { icon: Truck, label: 'Fleet Management', to: '/fleet-management' },
    { icon: TrendingUp, label: 'Advanced Analytics', to: '/advanced-analytics' },
    { icon: Monitor, label: 'System Monitoring', to: '/system-monitoring' },
    { icon: Zap, label: 'Energy Optimization', to: '/energy-optimization' },
    { icon: Brain, label: 'Predictive Analytics', to: '/predictive-analytics' },
    { icon: Plug, label: 'Integration Hub', to: '/integration-hub' },
    { icon: FileCheck, label: 'Compliance', to: '/compliance-manager' },
    { icon: UserCheck, label: 'Customers', to: '/customer-management' },
    { icon: FileBarChart, label: 'Reports', to: '/reports' },
    { icon: Lock, label: 'Security', to: '/security' },
    { icon: Lightbulb, label: 'AI Insights', to: '/ai-insights' },
  ];

  // Shared / individual-friendly features
  const smartFeatures = [
    { icon: Shield, label: 'Battery Twin', to: '/battery-twin' },
    { icon: Leaf, label: 'Eco Program', to: '/eco-program' },
    { icon: ScanLine, label: 'AI Range', to: '/range-prediction' },
    { icon: Cpu, label: 'Smart Grid', to: '/smart-grid' },
    { icon: Activity, label: 'Carbon Tracker', to: '/carbon-tracker' },
    { icon: Wrench, label: 'Maintenance', to: '/maintenance-ai' },
    { icon: BatteryCharging, label: 'Charging', to: '/charging-intelligence' },
    { icon: Bell, label: 'Notifications', to: '/notifications' },
  ];

  const secondaryNavItems = [
    { icon: User, label: 'Profile', to: '/profile' },
    { icon: Crown, label: 'Subscription', to: '/subscription' },
    { icon: HelpCircle, label: 'Support', to: '/support' },
    { icon: Info, label: 'About', to: '/about' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  const mobileNavItems = isFleet
    ? [
        { icon: LayoutDashboard, label: 'Fleet', to: '/fleet-dashboard' },
        { icon: Truck, label: 'Vehicles', to: '/fleet-management' },
        { icon: MapPin, label: 'Map', to: '/map' },
        { icon: BarChart2, label: 'Reports', to: '/reports' },
        { icon: User, label: 'Profile', to: '/profile' },
      ]
    : [
        { icon: Home, label: 'Home', to: '/dashboard' },
        { icon: BarChart2, label: 'Stats', to: '/advanced-analytics' },
        { icon: MapPin, label: 'Map', to: '/map' },
        { icon: Wrench, label: 'Service', to: '/maintenance-ai' },
        { icon: User, label: 'Profile', to: '/profile' },
      ];


  return (
    <div className="flex min-h-screen bg-black font-poppins overflow-hidden">
      {/* Mobile top bar with logo (replaces hamburger) */}
      {isMobile && (
        <header className="fixed top-0 inset-x-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-800/50">
          <div className="flex items-center justify-between px-4 h-14 max-w-[420px] mx-auto">
            <Link to={isFleet ? '/fleet-dashboard' : '/dashboard'} className="flex items-center">
              <Logo size="md" className="h-9" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
              aria-label="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>
      )}

      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[60] bg-black/95 backdrop-blur-sm border-r border-gray-800 w-64 transition-all duration-300 ease-in-out shadow-xl flex-col",
          "hidden md:flex md:translate-x-0"
        )}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800/50">
          <Link to={isFleet ? '/fleet-dashboard' : '/dashboard'} className="flex items-center">
            <Logo size="md" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4">
          <nav className="flex flex-col gap-2">
            <div className="mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {isFleet ? 'Fleet' : 'Main'}
            </div>
            {mainNavItems.map((item, index) => (
              <div key={item.to} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <NavItem icon={item.icon} label={item.label} to={item.to} active={location.pathname === item.to} />
              </div>
            ))}

            {isFleet && (
              <>
                <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Fleet Tools
                </div>
                {fleetTools.map((item, index) => (
                  <div key={item.to} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                    <NavItem icon={item.icon} label={item.label} to={item.to} active={location.pathname === item.to} />
                  </div>
                ))}
              </>
            )}

            <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Smart Features
            </div>
            {smartFeatures.map((item, index) => (
              <div key={item.to} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <NavItem icon={item.icon} label={item.label} to={item.to} active={location.pathname === item.to} />
              </div>
            ))}

            <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </div>
            {secondaryNavItems.map((item, index) => (
              <div key={item.to} className="animate-fade-in" style={{ animationDelay: `${index * 30}ms` }}>
                <NavItem icon={item.icon} label={item.label} to={item.to} active={location.pathname === item.to} />
              </div>
            ))}
          </nav>
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-800/50">
          <div className="bg-gradient-to-br from-gray-900 to-revithalize-dark rounded-xl p-4 mb-4 border border-gray-800/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
              <Bike className="h-4 w-4 mr-2 text-revithalize-green" />
              Hero Honda Passion
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full"
                  style={{ width: `${batteryData.level}%` }}
                />
              </div>
              <span className="text-white font-medium">{batteryData.level}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Estimated Range: {batteryData.range} km</p>
          </div>

          {userName && (
            <div className="bg-gray-900/80 rounded-lg p-3 mb-4 border border-gray-800/50">
              <p className="text-sm text-gray-300">Logged in as</p>
              <p className="text-white font-medium truncate">{userName}</p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-gray-800/70 rounded-lg transition-all duration-200 border border-gray-800/30"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out w-full min-w-0",
        "md:ml-64",
        "px-3 sm:px-4 md:p-8 pb-40 md:pb-8 pt-16 md:pt-8"
      )}>
        <div className="min-h-screen bg-black w-full min-w-0 overflow-x-hidden">
          <div className="w-full min-w-0 max-w-full md:max-w-7xl mx-auto">
            {children}
          </div>
        </div>

        {/* Mobile bottom navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-3 pb-3 md:hidden pointer-events-none">
          <div className="w-full max-w-[420px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#1F1F23] rounded-3xl px-3 py-2.5 shadow-2xl pointer-events-auto">
            <div className="flex items-center justify-around">
              {mobileNavItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex min-w-0 flex-1 flex-col items-center gap-1 relative"
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200",
                      active ? "bg-revithalize-green/20 ring-1 ring-revithalize-green/50" : "bg-transparent"
                    )}>
                      <Icon className={cn("w-5 h-5", active ? "text-revithalize-green" : "text-gray-500")} />
                    </div>
                    <span className={cn("text-[10px] font-medium leading-none", active ? "text-revithalize-green" : "text-gray-500")}>
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
