
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AdvancedAnalytics as AdvancedAnalyticsComponent } from '@/components/professional/AdvancedAnalytics';

export default function AdvancedAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Advanced Analytics
            </h1>
            <p className="text-gray-400 mt-2">
              Deep insights and comprehensive data analysis
            </p>
          </div>
        </div>
        <AdvancedAnalyticsComponent />
      </div>
    </DashboardLayout>
  );
}
