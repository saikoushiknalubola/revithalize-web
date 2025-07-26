
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { EcoScore } from '@/components/features/EcoScore';
import { ArrowLeft, Leaf, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
            Sustainability Program
          </h1>
          <p className="text-gray-400 text-lg">
            Monitor environmental impact and efficiency metrics
          </p>
        </motion.header>

        {/* Professional Sustainability Metrics */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <EcoScore score={87} scoreChange={3} />
          
          <Card className="bg-gray-900/80 backdrop-blur-xl border-gray-800/50 shadow-lg">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-green-400" />
                Environmental Impact
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your contribution to sustainable transportation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-gray-400">Saved</span>
                  </div>
                  <div className="text-lg font-bold text-white">234.5 kg</div>
                  <div className="text-xs text-gray-400">CO₂ Emissions</div>
                </div>
                
                <div className="bg-gray-800/50 p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-gray-400">Rating</span>
                  </div>
                  <div className="text-lg font-bold text-white">A+</div>
                  <div className="text-xs text-gray-400">Sustainability</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <h4 className="text-sm font-medium text-green-400 mb-1">Monthly Impact</h4>
                <p className="text-xs text-gray-300">
                  Your efficient riding has prevented 45.2 kg of CO₂ emissions this month, 
                  equivalent to planting 2 trees.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
