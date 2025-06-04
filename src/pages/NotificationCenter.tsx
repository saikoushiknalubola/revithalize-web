
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { NotificationCenter as NotificationCenterComponent } from '@/components/professional/NotificationCenter';

export default function NotificationCenter() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Notification Center
            </h1>
            <p className="text-gray-400 mt-2">
              Manage alerts, notifications and communication
            </p>
          </div>
        </div>
        <NotificationCenterComponent />
      </div>
    </DashboardLayout>
  );
}
