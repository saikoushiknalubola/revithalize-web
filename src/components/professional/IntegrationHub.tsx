
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plug, Check, AlertCircle, Settings, RefreshCw, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const integrations = [
  {
    id: 1,
    name: "Tesla Charging Network",
    description: "Access to Tesla Supercharger network",
    status: "connected",
    type: "charging",
    lastSync: "2 mins ago",
    health: "excellent"
  },
  {
    id: 2,
    name: "Google Maps API",
    description: "Route optimization and traffic data",
    status: "connected",
    type: "navigation",
    lastSync: "5 mins ago",
    health: "good"
  },
  {
    id: 3,
    name: "Weather API",
    description: "Weather-based range predictions",
    status: "connected",
    type: "data",
    lastSync: "1 min ago",
    health: "excellent"
  },
  {
    id: 4,
    name: "Fleet Management System",
    description: "Enterprise fleet coordination",
    status: "disconnected",
    type: "management",
    lastSync: "Never",
    health: "unknown"
  },
  {
    id: 5,
    name: "Energy Grid API",
    description: "Smart grid integration for optimal charging",
    status: "warning",
    type: "energy",
    lastSync: "15 mins ago",
    health: "warning"
  },
  {
    id: 6,
    name: "Maintenance Portal",
    description: "Automated service scheduling",
    status: "connected",
    type: "service",
    lastSync: "3 mins ago",
    health: "good"
  }
];

const availableIntegrations = [
  {
    id: 7,
    name: "ChargePoint Network",
    description: "Access to ChargePoint charging stations",
    type: "charging",
    popularity: "high"
  },
  {
    id: 8,
    name: "Waze Traffic Data",
    description: "Real-time traffic optimization",
    type: "navigation",
    popularity: "medium"
  },
  {
    id: 9,
    name: "Smart Home Integration",
    description: "Connect with home automation systems",
    type: "smart-home",
    popularity: "high"
  }
];

export function IntegrationHub() {
  const [selectedIntegration, setSelectedIntegration] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'disconnected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Check className="h-4 w-4" />;
      case 'warning': return <AlertCircle className="h-4 w-4" />;
      case 'disconnected': return <RefreshCw className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <Plug className="mr-3 h-6 w-6 text-revithalize-green" />
          Integration Hub
          <div className="ml-auto bg-blue-500/20 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-blue-400">6 Connected</span>
          </div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage all your third-party integrations and APIs
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Active Integrations */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3">Active Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-xl p-4 border border-gray-600/30 hover:border-revithalize-green/50 transition-all cursor-pointer"
                onClick={() => setSelectedIntegration(integration.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <Plug className="h-4 w-4 text-revithalize-green" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{integration.name}</h4>
                      <p className="text-xs text-gray-400">{integration.description}</p>
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${getStatusColor(integration.status)}`}>
                    {getStatusIcon(integration.status)}
                    <span className="text-xs font-medium capitalize">{integration.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>Last sync: {integration.lastSync}</span>
                  <span className={`px-2 py-1 rounded ${
                    integration.health === 'excellent' ? 'bg-green-500/20 text-green-400' :
                    integration.health === 'good' ? 'bg-blue-500/20 text-blue-400' :
                    integration.health === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {integration.health}
                  </span>
                </div>
                
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" variant="outline" className="bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                  {integration.status === 'disconnected' && (
                    <Button size="sm" className="bg-revithalize-green hover:bg-revithalize-green/80 text-black">
                      Connect
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Available Integrations */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white mb-3">Available Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableIntegrations.map((integration, index) => (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-4 border border-gray-600/30 hover:border-revithalize-green/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-black/30 p-2 rounded-lg">
                      <ExternalLink className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{integration.name}</h4>
                      <p className="text-xs text-gray-400">{integration.description}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    integration.popularity === 'high' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {integration.popularity} demand
                  </span>
                </div>
                
                <Button size="sm" className="w-full bg-revithalize-green hover:bg-revithalize-green/80 text-black">
                  <Plug className="h-3 w-3 mr-1" />
                  Add Integration
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
