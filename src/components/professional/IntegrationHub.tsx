
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plug, CheckCircle, AlertCircle, Globe, Smartphone, Cloud, Database, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'api' | 'iot' | 'cloud' | 'mobile';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  icon: string;
}

export function IntegrationHub() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'api' | 'iot' | 'cloud' | 'mobile'>('all');

  const [integrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Google Maps API',
      description: 'Real-time navigation and charging station data',
      category: 'api',
      status: 'connected',
      lastSync: '2 min ago',
      icon: '🗺️'
    },
    {
      id: '2',
      name: 'AWS IoT Core',
      description: 'Cloud-based IoT device management',
      category: 'cloud',
      status: 'connected',
      lastSync: '5 min ago',
      icon: '☁️'
    },
    {
      id: '3',
      name: 'Mobile App Sync',
      description: 'ReVithalize mobile application integration',
      category: 'mobile',
      status: 'connected',
      lastSync: '1 min ago',
      icon: '📱'
    },
    {
      id: '4',
      name: 'Weather API',
      description: 'Weather data for route optimization',
      category: 'api',
      status: 'disconnected',
      lastSync: '2 hours ago',
      icon: '🌤️'
    },
    {
      id: '5',
      name: 'OBD-II Scanner',
      description: 'Direct vehicle diagnostics interface',
      category: 'iot',
      status: 'error',
      lastSync: '15 min ago',
      icon: '🔧'
    },
    {
      id: '6',
      name: 'Stripe Payments',
      description: 'Payment processing for charging sessions',
      category: 'api',
      status: 'connected',
      lastSync: '30 min ago',
      icon: '💳'
    }
  ]);

  const categories = [
    { key: 'all', label: 'All', icon: Globe },
    { key: 'api', label: 'APIs', icon: Plug },
    { key: 'iot', label: 'IoT', icon: Database },
    { key: 'cloud', label: 'Cloud', icon: Cloud },
    { key: 'mobile', label: 'Mobile', icon: Smartphone }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/20';
      case 'disconnected': return 'text-gray-400 bg-gray-400/20';
      case 'error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'error': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectedCount = integrations.filter(i => i.status === 'connected').length;

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Plug className="mr-3 h-6 w-6 text-cyan-400" />
            Integration Hub
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-cyan-500/20 text-cyan-400">
              {connectedCount}/{integrations.length} Connected
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Manage
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as any)}
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                  selectedCategory === category.key
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="h-3 w-3" />
                <span>{category.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Integrations List */}
        <div className="space-y-3">
          {filteredIntegrations.map((integration, index) => {
            const StatusIcon = getStatusIcon(integration.status);
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{integration.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-white">{integration.name}</div>
                    <div className="text-xs text-gray-400">{integration.description}</div>
                    <div className="text-xs text-gray-500 mt-1">Last sync: {integration.lastSync}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={cn("text-xs", getStatusColor(integration.status))}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {integration.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-xs">
                    {integration.status === 'connected' ? 'Configure' : 'Connect'}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-cyan-600/80 to-cyan-500/80 hover:from-cyan-500/80 hover:to-cyan-400/80 text-white">
            <Plug className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Globe className="h-4 w-4 mr-2" />
            Browse Marketplace
          </Button>
        </div>

        {/* Integration Health */}
        <div className="bg-gradient-to-r from-cyan-900/30 to-cyan-800/30 rounded-lg p-4 border border-cyan-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Integration Health</div>
              <div className="text-xs text-gray-400">Overall system connectivity status</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-cyan-400">
                {((connectedCount / integrations.length) * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-cyan-400">System reliability</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
