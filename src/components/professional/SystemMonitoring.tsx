
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Cpu, HardDrive, Thermometer, Wifi, AlertTriangle, CheckCircle, Clock, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  icon: any;
  trend: 'up' | 'down' | 'stable';
}

export function SystemMonitoring() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { id: 'cpu', name: 'CPU Usage', value: 23, unit: '%', status: 'normal', icon: Cpu, trend: 'stable' },
    { id: 'memory', name: 'Memory', value: 67, unit: '%', status: 'warning', icon: HardDrive, trend: 'up' },
    { id: 'temp', name: 'Temperature', value: 42, unit: '°C', status: 'normal', icon: Thermometer, trend: 'down' },
    { id: 'network', name: 'Network', value: 95, unit: '%', status: 'normal', icon: Wifi, trend: 'stable' }
  ]);

  const [alerts] = useState([
    { id: 1, type: 'warning', message: 'Battery temperature slightly elevated', time: '2 min ago' },
    { id: 2, type: 'info', message: 'System update available', time: '15 min ago' },
    { id: 3, type: 'success', message: 'Charging cycle completed', time: '1 hour ago' }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 5))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Clock;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="mr-3 h-6 w-6 text-green-400" />
            System Monitoring
          </div>
          <Button size="sm" variant="outline" className="text-xs">
            <Settings className="h-3 w-3 mr-1" />
            Configure
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* System Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">{metric.name}</span>
                  </div>
                  <Badge className={cn("text-xs", getStatusColor(metric.status))}>
                    {metric.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-white">
                    {metric.value.toFixed(0)}{metric.unit}
                  </div>
                  <div className={cn("text-xs", 
                    metric.trend === 'up' ? 'text-red-400' : 
                    metric.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                  )}>
                    {metric.trend === 'up' ? '↗' : metric.trend === 'down' ? '↘' : '→'}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-3 w-full bg-gray-800 rounded-full h-2">
                  <motion.div 
                    className={cn("h-2 rounded-full", 
                      metric.status === 'normal' ? 'bg-green-400' :
                      metric.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Alerts */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-yellow-400" />
            Recent Alerts
          </h4>
          <div className="space-y-2">
            {alerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50"
                >
                  <AlertIcon className={cn("h-4 w-4", 
                    alert.type === 'warning' ? 'text-yellow-400' :
                    alert.type === 'success' ? 'text-green-400' : 'text-blue-400'
                  )} />
                  <div className="flex-1">
                    <div className="text-sm text-white">{alert.message}</div>
                    <div className="text-xs text-gray-400">{alert.time}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* System Status Summary */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Overall System Health</div>
              <div className="text-xs text-gray-400">All systems operational</div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-green-400">Healthy</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
