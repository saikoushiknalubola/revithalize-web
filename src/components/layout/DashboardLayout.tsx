
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Battery, MapPin, BarChart2, User, Settings, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

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
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-poppins",
        active 
          ? "bg-revithalize-dark text-revithalize-green" 
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      )}
    >
      <Icon size={20} className={active ? "text-revithalize-green" : ""} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const navItems = [
    { icon: Home, label: "Home", to: "/" },
    { icon: Battery, label: "Vehicle", to: "/vehicle" },
    { icon: MapPin, label: "Map", to: "/map" },
    { icon: BarChart2, label: "Analytics", to: "/analytics" },
    { icon: User, label: "Profile", to: "/profile" },
    { icon: Settings, label: "Settings", to: "/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-black font-poppins">
      {/* Mobile sidebar toggle */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-revithalize-dark rounded-lg text-white md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-black/95 border-r border-gray-800 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center mb-8 mt-4">
            <h1 className="text-3xl font-poppins font-bold text-revithalize-green">
              Revithalize<span className="text-white ml-1">EV</span>
            </h1>
          </div>

          <nav className="flex flex-col gap-2 flex-1">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                icon={item.icon}
                label={item.label}
                to={item.to}
                active={location.pathname === item.to}
              />
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-800">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2 font-poppins">Battery Status</h3>
              <div className="flex items-center gap-3">
                <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-white font-medium font-poppins">75%</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-poppins">Estimated Range: 120 km</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay to close sidebar on mobile */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-200 ease-in-out",
        "md:ml-64"
      )}>
        <div className="min-h-screen bg-black py-4 pt-16 md:pt-4">
          {children}
        </div>
        
        {/* Mobile bottom navigation */}
        <div className="fixed inset-x-0 bottom-0 bg-revithalize-dark border-t border-gray-800 md:hidden z-30">
          <div className="flex justify-around py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.to;
              return (
                <Link 
                  key={item.to} 
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center p-2",
                    active ? "text-revithalize-green" : "text-gray-400"
                  )}
                >
                  <Icon size={20} />
                  <span className="text-xs mt-1 font-poppins">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
