
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, AlertTriangle, CheckCircle, Info, Zap, Battery, Wrench, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Battery Level Low',
      message: 'Your battery is at 15%. Consider charging soon.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      action: {
        label: 'Find Charger',
        onClick: () => console.log('Navigate to map')
      }
    },
    {
      id: '2',
      type: 'success',
      title: 'Charging Complete',
      message: 'Your vehicle has reached 100% charge at Home Garage.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      type: 'info',
      title: 'Maintenance Reminder',
      message: 'Scheduled service due in 3 days. Book your appointment.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      action: {
        label: 'Book Service',
        onClick: () => console.log('Navigate to maintenance')
      }
    },
    {
      id: '4',
      type: 'info',
      title: 'Route Optimization',
      message: 'New efficient route found for your daily commute. Save 12% energy.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'error': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning': return 'text-amber-400 bg-amber-400/20';
      case 'success': return 'text-green-400 bg-green-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      case 'info': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || !notification.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-xl flex items-center">
            <Bell className="mr-3 h-6 w-6 text-revithalize-green" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </CardTitle>
          
          {/* Filter Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                filter === 'all' 
                  ? "bg-revithalize-green text-white" 
                  : "bg-gray-700 text-gray-400 hover:text-white"
              )}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                filter === 'unread' 
                  ? "bg-revithalize-green text-white" 
                  : "bg-gray-700 text-gray-400 hover:text-white"
              )}
            >
              Unread
            </button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No notifications to show</p>
            </div>
          ) : (
            filteredNotifications.map((notification, index) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "relative bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border transition-all",
                    notification.read ? "border-gray-600/30" : "border-revithalize-green/30 bg-revithalize-green/5"
                  )}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  {/* Dismiss Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notification.id);
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-600/50 transition-colors"
                  >
                    <X className="h-3 w-3 text-gray-400" />
                  </button>

                  <div className="flex items-start space-x-3 pr-6">
                    <div className={cn("p-2 rounded-lg flex-shrink-0", getNotificationColor(notification.type))}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={cn(
                          "font-medium truncate",
                          notification.read ? "text-gray-300" : "text-white"
                        )}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-revithalize-green rounded-full flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {notification.timestamp.toLocaleTimeString()}
                        </span>
                        
                        {notification.action && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              notification.action!.onClick();
                            }}
                            className="text-xs bg-revithalize-green/20 hover:bg-revithalize-green/30 text-revithalize-green px-3 py-1 rounded-full transition-colors"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
