
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Zap, Cloud, Cpu, Wifi, ThermometerSnowflake, Gauge, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScreenSize } from '@/hooks/use-mobile';

export function IoTInsights() {
  const { isMobile } = useScreenSize();
  const [activeData, setActiveData] = useState('performance');
  
  // Sample data
  const performanceData = [
    { time: '00:00', value: 92, temp: 28 },
    { time: '02:00', value: 96, temp: 27 },
    { time: '04:00', value: 95, temp: 26 },
    { time: '06:00', value: 90, temp: 28 },
    { time: '08:00', value: 82, temp: 31 },
    { time: '10:00', value: 78, temp: 34 },
    { time: '12:00', value: 75, temp: 36 },
    { time: '14:00', value: 74, temp: 35 },
    { time: '16:00', value: 78, temp: 33 },
    { time: '18:00', value: 85, temp: 31 },
    { time: '20:00', value: 89, temp: 29 },
    { time: '22:00', value: 94, temp: 28 },
  ];
  
  const connectivityData = [
    { time: '00:00', strength: 90, latency: 120 },
    { time: '02:00', strength: 92, latency: 110 },
    { time: '04:00', strength: 91, latency: 115 },
    { time: '06:00', strength: 88, latency: 125 },
    { time: '08:00', strength: 82, latency: 145 },
    { time: '10:00', strength: 75, latency: 180 },
    { time: '12:00', strength: 70, latency: 210 },
    { time: '14:00', strength: 72, latency: 195 },
    { time: '16:00', strength: 78, latency: 170 },
    { time: '18:00', strength: 85, latency: 140 },
    { time: '20:00', strength: 88, latency: 130 },
    { time: '22:00', strength: 90, latency: 120 },
  ];
  
  // Determine which dataset to use
  const activeDataset = activeData === 'performance' ? performanceData : connectivityData;
  
  // IoT system status
  const systemStatuses = [
    { name: 'Battery Controller', status: 'online', value: 100, icon: Cpu, color: 'green' },
    { name: 'Temperature Sensor', status: 'online', value: 100, icon: ThermometerSnowflake, color: 'green' },
    { name: 'Connectivity', status: 'online', value: 87, icon: Wifi, color: 'green' },
    { name: 'Power Monitoring', status: 'online', value: 100, icon: Zap, color: 'green' },
    { name: 'Speed Sensor', status: 'degraded', value: 82, icon: Gauge, color: 'yellow' },
  ];
  
  // Recent alerts
  const recentAlerts = [
    { 
      id: 1, 
      time: '30 min ago', 
      message: 'Brief connection loss to cloud service', 
      severity: 'low', 
      icon: Cloud,
      color: 'blue' 
    },
    { 
      id: 2, 
      time: '2 hours ago', 
      message: 'Speed sensor reporting intermittent values', 
      severity: 'medium',
      icon: Gauge, 
      color: 'yellow'
    },
  ];

  return (
    <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <CardTitle className="text-white text-lg sm:text-xl flex items-center">
          <Cpu className="mr-2 h-5 w-5 text-purple-400" />
          IoT System Insights
        </CardTitle>
        <CardDescription className="text-gray-400 text-xs sm:text-sm">
          Real-time monitoring of connected systems
        </CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 pointer-events-none"></div>
        
        {/* Data view selector */}
        <div className="mb-4 flex justify-center">
          <div className="inline-flex rounded-md bg-gray-800 p-1">
            <button 
              className={`px-3 py-1.5 text-xs rounded-md transition-all flex items-center gap-1 ${activeData === 'performance' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveData('performance')}
            >
              <Activity className="h-3 w-3" />
              Performance
            </button>
            <button 
              className={`px-3 py-1.5 text-xs rounded-md transition-all flex items-center gap-1 ${activeData === 'connectivity' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setActiveData('connectivity')}
            >
              <Wifi className="h-3 w-3" />
              Connectivity
            </button>
          </div>
        </div>
        
        {/* Chart */}
        <div className="mb-4 bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-sm font-medium text-white mb-2">
            24-Hour {activeData === 'performance' ? 'System Performance' : 'Connectivity Metrics'}
          </h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeDataset}
                margin={{ top: 10, right: 20, left: isMobile ? -15 : 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9D65F7" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#9D65F7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" stroke="#666" fontSize={10} />
                <YAxis 
                  stroke="#666" 
                  fontSize={10} 
                  width={25} 
                  domain={activeData === 'performance' ? [60, 100] : [50, 100]}
                />
                {activeData === 'connectivity' && (
                  <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#666" 
                    fontSize={10}
                    width={25}
                    domain={[100, 250]}
                  />
                )}
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px' }}
                  labelStyle={{ color: '#eee' }}
                  formatter={(value: any, name: any) => {
                    if (name === 'value') return [`${value}%`, 'Performance'];
                    if (name === 'temp') return [`${value}°C`, 'Temperature'];
                    if (name === 'strength') return [`${value}%`, 'Signal'];
                    if (name === 'latency') return [`${value}ms`, 'Latency'];
                    return [value, name];
                  }}
                />
                {activeData === 'performance' ? (
                  <>
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#9D65F7" 
                      fillOpacity={1}
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="temp" 
                      stroke="#38BDF8" 
                      fillOpacity={0.3}
                      fill="url(#colorTemp)" 
                      strokeWidth={1}
                    />
                  </>
                ) : (
                  <>
                    <Area 
                      type="monotone" 
                      dataKey="strength" 
                      stroke="#9D65F7" 
                      fillOpacity={1}
                      fill="url(#colorValue)" 
                      strokeWidth={2}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="latency" 
                      stroke="#38BDF8" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                    />
                  </>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* System status grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
          {systemStatuses.map((system) => (
            <div key={system.name} className="bg-gray-800/50 p-2 rounded-md backdrop-blur-sm border border-gray-700/50">
              <div className="flex items-center mb-1.5">
                <system.icon className={`h-3 w-3 mr-1.5 text-${system.color}-400`} />
                <span className="text-xs text-white truncate">{system.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-xs text-${system.color}-400`}>{system.status}</span>
                <span className="text-xs text-gray-400">{system.value}%</span>
              </div>
              <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-${system.color}-500 rounded-full`} 
                  style={{ width: `${system.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent alerts */}
        <div className="bg-gray-800/50 p-3 rounded-lg backdrop-blur-sm border border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-white flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1.5 text-yellow-500" />
              Recent Alerts
            </h3>
            <span className="text-xs text-gray-400">Last 24 hours</span>
          </div>
          
          {recentAlerts.length > 0 ? (
            <div className="space-y-2">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start p-2 rounded-md bg-gray-900/60 border border-gray-700/30">
                  <div className={`flex-shrink-0 h-6 w-6 rounded-full bg-${alert.color}-500/20 flex items-center justify-center mr-2`}>
                    <alert.icon className={`h-3 w-3 text-${alert.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs">{alert.message}</p>
                    <div className="flex justify-between mt-1">
                      <span className={`text-xs text-${alert.color}-400`}>
                        {alert.severity} severity
                      </span>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-6">
              <p className="text-gray-400 text-sm">No alerts in the last 24 hours</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
