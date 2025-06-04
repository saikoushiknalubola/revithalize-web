
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ChargingIntelligence as ChargingIntelligenceComponent } from '@/components/professional/ChargingIntelligence';

export default function ChargingIntelligence() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Charging Intelligence
            </h1>
            <p className="text-gray-400 mt-2">
              Smart charging management and optimization
            </p>
          </div>
        </div>
        <ChargingIntelligenceComponent />
      </div>
    </DashboardLayout>
  );
}
