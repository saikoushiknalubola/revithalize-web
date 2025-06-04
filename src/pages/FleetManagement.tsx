
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { FleetManagement as FleetManagementComponent } from '@/components/professional/FleetManagement';

export default function FleetManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Fleet Management
            </h1>
            <p className="text-gray-400 mt-2">
              Comprehensive fleet monitoring and management system
            </p>
          </div>
        </div>
        <FleetManagementComponent />
      </div>
    </DashboardLayout>
  );
}
