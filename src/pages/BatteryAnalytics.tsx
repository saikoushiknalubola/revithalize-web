
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, TrendingDown, TrendingUp, Zap, Battery, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function BatteryAnalytics() {
  // Sample data for charts
  const weeklyUsageData = [
    { name: 'Mon', value: 12 },
    { name: 'Tue', value: 18 },
    { name: 'Wed', value: 15 },
    { name: 'Thu', value: 20 },
    { name: 'Fri', value: 24 },
    { name: 'Sat', value: 10 },
    { name: 'Sun', value: 8 },
  ];

  const efficiencyData = [
    { name: 'Last Week', efficiency: 88 },
    { name: 'This Week', efficiency: 92 },
  ];

  // Chart configuration
  const config: ChartConfig = {
    usage: {
      label: 'Energy Usage',
      theme: {
        light: '#00FF94',
        dark: '#00FF94',
      },
    },
    efficiency: {
      label: 'Efficiency',
      theme: {
        light: '#00B8FF',
        dark: '#00B8FF',
      },
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Battery Analytics</h1>
          <p className="text-gray-400 mt-1">In-depth analysis of your battery performance</p>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Zap className="mr-2 h-4 w-4" />
                Energy Used Today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-white">3.2 kWh</p>
                <span className="ml-2 text-green-500 flex items-center text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  12%
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">vs. 3.6 kWh yesterday</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Battery className="mr-2 h-4 w-4" />
                Avg. Efficiency
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-white">92%</p>
                <span className="ml-2 text-green-500 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  4%
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">vs. 88% last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Charging Time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-white">45 min</p>
                <span className="ml-2 text-red-500 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  10%
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">vs. 41 min last week</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Projected Range
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-white">430 km</p>
                <span className="ml-2 text-green-500 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  5%
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-2">vs. 410 km last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly usage chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Weekly Energy Usage</CardTitle>
            <CardDescription className="text-gray-400">kWh consumption over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    content={(props) => {
                      if (props.active && props.payload) {
                        return (
                          <div className="bg-gray-800 border border-gray-700 p-2 rounded-md">
                            <p className="text-white font-medium">{props.label}</p>
                            <p className="text-revithalize-green">{`${props.payload[0]?.value} kWh`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" fill="#00FF94" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Detailed stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Efficiency Analysis</CardTitle>
              <CardDescription className="text-gray-400">Your EV's performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Battery Efficiency</span>
                      <span className="text-white font-medium">92%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-revithalize-green rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Motor Efficiency</span>
                      <span className="text-white font-medium">89%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-revithalize-blue rounded-full" style={{ width: '89%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Regeneration</span>
                      <span className="text-white font-medium">78%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '78%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Charging Efficiency</span>
                      <span className="text-white font-medium">95%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '95%' }} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Efficiency Improvement</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-revithalize-green rounded-full" style={{ width: '4%' }} />
                    </div>
                    <span className="text-white font-medium">+4%</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Your efficiency has improved by 4% compared to last week, helping you save energy and extend range.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-white font-medium">Energy Savings</span>
                    </div>
                    <p className="text-xl font-bold text-white">₹120</p>
                    <p className="text-xs text-gray-400">This week</p>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart2 className="h-4 w-4 text-revithalize-blue" />
                      <span className="text-sm text-white font-medium">CO₂ Reduction</span>
                    </div>
                    <p className="text-xl font-bold text-white">32 kg</p>
                    <p className="text-xs text-gray-400">This week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Usage Patterns</CardTitle>
              <CardDescription className="text-gray-400">Understanding your driving habits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-3">Daily Usage Pattern</h3>
                  <div className="flex items-center justify-between gap-2">
                    <div className="h-24 w-full flex items-end gap-1">
                      {[30, 45, 75, 90, 60, 40, 20, 10, 5, 15, 45, 70, 60, 50, 35, 25, 15, 10, 20, 40, 35, 20, 15, 10].map((val, idx) => (
                        <div 
                          key={idx} 
                          className="flex-1 bg-gradient-to-t from-revithalize-green/40 to-revithalize-blue/40 rounded-t-sm" 
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-400">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-3">Top Routes</h3>
                  <div className="space-y-3">
                    {[
                      { route: "Home to Office", distance: "15.2 km", frequency: "Weekdays", efficiency: 94 },
                      { route: "Home to Mall", distance: "8.7 km", frequency: "Weekends", efficiency: 91 },
                      { route: "Office to Gym", distance: "3.2 km", frequency: "3x Weekly", efficiency: 89 },
                    ].map((route, idx) => (
                      <div key={idx} className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium">{route.route}</h4>
                            <p className="text-xs text-gray-400">{route.distance} • {route.frequency}</p>
                          </div>
                          <div className="bg-gray-700 px-2 py-1 rounded text-xs font-medium text-revithalize-green">
                            {route.efficiency}% efficient
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Optimization Tips</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-revithalize-green mt-0.5">•</span>
                      <span className="text-gray-300">Try regenerative braking more often to improve efficiency by up to 5%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-revithalize-green mt-0.5">•</span>
                      <span className="text-gray-300">Adjust your office commute timing to avoid peak traffic</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-revithalize-green mt-0.5">•</span>
                      <span className="text-gray-300">Consider using Eco mode during your weekend trips</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
