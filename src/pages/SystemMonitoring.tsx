
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SystemMonitoring as SystemMonitoringComponent } from '@/components/professional/SystemMonitoring';

export default function SystemMonitoring() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              System Monitoring
            </h1>
            <p className="text-gray-400 mt-2">
              Real-time system health and performance monitoring
            </p>
          </div>
        </div>
        <SystemMonitoringComponent />
      </div>
    </DashboardLayout>
  );
}
