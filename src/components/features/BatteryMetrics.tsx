
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Battery, Calendar, Zap, Clock, TrendingUp } from 'lucide-react';

const weeklyData = [
  { day: 'Mon', percentage: 85, range: 145, efficiency: 92 },
  { day: 'Tue', percentage: 72, range: 128, efficiency: 89 },
  { day: 'Wed', percentage: 65, range: 112, efficiency: 88 },
  { day: 'Thu', percentage: 92, range: 158, efficiency: 94 },
  { day: 'Fri', percentage: 78, range: 132, efficiency: 90 },
  { day: 'Sat', percentage: 80, range: 138, efficiency: 91 },
  { day: 'Sun', percentage: 88, range: 150, efficiency: 93 },
];

const monthlyData = [
  { name: 'Week 1', percentage: 82, range: 140, efficiency: 91 },
  { name: 'Week 2', percentage: 79, range: 135, efficiency: 90 },
  { name: 'Week 3', percentage: 85, range: 145, efficiency: 92 },
  { name: 'Week 4', percentage: 80, range: 138, efficiency: 91 },
];

export function BatteryMetrics() {
  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center font-poppins">
          <Battery className="mr-2 h-5 w-5 text-revithalize-blue" />
          Battery Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-800">
            <TabsTrigger value="weekly" className="font-poppins">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="font-poppins">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPercentage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF94" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00FF94" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="day" tick={{ fill: '#888' }} />
                  <YAxis tick={{ fill: '#888' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#00FF94' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Area type="monotone" dataKey="percentage" stroke="#00FF94" fillOpacity={1} fill="url(#colorPercentage)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-revithalize-green" />
                  <span className="text-white text-sm font-poppins">Avg. Efficiency</span>
                </div>
                <p className="text-lg font-semibold text-white font-poppins">91%</p>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-revithalize-blue" />
                  <span className="text-white text-sm font-poppins">Avg. Range</span>
                </div>
                <p className="text-lg font-semibold text-white font-poppins">137 km</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00B8FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00B8FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" tick={{ fill: '#888' }} />
                  <YAxis tick={{ fill: '#888' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#00B8FF' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Area type="monotone" dataKey="range" stroke="#00B8FF" fillOpacity={1} fill="url(#colorRange)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-revithalize-green" />
                  <span className="text-white text-sm font-poppins">Monthly Cycles</span>
                </div>
                <p className="text-lg font-semibold text-white font-poppins">24</p>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-revithalize-blue" />
                  <span className="text-white text-sm font-poppins">Total Charge Time</span>
                </div>
                <p className="text-lg font-semibold text-white font-poppins">48 hours</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
