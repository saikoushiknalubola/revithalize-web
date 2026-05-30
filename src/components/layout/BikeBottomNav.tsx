import React from 'react';
import { Home, BarChart2, Wrench, User, Map } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', route: '/dashboard' },
  { icon: BarChart2, label: 'Stats', route: '/advanced-analytics' },
  { icon: Map, label: 'Map', route: '/map' },
  { icon: Wrench, label: 'Service', route: '/maintenance-ai' },
  { icon: User, label: 'Profile', route: '/profile' },
];

export function BikeBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-4">
      <div className="w-full max-w-[420px] bg-[#0A0A0A]/95 backdrop-blur-xl border border-[#1F1F23] rounded-3xl px-4 py-3 shadow-2xl">
        <div className="flex items-center justify-around">
          {navItems.map(({ icon: Icon, label, route }) => {
            const isActive = location.pathname === route;
            return (
              <button
                key={route}
                onClick={() => navigate(route)}
                className="flex flex-col items-center gap-1 relative"
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                  isActive ? "bg-revithalize-green/20 ring-1 ring-revithalize-green/50" : "bg-transparent hover:bg-[#1F1F23]"
                )}>
                  <Icon className={cn("w-5 h-5", isActive ? "text-revithalize-green" : "text-gray-500")} />
                </div>
                <span className={cn("text-[10px] font-medium leading-none", isActive ? "text-revithalize-green" : "text-gray-500")}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
