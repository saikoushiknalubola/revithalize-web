
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, Timer, Zap, Thermometer, Calendar, TrendingUp, Battery, Shield, RefreshCw } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useScreenSize } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BatteryAnalytics() {
  const { isMobile, isTablet } = useScreenSize();
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [showDetailedView, setShowDetailedView] = useState(false);
  
  // Sample data for charts with more realistic values
  const dailyUsageData = [
    { name: 'Mon', usage: 45, efficiency: 92, temp: 31 },
    { name: 'Tue', usage: 52, efficiency: 89, temp: 33 },
    { name: 'Wed', usage: 38, efficiency: 93, temp: 29 },
    { name: 'Thu', usage: 65, efficiency: 87, temp: 35 },
    { name: 'Fri', usage: 59, efficiency: 90, temp: 34 },
    { name: 'Sat', usage: 28, efficiency: 95, temp: 28 },
    { name: 'Sun', usage: 32, efficiency: 94, temp: 30 },
  ];

  // For mobile, show fewer data points
  const mobileDailyUsageData = isMobile ? 
    [
      { name: 'M', usage: 45, efficiency: 92, temp: 31 },
      { name: 'T', usage: 52, efficiency: 89, temp: 33 },
      { name: 'W', usage: 38, efficiency: 93, temp: 29 },
      { name: 'T', usage: 65, efficiency: 87, temp: 35 },
      { name: 'F', usage: 59, efficiency: 90, temp: 34 },
      { name: 'S', usage: 28, efficiency: 95, temp: 28 },
      { name: 'S', usage: 32, efficiency: 94, temp: 30 },
    ] : dailyUsageData;

  const efficiencyData = [
    { name: 'Week 1', efficiency: 92, range: 145, power: 2.1 },
    { name: 'Week 2', efficiency: 89, range: 138, power: 2.3 },
    { name: 'Week 3', efficiency: 93, range: 148, power: 2.0 },
    { name: 'Week 4', efficiency: 87, range: 132, power: 2.4 },
    { name: 'Week 5', efficiency: 90, range: 140, power: 2.2 },
    { name: 'Week 6', efficiency: 94, range: 150, power: 1.9 },
  ];

  // For mobile, show fewer data points
  const mobileEfficiencyData = isMobile ?
    [
      { name: 'W1', efficiency: 92, range: 145, power: 2.1 },
      { name: 'W2', efficiency: 89, range: 138, power: 2.3 },
      { name: 'W3', efficiency: 93, range: 148, power: 2.0 },
      { name: 'W4', efficiency: 87, range: 132, power: 2.4 },
      { name: 'W5', efficiency: 90, range: 140, power: 2.2 },
      { name: 'W6', efficiency: 94, range: 150, power: 1.9 },
    ] : efficiencyData;

  const chargingData = [
    { name: 'Home', value: 68 },
    { name: 'Public', value: 22 },
    { name: 'Work', value: 10 },
  ];

  // Battery health prediction data
  const predictionData = [
    { month: 'Jan', health: 100 },
    { month: 'Feb', health: 99 },
    { month: 'Mar', health: 98 },
    { month: 'Apr', health: 97 },
    { month: 'May', health: 97 },
    { month: 'Jun', health: 96 },
    { month: 'Jul', health: 95 },
    { month: 'Aug', health: 94 },
    { month: 'Sep', health: 93 },
    { month: 'Oct', health: 92 },
    { month: 'Nov', health: 91 },
    { month: 'Dec', health: 90 },
  ];
  
  const COLORS = ['#4ADE80', '#38BDF8', '#FB923C'];
  
  const handleRefreshData = () => {
    toast.success('Analytics data refreshed', {
      description: 'Latest battery metrics have been loaded'
    });
  };
  
  const handleExportData = () => {
    toast.success('Data export initiated', {
      description: 'Battery analytics will be sent to your email'
    });
  };
  
  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    toast.info(`Showing ${timeframe} view`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 md:p-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Battery Analytics
            </h1>
            <p className="text-gray-400 mt-1 text-sm sm:text-base">Detailed insights into your battery performance</p>
          </div>
          
          <div className="flex items-center gap-2 self-end md:self-auto">
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200" onClick={handleRefreshData}>
              <RefreshCw className="mr-1 h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-200" onClick={handleExportData}>
              <Battery className="mr-1 h-4 w-4 text-revithalize-green" />
              <span className="hidden sm:inline">Export Data</span>
            </Button>
          </div>
        </header>
        
        {/* Time frame selector */}
        <div className="flex justify-center md:justify-start">
          <div className="inline-flex rounded-md bg-gray-800 p-1">
            <button 
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${selectedTimeframe === 'day' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => handleTimeframeChange('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${selectedTimeframe === 'week' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => handleTimeframeChange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${selectedTimeframe === 'month' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => handleTimeframeChange('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${selectedTimeframe === 'year' ? 'bg-revithalize-green text-black font-medium' : 'text-gray-400 hover:text-white'}`}
              onClick={() => handleTimeframeChange('year')}
            >
              Year
            </button>
          </div>
        </div>

        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-xl overflow-hidden">
          <CardHeader className="pb-3 pt-3 px-3 sm:pb-4 sm:pt-4 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
            <CardTitle className="text-white text-lg sm:text-xl flex items-center">
              <Battery className="mr-2 h-5 w-5 text-revithalize-green" />
              Battery Health Summary
            </CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">
              Current battery health: <span className="text-green-400 font-medium">Excellent (97%)</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 py-3 sm:px-4 md:px-6 relative overflow-hidden">
            {/* Glassmorphic overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-revithalize-green/5 to-revithalize-blue/5 pointer-events-none"></div>
            
            {/* Main chart */}
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
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} 
                    labelStyle={{ color: '#eee' }} 
                    itemStyle={{ color: '#4ADE80' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="efficiency" 
                    stroke="#4ADE80" 
                    strokeWidth={2} 
                    dot={{ r: isMobile ? 3 : 4, fill: '#4ADE80' }} 
                    activeDot={{ r: isMobile ? 5 : 6, stroke: '#fff', strokeWidth: 2, fill: '#4ADE80' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Health prediction button and tooltip */}
            <div className="mt-2 flex justify-end">
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-gray-800/50 border-gray-700 hover:bg-gray-700 text-gray-200"
                onClick={() => setShowDetailedView(!showDetailedView)}
              >
                <TrendingUp className="mr-1 h-4 w-4 text-revithalize-green" />
                {showDetailedView ? "Hide Prediction" : "Show Health Prediction"}
              </Button>
            </div>
            
            {/* Health prediction view */}
            {showDetailedView && (
              <div className="mt-4 p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 animate-fade-in">
                <h3 className="text-sm font-medium text-white mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-revithalize-blue" />
                  Battery Health Prediction (12 Months)
                </h3>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart
                    data={predictionData}
                    margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
                  >
                    <defs>
                      <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4ADE80" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4ADE80" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="month" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" domain={[80, 100]} fontSize={10} width={25} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px' }}
                      labelStyle={{ color: '#eee' }}
                      formatter={(value: any) => [`${value}%`, 'Health']}
                    />
                    <Area
                      type="monotone"
                      dataKey="health"
                      stroke="#4ADE80"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#healthGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-gray-400 mt-2">
                  Based on your riding patterns, battery health is projected to maintain above 90% for the next 12 months
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="usage" className="space-y-3 sm:space-y-4">
          <TabsList className="w-full bg-gray-900/80 backdrop-blur-sm p-1 overflow-x-auto flex md:flex-wrap">
            <TabsTrigger 
              value="usage" 
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-revithalize-green data-[state=active]:to-revithalize-green/90 data-[state=active]:text-black"
            >
              <BarChart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Usage' : 'Daily Usage'}
            </TabsTrigger>
            <TabsTrigger 
              value="charging"
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-revithalize-green data-[state=active]:to-revithalize-green/90 data-[state=active]:text-black"
            >
              <Zap className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Charging' : 'Charging Sources'}
            </TabsTrigger>
            <TabsTrigger 
              value="temp"
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[120px] text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-revithalize-green data-[state=active]:to-revithalize-green/90 data-[state=active]:text-black"
            >
              <Thermometer className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Temp' : 'Temperature'}
            </TabsTrigger>
            <TabsTrigger 
              value="trends"
              className="flex items-center flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-revithalize-green data-[state=active]:to-revithalize-green/90 data-[state=active]:text-black" 
            >
              <LineChart className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              {isMobile ? 'Trends' : 'Long-term Trends'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                  <Zap className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Daily Energy Consumption
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">kWh used per day over the last week</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-4 md:px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-revithalize-blue/5 to-revithalize-green/5 pointer-events-none"></div>
                <div className="overflow-hidden relative z-10">
                  <ResponsiveContainer width="100%" height={isMobile ? 180 : 250}>
                    <RechartsBarChart
                      data={mobileDailyUsageData}
                      margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" fontSize={isMobile ? 10 : 12} />
                      <YAxis stroke="#666" fontSize={isMobile ? 10 : 12} width={isMobile ? 25 : 35} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} 
                        labelStyle={{ color: '#eee' }} 
                        itemStyle={{ color: '#38BDF8' }}
                      />
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#38BDF8" stopOpacity={1}/>
                          <stop offset="100%" stopColor="#0284C7" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                      <Bar 
                        dataKey="usage" 
                        fill="url(#barGradient)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={isMobile ? 20 : 30}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400">Daily Average</p>
                    <p className="text-lg text-white font-semibold">45.6 kWh</p>
                  </div>
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400">Peak Usage</p>
                    <p className="text-lg text-white font-semibold">65 kWh</p>
                  </div>
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400">Weekly Total</p>
                    <p className="text-lg text-white font-semibold">319 kWh</p>
                  </div>
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400">Cost Estimate</p>
                    <p className="text-lg text-white font-semibold">₹175.45</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charging" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                  <Battery className="mr-2 h-5 w-5 text-revithalize-green" />
                  Charging Sources
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">Distribution of charging locations</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-revithalize-green/5 to-revithalize-blue/5 pointer-events-none"></div>
                <div className="flex flex-col md:flex-row items-center justify-around relative z-10">
                  <div className="w-full md:w-1/2 h-[200px] sm:h-[250px] mb-4 md:mb-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <defs>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
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
                          outerRadius={isMobile ? 70 : 90}
                          innerRadius={isMobile ? 40 : 60}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          filter="url(#glow)"
                        >
                          {chargingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} 
                          labelStyle={{ color: '#eee' }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-3 sm:space-y-4">
                    <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg w-full p-3 border border-gray-700/50">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-white text-sm sm:text-base font-medium">Home Charging</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>68% of total</span>
                        <span>34.5 kWh avg.</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg w-full p-3 border border-gray-700/50">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-white text-sm sm:text-base font-medium">Public Stations</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>22% of total</span>
                        <span>11.2 kWh avg.</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg w-full p-3 border border-gray-700/50">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-white text-sm sm:text-base font-medium">Workplace</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>10% of total</span>
                        <span>5.1 kWh avg.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="temp" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-orange-400" />
                  Temperature Analysis
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">Battery temperature during operation</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-4 md:px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-revithalize-blue/5 pointer-events-none"></div>
                <div className="overflow-hidden relative z-10">
                  <ResponsiveContainer width="100%" height={isMobile ? 180 : 250}>
                    <RechartsLineChart
                      data={mobileDailyUsageData}
                      margin={{ top: 5, right: 10, bottom: 20, left: isMobile ? -15 : 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#666" fontSize={isMobile ? 10 : 12} />
                      <YAxis stroke="#666" domain={[25, 40]} fontSize={isMobile ? 10 : 12} width={isMobile ? 25 : 35} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} 
                        labelStyle={{ color: '#eee' }} 
                        formatter={(value: any) => [`${value}°C`, 'Temperature']}
                      />
                      <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FB923C" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#FB923C" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="temp" 
                        stroke="#FB923C" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#tempGradient)"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 px-3 pb-3 sm:px-4 sm:pb-4">
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400">Average Temp</p>
                    <p className="text-lg text-white font-semibold">31.4°C</p>
                  </div>
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50">
                    <p className="text-xs text-gray-400">Peak Temp</p>
                    <p className="text-lg text-white font-semibold">35°C</p>
                  </div>
                  <div className="bg-gray-800/70 backdrop-blur-sm p-3 rounded-lg border border-gray-700/50 flex items-center">
                    <div className="mr-3">
                      <p className="text-xs text-gray-400">Status</p>
                      <p className="text-lg text-green-400 font-semibold">Optimal</p>
                    </div>
                    <div className="ml-auto">
                      <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-3 sm:space-y-4">
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
              <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
                <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-yellow-400" />
                  Long-term Efficiency Trends
                </CardTitle>
                <CardDescription className="text-gray-400 text-xs sm:text-sm">Battery efficiency over time</CardDescription>
              </CardHeader>
              <CardContent className="px-0 sm:px-4 md:px-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-revithalize-blue/5 pointer-events-none"></div>
                <div className="overflow-hidden relative z-10">
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
                        contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#444', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }} 
                        labelStyle={{ color: '#eee' }} 
                        formatter={(value: any) => [`${value}%`, 'Efficiency']}
                      />
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FACC15" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#FACC15" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="efficiency" 
                        stroke="#FACC15" 
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#trendGradient)"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg">
            <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                <Zap className="mr-2 h-5 w-5 text-revithalize-green" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-block bg-green-500/20 text-green-400 p-1.5 rounded-md mr-3 text-xs sm:text-sm">✓</span>
                  <span>Battery health is optimal at 97% capacity</span>
                </li>
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-block bg-green-500/20 text-green-400 p-1.5 rounded-md mr-3 text-xs sm:text-sm">✓</span>
                  <span>Average consumption is 15% lower than similar vehicles</span>
                </li>
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-block bg-yellow-500/20 text-yellow-400 p-1.5 rounded-md mr-3 text-xs sm:text-sm">!</span>
                  <span>Charging efficiency drops in high temperatures (&gt;35°C)</span>
                </li>
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-block bg-blue-500/20 text-blue-400 p-1.5 rounded-md mr-3 text-xs sm:text-sm">i</span>
                  <span>Home charging is the most cost-effective option</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg">
            <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
              <CardTitle className="text-white text-lg sm:text-xl flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-revithalize-blue" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
              <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-flex items-center justify-center bg-revithalize-green/20 text-revithalize-green p-1 rounded-md mr-3 text-xs sm:text-sm h-6 w-6">1</span>
                  <span>Schedule charging during off-peak hours (11 PM - 5 AM)</span>
                </li>
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-flex items-center justify-center bg-revithalize-green/20 text-revithalize-green p-1 rounded-md mr-3 text-xs sm:text-sm h-6 w-6">2</span>
                  <span>Maintain battery charge between 20% and 80% for optimal longevity</span>
                </li>
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-flex items-center justify-center bg-revithalize-green/20 text-revithalize-green p-1 rounded-md mr-3 text-xs sm:text-sm h-6 w-6">3</span>
                  <span>Use regenerative braking more frequently to improve efficiency</span>
                </li>
                <li className="flex items-start p-2 rounded-md bg-gray-800/50 backdrop-blur-sm border border-gray-700/30">
                  <span className="inline-flex items-center justify-center bg-revithalize-green/20 text-revithalize-green p-1 rounded-md mr-3 text-xs sm:text-sm h-6 w-6">4</span>
                  <span>Next battery check recommended in 3 months</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        {/* Gamification section */}
        <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 shadow-lg overflow-hidden">
          <CardHeader className="pb-2 pt-2 px-3 sm:pb-3 sm:pt-3 sm:px-4 bg-gradient-to-r from-gray-900 to-gray-800">
            <CardTitle className="text-white text-lg sm:text-xl flex items-center">
              <Timer className="mr-2 h-5 w-5 text-purple-400" />
              Eco Score & Achievements
            </CardTitle>
            <CardDescription className="text-gray-400 text-xs sm:text-sm">Track your riding efficiency and earn rewards</CardDescription>
          </CardHeader>
          <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4">
            <div className="bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700/30">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/50 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                      87
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-black text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center">
                    +3
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-1 text-center md:text-left">Your Eco Score</h3>
                  <div className="relative h-2 bg-gray-700 rounded-full mb-2">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-300 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Energy Efficient</span>
                    <span>87/100</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-gray-900/60 p-2 rounded-md flex flex-col items-center border border-purple-500/30">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-1">
                    <Zap className="h-5 w-5 text-purple-400" />
                  </div>
                  <p className="text-xs text-white text-center">Energy Saver</p>
                  <p className="text-xs text-gray-400">Level 3</p>
                </div>
                <div className="bg-gray-900/60 p-2 rounded-md flex flex-col items-center border border-blue-500/30">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-1">
                    <RefreshCw className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-xs text-white text-center">Regenerator</p>
                  <p className="text-xs text-gray-400">Level 2</p>
                </div>
                <div className="bg-gray-900/60 p-2 rounded-md flex flex-col items-center border border-green-500/30">
                  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                    <Battery className="h-5 w-5 text-green-400" />
                  </div>
                  <p className="text-xs text-white text-center">Battery Pro</p>
                  <p className="text-xs text-gray-400">Level 4</p>
                </div>
                <div className="bg-gray-900/60 p-2 rounded-md flex flex-col items-center border border-yellow-500/30">
                  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-1">
                    <Timer className="h-5 w-5 text-yellow-400" />
                  </div>
                  <p className="text-xs text-white text-center">Eco Driver</p>
                  <p className="text-xs text-gray-400">Level 3</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
