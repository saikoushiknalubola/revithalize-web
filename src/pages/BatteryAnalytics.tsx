
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { BatteryPrediction } from '@/components/features/BatteryPrediction';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, FileText, BarChart3, Eye, Calendar } from 'lucide-react';
import { generateBatteryReportPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function BatteryAnalytics() {
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
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Battery Analytics</h1>
            <p className="text-gray-400 mt-1">Insights and predictions for your EV battery</p>
          </div>
          <Button 
            onClick={handleDownloadBatteryReport}
            className="bg-revithalize-green hover:bg-green-600 text-black font-medium"
          >
            <FileDown className="mr-2 h-4 w-4" />
            Download Battery Report
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <BatteryMetrics />
            
            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-revithalize-green" />
                  Historical Reports
                </CardTitle>
                <CardDescription>View and download your previous battery reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '2024-04-01', title: 'Monthly Battery Report - April 2024' },
                    { date: '2024-03-01', title: 'Monthly Battery Report - March 2024' },
                    { date: '2024-02-01', title: 'Monthly Battery Report - February 2024' },
                  ].map((report, index) => (
                    <motion.div 
                      key={index} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-revithalize-green mr-3" />
                        <div>
                          <p className="text-white text-sm font-medium">{report.title}</p>
                          <p className="text-gray-400 text-xs">{report.date}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <BatteryPrediction className="h-full" />
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
