
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EnergyOptimization as EnergyOptimizationComponent } from '@/components/professional/EnergyOptimization';

export default function EnergyOptimization() {
  const [energyCost] = useState(3745.50); // INR

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Energy Optimization
            </h1>
            <p className="text-gray-400 mt-2">
              Smart energy management and cost optimization
            </p>
          </div>
        </div>
        <EnergyOptimizationComponent energyCost={energyCost} />
      </div>
    </DashboardLayout>
  );
}
