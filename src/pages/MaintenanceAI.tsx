
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PredictiveMaintenance } from '@/components/features/PredictiveMaintenance';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function MaintenanceAI() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-4 md:space-y-6 pb-8 md:pb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with back button */}
        <div className="flex items-center">
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </motion.button>
        </div>

        {/* Page Title */}
        <motion.header 
          className="text-center max-w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue mb-2">
            AI Maintenance Assistant
          </h1>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed">
            Predictive maintenance powered by advanced machine learning algorithms
          </p>
        </motion.header>

        {/* Main Feature Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <PredictiveMaintenance />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
