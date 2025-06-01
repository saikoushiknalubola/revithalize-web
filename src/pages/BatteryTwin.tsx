
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { VirtualBatteryTwin } from '@/components/features/VirtualBatteryTwin';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BatteryTwin() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6 px-4 pb-16 md:pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with back button */}
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </motion.button>
        </div>

        {/* Page Title */}
        <motion.header 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue mb-2">
            Virtual Battery Twin
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time 3D visualization and diagnostics of your battery system
          </p>
        </motion.header>

        {/* Main Feature Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <VirtualBatteryTwin />
        </motion.div>

        {/* Additional insights or tips specific to battery twin */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-600/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">Battery Health Insights</h3>
            <p className="text-gray-300 text-sm">
              Monitor individual cell performance and identify potential issues before they impact your ride. 
              The 3D visualization helps you understand your battery's condition at a glance.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-600/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">Predictive Maintenance</h3>
            <p className="text-gray-300 text-sm">
              AI-powered analysis predicts when maintenance might be needed, helping you prevent 
              unexpected breakdowns and extend your battery's lifespan.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
