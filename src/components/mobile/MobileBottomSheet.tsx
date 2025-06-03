
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Home, Car, MapPin, BarChart3, User, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileBottomSheet({ isOpen, onClose }: MobileBottomSheetProps) {
  const navigate = useNavigate();

  const quickActions = [
    { icon: Home, label: 'Dashboard', route: '/dashboard', color: 'text-revithalize-green' },
    { icon: Car, label: 'Vehicle', route: '/vehicle', color: 'text-blue-400' },
    { icon: MapPin, label: 'Map', route: '/map', color: 'text-purple-400' },
    { icon: BarChart3, label: 'Analytics', route: '/analytics', color: 'text-amber-400' },
    { icon: User, label: 'Profile', route: '/profile', color: 'text-pink-400' },
    { icon: Settings, label: 'Settings', route: '/settings', color: 'text-gray-400' }
  ];

  const handleNavigation = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-gray-800 rounded-t-3xl z-50 border-t border-gray-700"
          >
            {/* Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4">
              <h3 className="text-xl font-bold text-white">Quick Actions</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="px-6 pb-8">
              <div className="grid grid-cols-3 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNavigation(action.route)}
                      className="flex flex-col items-center space-y-3 p-4 rounded-2xl bg-gradient-to-br from-gray-800/70 to-gray-700/70 border border-gray-600/30 hover:border-gray-500/50 transition-all active:scale-95"
                    >
                      <div className="bg-black/30 p-3 rounded-xl">
                        <Icon className={cn("h-6 w-6", action.color)} />
                      </div>
                      <span className="text-sm font-medium text-gray-300">{action.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Safe area padding for mobile devices */}
            <div className="h-safe-area-inset-bottom" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
