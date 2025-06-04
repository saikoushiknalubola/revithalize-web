
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportsExport as ReportsExportComponent } from '@/components/professional/ReportsExport';

export default function ReportsExport() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Reports & Export
            </h1>
            <p className="text-gray-400 mt-2">
              Generate and export comprehensive reports
            </p>
          </div>
        </div>
        <ReportsExportComponent />
      </div>
    </DashboardLayout>
  );
}
