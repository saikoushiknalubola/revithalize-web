
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { IntegrationHub as IntegrationHubComponent } from '@/components/professional/IntegrationHub';

export default function IntegrationHub() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue">
              Integration Hub
            </h1>
            <p className="text-gray-400 mt-2">
              Manage all your third-party integrations and APIs
            </p>
          </div>
        </div>
        <IntegrationHubComponent />
      </div>
    </DashboardLayout>
  );
}
