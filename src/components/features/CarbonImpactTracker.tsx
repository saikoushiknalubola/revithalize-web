
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, TrendingUp, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export function CarbonImpactTracker() {
  const [todayImpact, setTodayImpact] = useState(0);
  const [weeklyImpact, setWeeklyImpact] = useState(0);
  const [totalImpact, setTotalImpact] = useState(0);
  const [carbonCredits, setCarbonCredits] = useState(0);

  // Simulate real-time carbon impact calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setTodayImpact(prev => prev + Math.random() * 0.1);
      setWeeklyImpact(prev => prev + Math.random() * 0.05);
      setTotalImpact(prev => prev + Math.random() * 0.02);
      setCarbonCredits(prev => prev + Math.random() * 0.01);
    }, 3000);

    // Initialize with realistic values
    setTodayImpact(2.3);
    setWeeklyImpact(15.7);
    setTotalImpact(450.2);
    setCarbonCredits(12.5);

    return () => clearInterval(interval);
  }, []);

  const impactMetrics = [
    {
      title: "Today's CO₂ Saved",
      value: `${todayImpact.toFixed(1)} kg`,
      icon: Leaf,
      color: "text-green-400",
      change: "+2.3kg from yesterday",
      equivalent: "≈ 15 trees planted"
    },
    {
      title: "Weekly Impact",
      value: `${weeklyImpact.toFixed(1)} kg`,
      icon: TrendingUp,
      color: "text-blue-400",
      change: "+8.5kg from last week",
      equivalent: "≈ 95 trees planted"
    },
    {
      title: "Lifetime Savings",
      value: `${totalImpact.toFixed(1)} kg`,
      icon: Globe,
      color: "text-purple-400",
      change: "Top 5% of users",
      equivalent: "≈ 2,800 trees planted"
    },
    {
      title: "Carbon Credits Earned",
      value: `₹${carbonCredits.toFixed(2)}`,
      icon: Award,
      color: "text-yellow-400",
      change: "Available for withdrawal",
      equivalent: "Tradeable on carbon market"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Leaf className="mr-2 h-6 w-6 text-green-400" />
          Real-Time Carbon Impact Tracker
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Monitor your environmental impact and earn carbon credits in real-time
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/30 rounded-lg p-4 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                  <motion.div
                    key={metric.value}
                    initial={{ scale: 1.2, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-right"
                  >
                    <div className={`text-lg font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-white text-sm font-medium mb-1">{metric.title}</h4>
                <p className="text-gray-400 text-xs mb-1">{metric.change}</p>
                <p className="text-gray-500 text-xs">{metric.equivalent}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-4 border border-green-600/20">
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2">Environmental Impact Milestone</h3>
            <p className="text-gray-300 text-sm">
              You've prevented enough CO₂ emissions equivalent to removing a car from the road for 
              <span className="text-green-400 font-bold"> 23 days</span>! 🌱
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
