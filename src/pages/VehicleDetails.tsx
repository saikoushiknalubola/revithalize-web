import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Battery, Gauge, Zap, ThermometerSnowflake, Clock, Calendar, AlertTriangle, Settings, BatteryCharging, FileDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateBatteryReportPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

export default function VehicleDetails() {
  // Mock data for the battery report PDF
  const handleDownloadBatteryReport = () => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const userName = userData.fullName || userData.name || 'Customer';
    
    // Battery data - would typically come from state or API
    const batteryData = {
      currentHealth: 97,
      projectedHealth: 90,
      cellBalance: 95,
      chargingCycles: 124,
      capacityRetention: 97,
      range: 110,
      efficiency: 91,
      averageTemp: 32,
      lastCharge: 'Today, 08:30 AM',
      nextService: 'In 3 months',
    };
    
    // Vehicle data
    const vehicleData = {
      model: 'Hero Honda Passion AP02SK2409',
      batteryType: '51.2V 45Ah Lithium-Ion',
      range: 'Up to 110 km',
      power: '2.2 kW',
      capacity: '45 Ah',
      registrationNumber: 'AP02SK2409',
    };
    
    // Usage data
    const usageData = {
      weeklyDistance: 83,
      monthlyDistance: 321,
      totalDistance: 1275,
      avgEfficiency: 91,
      avgTemp: 32,
    };
    
    // Generate PDF blob
    const pdfBlob = generateBatteryReportPDF(batteryData, vehicleData, usageData, userName);
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(pdfBlob);
    link.download = `battery-report-${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Battery report downloaded successfully');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Vehicle Details</h1>
            <p className="text-gray-400 mt-1">Hero Honda Passion AP02SK2409</p>
          </div>
          <Button 
            onClick={handleDownloadBatteryReport}
            className="bg-revithalize-green hover:bg-green-600 text-white"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download Battery Report
          </Button>
        </header>

        {/* Vehicle status cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Battery className="mr-2 h-4 w-4" />
                Battery Status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="relative w-full h-3 bg-gray-800 rounded-full overflow-hidden mr-3">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-revithalize-green to-revithalize-blue rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-2xl font-bold text-white">75%</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Range</p>
                  <p className="font-medium text-white">110 km</p>
                </div>
                <div>
                  <p className="text-gray-400">Efficiency</p>
                  <p className="font-medium text-white">89%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Gauge className="mr-2 h-4 w-4" />
                Performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">Excellent</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Power</p>
                  <p className="font-medium text-white">51.2 V</p>
                </div>
                <div>
                  <p className="text-gray-400">Capacity</p>
                  <p className="font-medium text-white">45 Ah</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <ThermometerSnowflake className="mr-2 h-4 w-4" />
                System Temp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">32°C</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">Motor</p>
                  <p className="font-medium text-white">29°C</p>
                </div>
                <div>
                  <p className="text-gray-400">Controller</p>
                  <p className="font-medium text-white">34°C</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-400 flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Usage Stats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">321 km</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400">This Week</p>
                  <p className="font-medium text-white">83 km</p>
                </div>
                <div>
                  <p className="text-gray-400">This Month</p>
                  <p className="font-medium text-white">321 km</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Battery details */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Battery Health Analysis</CardTitle>
            <CardDescription className="text-gray-400">Retrofit Kit: Hero Honda Passion AP02SK2409</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Cell Balance</span>
                    <span className="text-white font-medium">Optimal</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Charging Cycles</span>
                    <span className="text-white font-medium">124 of 1500</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '8%' }} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Capacity Retention</span>
                    <span className="text-white font-medium">97%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '97%' }} />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm text-gray-300 flex items-center">
                      <BatteryCharging className="mr-2 h-4 w-4 text-revithalize-green" />
                      Last Charge
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                    <p className="text-white font-medium">Today, 08:30 AM</p>
                    <p className="text-xs text-gray-400 mt-1">10.2 kWh added</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm text-gray-300 flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-revithalize-blue" />
                      Next Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                    <p className="text-white font-medium">In 3 months</p>
                    <p className="text-xs text-gray-400 mt-1">Or 2,500 km</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm text-gray-300 flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-3 px-4">
                    <p className="text-white font-medium">No active alerts</p>
                    <p className="text-xs text-gray-400 mt-1">System running normally</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-revithalize-dark hover:bg-gray-800 text-white rounded-lg flex items-center transition-colors">
                  <Settings className="mr-2 h-4 w-4" />
                  Advanced Settings
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
