
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SecurityManager as SecurityManagerComponent } from '@/components/professional/SecurityManager';

export default function SecurityManager() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Security Manager
            </h1>
            <p className="text-gray-400 mt-2">
              System security and access control management
            </p>
          </div>
        </div>
        <SecurityManagerComponent />
      </div>
    </DashboardLayout>
  );
}
