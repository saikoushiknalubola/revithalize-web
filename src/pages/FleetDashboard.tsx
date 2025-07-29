import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { 
  Truck, Users, Zap, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, DollarSign, Activity, 
  BarChart3, PieChart, MapPin, Settings, Shield,
  Battery, Fuel, Wrench, Calendar, FileText,
  ChevronRight, ArrowUpRight, Loader2, Brain
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Building2 } from 'lucide-react';

interface FleetVehicle {
  id: string;
  name: string;
  model: string;
  batteryLevel: number;
  status: 'active' | 'charging' | 'maintenance' | 'idle';
  location: string;
  driver: string;
  lastUpdate: Date;
  efficiency: number;
  range: number;
}

interface FleetKPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
}

export default function FleetDashboard() {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const [userName, setUserName] = useState('Fleet Manager');
  const [organizationName, setOrganizationName] = useState('Enterprise Fleet Solutions');

  // Mock fleet data - in production this would come from API
  const fleetVehicles: FleetVehicle[] = [
    {
      id: 'EV001',
      name: 'Delivery Van Alpha',
      model: 'Hero Honda Passion Pro',
      batteryLevel: 85,
      status: 'active',
      location: 'Bangalore Central',
      driver: 'Rajesh Kumar',
      lastUpdate: new Date(),
      efficiency: 92,
      range: 145
    },
    {
      id: 'EV002',
      name: 'Delivery Van Beta',
      model: 'Hero Honda Passion Pro',
      batteryLevel: 45,
      status: 'charging',
      location: 'Charging Station 12',
      driver: 'Priya Sharma',
      lastUpdate: new Date(Date.now() - 30 * 60 * 1000),
      efficiency: 88,
      range: 68
    },
    {
      id: 'EV003',
      name: 'Service Bike Gamma',
      model: 'Hero Honda Passion Pro',
      batteryLevel: 92,
      status: 'active',
      location: 'HSR Layout',
      driver: 'Amit Singh',
      lastUpdate: new Date(Date.now() - 15 * 60 * 1000),
      efficiency: 95,
      range: 138
    },
    {
      id: 'EV004',
      name: 'Cargo Bike Delta',
      model: 'Hero Honda Passion Pro',
      batteryLevel: 12,
      status: 'maintenance',
      location: 'Service Center',
      driver: 'Unassigned',
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      efficiency: 78,
      range: 18
    }
  ];

  const fleetKPIs: FleetKPI[] = [
    {
      label: 'Total Fleet Size',
      value: '150',
      change: 5.2,
      trend: 'up',
      icon: Truck,
      color: 'text-blue-400'
    },
    {
      label: 'Operational Vehicles',
      value: '127',
      change: 12.3,
      trend: 'up',
      icon: Activity,
      color: 'text-green-400'
    },
    {
      label: 'Fleet Efficiency',
      value: '89.2%',
      change: 2.1,
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-400'
    },
    {
      label: 'Operating Cost/km',
      value: '₹2.45',
      change: -8.7,
      trend: 'down',
      icon: DollarSign,
      color: 'text-green-400'
    }
  ];

  // Check for authentication and get user data
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/auth');
    } else {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name || 'Fleet Manager');
        setOrganizationName(user.organizationName || 'Fleet Operations');
      }
    }
  }, [navigate]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'charging': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maintenance': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'idle': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <ArrowUpRight className="h-3 w-3 text-green-400" />;
    if (trend === 'down') return <ArrowUpRight className="h-3 w-3 text-red-400 rotate-180" />;
    return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6 px-2 sm:px-4 pb-20 md:pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Enhanced Fleet Header */}
        <motion.header 
          className="border-b border-gray-800/50 pb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Fleet Operations Dashboard
              </h1>
              <p className="text-gray-400 mt-1 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {organizationName} • {userName}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Shield className="h-3 w-3 mr-1" />
                Fleet Operations
              </Badge>
              <Button 
                size="sm" 
                variant="outline"
                className="border-gray-700 hover:border-blue-500 hover:text-blue-400"
                onClick={() => navigate('/fleet-management')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Manage Fleet
              </Button>
            </div>
          </div>
        </motion.header>

        {/* Fleet KPIs */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {fleetKPIs.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label} className="bg-gray-900/80 border-gray-800 hover:border-gray-700 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={cn("h-5 w-5", kpi.color)} />
                    {getTrendIcon(kpi.trend, kpi.change)}
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{kpi.value}</p>
                  <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
                  <div className="flex items-center gap-1">
                    <span className={cn(
                      "text-xs font-medium",
                      kpi.trend === 'up' ? "text-green-400" : 
                      kpi.trend === 'down' ? "text-red-400" : "text-gray-400"
                    )}>
                      {kpi.change > 0 ? '+' : ''}{kpi.change}%
                    </span>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Fleet Status Overview */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Active Fleet Vehicles */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/80 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Truck className="h-5 w-5 text-blue-400" />
                  Fleet Vehicle Status
                </CardTitle>
                <CardDescription>Real-time operational status and vehicle health monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {fleetVehicles.map((vehicle, index) => (
                    <motion.div
                      key={vehicle.id}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors cursor-pointer"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-gray-700/20 rounded-lg flex items-center justify-center">
                            <Truck className="h-5 w-5 text-blue-400" />
                          </div>
                          <div className={cn(
                            "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900",
                            vehicle.status === 'active' ? 'bg-green-400' :
                            vehicle.status === 'charging' ? 'bg-blue-400' :
                            vehicle.status === 'maintenance' ? 'bg-red-400' : 'bg-gray-400'
                          )} />
                        </div>
                        <div>
                          <p className="font-medium text-white">{vehicle.name}</p>
                          <p className="text-xs text-gray-400">{vehicle.id} • {vehicle.driver}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <Battery className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-white">{vehicle.batteryLevel}%</span>
                        </div>
                        <Badge className={cn("text-xs", getStatusColor(vehicle.status))}>
                          {vehicle.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-gray-700 hover:border-blue-500 hover:text-blue-400"
                  onClick={() => navigate('/fleet-management')}
                >
                  Full Fleet Management
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            {/* Critical Alerts */}
            <Card className="bg-gray-900/80 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  Critical Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-red-400">Low Battery Alert</span>
                  </div>
                  <p className="text-xs text-gray-300">EV004 battery at 12% - immediate charging required</p>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Maintenance Due</span>
                  </div>
                  <p className="text-xs text-gray-300">3 vehicles scheduled for maintenance this week</p>
                </div>
              </CardContent>
            </Card>

            {/* Fleet Operations */}
            <Card className="bg-gray-900/80 border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Settings className="h-5 w-5 text-blue-400" />
                  Fleet Operations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-700 hover:border-blue-500 hover:text-blue-400"
                  onClick={() => {
                    toast.info('Generating operational report...');
                    navigate('/reports');
                  }}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Operations Report
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-700 hover:border-blue-500 hover:text-blue-400"
                  onClick={() => {
                    toast.info('Opening fleet tracking...');
                    navigate('/map');
                  }}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Vehicle Tracking
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-700 hover:border-blue-500 hover:text-blue-400"
                  onClick={() => {
                    toast.info('Opening maintenance scheduler...');
                    navigate('/maintenance-ai');
                  }}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Maintenance Scheduler
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Business Intelligence Dashboard */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer" onClick={() => navigate('/advanced-analytics')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                Fleet Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Operational Efficiency</span>
                  <span className="text-lg font-bold text-white">89.2%</span>
                </div>
                <Progress value={89.2} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Industry Average: 75%</span>
                  <span className="text-blue-400">+14.2% above average</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer" onClick={() => navigate('/energy-optimization')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <DollarSign className="h-5 w-5 text-green-400" />
                Cost Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Monthly Savings</span>
                  <span className="text-lg font-bold text-green-400">₹1,24,500</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>vs Traditional Fleet</span>
                  <span className="text-green-400">32% cost reduction</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/80 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer" onClick={() => navigate('/predictive-analytics')}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-white text-lg">
                <Brain className="h-5 w-5 text-blue-400" />
                Predictive Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Maintenance Alerts</span>
                  <span className="text-sm font-bold text-blue-400">5 vehicles</span>
                </div>
                <div className="text-xs text-gray-500">
                  Predictive maintenance recommendations for next 30 days
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}