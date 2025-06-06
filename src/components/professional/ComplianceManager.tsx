import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, FileCheck, Calendar, Download, Settings, Upload, Bell, Eye, Plus, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ComplianceItem {
  id: string;
  title: string;
  category: 'safety' | 'environmental' | 'legal' | 'quality';
  status: 'compliant' | 'warning' | 'non-compliant';
  lastChecked: string;
  nextDue: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

interface Certification {
  name: string;
  status: 'valid' | 'expiring' | 'expired';
  expiry: string;
  issuer: string;
  documentUrl?: string;
}

interface AuditSchedule {
  id: string;
  type: string;
  date: string;
  auditor: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface RegulatoryUpdate {
  id: string;
  title: string;
  date: string;
  severity: 'high' | 'medium' | 'low';
}

export function ComplianceManager() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'safety' | 'environmental' | 'legal' | 'quality'>('all');
  const [showDocuments, setShowDocuments] = useState(false);

  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'Battery Safety Standards',
      category: 'safety',
      status: 'compliant',
      lastChecked: '2 days ago',
      nextDue: '3 months',
      description: 'IEC 62133 compliance for lithium-ion battery systems',
      riskLevel: 'low'
    },
    {
      id: '2',
      title: 'Emission Standards',
      category: 'environmental',
      status: 'compliant',
      lastChecked: '1 week ago',
      nextDue: '6 months',
      description: 'BS VI emission norms compliance verification',
      riskLevel: 'medium'
    },
    {
      id: '3',
      title: 'Vehicle Registration',
      category: 'legal',
      status: 'warning',
      lastChecked: '1 month ago',
      nextDue: '2 weeks',
      description: 'Motor Vehicle Department registration renewal',
      riskLevel: 'high'
    },
    {
      id: '4',
      title: 'Quality Assurance',
      category: 'quality',
      status: 'compliant',
      lastChecked: '5 days ago',
      nextDue: '1 month',
      description: 'ISO 9001:2015 quality management system audit',
      riskLevel: 'low'
    }
  ]);

  const [certifications] = useState<Certification[]>([
    { name: 'ARAI Certification', status: 'valid', expiry: 'Dec 2025', issuer: 'ARAI', documentUrl: '#' },
    { name: 'BIS Certification', status: 'valid', expiry: 'Mar 2025', issuer: 'BIS', documentUrl: '#' },
    { name: 'Pollution Certificate', status: 'expiring', expiry: 'Jan 2025', issuer: 'CPCB', documentUrl: '#' },
    { name: 'Insurance Certificate', status: 'valid', expiry: 'Aug 2025', issuer: 'Insurance Co.', documentUrl: '#' }
  ]);

  const [auditSchedule] = useState<AuditSchedule[]>([
    { id: '1', type: 'Safety Audit', date: '2024-12-15', auditor: 'Safety Corp Ltd', status: 'scheduled' },
    { id: '2', type: 'Environmental Review', date: '2024-12-20', auditor: 'Green Audit Inc', status: 'scheduled' },
    { id: '3', type: 'Quality Assessment', date: '2024-11-30', auditor: 'QA Systems', status: 'completed' }
  ]);

  const [regulatoryUpdates] = useState<RegulatoryUpdate[]>([
    { id: '1', title: 'Updated BS VI Emission Norms', date: '2024-11-25', severity: 'high' },
    { id: '2', title: 'Battery Safety Regulation Changes', date: '2024-11-20', severity: 'medium' },
    { id: '3', title: 'Insurance Policy Updates', date: '2024-11-15', severity: 'low' }
  ]);

  const categories = [
    { key: 'all', label: 'All', count: complianceItems.length },
    { key: 'safety', label: 'Safety', count: complianceItems.filter(i => i.category === 'safety').length },
    { key: 'environmental', label: 'Environmental', count: complianceItems.filter(i => i.category === 'environmental').length },
    { key: 'legal', label: 'Legal', count: complianceItems.filter(i => i.category === 'legal').length },
    { key: 'quality', label: 'Quality', count: complianceItems.filter(i => i.category === 'quality').length }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'valid': return 'text-green-400 bg-green-400/20';
      case 'warning':
      case 'expiring': return 'text-yellow-400 bg-yellow-400/20';
      case 'non-compliant':
      case 'expired': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'valid': return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/40';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/40';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? complianceItems 
    : complianceItems.filter(item => item.category === selectedCategory);

  const compliantCount = complianceItems.filter(i => i.status === 'compliant').length;

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-white text-xl flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="mr-3 h-6 w-6 text-emerald-400" />
            Compliance Manager
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              {compliantCount}/{complianceItems.length} Compliant
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
        {/* Enhanced Action Bar */}
        <div className="flex flex-wrap gap-3 items-center justify-between bg-gray-800/30 p-4 rounded-lg border border-gray-700/50">
          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Compliance Item
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
            >
              <Upload className="h-3 w-3 mr-1" />
              Upload Document
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
              onClick={() => setShowDocuments(!showDocuments)}
            >
              <Eye className="h-3 w-3 mr-1" />
              {showDocuments ? 'Hide' : 'View'} Documents
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
            >
              <Filter className="h-3 w-3 mr-1" />
              Filter
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
            >
              <Bell className="h-3 w-3 mr-1" />
              Alerts
            </Button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setSelectedCategory(category.key as any)}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                selectedCategory === category.key
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 border border-gray-700/50"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.label}</span>
              <Badge variant="outline" className="text-xs bg-gray-700/50 border-gray-600">
                {category.count}
              </Badge>
            </motion.button>
          ))}
        </div>

        {/* Compliance Items */}
        <div className="space-y-3">
          {filteredItems.map((item, index) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-emerald-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <StatusIcon className={cn("h-5 w-5", 
                      item.status === 'compliant' ? 'text-green-400' : 
                      item.status === 'warning' ? 'text-yellow-400' : 'text-red-400'
                    )} />
                    <div>
                      <div className="text-sm font-medium text-white">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={cn("text-xs", getRiskColor(item.riskLevel))}>
                      {item.riskLevel} risk
                    </Badge>
                    <Badge className={cn("text-xs", getStatusColor(item.status))}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Last checked: {item.lastChecked}</span>
                  <span>Next due: {item.nextDue}</span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-emerald-600/80 hover:bg-emerald-500/80 text-white"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Mark Complete
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Audit Schedule */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-blue-400" />
            Upcoming Audits
          </h4>
          <div className="space-y-2">
            {auditSchedule.filter(audit => audit.status !== 'completed').map((audit) => (
              <div key={audit.id} className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white">{audit.type}</div>
                  <div className="text-xs text-gray-400">
                    {audit.date} • {audit.auditor}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={cn("text-xs",
                    audit.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400' :
                    audit.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  )}>
                    {audit.status}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
                  >
                    Reschedule
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <FileCheck className="h-4 w-4 mr-2 text-emerald-400" />
            Active Certifications
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.name} className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-white">{cert.name}</div>
                  <Badge className={cn("text-xs", getStatusColor(cert.status))}>
                    {cert.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  <div>Expires: {cert.expiry}</div>
                  <div>Issuer: {cert.issuer}</div>
                </div>
                {cert.documentUrl && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Updates */}
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center">
            <Bell className="h-4 w-4 mr-2 text-orange-400" />
            Recent Regulatory Updates
          </h4>
          <div className="space-y-2">
            {regulatoryUpdates.map((update) => (
              <div key={update.id} className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-white">{update.title}</div>
                  <div className="text-xs text-gray-400">{update.date}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={cn("text-xs",
                    update.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                    update.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  )}>
                    {update.severity}
                  </Badge>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
                  >
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button className="bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 hover:from-emerald-500/80 hover:to-emerald-400/80 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Audit
          </Button>
          <Button 
            variant="outline" 
            className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500"
          >
            <Bell className="h-4 w-4 mr-2" />
            Set Reminders
          </Button>
        </div>

        {/* Enhanced Compliance Overview */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-lg p-4 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-white">Overall Compliance Score</div>
              <div className="text-xs text-gray-400">Regulatory compliance status across all categories</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">
                {((compliantCount / complianceItems.length) * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-emerald-400">Compliant</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-400">{complianceItems.filter(i => i.status === 'compliant').length}</div>
              <div className="text-xs text-gray-400">Compliant</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">{complianceItems.filter(i => i.status === 'warning').length}</div>
              <div className="text-xs text-gray-400">Warnings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-400">{complianceItems.filter(i => i.status === 'non-compliant').length}</div>
              <div className="text-xs text-gray-400">Non-Compliant</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-400">{auditSchedule.filter(a => a.status === 'scheduled').length}</div>
              <div className="text-xs text-gray-400">Pending Audits</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
