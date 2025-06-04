
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, AlertTriangle, FileCheck, Calendar, Download, Settings } from 'lucide-react';
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
}

interface Certification {
  name: string;
  status: 'valid' | 'expiring' | 'expired';
  expiry: string;
  issuer: string;
}

export function ComplianceManager() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'safety' | 'environmental' | 'legal' | 'quality'>('all');

  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      title: 'Battery Safety Standards',
      category: 'safety',
      status: 'compliant',
      lastChecked: '2 days ago',
      nextDue: '3 months',
      description: 'IEC 62133 compliance for lithium-ion battery systems'
    },
    {
      id: '2',
      title: 'Emission Standards',
      category: 'environmental',
      status: 'compliant',
      lastChecked: '1 week ago',
      nextDue: '6 months',
      description: 'BS VI emission norms compliance verification'
    },
    {
      id: '3',
      title: 'Vehicle Registration',
      category: 'legal',
      status: 'warning',
      lastChecked: '1 month ago',
      nextDue: '2 weeks',
      description: 'Motor Vehicle Department registration renewal'
    },
    {
      id: '4',
      title: 'Quality Assurance',
      category: 'quality',
      status: 'compliant',
      lastChecked: '5 days ago',
      nextDue: '1 month',
      description: 'ISO 9001:2015 quality management system audit'
    }
  ]);

  const [certifications] = useState<Certification[]>([
    { name: 'ARAI Certification', status: 'valid', expiry: 'Dec 2025', issuer: 'ARAI' },
    { name: 'BIS Certification', status: 'valid', expiry: 'Mar 2025', issuer: 'BIS' },
    { name: 'Pollution Certificate', status: 'expiring', expiry: 'Jan 2025', issuer: 'CPCB' },
    { name: 'Insurance Certificate', status: 'valid', expiry: 'Aug 2025', issuer: 'Insurance Co.' }
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
            <Badge className="bg-emerald-500/20 text-emerald-400">
              {compliantCount}/{complianceItems.length} Compliant
            </Badge>
            <Button size="sm" variant="outline" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Configure
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
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
                  : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.label}</span>
              <Badge variant="outline" className="text-xs">
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
                className="p-4 bg-gray-800/30 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-2">
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
                  <Badge className={cn("text-xs", getStatusColor(item.status))}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Last checked: {item.lastChecked}</span>
                  <span>Next due: {item.nextDue}</span>
                </div>
              </motion.div>
            );
          })}
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
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-white">{cert.name}</div>
                  <Badge className={cn("text-xs", getStatusColor(cert.status))}>
                    {cert.status}
                  </Badge>
                </div>
                <div className="text-xs text-gray-400">
                  <div>Expires: {cert.expiry}</div>
                  <div>Issuer: {cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="bg-gradient-to-r from-emerald-600/80 to-emerald-500/80 hover:from-emerald-500/80 hover:to-emerald-400/80 text-white">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Audit
          </Button>
        </div>

        {/* Compliance Overview */}
        <div className="bg-gradient-to-r from-emerald-900/30 to-emerald-800/30 rounded-lg p-4 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Compliance Score</div>
              <div className="text-xs text-gray-400">Overall regulatory compliance status</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-400">
                {((compliantCount / complianceItems.length) * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-emerald-400">Compliant</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
