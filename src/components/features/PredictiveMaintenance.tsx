
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, Wrench, Brain, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export function PredictiveMaintenance() {
  const [batteryHealth, setBatteryHealth] = useState(98);
  const [motorEfficiency, setMotorEfficiency] = useState(95);
  const [brakePadLife, setBrakePadLife] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryHealth(prev => Math.max(95, prev + (Math.random() - 0.5) * 0.2));
      setMotorEfficiency(prev => Math.max(93, prev + (Math.random() - 0.5) * 0.3));
      setBrakePadLife(prev => Math.max(75, prev + (Math.random() - 0.5) * 0.1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const maintenanceItems = [
    {
      component: "Battery Pack",
      health: batteryHealth,
      status: batteryHealth > 97 ? "excellent" : batteryHealth > 95 ? "good" : "attention",
      nextMaintenance: "8 months",
      aiPrediction: "Optimal charging patterns detected. Expected lifespan: 12+ years",
      icon: CheckCircle
    },
    {
      component: "Motor System",
      health: motorEfficiency,
      status: motorEfficiency > 94 ? "excellent" : motorEfficiency > 92 ? "good" : "attention", 
      nextMaintenance: "6 months",
      aiPrediction: "Performance within optimal range. No issues predicted",
      icon: CheckCircle
    },
    {
      component: "Brake Pads",
      health: brakePadLife,
      status: brakePadLife > 80 ? "good" : brakePadLife > 70 ? "attention" : "replace",
      nextMaintenance: "2 months",
      aiPrediction: "Regenerative braking usage is excellent. 20% longer life expected",
      icon: brakePadLife > 80 ? CheckCircle : AlertTriangle
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-400";
      case "good": return "text-blue-400";
      case "attention": return "text-yellow-400";
      case "replace": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const getProgressColor = (health: number) => {
    if (health > 90) return "bg-green-500";
    if (health > 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="mr-2 h-6 w-6 text-purple-400" />
          AI-Powered Predictive Maintenance
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Machine learning algorithms predict maintenance needs before issues occur
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {maintenanceItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/30 rounded-lg p-4 border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <Icon className={`h-5 w-5 mr-3 ${getStatusColor(item.status)}`} />
                    <div>
                      <h4 className="text-white font-medium">{item.component}</h4>
                      <p className={`text-sm capitalize ${getStatusColor(item.status)}`}>
                        {item.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{item.health.toFixed(1)}%</div>
                    <div className="text-xs text-gray-400">Health Score</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Component Health</span>
                    <span>{item.health.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div 
                      className={`h-2 rounded-full ${getProgressColor(item.health)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.health}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-gray-300">Next maintenance: </span>
                    <span className="text-blue-400 ml-1">{item.nextMaintenance}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <Brain className="h-4 w-4 text-purple-400 mr-2 mt-0.5" />
                    <span className="text-gray-300">{item.aiPrediction}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg p-4 border border-purple-600/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-semibold mb-1">AI Maintenance Score</h3>
              <p className="text-gray-300 text-sm">Your vehicle is performing exceptionally well</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">A+</div>
              <div className="text-xs text-gray-400">Overall Grade</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
