
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Mail, Calendar, BarChart3, PieChart, TrendingUp, FileSpreadsheet, Settings, Filter, Search, Clock, CheckCircle, AlertCircle, FileX, Zap, Activity, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { generateBatteryReportPDF, generateComplianceReportPDF, generateAdvancedAnalyticsReportPDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Report {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'csv';
  description: string;
  lastGenerated: Date;
  size: string;
  icon: any;
  category: 'performance' | 'compliance' | 'analytics' | 'maintenance';
  status: 'ready' | 'generating' | 'error';
}

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  estimatedTime: string;
}

export function ReportsExport() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      name: 'Vehicle Performance Report',
      type: 'pdf',
      description: 'Comprehensive analysis of vehicle metrics and performance',
      lastGenerated: new Date(Date.now() - 2 * 60 * 60 * 1000),
      size: '2.4 MB',
      icon: BarChart3,
      category: 'performance',
      status: 'ready'
    },
    {
      id: '2',
      name: 'Energy Consumption Analytics',
      type: 'excel',
      description: 'Detailed breakdown of energy usage patterns',
      lastGenerated: new Date(Date.now() - 6 * 60 * 60 * 1000),
      size: '1.8 MB',
      icon: PieChart,
      category: 'analytics',
      status: 'ready'
    },
    {
      id: '3',
      name: 'Financial Summary',
      type: 'pdf',
      description: 'Cost analysis and savings report',
      lastGenerated: new Date(Date.now() - 24 * 60 * 60 * 1000),
      size: '1.2 MB',
      icon: TrendingUp,
      category: 'analytics',
      status: 'ready'
    },
    {
      id: '4',
      name: 'Compliance Audit Report',
      type: 'pdf',
      description: 'Regulatory compliance status and recommendations',
      lastGenerated: new Date(Date.now() - 48 * 60 * 60 * 1000),
      size: '3.1 MB',
      icon: CheckCircle,
      category: 'compliance',
      status: 'ready'
    },
    {
      id: '5',
      name: 'Maintenance Schedule',
      type: 'pdf',
      description: 'Predictive maintenance recommendations and schedule',
      lastGenerated: new Date(Date.now() - 72 * 60 * 60 * 1000),
      size: '1.5 MB',
      icon: Settings,
      category: 'maintenance',
      status: 'ready'
    }
  ]);

  const [reportTemplates] = useState<ReportTemplate[]>([
    {
      id: 'battery-health',
      name: 'Battery Health Report',
      description: 'Detailed battery performance and health analysis',
      icon: Zap,
      category: 'Performance',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'fleet-analytics',
      name: 'Fleet Analytics',
      description: 'Multi-vehicle performance comparison and insights',
      icon: Users,
      category: 'Analytics',
      estimatedTime: '5-7 minutes'
    },
    {
      id: 'efficiency-report',
      name: 'Efficiency Optimization',
      description: 'Energy efficiency recommendations and improvements',
      icon: Target,
      category: 'Performance',
      estimatedTime: '3-4 minutes'
    },
    {
      id: 'real-time-monitoring',
      name: 'Real-time Status Report',
      description: 'Current system status and live monitoring data',
      icon: Activity,
      category: 'Monitoring',
      estimatedTime: '1-2 minutes'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-400 bg-red-400/20 border-red-400/30';
      case 'excel': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'csv': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'compliance': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'analytics': return 'text-purple-400 bg-purple-400/20 border-purple-400/30';
      case 'maintenance': return 'text-orange-400 bg-orange-400/20 border-orange-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return CheckCircle;
      case 'generating': return Clock;
      case 'error': return AlertCircle;
      default: return FileX;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'excel': return FileSpreadsheet;
      case 'csv': return FileText;
      default: return FileText;
    }
  };

  const handleDownloadReport = async (reportId: string, reportName: string) => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userName = userData.fullName || userData.name || 'Customer';
      
      let pdfBlob: Blob;
      
      // Generate appropriate report based on report name/type
      if (reportName.toLowerCase().includes('battery') || reportName.toLowerCase().includes('performance')) {
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
        
        const vehicleData = {
          model: 'Hero Honda Passion AP02SK2409',
          batteryType: '51.2V 45Ah Lithium-Ion',
          range: 'Up to 110 km',
          power: '2.2 kW',
          capacity: '45 Ah',
          registrationNumber: 'AP02SK2409',
        };
        
        const usageData = {
          weeklyDistance: 83,
          monthlyDistance: 321,
          totalDistance: 1275,
          avgEfficiency: 91,
          avgTemp: 32,
        };
        
        pdfBlob = generateBatteryReportPDF(batteryData, vehicleData, usageData, userName);
      } else if (reportName.toLowerCase().includes('compliance')) {
        const complianceData = {
          items: [
            { category: 'Safety', status: 'Compliant', lastChecked: '2 days ago', nextDue: '3 months' },
            { category: 'Environmental', status: 'Compliant', lastChecked: '1 week ago', nextDue: '6 months' },
            { category: 'Legal', status: 'Warning', lastChecked: '1 month ago', nextDue: '2 weeks' }
          ]
        };
        pdfBlob = generateComplianceReportPDF(complianceData, userName);
      } else {
        const analyticsData = {
          efficiency: 91,
          batteryHealth: 97,
          rangeOpt: 87,
          costSavings: 12450
        };
        pdfBlob = generateAdvancedAnalyticsReportPDF(analyticsData, userName);
      }
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `${reportName.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`${reportName} downloaded successfully`);
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report. Please try again.');
    }
  };

  const handleGenerateCustomReport = async (templateId: string, templateName: string) => {
    try {
      toast.loading(`Generating ${templateName}...`);
      
      // Simulate report generation time
      setTimeout(async () => {
        await handleDownloadReport(templateId, templateName);
        toast.dismiss();
      }, 2000);
    } catch (error) {
      console.error('Error generating custom report:', error);
      toast.error('Failed to generate report. Please try again.');
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || report.category === filterCategory;
    const matchesType = filterType === 'all' || report.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-3 h-6 w-6 text-blue-400" />
            Reports & Export Center
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              PROFESSIONAL
            </Badge>
            <Button 
              size="sm" 
              className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500"
            >
              <Settings className="h-3 w-3 mr-1" />
              Configure
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Enhanced Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
          <div className="flex-1">
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              icon={<Search className="h-4 w-4" />}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="analytics">Analytics</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="sm"
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg p-4 border border-blue-500/30 text-center">
            <div className="text-2xl font-bold text-blue-400">47</div>
            <div className="text-xs text-gray-400">Total Reports</div>
            <div className="text-xs text-blue-400 mt-1">+12 this month</div>
          </div>
          <div className="bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg p-4 border border-green-500/30 text-center">
            <div className="text-2xl font-bold text-green-400">12.3 GB</div>
            <div className="text-xs text-gray-400">Storage Used</div>
            <div className="text-xs text-green-400 mt-1">67% available</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-lg p-4 border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-purple-400">5</div>
            <div className="text-xs text-gray-400">Scheduled</div>
            <div className="text-xs text-purple-400 mt-1">Next: Tomorrow</div>
          </div>
          <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-lg p-4 border border-orange-500/30 text-center">
            <div className="text-2xl font-bold text-orange-400">98%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
            <div className="text-xs text-orange-400 mt-1">Excellent</div>
          </div>
        </div>

        {/* Report Templates Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-purple-400" />
            Quick Report Generation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template, index) => {
              const Icon = template.icon;
              
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border border-gray-600/30 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg border border-purple-500/30">
                        <Icon className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{template.name}</div>
                        <div className="text-sm text-gray-400">{template.description}</div>
                        <div className="text-xs text-gray-500 mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {template.estimatedTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Badge className="text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        {template.category}
                      </Badge>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-500 text-white border-0"
                        onClick={() => handleGenerateCustomReport(template.id, template.name)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Available Reports */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center justify-between">
            <span>Recent Reports ({filteredReports.length})</span>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              <FileText className="h-3 w-3 mr-1" />
              View All
            </Button>
          </h3>
          
          {filteredReports.map((report, index) => {
            const Icon = report.icon;
            const TypeIcon = getTypeIcon(report.type);
            const StatusIcon = getStatusIcon(report.status);
            
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border border-gray-600/30 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium flex items-center">
                        {report.name}
                        <StatusIcon className={cn("h-3 w-3 ml-2", 
                          report.status === 'ready' ? 'text-green-400' : 
                          report.status === 'generating' ? 'text-yellow-400' : 'text-red-400'
                        )} />
                      </div>
                      <div className="text-sm text-gray-400">{report.description}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center space-x-4">
                        <span>Generated: {report.lastGenerated.toLocaleString()}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Badge className={cn("text-xs border", getCategoryColor(report.category))}>
                      {report.category}
                    </Badge>
                    <Badge className={cn("flex items-center space-x-1 text-xs border", getTypeColor(report.type))}>
                      <TypeIcon className="h-3 w-3" />
                      <span>{report.type.toUpperCase()}</span>
                    </Badge>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-500 text-white border-0"
                      onClick={() => handleDownloadReport(report.id, report.name)}
                      disabled={report.status !== 'ready'}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      {report.status === 'generating' ? 'Generating...' : 'Download'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="h-auto py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white border-0 flex flex-col items-center">
            <FileSpreadsheet className="h-6 w-6 mb-1" />
            <span className="text-sm">Custom Report</span>
          </Button>
          <Button className="h-auto py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white border-0 flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-1" />
            <span className="text-sm">Schedule</span>
          </Button>
          <Button className="h-auto py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white border-0 flex flex-col items-center">
            <Mail className="h-6 w-6 mb-1" />
            <span className="text-sm">Email Reports</span>
          </Button>
          <Button className="h-auto py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white border-0 flex flex-col items-center">
            <Settings className="h-6 w-6 mb-1" />
            <span className="text-sm">Configure</span>
          </Button>
        </div>

        {/* Enhanced Automated Reports */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-medium flex items-center">
              <Activity className="mr-2 h-5 w-5 text-green-400" />
              Automated Reports
            </h4>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                5 Active
              </Badge>
              <Button size="sm" variant="outline" className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600">
                <Settings className="h-3 w-3 mr-1" />
                Manage
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-400">
            <div className="flex items-center justify-between">
              <span>• Weekly performance summary</span>
              <Badge variant="outline" className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">
                Every Monday
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>• Monthly financial report</span>
              <Badge variant="outline" className="text-xs bg-green-500/20 text-green-400 border-green-500/30">
                1st of month
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>• Quarterly analytics review</span>
              <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                Quarterly
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>• Compliance status update</span>
              <Badge variant="outline" className="text-xs bg-orange-500/20 text-orange-400 border-orange-500/30">
                Bi-weekly
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
