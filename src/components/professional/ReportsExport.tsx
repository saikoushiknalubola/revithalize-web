
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Mail, Calendar, BarChart3, PieChart, TrendingUp, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Report {
  id: string;
  name: string;
  type: 'pdf' | 'excel' | 'csv';
  description: string;
  lastGenerated: Date;
  size: string;
  icon: any;
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
      icon: BarChart3
    },
    {
      id: '2',
      name: 'Energy Consumption Analytics',
      type: 'excel',
      description: 'Detailed breakdown of energy usage patterns',
      lastGenerated: new Date(Date.now() - 6 * 60 * 60 * 1000),
      size: '1.8 MB',
      icon: PieChart
    },
    {
      id: '3',
      name: 'Financial Summary',
      type: 'pdf',
      description: 'Cost analysis and savings report',
      lastGenerated: new Date(Date.now() - 24 * 60 * 60 * 1000),
      size: '1.2 MB',
      icon: TrendingUp
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-400 bg-red-400/20';
      case 'excel': return 'text-green-400 bg-green-400/20';
      case 'csv': return 'text-blue-400 bg-blue-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
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

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center">
          <FileText className="mr-3 h-6 w-6 text-blue-400" />
          Reports & Export
          <div className="ml-auto bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-white">ANALYTICS</span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="text-lg font-bold text-white">47</div>
            <div className="text-xs text-gray-400">Reports Generated</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="text-lg font-bold text-white">12.3 GB</div>
            <div className="text-xs text-gray-400">Total Size</div>
          </div>
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-3 border border-gray-600/30 text-center">
            <div className="text-lg font-bold text-white">5</div>
            <div className="text-xs text-gray-400">Scheduled</div>
          </div>
        </div>

        {/* Report Templates */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white">Available Reports</h3>
          
          {reports.map((report, index) => {
            const Icon = report.icon;
            const TypeIcon = getTypeIcon(report.type);
            
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-gray-800/70 to-gray-700/70 rounded-lg p-4 border border-gray-600/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{report.name}</div>
                      <div className="text-sm text-gray-400">{report.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last generated: {report.lastGenerated.toLocaleString()} • {report.size}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className={cn("flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-medium", getTypeColor(report.type))}>
                      <TypeIcon className="h-3 w-3" />
                      <span>{report.type.toUpperCase()}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-revithalize-green/20 hover:bg-revithalize-green/30 text-revithalize-green"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button className="bg-gradient-to-r from-green-600/80 to-green-500/80 hover:from-green-500/80 hover:to-green-400/80 text-white">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Custom Report
          </Button>
          <Button className="bg-gradient-to-r from-purple-600/80 to-purple-500/80 hover:from-purple-500/80 hover:to-purple-400/80 text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button className="bg-gradient-to-r from-blue-600/80 to-blue-500/80 hover:from-blue-500/80 hover:to-blue-400/80 text-white">
            <Mail className="h-4 w-4 mr-2" />
            Email Reports
          </Button>
        </div>

        {/* Automated Reports */}
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-lg p-4 border border-gray-600/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white font-medium">Automated Reports</h4>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Active</span>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <div>• Weekly performance summary (Mondays at 9 AM)</div>
            <div>• Monthly financial report (1st of each month)</div>
            <div>• Quarterly analytics review (Quarterly)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
