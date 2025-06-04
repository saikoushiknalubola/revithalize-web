
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AIInsights as AIInsightsComponent } from '@/components/professional/AIInsights';

export default function AIInsights() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              AI Insights
            </h1>
            <p className="text-gray-400 mt-2">
              Artificial intelligence-powered insights and recommendations
            </p>
          </div>
        </div>
        <AIInsightsComponent />
      </div>
    </DashboardLayout>
  );
}
