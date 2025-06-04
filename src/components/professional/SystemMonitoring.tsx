
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Monitor, Cpu, HardDrive, Wifi, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { RealTimeStatusCard } from './RealTimeStatusCard';

interface SystemStatus {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: number;
  lastCheck: Date;
  metrics: {
    cpu: number;
    memory: number;
    network: number;
  };
}

export function SystemMonitoring() {
  const [systems, setSystems] = useState<SystemStatus[]>([
    {
      id: '1',
      name: 'Fleet Management System',
      status: 'healthy',
      uptime: 99.9,
      lastCheck: new Date(),
      metrics: { cpu: 45, memory: 62, network: 78 }
    },
    {
      id: '2',
      name: 'Charging Network',
      status: 'warning',
      uptime: 98.5,
      lastCheck: new Date(),
      metrics: { cpu: 72, memory: 85, network: 91 }
    },
    {
      id: '3',
      name: 'Analytics Engine',
      status: 'healthy',
      uptime: 99.7,
      lastCheck: new Date(),
      metrics: { cpu: 38, memory: 55, network: 82 }
    }
  ]);

  const [overallMetrics, setOverallMetrics] = useState({
    systemHealth: 95,
    activeSystems: 3,
    totalAlerts: 2,
    responseTime: 120
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSystems(prev => prev.map(system => ({
        ...system,
        lastCheck: new Date(),
        metrics: {
          cpu: Math.max(20, Math.min(90, system.metrics.cpu + (Math.random() - 0.5) * 10)),
          memory: Math.max(30, Math.min(95, system.metrics.memory + (Math.random() - 0.5) * 8)),
          network: Math.max(40, Math.min(99, system.metrics.network + (Math.random() - 0.5) * 12))
        }
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: SystemStatus['status']) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-400/20';
      case 'warning': return 'text-yellow-400 bg-yellow-400/20';
      case 'critical': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: SystemStatus['status']) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Monitor;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Monitor className="mr-3 h-6 w-6 text-revithalize-blue" />
          System Monitoring
          <div className="ml-auto bg-green-500/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-green-400">Live</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time system health and performance monitoring
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <RealTimeStatusCard
            icon={Activity}
            label="System Health"
            value={`${overallMetrics.systemHealth}%`}
            subtext="Overall Status"
            color="text-green-400"
            progress={overallMetrics.systemHealth}
          />
          
          <RealTimeStatusCard
            icon={Monitor}
            label="Active Systems"
            value={overallMetrics.activeSystems.toString()}
            subtext="Running Services"
            color="text-blue-400"
          />
          
          <RealTimeStatusCard
            icon={AlertTriangle}
            label="Active Alerts"
            value={overallMetrics.totalAlerts.toString()}
            subtext="Require Attention"
            color="text-yellow-400"
          />
          
          <RealTimeStatusCard
            icon={Wifi}
            label="Response Time"
            value={`${overallMetrics.responseTime}ms`}
            subtext="Average Latency"
            color="text-purple-400"
          />
        </div>

        {/* System Status List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3">System Status</h3>
          {systems.map((system, index) => {
            const StatusIcon = getStatusIcon(system.status);
            return (
              <motion.div
                key={system.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <Monitor className="h-5 w-5 text-revithalize-blue" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{system.name}</div>
                      <div className="text-xs text-gray-400">
                        Last check: {system.lastCheck.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(system.status)}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{system.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">CPU</span>
                      </div>
                      <span className="text-sm text-white">{system.metrics.cpu.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          system.metrics.cpu > 80 ? 'bg-red-500' :
                          system.metrics.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${system.metrics.cpu}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <HardDrive className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-gray-300">Memory</span>
                      </div>
                      <span className="text-sm text-white">{system.metrics.memory.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          system.metrics.memory > 85 ? 'bg-red-500' :
                          system.metrics.memory > 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${system.metrics.memory}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">Network</span>
                      </div>
                      <span className="text-sm text-white">{system.metrics.network.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-revithalize-green to-revithalize-blue"
                        initial={{ width: 0 }}
                        animate={{ width: `${system.metrics.network}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-400">
                  Uptime: {system.uptime}% • Last 30 days
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
