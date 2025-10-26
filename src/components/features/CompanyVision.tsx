
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Zap, Globe, Target, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function CompanyVision() {
  const visionPoints = [
    {
      icon: Leaf,
      title: "Carbon Neutral Future",
      description: "Leading the transition to zero-emission transportation through innovative retrofitting solutions"
    },
    {
      icon: Zap,
      title: "Energy Revolution",
      description: "Transforming existing vehicles into smart, connected electric machines with AI-powered optimization"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Making electric mobility accessible and affordable for everyone, everywhere"
    }
  ];

  const achievements = [
    { label: "Vehicles Retrofitted", value: "50,000+", icon: Trophy },
    { label: "CO₂ Emissions Saved", value: "125,000 tons", icon: Leaf },
    { label: "Active Users", value: "45,000+", icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-revithalize-green to-revithalize-blue mb-4">
          ReVithalize Mobilitric: Revolutionizing Mobility
        </h2>
        <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
          We're pioneering the future of sustainable transportation by transforming conventional vehicles into intelligent electric powerhouses. 
          Our mission is to accelerate global adoption of clean energy through innovative retrofitting technology and smart grid integration.
        </p>
      </motion.div>

      {/* Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visionPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 h-full hover:border-revithalize-green/30 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-gradient-to-br from-revithalize-green/20 to-revithalize-blue/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-revithalize-green" />
                  </div>
                  <CardTitle className="text-white text-xl">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-center leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Achievements */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          return (
            <Card key={index} className="bg-gradient-to-br from-revithalize-dark to-gray-800 border-revithalize-green/20 text-center">
              <CardContent className="p-6">
                <Icon className="h-8 w-8 text-revithalize-green mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{achievement.value}</div>
                <div className="text-gray-400 text-sm">{achievement.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>
    </div>
  );
}
