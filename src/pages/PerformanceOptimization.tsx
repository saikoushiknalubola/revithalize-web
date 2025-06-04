
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PerformanceOptimization as PerformanceOptimizationComponent } from '@/components/professional/PerformanceOptimization';

export default function PerformanceOptimization() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Performance Optimization
            </h1>
            <p className="text-gray-400 mt-2">
              Vehicle performance tuning and optimization
            </p>
          </div>
        </div>
        <PerformanceOptimizationComponent />
      </div>
    </DashboardLayout>
  );
}
