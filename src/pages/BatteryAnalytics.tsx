import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { BatteryPrediction } from '@/components/features/BatteryPrediction';
import { BatteryEfficiencyChart } from '@/components/features/BatteryEfficiencyChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, FileText, BarChart3, Eye, Calendar, Droplets, Zap, Download, FileBarChart } from 'lucide-react';
import { generateBatteryReportPDF, generateAdvancedAnalyticsReportPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface HistoricalReport {
  date: string;
  title: string;
  content?: string;
}

export default function BatteryAnalytics() {
  const [selectedReport, setSelectedReport] = useState<HistoricalReport | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [exportFormat, setExportFormat] = useState('pdf');
  
  // Historical reports data
  const historicalReports: HistoricalReport[] = [
    { 
      date: '2024-04-01', 
      title: 'Monthly Battery Report - April 2024',
      content: `# Battery Health Report - April 2024

**Vehicle**: Hero Honda Passion AP02SK2409
**Report Date**: April 1, 2024
**Battery Type**: 51.2V 45Ah Lithium-Ion

## Health Metrics
- Current Health: 97%
- Projected Health (3 months): 95%
- Cell Balance: 96%
- Charging Cycles: 115
- Capacity Retention: 97%

## Usage Statistics
- Average Daily Distance: 28km
- Total Distance: 1,215km
- Average Efficiency: 92%
- Average Temperature: 31°C

## Recommendations
- Continue optimal charging practices
- Schedule battery balancing in 2 months
- Monitor temperature during summer rides`
    },
    { 
      date: '2024-03-01', 
      title: 'Monthly Battery Report - March 2024',
      content: `# Battery Health Report - March 2024

**Vehicle**: Hero Honda Passion AP02SK2409
**Report Date**: March 1, 2024
**Battery Type**: 51.2V 45Ah Lithium-Ion

## Health Metrics
- Current Health: 98%
- Projected Health (3 months): 96%
- Cell Balance: 97%
- Charging Cycles: 92
- Capacity Retention: 98%

## Usage Statistics
- Average Daily Distance: 25km
- Total Distance: 950km
- Average Efficiency: 93%
- Average Temperature: 29°C

## Recommendations
- Continue optimal charging practices
- No maintenance needed at this time
- Consider battery check before summer season`
    },
    { 
      date: '2024-02-01', 
      title: 'Monthly Battery Report - February 2024',
      content: `# Battery Health Report - February 2024

**Vehicle**: Hero Honda Passion AP02SK2409
**Report Date**: February 1, 2024
**Battery Type**: 51.2V 45Ah Lithium-Ion

## Health Metrics
- Current Health: 99%
- Projected Health (3 months): 97%
- Cell Balance: 98%
- Charging Cycles: 68
- Capacity Retention: 99%

## Usage Statistics
- Average Daily Distance: 22km
- Total Distance: 680km
- Average Efficiency: 94%
- Average Temperature: 27°C

## Recommendations
- Continue optimal charging practices
- No maintenance needed at this time
- Battery performing at near-optimal levels`
    },
  ];
  
  // Mock data for the battery report PDF
  const handleDownloadBatteryReport = () => {
    try {
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
    } catch (error) {
      console.error('Error downloading battery report:', error);
      toast.error('Failed to download battery report. Please try again.');
    }
  };

  const handleDownloadAnalyticsReport = () => {
    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userName = userData.fullName || userData.name || 'Customer';
      
      // Mock analytics data
      const analyticsData = {
        periodStart: '2024-01-01',
        periodEnd: '2024-05-05',
        batteryHealthStart: 100,
        batteryHealthEnd: 97,
        efficiencyTrend: [
          { month: 'Jan', value: 95 },
          { month: 'Feb', value: 94 },
          { month: 'Mar', value: 93 },
          { month: 'Apr', value: 92 },
          { month: 'May', value: 91 },
        ],
        tempTrend: [
          { month: 'Jan', value: 27 },
          { month: 'Feb', value: 28 },
          { month: 'Mar', value: 30 },
          { month: 'Apr', value: 32 },
          { month: 'May', value: 35 },
        ],
        chargeCycles: 124,
        topSpeed: 55,
        avgSpeed: 32,
        rangeTrend: [
          { month: 'Jan', value: 155 },
          { month: 'Feb', value: 152 },
          { month: 'Mar', value: 148 },
          { month: 'Apr', value: 145 },
          { month: 'May', value: 141 },
        ],
        powerConsumption: 8.2, // kWh/100km
        carbonSaved: 120, // kg
      };
      
      // Generate PDF blob
      const pdfBlob = generateAdvancedAnalyticsReportPDF(analyticsData, userName);
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Analytics report downloaded successfully');
    } catch (error) {
      console.error('Error downloading analytics report:', error);
      toast.error('Failed to download analytics report. Please try again.');
    }
  };

  const handleViewReport = (report: HistoricalReport) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
  };

  // Handle export data from cards
  const handleExportCardData = (dataType: string) => {
    try {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userName = userData.fullName || userData.name || 'Customer';
      
      // Generate appropriate analytics report
      const analyticsData = {
        dataType,
        efficiency: 91,
        batteryHealth: 97,
        rangeOpt: 87,
        costSavings: 12450
      };
      
      const pdfBlob = generateAdvancedAnalyticsReportPDF(analyticsData, userName);
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `${dataType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`${dataType} data exported successfully`);
    } catch (error) {
      console.error('Error exporting card data:', error);
      toast.error('Failed to export data. Please try again.');
    }
  };

  // Export data based on format
  const handleRawDataExport = (format: string) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userName = userData.fullName || userData.name || 'Customer';
      
      if (format === 'pdf') {
        // Generate complete analytics report
        const analyticsData = {
          periodStart: '2024-01-01',
          periodEnd: '2024-05-05',
          batteryHealthStart: 100,
          batteryHealthEnd: 97,
          efficiencyTrend: [
            { month: 'Jan', value: 95 },
            { month: 'Feb', value: 94 },
            { month: 'Mar', value: 93 },
            { month: 'Apr', value: 92 },
            { month: 'May', value: 91 },
          ],
          tempTrend: [
            { month: 'Jan', value: 27 },
            { month: 'Feb', value: 28 },
            { month: 'Mar', value: 30 },
            { month: 'Apr', value: 32 },
            { month: 'May', value: 35 },
          ],
          chargeCycles: 124,
          topSpeed: 55,
          avgSpeed: 32,
          rangeTrend: [
            { month: 'Jan', value: 155 },
            { month: 'Feb', value: 152 },
            { month: 'Mar', value: 148 },
            { month: 'Apr', value: 145 },
            { month: 'May', value: 141 },
          ],
          powerConsumption: 8.2,
          carbonSaved: 120,
        };
        
        const pdfBlob = generateAdvancedAnalyticsReportPDF(analyticsData, userName);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = `battery-data-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'csv') {
        // Mock CSV data export
        const csvContent = `Date,Efficiency,Temperature,Range,Power,Cycles
2024-01-01,95,27,155,2.1,10
2024-02-01,94,28,152,2.0,25
2024-03-01,93,30,148,2.2,42
2024-04-01,92,32,145,2.1,58
2024-05-01,91,35,141,2.0,75`;
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `battery-data-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'json') {
        // Mock JSON data export
        const jsonData = {
          user: userName,
          vehicle: vehicleData,
          batteryData: {
            monthly: [
              { month: 'Jan', efficiency: 95, temperature: 27, range: 155, power: 2.1, cycles: 10 },
              { month: 'Feb', efficiency: 94, temperature: 28, range: 152, power: 2.0, cycles: 25 },
              { month: 'Mar', efficiency: 93, temperature: 30, range: 148, power: 2.2, cycles: 42 },
              { month: 'Apr', efficiency: 92, temperature: 32, range: 145, power: 2.1, cycles: 58 },
              { month: 'May', efficiency: 91, temperature: 35, range: 141, power: 2.0, cycles: 75 }
            ],
            health: {
              current: 97,
              projected: 90,
              cellBalance: 95,
              capacityRetention: 97
            }
          }
        };
        
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `battery-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
      toast.success(`Data exported as ${format.toUpperCase()} successfully`);
    } catch (error) {
      console.error('Error exporting raw data:', error);
      toast.error('Failed to export data. Please try again.');
    }
  };

  // Vehicle data for analytics report
  const vehicleData = {
    model: 'Hero Honda Passion AP02SK2409',
    batteryType: '51.2V 45Ah Lithium-Ion',
    range: 'Up to 110 km',
    power: '2.2 kW',
    capacity: '45 Ah',
    registrationNumber: 'AP02SK2409',
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Battery Analytics</h1>
            <p className="text-gray-400 mt-1">Insights and predictions for your EV battery</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={handleDownloadBatteryReport}
              className="bg-revithalize-green hover:bg-green-600 text-black font-medium"
              size="sm"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Battery Report
            </Button>
            <Button 
              onClick={handleDownloadAnalyticsReport}
              className="bg-revithalize-blue hover:bg-blue-600 text-black font-medium"
              size="sm"
            >
              <FileBarChart className="mr-2 h-4 w-4" />
              Analytics Report
            </Button>
          </div>
        </header>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-gray-800 p-1 w-full max-w-md mx-auto">
            <TabsTrigger value="overview" className="text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="detailed" className="text-sm">
              Detailed Analysis
            </TabsTrigger>
            <TabsTrigger value="historical" className="text-sm">
              Historical Data
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BatteryMetrics />
              <BatteryPrediction className="h-full" />
            </div>
            
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-white flex items-center">
                  <Droplets className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Battery Efficiency Insights
                </CardTitle>
                <CardDescription>
                  Track your battery efficiency over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BatteryEfficiencyChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="detailed" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                    Power Efficiency
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-2">91%</div>
                  <div className="text-sm text-gray-400">Above average for your vehicle model</div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Peak Power</span>
                      <span className="text-white">2.2 kW</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Energy Consumption</span>
                      <span className="text-white">8.2 kWh/100km</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Range per Charge</span>
                      <span className="text-white">110 km</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs w-full border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                    onClick={() => handleExportCardData('power')}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-500" />
                    Charging Cycles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-2">124</div>
                  <div className="text-sm text-gray-400">Out of 1,500 total cycles</div>
                  
                  <div className="mt-4">
                    <div className="h-2 w-full bg-gray-800 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full" 
                        style={{ width: '8.3%' }} 
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-400 text-right">8.3% used</div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Last Full Charge</span>
                      <span className="text-white">Today, 8:30 AM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Avg. Charge Time</span>
                      <span className="text-white">3h 20m</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs w-full border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                    onClick={() => handleExportCardData('charging')}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-800/50 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-lg flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-blue-500" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-white mb-2">120 kg</div>
                  <div className="text-sm text-gray-400">CO₂ emissions saved</div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Trees Equivalent</span>
                      <span className="text-white">6 trees</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Petrol Saved</span>
                      <span className="text-white">52 liters</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Energy Source</span>
                      <span className="text-white">82% Renewable</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs w-full border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                    onClick={() => handleExportCardData('environmental')}
                  >
                    <Download className="mr-1 h-3 w-3" />
                    Export Data
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <BatteryPrediction showFullCard={true} className="w-full" />
          </TabsContent>
          
          <TabsContent value="historical" className="space-y-6 animate-fade-in">
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
                  {historicalReports.map((report, index) => (
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
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                          onClick={() => {
                            toast.success(`${report.title} downloaded successfully`);
                          }}
                        >
                          <FileDown className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-revithalize-blue" />
                  Raw Data Export
                </CardTitle>
                <CardDescription>Download your battery data in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center">
                  <ToggleGroup 
                    type="single" 
                    value={exportFormat} 
                    onValueChange={(value) => {
                      if (value) setExportFormat(value);
                    }}
                    className="bg-gray-800 p-1 rounded-md"
                  >
                    <ToggleGroupItem value="csv" className="data-[state=on]:bg-gray-700 data-[state=on]:text-white text-sm">
                      CSV Format
                    </ToggleGroupItem>
                    <ToggleGroupItem value="json" className="data-[state=on]:bg-gray-700 data-[state=on]:text-white text-sm">
                      JSON Format
                    </ToggleGroupItem>
                    <ToggleGroupItem value="pdf" className="data-[state=on]:bg-gray-700 data-[state=on]:text-white text-sm">
                      PDF Format
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto py-6 border-gray-700 bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center text-white"
                    onClick={() => handleRawDataExport('csv')}
                  >
                    <FileDown className="h-8 w-8 mb-2 text-green-500" />
                    <span>CSV Format</span>
                    <span className="text-xs text-gray-300 mt-1">Complete raw data</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto py-6 border-gray-700 bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center text-white"
                    onClick={() => handleRawDataExport('json')}
                  >
                    <FileDown className="h-8 w-8 mb-2 text-blue-500" />
                    <span>JSON Format</span>
                    <span className="text-xs text-gray-300 mt-1">For developers</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="h-auto py-6 border-gray-700 bg-gray-700 hover:bg-gray-600 flex flex-col items-center justify-center text-white"
                    onClick={() => handleRawDataExport('pdf')}
                  >
                    <FileDown className="h-8 w-8 mb-2 text-red-500" />
                    <span>PDF Format</span>
                    <span className="text-xs text-gray-300 mt-1">Formatted report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Report Viewing Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">{selectedReport?.title}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Generated on {selectedReport?.date}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 prose prose-invert max-w-none">
            {selectedReport?.content && (
              <div className="whitespace-pre-line font-mono bg-gray-800 p-4 rounded-lg text-sm">
                {selectedReport.content}
              </div>
            )}
          </div>
          
          <DialogFooter className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => setReportDialogOpen(false)}
              className="mr-2 border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                toast.success('Report downloaded successfully');
                setReportDialogOpen(false);
              }}
              className="bg-revithalize-green hover:bg-green-600 text-black"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
