
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EcoGamification } from '@/components/features/EcoGamification';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EcoProgram() {
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
            Eco Riding Program
          </h1>
          <p className="text-gray-400 text-lg">
            Complete challenges, earn rewards, and make a positive environmental impact
          </p>
        </motion.header>

        {/* Main Feature Component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <EcoGamification />
        </motion.div>

        {/* Additional program information */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-600/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">Environmental Impact</h3>
            <p className="text-gray-300 text-sm">
              Track your carbon footprint reduction and see how your eco-friendly riding 
              contributes to a cleaner environment.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-600/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">Reward System</h3>
            <p className="text-gray-300 text-sm">
              Earn points for eco-friendly behavior and redeem them for discounts, 
              accessories, or premium features.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-600/20 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-3">Community</h3>
            <p className="text-gray-300 text-sm">
              Connect with other eco-riders, share tips, and participate in 
              community challenges for bigger rewards.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
