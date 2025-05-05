
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BatteryMetrics } from '@/components/features/BatteryMetrics';
import { BatteryPrediction } from '@/components/features/BatteryPrediction';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, FileText, BarChart3, Eye, Calendar } from 'lucide-react';
import { generateBatteryReportPDF } from '@/utils/pdfGenerator';
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

interface HistoricalReport {
  date: string;
  title: string;
  content?: string;
}

export default function BatteryAnalytics() {
  const [selectedReport, setSelectedReport] = useState<HistoricalReport | null>(null);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  
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

  const handleViewReport = (report: HistoricalReport) => {
    setSelectedReport(report);
    setReportDialogOpen(true);
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-700 bg-gray-700 text-white hover:bg-gray-600"
                        onClick={() => handleViewReport(report)}
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
              className="mr-2 border-gray-700"
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
