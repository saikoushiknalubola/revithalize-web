
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Key, Users, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SecurityEvent {
  id: string;
  type: 'login' | 'access' | 'warning' | 'update';
  message: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
  user: string;
}

export function SecurityManager() {
  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: '1',
      type: 'login',
      message: 'Successful login from new device',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: 'low',
      user: 'Rajesh Kumar'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Multiple failed login attempts detected',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      severity: 'high',
      user: 'Unknown'
    },
    {
      id: '3',
      type: 'access',
      message: 'API key accessed from admin panel',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: 'medium',
      user: 'Admin'
    }
  ]);

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    auditLogsEnabled: true,
    apiRateLimiting: true,
    encryptionLevel: 'AES-256'
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/20';
      case 'high': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'login': return Users;
      case 'access': return Key;
      case 'warning': return AlertTriangle;
      case 'update': return Activity;
      default: return Shield;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Shield className="mr-3 h-6 w-6 text-red-400" />
          Security Center
          <div className="ml-auto bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">SECURE</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Security Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Security Score</div>
                <div className="text-lg font-bold text-white">98/100</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Eye className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Active Sessions</div>
                <div className="text-lg font-bold text-white">23</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Security Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                <Lock className="h-4 w-4 text-green-400" />
                <span className="text-white text-sm">Two-Factor Auth</span>
              </div>
              <div className={cn("w-3 h-3 rounded-full", securitySettings.twoFactorEnabled ? "bg-green-400" : "bg-gray-600")} />
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                <Activity className="h-4 w-4 text-blue-400" />
                <span className="text-white text-sm">Audit Logs</span>
              </div>
              <div className={cn("w-3 h-3 rounded-full", securitySettings.auditLogsEnabled ? "bg-green-400" : "bg-gray-600")} />
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                <Shield className="h-4 w-4 text-purple-400" />
                <span className="text-white text-sm">API Rate Limiting</span>
              </div>
              <div className={cn("w-3 h-3 rounded-full", securitySettings.apiRateLimiting ? "bg-green-400" : "bg-gray-600")} />
            </div>

            <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30">
              <div className="flex items-center space-x-3">
                <Key className="h-4 w-4 text-amber-400" />
                <span className="text-white text-sm">{securitySettings.encryptionLevel}</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
          </div>
        </div>

        {/* Recent Security Events */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Recent Security Events</h3>
          
          {securityEvents.map((event, index) => {
            const Icon = getEventIcon(event.type);
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-3 border border-gray-600/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-700/50 p-2 rounded-lg">
                      <Icon className="h-4 w-4 text-gray-300" />
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{event.message}</div>
                      <div className="text-xs text-gray-400">
                        {event.user} • {event.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className={cn("px-2 py-1 rounded-full text-xs font-medium", getSeverityColor(event.severity))}>
                    {event.severity.toUpperCase()}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Security Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-red-600/80 to-red-500/80 hover:from-red-500/80 hover:to-red-400/80 text-white">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Security Scan
          </Button>
          <Button className="bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-500/80 hover:to-blue-400/80 text-white">
            <Eye className="h-4 w-4 mr-2" />
            View Logs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
