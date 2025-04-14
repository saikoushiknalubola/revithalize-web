
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export default function BatteryAnalytics() {
  // Sample data for charts
  const dailyUsageData = [
    { name: 'Mon', usage: 45 },
    { name: 'Tue', usage: 52 },
    { name: 'Wed', usage: 38 },
    { name: 'Thu', usage: 65 },
    { name: 'Fri', usage: 59 },
    { name: 'Sat', usage: 28 },
    { name: 'Sun', usage: 32 },
  ];

  const efficiencyData = [
    { name: 'Week 1', efficiency: 92 },
    { name: 'Week 2', efficiency: 89 },
    { name: 'Week 3', efficiency: 93 },
    { name: 'Week 4', efficiency: 87 },
    { name: 'Week 5', efficiency: 90 },
    { name: 'Week 6', efficiency: 94 },
  ];

  const chargingData = [
    { name: 'Home', value: 68 },
    { name: 'Public', value: 22 },
    { name: 'Work', value: 10 },
  ];
  
  const COLORS = ['#4CAF50', '#2196F3', '#FF9800'];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-4 md:p-6">
        <header>
          <h1 className="text-3xl font-heading font-bold text-white">Battery Analytics</h1>
          <p className="text-gray-400 mt-1">Detailed insights into your battery performance</p>
        </header>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Battery Health Summary</CardTitle>
            <CardDescription className="text-gray-400">
              Current battery health: <span className="text-green-400 font-medium">Excellent (97%)</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            <div className="overflow-hidden">
              <ResponsiveContainer width="100%" height={250}>
                <RechartsLineChart
                  data={efficiencyData}
                  margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" />
                  <YAxis stroke="#666" domain={[80, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                    labelStyle={{ color: '#eee' }} 
                    itemStyle={{ color: '#4CAF50' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#4CAF50" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="usage" className="space-y-4">
          <TabsList className="w-full bg-gray-900 p-1 overflow-x-auto flex md:flex-wrap">
            <TabsTrigger 
              value="usage" 
              className="flex items-center flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Daily Usage
            </TabsTrigger>
            <TabsTrigger 
              value="charging"
              className="flex items-center flex-1 min-w-[120px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              <PieChart className="mr-2 h-4 w-4" />
              Charging Sources
            </TabsTrigger>
            <TabsTrigger 
              value="trends"
              className="flex items-center flex-1 min-w-[100px] data-[state=active]:bg-revithalize-green data-[state=active]:text-black" 
            >
              <LineChart className="mr-2 h-4 w-4" />
              Long-term Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Daily Energy Consumption</CardTitle>
                <CardDescription className="text-gray-400">kWh used per day over the last week</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-hidden">
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsBarChart
                      data={dailyUsageData}
                      margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                        labelStyle={{ color: '#eee' }} 
                        itemStyle={{ color: '#2196F3' }}
                      />
                      <Bar 
                        dataKey="usage" 
                        fill="#2196F3" 
                        radius={[4, 4, 0, 0]} 
                        barSize={30}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charging" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Charging Sources</CardTitle>
                <CardDescription className="text-gray-400">Distribution of charging locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-around">
                  <div className="w-full md:w-1/2 h-[250px] mb-4 md:mb-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={chargingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chargingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                          labelStyle={{ color: '#eee' }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-3">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-white">Home Charging (68%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-white">Public Stations (22%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-white">Workplace (10%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Long-term Efficiency Trends</CardTitle>
                <CardDescription className="text-gray-400">Battery efficiency over time</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-6">
                <div className="overflow-hidden">
                  <ResponsiveContainer width="100%" height={250}>
                    <RechartsLineChart
                      data={[
                        { month: 'Jan', efficiency: 95 },
                        { month: 'Feb', efficiency: 94 },
                        { month: 'Mar', efficiency: 93 },
                        { month: 'Apr', efficiency: 92 },
                        { month: 'May', efficiency: 93 },
                        { month: 'Jun', efficiency: 91 },
                      ]}
                      margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" domain={[85, 100]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                        labelStyle={{ color: '#eee' }} 
                        itemStyle={{ color: '#FF9800' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#FF9800" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                        activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block bg-green-500/20 text-green-400 p-1 rounded mr-2">✓</span>
                  <span>Battery health is optimal at 97% capacity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-green-500/20 text-green-400 p-1 rounded mr-2">✓</span>
                  <span>Average consumption is 15% lower than similar vehicles</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-yellow-500/20 text-yellow-400 p-1 rounded mr-2">!</span>
                  <span>Charging efficiency drops in high temperatures (&gt;35°C)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-blue-500/20 text-blue-400 p-1 rounded mr-2">i</span>
                  <span>Home charging is the most cost-effective option</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2">1</span>
                  <span>Schedule charging during off-peak hours (11 PM - 5 AM)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2">2</span>
                  <span>Maintain battery charge between 20% and 80% for optimal longevity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2">3</span>
                  <span>Use regenerative braking more frequently to improve efficiency</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2">4</span>
                  <span>Next battery check recommended in 3 months</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
