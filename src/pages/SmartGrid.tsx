
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SmartGridIntegration } from '@/components/features/SmartGridIntegration';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SmartGrid() {
  return (
    <DashboardLayout>
      <div className="space-y-6 px-4 pb-16 md:pb-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Smart Grid Integration
            </h1>
            <p className="text-gray-400 mt-2">Optimize charging and participate in grid energy sharing</p>
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
          <SmartGridIntegration />
        </div>
      </div>
    </DashboardLayout>
  );
}
