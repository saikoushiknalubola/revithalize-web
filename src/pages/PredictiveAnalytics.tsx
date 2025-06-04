
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PredictiveAnalytics as PredictiveAnalyticsComponent } from '@/components/professional/PredictiveAnalytics';

export default function PredictiveAnalytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Predictive Analytics
            </h1>
            <p className="text-gray-400 mt-2">
              AI-powered predictions and forecasting
            </p>
          </div>
        </div>
        <PredictiveAnalyticsComponent />
      </div>
    </DashboardLayout>
  );
}
