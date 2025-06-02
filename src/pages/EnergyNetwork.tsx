
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SocialEnergyNetwork } from '@/components/features/SocialEnergyNetwork';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EnergyNetwork() {
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
            Social Energy Network
          </h1>
          <p className="text-gray-400 text-lg">
            Connect with the community and share energy insights with fellow EV users
          </p>
        </motion.header>

        {/* Main Feature Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SocialEnergyNetwork />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
