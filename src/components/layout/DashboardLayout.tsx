
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Battery, MapPin, BarChart2, User, Settings, Menu, X, LogOut, Bike, HelpCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active: boolean;
}

const NavItem = ({ icon: Icon, label, to, active }: NavItemProps) => {
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

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useScreenSize();
  const [userName, setUserName] = useState('');

  // Get user data on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.fullName || user.name || '');
    }
  }, []);

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

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

  const secondaryNavItems = [
    { icon: User, label: "Profile", to: "/profile" },
    { icon: HelpCircle, label: "Support", to: "/support" },
    { icon: Info, label: "About", to: "/about" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  // Combined nav items for mobile bottom navigation (limit to 5)
  const mobileNavItems = [
    ...mainNavItems,
    secondaryNavItems[0], // Just include Profile from secondary items
  ];

  return (
    <div className="flex min-h-screen bg-black font-poppins overflow-hidden">
      {/* Mobile sidebar toggle - Fixed positioning with higher z-index */}
      <button
        className="fixed top-4 left-4 z-[70] p-2 bg-gradient-to-r from-revithalize-dark to-gray-800 rounded-lg text-white md:hidden shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar - Updated for better mobile experience with improved scrollability */}
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
          {/* Close button for mobile - improved positioning */}
          {isMobile && sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Made sidebar content scrollable with flex-1 and overflow-y-auto */}
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
              Account
            </div>
            {secondaryNavItems.map((item, index) => (
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
          </nav>
        </div>

        <div className="flex-shrink-0 p-4 border-t border-gray-800/50">
          <div className="bg-gradient-to-br from-gray-900 to-revithalize-dark rounded-lg p-4 mb-4 transition-all duration-300 hover:shadow-lg hover:from-gray-800">
            <h3 className="text-sm font-medium text-gray-300 mb-2 font-poppins flex items-center">
              <Bike className="h-4 w-4 mr-2 text-revithalize-green" />
              Hero Honda Passion
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full transition-all duration-1000" style={{ width: '75%' }} />
              </div>
              <span className="text-white font-medium font-poppins">75%</span>
            </div>
            <p className="text-xs text-gray-400 mt-2 font-poppins">Estimated Range: 110 km</p>
            <p className="text-xs text-gray-400 mt-1 font-poppins">51.2V 45Ah Battery</p>
          </div>
          
          {userName && (
            <div className="bg-gray-900 rounded-lg p-3 mb-4 animate-fade-in">
              <p className="text-sm text-gray-300">Logged in as</p>
              <p className="text-white font-medium truncate">{userName}</p>
            </div>
          )}
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-gray-800 rounded-lg transition-all duration-200 hover:shadow-md"
          >
            <LogOut size={18} />
            <span className="font-poppins">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay - Higher z-index to ensure it's above the content but below the menu button */}
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
        
        {/* Improved Mobile bottom navigation */}
        <div className="fixed inset-x-0 bottom-0 bg-black/90 backdrop-blur-md border-t border-gray-800 md:hidden z-30 shadow-lg">
          <div className="flex justify-around items-center py-2">
            {mobileNavItems.map((item, index) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link 
                  key={item.to} 
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
                    "flex items-center justify-center h-8 w-8 rounded-full mb-1",
                    active && "bg-revithalize-green/10"
                  )}>
                    <Icon size={20} className={active ? "animate-pulse" : ""} />
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
