
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Battery, Cpu, ThermometerSnowflake, AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Battery cell health simulation data
const batteryCells = Array(30).fill(0).map((_, i) => ({
  id: i,
  health: Math.random() * 10 + 90, // 90-100% health
  temperature: Math.random() * 5 + 30, // 30-35°C
  voltage: Math.random() * 0.1 + 3.7, // 3.7-3.8V
  status: Math.random() > 0.9 ? 'warning' : 'normal',
}));

export function VirtualBatteryTwin() {
  const [activeTab, setActiveTab] = useState('health');
  const [rotating, setRotating] = useState(false);
  const [selectedCell, setSelectedCell] = useState<null | number>(null);
  
  useEffect(() => {
    // Auto-rotate battery view every 15 seconds
    const interval = setInterval(() => {
      setRotating(true);
      setTimeout(() => setRotating(false), 2000);
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const getColorForHealth = (health: number) => {
    if (health >= 97) return 'bg-green-500';
    if (health >= 94) return 'bg-green-400';
    if (health >= 92) return 'bg-yellow-400';
    return 'bg-red-400';
  };
  
  const getColorForTemp = (temp: number) => {
    if (temp <= 32) return 'bg-blue-400';
    if (temp <= 34) return 'bg-green-400';
    if (temp <= 36) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Cpu className="mr-2 h-5 w-5 text-blue-400" />
            Virtual Battery Twin
          </div>
          <span className="text-sm bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
            Real-time
          </span>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Interactive digital twin of your battery system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="health" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-800">
            <TabsTrigger value="health">Cell Health</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="health">
            <div className="relative h-64 bg-gray-900 rounded-lg p-4 overflow-hidden">
              {/* 3D Battery visualization */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  rotateY: rotating ? 360 : 0
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-6 gap-1 relative w-full max-w-xs">
                  {batteryCells.map((cell, idx) => (
                    <motion.div
                      key={cell.id}
                      className={cn(
                        "h-10 rounded-sm cursor-pointer relative",
                        getColorForHealth(cell.health),
                        selectedCell === idx ? "ring-2 ring-white" : ""
                      )}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onClick={() => setSelectedCell(idx === selectedCell ? null : idx)}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.01 }}
                    >
                      {cell.status === 'warning' && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Cell details panel */}
              {selectedCell !== null && (
                <motion.div 
                  className="absolute bottom-4 right-4 w-48 bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-sm font-medium text-white mb-2 flex items-center justify-between">
                    <span>Cell #{selectedCell + 1}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      batteryCells[selectedCell].status === 'warning' ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
                    )}>
                      {batteryCells[selectedCell].status === 'warning' ? 'Warning' : 'Normal'}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Health:</span>
                      <span className="text-white">{batteryCells[selectedCell].health.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature:</span>
                      <span className="text-white">{batteryCells[selectedCell].temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Voltage:</span>
                      <span className="text-white">{batteryCells[selectedCell].voltage.toFixed(2)}V</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Legend */}
              <div className="absolute top-4 left-4 bg-gray-800/70 backdrop-blur-sm p-2 rounded-lg text-xs">
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-green-500 rounded-sm mr-2"></div>
                  <span className="text-gray-300">97-100%</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-green-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">94-97%</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-yellow-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">92-94%</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">&lt;92%</span>
                </div>
              </div>
              
              {/* Instruction */}
              <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                Click on any cell for details
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Battery className="h-4 w-4 text-green-400" />
                  <span className="text-white text-sm">Overall Health</span>
                </div>
                <p className="text-lg font-semibold text-white">96.8%</p>
                <div className="mt-1 text-xs text-green-400">+0.2% from last month</div>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-white text-sm">Cell Variance</span>
                </div>
                <p className="text-lg font-semibold text-white">3.1%</p>
                <div className="mt-1 text-xs text-gray-400">Within normal parameters</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="temperature">
            <div className="relative h-64 bg-gray-900 rounded-lg p-4 overflow-hidden">
              {/* Temperature map visualization */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ 
                  rotateY: rotating ? 360 : 0
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-6 gap-1 relative w-full max-w-xs">
                  {batteryCells.map((cell, idx) => (
                    <motion.div
                      key={cell.id}
                      className={cn(
                        "h-10 rounded-sm cursor-pointer relative",
                        getColorForTemp(cell.temperature),
                        selectedCell === idx ? "ring-2 ring-white" : ""
                      )}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      onClick={() => setSelectedCell(idx === selectedCell ? null : idx)}
                    />
                  ))}
                </div>
              </motion.div>
              
              {/* Cell details panel - same as in health tab */}
              {selectedCell !== null && (
                <motion.div 
                  className="absolute bottom-4 right-4 w-48 bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* ... same content as health tab */}
                  <div className="text-sm font-medium text-white mb-2">Cell #{selectedCell + 1}</div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Temperature:</span>
                      <span className="text-white">{batteryCells[selectedCell].temperature.toFixed(1)}°C</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Health:</span>
                      <span className="text-white">{batteryCells[selectedCell].health.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Voltage:</span>
                      <span className="text-white">{batteryCells[selectedCell].voltage.toFixed(2)}V</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Temperature Legend */}
              <div className="absolute top-4 left-4 bg-gray-800/70 backdrop-blur-sm p-2 rounded-lg text-xs">
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-blue-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">&lt;32°C</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-green-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">32-34°C</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="h-3 w-3 bg-yellow-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">34-36°C</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 bg-red-400 rounded-sm mr-2"></div>
                  <span className="text-gray-300">&gt;36°C</span>
                </div>
              </div>
              
              {/* Instruction */}
              <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                Click on any cell for details
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ThermometerSnowflake className="h-4 w-4 text-blue-400" />
                  <span className="text-white text-sm">Avg Temperature</span>
                </div>
                <p className="text-lg font-semibold text-white">32.7°C</p>
                <div className="mt-1 text-xs text-blue-400">-1.3°C from last charge</div>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-white text-sm">Thermal Variance</span>
                </div>
                <p className="text-lg font-semibold text-white">4.2°C</p>
                <div className="mt-1 text-xs text-gray-400">Within normal parameters</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="diagnostics">
            <div className="h-64 bg-gray-900 rounded-lg p-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-white text-sm">Cell balancing status</span>
                  </div>
                  <span className="text-green-400 text-sm">Optimal</span>
                </div>
                
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-white text-sm">BMS firmware</span>
                  </div>
                  <span className="text-gray-400 text-sm">v2.4.1 (Latest)</span>
                </div>
                
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-white text-sm">Charge cycles</span>
                  </div>
                  <span className="text-gray-400 text-sm">127 of 1000+</span>
                </div>
                
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-white text-sm">Fast-charging usage</span>
                  </div>
                  <span className="text-yellow-400 text-sm">28% (Caution)</span>
                </div>
                
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-white text-sm">Peak discharge rate</span>
                  </div>
                  <span className="text-gray-400 text-sm">21.3A (Normal)</span>
                </div>
                
                <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center">
                    <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-white text-sm">Self-discharge rate</span>
                  </div>
                  <span className="text-gray-400 text-sm">0.5%/day</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 gap-4">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg flex items-center justify-center">
                <Zap className="h-4 w-4 mr-2" />
                Run Full Diagnostic
              </button>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Recommendation section */}
        <div className="mt-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/30 p-3 rounded-lg text-sm">
          <div className="flex items-start">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <Zap className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-white">Recommendation</h4>
              <p className="text-gray-400 text-xs mt-1">
                Consider reducing fast-charging frequency to extend battery lifespan. Cell #17 shows early signs of degradation.
              </p>
            </div>
          </div>
          <button className="flex items-center mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors ml-12">
            View detailed report
            <ArrowRight className="h-3 w-3 ml-1" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
