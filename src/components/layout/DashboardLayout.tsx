import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Battery, MapPin, BarChart2, User, Settings, Menu, X, LogOut, Bike, HelpCircle, Info, Shield, Leaf, ScanLine, Cpu, Building2, Activity, Wrench, Users, Truck, TrendingUp, Monitor, Zap, Brain, Plug, FileCheck, BatteryCharging, Bell, UserCheck, Lock, FileBarChart, Lightbulb, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';

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
  
  // Static battery data for consistency
  const batteryData = { level: 82, range: 118 };

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Get user data
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.fullName || user.name || 'User');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const mainNavItems = [
    { icon: Home, label: "Dashboard", to: "/dashboard" },
    { icon: Bike, label: "Vehicle", to: "/vehicle" },
    { icon: MapPin, label: "Map", to: "/map" },
    { icon: BarChart2, label: "Analytics", to: "/analytics" },
  ];

  const professionalTools = [
    { icon: Truck, label: "Fleet Management", to: "/fleet-management" },
    { icon: TrendingUp, label: "Advanced Analytics", to: "/advanced-analytics" },
    { icon: Monitor, label: "System Monitoring", to: "/system-monitoring" },
    { icon: Zap, label: "Energy Optimization", to: "/energy-optimization" },
    { icon: Brain, label: "Predictive Analytics", to: "/predictive-analytics" },
    { icon: Settings, label: "Performance Optimization", to: "/performance-optimization" },
    { icon: Plug, label: "Integration Hub", to: "/integration-hub" },
    { icon: FileCheck, label: "Compliance Manager", to: "/compliance-manager" },
    { icon: BatteryCharging, label: "Charging Intelligence", to: "/charging-intelligence" },
    { icon: Bell, label: "Notifications", to: "/notifications" },
    { icon: UserCheck, label: "Customer Management", to: "/customer-management" },
    { icon: Lock, label: "Security", to: "/security" },
    { icon: FileBarChart, label: "Reports", to: "/reports" },
    { icon: Lightbulb, label: "AI Insights", to: "/ai-insights" },
  ];

  const innovativeFeatures = [
    { icon: Shield, label: "Battery Twin", to: "/battery-twin" },
    { icon: Leaf, label: "Eco Program", to: "/eco-program" },
    { icon: ScanLine, label: "AI Range", to: "/range-prediction" },
    { icon: Cpu, label: "Smart Grid", to: "/smart-grid" },
  ];

  const dashboardFeatures = [
    { icon: Building2, label: "Company Vision", to: "/company-vision" },
    { icon: Activity, label: "Carbon Tracker", to: "/carbon-tracker" },
    { icon: Wrench, label: "Maintenance AI", to: "/maintenance-ai" },
    { icon: Users, label: "Energy Network", to: "/energy-network" },
  ];

  const secondaryNavItems = [
    { icon: User, label: "Profile", to: "/profile" },
    { icon: Crown, label: "Subscription", to: "/subscription" },
    { icon: HelpCircle, label: "Support", to: "/support" },
    { icon: Info, label: "About", to: "/about" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  const mobileNavItems = [
    { icon: Home, label: "Dashboard", to: "/dashboard" },
    { icon: Bike, label: "Vehicle", to: "/vehicle" },
    { icon: MapPin, label: "Map", to: "/map" },
    { 
      icon: Shield, 
      label: "Features", 
      action: () => {
        setSidebarOpen(true);
        setTimeout(() => {
          document.querySelector('.innovative-features-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    { icon: User, label: "Profile", to: "/profile" },
  ];

  return (
    <div className="flex min-h-screen bg-black font-poppins overflow-hidden">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-[70] p-2 bg-gradient-to-r from-revithalize-dark to-gray-800 rounded-lg text-white md:hidden shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Enhanced Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[60] bg-black/95 backdrop-blur-sm border-r border-gray-800 w-64 transform transition-all duration-300 ease-in-out md:translate-x-0 shadow-xl flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800/50">
          <h1 className="text-2xl font-poppins font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue pl-8 md:pl-0">
            ReVithalize
          </h1>
          {/* Single close button for mobile - only show when sidebar is open */}
          {isMobile && sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          <nav className="flex flex-col gap-2">
            <div className="mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </div>
            {mainNavItems.map((item, index) => (
              <div 
                key={item.to}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                />
              </div>
            ))}
            
            <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Professional Tools
            </div>
            {professionalTools.map((item, index) => (
              <div 
                key={item.to}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + mainNavItems.length) * 50}ms` }}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                />
              </div>
            ))}
            
            <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Dashboard Features
            </div>
            {dashboardFeatures.map((item, index) => (
              <div 
                key={item.to}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + mainNavItems.length + professionalTools.length) * 50}ms` }}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                />
              </div>
            ))}
            
            <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider innovative-features-section">
              Smart Features
            </div>
            {innovativeFeatures.map((item, index) => (
              <div 
                key={item.to}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + mainNavItems.length + professionalTools.length + dashboardFeatures.length) * 50}ms` }}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                />
              </div>
            ))}
            
            <div className="mt-6 mb-1 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Account
            </div>
            {secondaryNavItems.map((item, index) => (
              <div 
                key={item.to}
                className="animate-fade-in"
                style={{ animationDelay: `${(index + mainNavItems.length + professionalTools.length + dashboardFeatures.length + innovativeFeatures.length) * 50}ms` }}
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={location.pathname === item.to}
                />
              </div>
            ))}
          </nav>
        </div>

        {/* Enhanced Footer */}
        <div className="flex-shrink-0 p-4 border-t border-gray-800/50">
          <div className="bg-gradient-to-br from-gray-900 to-revithalize-dark rounded-xl p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:from-gray-800 border border-gray-800/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2 font-poppins flex items-center">
              <Bike className="h-4 w-4 mr-2 text-revithalize-green" />
              Hero Honda Passion
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full shadow-sm" 
                  style={{ width: `${batteryData.level}%` }} 
                />
              </div>
              <span className="text-white font-medium font-poppins">{batteryData.level}%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 font-poppins">Estimated Range: {batteryData.range} km</p>
          </div>
          
          {userName && (
            <div className="bg-gray-900/80 rounded-lg p-3 mb-4 animate-fade-in border border-gray-800/50">
              <p className="text-sm text-gray-300">Logged in as</p>
              <p className="text-white font-medium truncate">{userName}</p>
            </div>
          )}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-gray-800/70 rounded-lg transition-all duration-200 hover:shadow-md border border-gray-800/30"
          >
            <LogOut size={18} />
            <span className="font-poppins">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        "md:ml-64",
        "p-4 md:p-8 pb-24 md:pb-8 pt-16 md:pt-8"
      )}>
        <div className="min-h-screen bg-black">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
        
        {/* Enhanced Mobile bottom navigation */}
        <div className="fixed inset-x-0 bottom-0 bg-black/95 backdrop-blur-md border-t border-gray-800 md:hidden z-30 shadow-2xl">
          <div className="flex justify-around items-center py-3">
            {mobileNavItems.map((item, index) => {
              const Icon = item.icon;
              const active = item.to ? location.pathname === item.to : false;
              
              if ('action' in item) {
                return (
                  <button 
                    key={index} 
                    onClick={item.action}
                    className={cn(
                      "flex flex-col items-center p-2 transition-all duration-200",
                      active 
                        ? "text-revithalize-green" 
                        : "text-gray-400 hover:text-gray-200"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={cn(
                      "flex items-center justify-center h-10 w-10 rounded-full mb-1",
                      active && "bg-revithalize-green/10"
                    )}>
                      <Icon size={22} className="text-revithalize-green animate-pulse" />
                    </div>
                    <span className="text-xs font-poppins">{item.label}</span>
                  </button>
                );
              }
              
              return (
                <Link 
                  key={index} 
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center p-2 transition-all duration-200",
                    active 
                      ? "text-revithalize-green" 
                      : "text-gray-400 hover:text-gray-200"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-full mb-1",
                    active && "bg-revithalize-green/10"
                  )}>
                    <Icon size={22} className={active ? "animate-pulse" : ""} />
                  </div>
                  <span className="text-xs font-poppins">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
