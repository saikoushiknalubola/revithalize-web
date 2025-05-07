
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Shield, Leaf, ScanLine, Cpu } from 'lucide-react';
import { VirtualBatteryTwin } from '@/components/features/VirtualBatteryTwin';
import { EcoGamification } from '@/components/features/EcoGamification';
import { AdaptiveRangePrediction } from '@/components/features/AdaptiveRangePrediction';
import { SmartGridIntegration } from '@/components/features/SmartGridIntegration';
import { useNavigate, useParams } from 'react-router-dom';
import { useScreenSize } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  const { feature } = useParams<{ feature?: string }>();
  const [userName, setUserName] = useState('User');
  const { isMobile, isTablet } = useScreenSize();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Check for authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
      navigate('/auth');
    } else {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.fullName || user.name || 'User');
      }
    }
  }, [navigate]);

  // Set active feature from URL parameter if present
  useEffect(() => {
    if (feature) {
      setActiveFeature(feature);
    }
  }, [feature]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  // Smart features definition
  const smartFeatures = [
    {
      id: 'battery-twin',
      title: "Virtual Battery Twin",
      description: "Real-time 3D visualization of battery cell health",
      icon: Shield,
      color: "bg-gradient-to-br from-blue-900/40 to-blue-800/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-600/20",
      component: VirtualBatteryTwin
    },
    {
      id: 'eco-program',
      title: "Eco Riding Program",
      description: "Complete challenges and earn rewards for eco-friendly riding",
      icon: Leaf,
      color: "bg-gradient-to-br from-purple-900/40 to-purple-800/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-600/20",
      component: EcoGamification
    },
    {
      id: 'range-prediction',
      title: "AI Range Prediction",
      description: "Accurate range forecasting with adaptive learning",
      icon: ScanLine,
      color: "bg-gradient-to-br from-green-900/40 to-green-800/20",
      iconColor: "text-green-400", 
      borderColor: "border-green-600/20",
      component: AdaptiveRangePrediction
    },
    {
      id: 'smart-grid',
      title: "Smart Grid Integration",
      description: "Optimize charging and participate in grid energy sharing",
      icon: Cpu,
      color: "bg-gradient-to-br from-red-900/40 to-red-800/20",
      iconColor: "text-red-400",
      borderColor: "border-red-600/20",
      component: SmartGridIntegration
    }
  ];

  return (
    <DashboardLayout activeFeature={activeFeature} setActiveFeature={setActiveFeature}>
      <motion.div 
        className="space-y-4 sm:space-y-6 px-2 sm:px-4 pb-16 md:pb-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Show active feature component */}
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-2 border-gray-800/50 p-4 rounded-lg shadow-lg"
          >
            {smartFeatures.find(f => f.id === activeFeature)?.component && 
              React.createElement(smartFeatures.find(f => f.id === activeFeature)?.component as React.ComponentType)}
          </motion.div>
        )}

        {/* Smart Features Section */}
        <motion.div 
          className="mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue flex items-center mb-4">
            <Shield className="mr-2 h-5 w-5 text-revithalize-green" />
            Smart Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeFeature === feature.id;
              return (
                <motion.div
                  key={feature.id}
                  whileHover={{ scale: 1.03, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.2 + (index * 0.1),
                    type: "spring",
                    stiffness: 200
                  }}
                  onClick={() => setActiveFeature(isActive ? null : feature.id)}
                  className={cn(
                    feature.color, 
                    `border ${feature.borderColor} rounded-lg p-5 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300`,
                    isActive ? 'ring-2 ring-white/30' : ''
                  )}
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "bg-black/30 p-3 rounded-lg mr-4",
                      isActive ? "bg-black/50" : ""
                    )}>
                      <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
