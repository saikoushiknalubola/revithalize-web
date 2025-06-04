
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ComplianceManager as ComplianceManagerComponent } from '@/components/professional/ComplianceManager';

export default function ComplianceManager() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Compliance Manager
            </h1>
            <p className="text-gray-400 mt-2">
              Regulatory compliance and audit management
            </p>
          </div>
        </div>
        <ComplianceManagerComponent />
      </div>
    </DashboardLayout>
  );
}
