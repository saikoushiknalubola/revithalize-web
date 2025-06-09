import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AdvancedAnalytics as AdvancedAnalyticsComponent } from '@/components/professional/AdvancedAnalytics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Battery, Zap, Gauge, Calendar, Target, BarChart3, PieChart, LineChart, Activity, Award, AlertCircle } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const performanceData = [
  { month: 'Jan', efficiency: 85, consumption: 45, range: 120 },
  { month: 'Feb', efficiency: 88, consumption: 42, range: 125 },
  { month: 'Mar', efficiency: 92, consumption: 38, range: 130 },
  { month: 'Apr', efficiency: 87, consumption: 44, range: 122 },
  { month: 'May', efficiency: 90, consumption: 40, range: 128 },
  { month: 'Jun', efficiency: 94, consumption: 35, range: 135 },
];

const energyBreakdown = [
  { name: 'Acceleration', value: 35, color: '#10B981' },
  { name: 'Cruising', value: 40, color: '#3B82F6' },
  { name: 'Braking', value: 15, color: '#F59E0B' },
  { name: 'Standby', value: 10, color: '#8B5CF6' },
];

export default function AdvancedAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Advanced Analytics
            </h1>
            <p className="text-gray-400 mt-2">
              Deep insights and comprehensive data analysis for your electric vehicle
            </p>
          </div>
          <div className="flex space-x-2">
            <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Efficiency Champion</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-green-400" />
                Avg Efficiency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89.3%</div>
              <p className="text-xs text-green-400 mt-1">+5.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Battery className="h-4 w-4 mr-2 text-blue-400" />
                Energy Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">284 kWh</div>
              <p className="text-xs text-blue-400 mt-1">vs. conventional vehicle</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                Total Distance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3,247 km</div>
              <p className="text-xs text-yellow-400 mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400 flex items-center">
                <Target className="h-4 w-4 mr-2 text-purple-400" />
                Cost Savings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">₹4,825</div>
              <p className="text-xs text-purple-400 mt-1">vs. petrol costs</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-green-400" />
                Performance Trends
              </CardTitle>
              <CardDescription className="text-gray-400">
                Monthly efficiency and consumption patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsLineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="efficiency" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="consumption" stroke="#3B82F6" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-blue-400" />
                Energy Consumption Breakdown
              </CardTitle>
              <CardDescription className="text-gray-400">
                Where your energy goes during rides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={energyBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {energyBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {energyBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-300">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Analytics Component */}
        <AdvancedAnalyticsComponent />

        {/* Additional Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2 text-green-400" />
                Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400 mb-2">98.5%</div>
              <p className="text-sm text-gray-400">Excellent battery health</p>
              <div className="mt-4 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                Next Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400 mb-2">15 days</div>
              <p className="text-sm text-gray-400">Scheduled maintenance due</p>
              <button className="mt-4 w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2 px-4 rounded-lg transition-colors">
                Schedule Now
              </button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-300">Optimal charging times: 11 PM - 6 AM</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-300">Consider eco-mode for city rides</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-300">Check tire pressure weekly</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
