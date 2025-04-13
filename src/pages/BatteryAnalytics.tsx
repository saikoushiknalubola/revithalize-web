
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, TrendingDown, TrendingUp, Zap, Battery, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '@/hooks/use-mobile';

export default function BatteryAnalytics() {
  const isMobile = useIsMobile();
  
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
      <div className={`space-y-4 ${isMobile ? 'px-1' : 'px-0'}`}>
        <header className={isMobile ? 'mb-2 px-1' : 'mb-4'}>
          <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-heading font-bold text-white`}>Battery Analytics</h1>
          <p className="text-gray-400 mt-1 text-sm md:text-base">In-depth analysis of your battery performance</p>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {[
            {
              title: "Energy Used Today",
              value: "3.2 kWh",
              change: "-12%",
              trend: "down",
              icon: Zap,
              comparison: "vs. 3.6 kWh yesterday"
            },
            {
              title: "Avg. Efficiency",
              value: "92%",
              change: "+4%",
              trend: "up",
              icon: Battery,
              comparison: "vs. 88% last week"
            },
            {
              title: "Charging Time",
              value: "45 min",
              change: "+10%",
              trend: "up",
              isNegative: true,
              icon: Clock,
              comparison: "vs. 41 min last week"
            },
            {
              title: "Projected Range",
              value: "430 km",
              change: "+5%",
              trend: "up",
              icon: Calendar,
              comparison: "vs. 410 km last month"
            }
          ].map((card, idx) => (
            <Card key={idx} className="bg-gray-900 border-gray-800">
              <CardHeader className={`pb-0 ${isMobile ? 'px-3 pt-3' : 'pb-2'}`}>
                <CardDescription className="text-gray-400 flex items-center text-xs">
                  <card.icon className="mr-1 h-3 w-3" />
                  {card.title}
                </CardDescription>
              </CardHeader>
              <CardContent className={isMobile ? 'px-3 py-2' : ''}>
                <div className="flex items-center">
                  <p className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white`}>{card.value}</p>
                  <span className={`ml-2 ${card.isNegative ? 'text-red-500' : 'text-green-500'} flex items-center text-xs`}>
                    {card.trend === "up" ? 
                      <TrendingUp className="h-3 w-3 mr-0.5" /> : 
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                    }
                    {card.change}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{card.comparison}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly usage chart */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className={isMobile ? 'px-4 py-3' : ''}>
            <CardTitle className="text-white text-lg md:text-xl">Weekly Energy Usage</CardTitle>
            <CardDescription className="text-gray-400 text-xs md:text-sm">kWh consumption over the past week</CardDescription>
          </CardHeader>
          <CardContent className={`h-60 md:h-80 ${isMobile ? 'px-2 py-2' : ''}`}>
            <ChartContainer config={config}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyUsageData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888" 
                    fontSize={12} 
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="#888" 
                    fontSize={12}
                    tickMargin={10}
                  />
                  <Tooltip 
                    content={(props) => {
                      if (props.active && props.payload) {
                        return (
                          <div className="bg-gray-800 border border-gray-700 p-2 rounded-md shadow-lg">
                            <p className="text-white font-medium text-sm">{props.label}</p>
                            <p className="text-revithalize-green text-sm">{`${props.payload[0]?.value} kWh`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#00FF94" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Detailed stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className={isMobile ? 'px-4 py-3' : ''}>
              <CardTitle className="text-white text-lg md:text-xl">Efficiency Analysis</CardTitle>
              <CardDescription className="text-gray-400 text-xs md:text-sm">Your EV's performance metrics</CardDescription>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pt-1 pb-3' : ''}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Battery Efficiency", value: 92, color: "bg-revithalize-green" },
                    { label: "Motor Efficiency", value: 89, color: "bg-revithalize-blue" },
                    { label: "Regeneration", value: 78, color: "bg-yellow-500" },
                    { label: "Charging Efficiency", value: 95, color: "bg-purple-500" },
                  ].map((metric, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">{metric.label}</span>
                        <span className="text-white font-medium">{metric.value}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${metric.color} rounded-full`} 
                          style={{ width: `${metric.value}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-white font-medium text-sm mb-2">Efficiency Improvement</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-revithalize-green rounded-full transition-all" style={{ width: '4%' }} />
                    </div>
                    <span className="text-white font-medium text-sm">+4%</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Your efficiency has improved by 4% compared to last week, helping you save energy and extend range.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingDown className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-white font-medium">Energy Savings</span>
                    </div>
                    <p className="text-lg font-bold text-white">₹120</p>
                    <p className="text-xs text-gray-400">This week</p>
                  </div>
                  
                  <div className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center gap-1 mb-1">
                      <BarChart2 className="h-3 w-3 text-revithalize-blue" />
                      <span className="text-xs text-white font-medium">CO₂ Reduction</span>
                    </div>
                    <p className="text-lg font-bold text-white">32 kg</p>
                    <p className="text-xs text-gray-400">This week</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className={isMobile ? 'px-4 py-3' : ''}>
              <CardTitle className="text-white text-lg md:text-xl">Usage Patterns</CardTitle>
              <CardDescription className="text-gray-400 text-xs md:text-sm">Understanding your driving habits</CardDescription>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pt-1 pb-3' : ''}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium text-sm mb-2">Daily Usage Pattern</h3>
                  <div className="flex items-center justify-between gap-1">
                    <div className="h-20 w-full flex items-end gap-0.5">
                      {[30, 45, 75, 90, 60, 40, 20, 10, 5, 15, 45, 70, 60, 50, 35, 25, 15, 10, 20, 40, 35, 20, 15, 10].map((val, idx) => (
                        <div 
                          key={idx} 
                          className="flex-1 bg-gradient-to-t from-revithalize-green/40 to-revithalize-blue/40 rounded-t-sm hover:from-revithalize-green/60 hover:to-revithalize-blue/60 transition-colors" 
                          style={{ height: `${val}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>12 AM</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium text-sm mb-2">Top Routes</h3>
                  <div className="space-y-2">
                    {[
                      { route: "Home to Office", distance: "15.2 km", frequency: "Weekdays", efficiency: 94 },
                      { route: "Home to Mall", distance: "8.7 km", frequency: "Weekends", efficiency: 91 },
                      { route: "Office to Gym", distance: "3.2 km", frequency: "3x Weekly", efficiency: 89 },
                    ].map((route, idx) => (
                      <div key={idx} className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-white font-medium text-xs">{route.route}</h4>
                            <p className="text-[10px] text-gray-400">{route.distance} • {route.frequency}</p>
                          </div>
                          <div className="bg-gray-700 px-2 py-0.5 rounded text-[10px] font-medium text-revithalize-green">
                            {route.efficiency}% efficient
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium text-sm mb-1">Optimization Tips</h3>
                  <ul className="space-y-1.5 text-xs">
                    <li className="flex items-start gap-1.5">
                      <span className="text-revithalize-green mt-0.5 text-lg leading-none">•</span>
                      <span className="text-gray-300">Try regenerative braking more often to improve efficiency by up to 5%</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-revithalize-green mt-0.5 text-lg leading-none">•</span>
                      <span className="text-gray-300">Adjust your office commute timing to avoid peak traffic</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-revithalize-green mt-0.5 text-lg leading-none">•</span>
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
