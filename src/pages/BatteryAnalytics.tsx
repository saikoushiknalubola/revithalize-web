
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import { useScreenSize } from '@/hooks/use-mobile';

export default function BatteryAnalytics() {
  const { isMobile, isTablet } = useScreenSize();
  
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

  // For mobile, show fewer data points
  const mobileDailyUsageData = isMobile ? 
    [
      { name: 'M', usage: 45 },
      { name: 'T', usage: 52 },
      { name: 'W', usage: 38 },
      { name: 'T', usage: 65 },
      { name: 'F', usage: 59 },
      { name: 'S', usage: 28 },
      { name: 'S', usage: 32 },
    ] : dailyUsageData;

  const efficiencyData = [
    { name: 'Week 1', efficiency: 92 },
    { name: 'Week 2', efficiency: 89 },
    { name: 'Week 3', efficiency: 93 },
    { name: 'Week 4', efficiency: 87 },
    { name: 'Week 5', efficiency: 90 },
    { name: 'Week 6', efficiency: 94 },
  ];

  // For mobile, show fewer data points
  const mobileEfficiencyData = isMobile ?
    [
      { name: 'W1', efficiency: 92 },
      { name: 'W2', efficiency: 89 },
      { name: 'W3', efficiency: 93 },
      { name: 'W4', efficiency: 87 },
      { name: 'W5', efficiency: 90 },
      { name: 'W6', efficiency: 94 },
    ] : efficiencyData;

  const chargingData = [
    { name: 'Home', value: 68 },
    { name: 'Public', value: 22 },
    { name: 'Work', value: 10 },
  ];
  
  const COLORS = ['#4CAF50', '#2196F3', '#FF9800'];

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 md:p-6">
        <header>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">Battery Analytics</h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">Detailed insights into your battery performance</p>
        </header>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-3 pt-3 px-3 sm:pb-4 sm:pt-4 sm:px-4">
            <CardTitle className="text-white text-lg sm:text-xl">Battery Health Summary</CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">
              Current battery health: <span className="text-green-400 font-medium">Excellent (97%)</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 sm:px-4 md:px-6">
            <div className="overflow-hidden">
              <ResponsiveContainer width="100%" height={isMobile ? 180 : 250}>
                <RechartsLineChart
                  data={mobileEfficiencyData}
                  margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#666" fontSize={isMobile ? 10 : 12} />
                  <YAxis stroke="#666" domain={[80, 100]} fontSize={isMobile ? 10 : 12} width={isMobile ? 25 : 35} />
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
                    dot={{ r: isMobile ? 3 : 4 }} 
                    activeDot={{ r: isMobile ? 5 : 6, stroke: '#fff', strokeWidth: 2 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="usage" className="space-y-3 sm:space-y-4">
          <TabsList className="w-full bg-gray-900 p-1 overflow-x-auto flex md:flex-wrap">
            <TabsTrigger 
              value="usage" 
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              <BarChart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Usage' : 'Daily Usage'}
            </TabsTrigger>
            <TabsTrigger 
              value="charging"
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm data-[state=active]:bg-revithalize-green data-[state=active]:text-black"
            >
              <PieChart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Charging' : 'Charging Sources'}
            </TabsTrigger>
            <TabsTrigger 
              value="trends"
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-revithalize-green data-[state=active]:text-black" 
            >
              <LineChart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Trends' : 'Long-term Trends'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
                <CardTitle className="text-white text-lg sm:text-xl">Daily Energy Consumption</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">kWh used per day over the last week</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-4 md:px-6">
                <div className="overflow-hidden">
                  <ResponsiveContainer width="100%" height={isMobile ? 180 : 250}>
                    <RechartsBarChart
                      data={mobileDailyUsageData}
                      margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" fontSize={isMobile ? 10 : 12} />
                      <YAxis stroke="#666" fontSize={isMobile ? 10 : 12} width={isMobile ? 25 : 35} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#222', borderColor: '#444' }} 
                        labelStyle={{ color: '#eee' }} 
                        itemStyle={{ color: '#2196F3' }}
                      />
                      <Bar 
                        dataKey="usage" 
                        fill="#2196F3" 
                        radius={[4, 4, 0, 0]} 
                        barSize={isMobile ? 20 : 30}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charging" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
                <CardTitle className="text-white text-lg sm:text-xl">Charging Sources</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">Distribution of charging locations</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
                <div className="flex flex-col md:flex-row items-center justify-around">
                  <div className="w-full md:w-1/2 h-[200px] sm:h-[250px] mb-4 md:mb-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={chargingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => isMobile ? 
                            `${(percent * 100).toFixed(0)}%` : 
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          fontSize={isMobile ? 10 : 12}
                          outerRadius={isMobile ? 60 : 80}
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
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-2 sm:space-y-3">
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-white text-sm sm:text-base">Home Charging (68%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-white text-sm sm:text-base">Public Stations (22%)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-white text-sm sm:text-base">Workplace (10%)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
                <CardTitle className="text-white text-lg sm:text-xl">Long-term Efficiency Trends</CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">Battery efficiency over time</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-4 md:px-6">
                <div className="overflow-hidden">
                  <ResponsiveContainer width="100%" height={isMobile ? 180 : 250}>
                    <RechartsLineChart
                      data={[
                        { month: isMobile ? 'J' : 'Jan', efficiency: 95 },
                        { month: isMobile ? 'F' : 'Feb', efficiency: 94 },
                        { month: isMobile ? 'M' : 'Mar', efficiency: 93 },
                        { month: isMobile ? 'A' : 'Apr', efficiency: 92 },
                        { month: isMobile ? 'M' : 'May', efficiency: 93 },
                        { month: isMobile ? 'J' : 'Jun', efficiency: 91 },
                      ]}
                      margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="month" stroke="#666" fontSize={isMobile ? 10 : 12} />
                      <YAxis stroke="#666" domain={[85, 100]} fontSize={isMobile ? 10 : 12} width={isMobile ? 25 : 35} />
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
                        dot={{ r: isMobile ? 3 : 4 }} 
                        activeDot={{ r: isMobile ? 5 : 6, stroke: '#fff', strokeWidth: 2 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
              <CardTitle className="text-white text-lg sm:text-xl">Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="inline-block bg-green-500/20 text-green-400 p-1 rounded mr-2 text-xs sm:text-sm">✓</span>
                  <span>Battery health is optimal at 97% capacity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-green-500/20 text-green-400 p-1 rounded mr-2 text-xs sm:text-sm">✓</span>
                  <span>Average consumption is 15% lower than similar vehicles</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-yellow-500/20 text-yellow-400 p-1 rounded mr-2 text-xs sm:text-sm">!</span>
                  <span>Charging efficiency drops in high temperatures (&gt;35°C)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-blue-500/20 text-blue-400 p-1 rounded mr-2 text-xs sm:text-sm">i</span>
                  <span>Home charging is the most cost-effective option</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4">
              <CardTitle className="text-white text-lg sm:text-xl">Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2 text-xs sm:text-sm">1</span>
                  <span>Schedule charging during off-peak hours (11 PM - 5 AM)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2 text-xs sm:text-sm">2</span>
                  <span>Maintain battery charge between 20% and 80% for optimal longevity</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2 text-xs sm:text-sm">3</span>
                  <span>Use regenerative braking more frequently to improve efficiency</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-revithalize-green/20 text-revithalize-green p-1 rounded mr-2 text-xs sm:text-sm">4</span>
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
