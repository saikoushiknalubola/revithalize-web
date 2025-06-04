
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CustomerManagement as CustomerManagementComponent } from '@/components/professional/CustomerManagement';

export default function CustomerManagement() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Customer Management
            </h1>
            <p className="text-gray-400 mt-2">
              Customer relationship and support management
            </p>
          </div>
        </div>
        <CustomerManagementComponent />
      </div>
    </DashboardLayout>
  );
}
