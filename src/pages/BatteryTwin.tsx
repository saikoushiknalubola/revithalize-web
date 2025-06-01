
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VirtualBatteryTwin } from '@/components/features/VirtualBatteryTwin';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function BatteryTwin() {
  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 pb-16 md:pb-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Virtual Battery Twin
            </h1>
            <p className="text-gray-400 mt-2">Real-time 3D visualization of battery cell health</p>
          </div>
          <Link to="/dashboard">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Feature Component */}
        <div className="w-full">
          <VirtualBatteryTwin />
        </div>
      </div>
    </DashboardLayout>
  );
}
