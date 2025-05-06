
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, CloudSun, Navigation, Calendar, Zap, ThermometerSnowflake, Wind, TrendingUp, Eye, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function AdaptiveRangePrediction() {
  const [animating, setAnimating] = useState(false);
  const [confidence, setConfidence] = useState(92);
  
  // Simulated weather data
  const weatherData = {
    temperature: 29,
    wind: 12,
    conditions: 'Partly Cloudy',
    impact: -5
  };
  
  // Simulated route factors
  const routeFactors = {
    elevation: 'Moderate hills (+5%)',
    traffic: 'Light traffic',
    road: 'Mostly highways'
  };
  
  // Upcoming trips from calendar
  const upcomingTrips = [
    {
      id: 't1',
      title: 'Office Commute',
      distance: 18,
      time: 'Today, 9:00 AM',
      recurring: true
    },
    {
      id: 't2',
      title: 'Grocery Shopping',
      distance: 7,
      time: 'Tomorrow, 6:30 PM',
      recurring: false
    },
    {
      id: 't3',
      title: 'Weekend Getaway',
      distance: 82,
      time: 'Saturday, 10:00 AM',
      recurring: false
    }
  ];
  
  useEffect(() => {
    // Animate the confidence level changing periodically
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setConfidence(Math.floor(Math.random() * 6) + 90);
        setAnimating(false);
      }, 1000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 shadow-lg overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Sparkles className="mr-2 h-5 w-5 text-blue-400" />
            AI Range Prediction
          </div>
          <motion.div 
            className="text-sm bg-blue-500/20 px-2 py-0.5 rounded-full flex items-center"
            animate={animating ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1 }}
          >
            <Eye className="h-3.5 w-3.5 text-blue-300 mr-1" />
            <span className="text-white">{confidence}% confidence</span>
          </motion.div>
        </CardTitle>
        <CardDescription className="text-gray-400">
          Smart range forecasting based on your driving habits and conditions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="factors">Factors</TabsTrigger>
            <TabsTrigger value="trips">Upcoming Trips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="relative bg-gray-900 rounded-lg p-5 overflow-hidden flex items-center justify-center">
              {/* Range visualization */}
              <div className="relative">
                <motion.div 
                  className="w-48 h-48 rounded-full border-[16px] border-gray-800 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">110 km</div>
                      <div className="text-xs text-gray-400 mt-1">Estimated Range</div>
                      <div className="text-xs text-blue-400 mt-1">+7 km from yesterday</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Pulsing confidence radius */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.1)', '0 0 0 20px rgba(59, 130, 246, 0)']
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  style={{ borderRadius: '50%' }}
                />
                
                {/* Additional confidence radius indicators */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[calc(100%+30px)] h-[calc(100%+30px)] rounded-full border border-blue-500/20 border-dashed" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[calc(100%+60px)] h-[calc(100%+60px)] rounded-full border border-blue-500/10 border-dashed" />
                </div>
                
                {/* Range markers */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs text-gray-400">
                  <span>120 km</span>
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-gray-400">
                  <span>100 km</span>
                </div>
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 -translate-x-full text-xs text-gray-400">
                  <span>105 km</span>
                </div>
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 translate-x-full text-xs text-gray-400">
                  <span>115 km</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CloudSun className="h-4 w-4 text-yellow-400" />
                  <span className="text-white text-sm">Weather Impact</span>
                </div>
                <p className="text-lg font-semibold text-white">{weatherData.impact > 0 ? '+' : ''}{weatherData.impact}%</p>
                <div className="mt-1 text-xs text-gray-400">{weatherData.temperature}°C, {weatherData.conditions}</div>
              </div>
              
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-white text-sm">Efficiency</span>
                </div>
                <p className="text-lg font-semibold text-white">92%</p>
                <div className="mt-1 text-xs text-green-400">+3% from average</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="factors">
            <div className="space-y-3">
              <div className="bg-blue-900/20 border border-blue-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <ThermometerSnowflake className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-white text-sm font-medium">Temperature</span>
                  </div>
                  <span className="text-xs text-gray-400">{weatherData.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-700 h-1.5 rounded-full mr-3">
                    <div className="bg-blue-500 h-full rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-xs text-white whitespace-nowrap">-3% impact</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Warm weather slightly increases AC usage, reducing range</p>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Wind className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="text-white text-sm font-medium">Wind Conditions</span>
                  </div>
                  <span className="text-xs text-gray-400">{weatherData.wind} km/h</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-700 h-1.5 rounded-full mr-3">
                    <div className="bg-yellow-500 h-full rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-xs text-white whitespace-nowrap">-2% impact</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Moderate crosswinds slightly affect aerodynamics</p>
              </div>
              
              <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Map className="h-4 w-4 text-green-400 mr-2" />
                    <span className="text-white text-sm font-medium">Route Profile</span>
                  </div>
                  <span className="text-xs text-gray-400">Varied terrain</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-700 h-1.5 rounded-full mr-3">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-xs text-white whitespace-nowrap">-5% impact</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">{routeFactors.elevation}</p>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Zap className="h-4 w-4 text-purple-400 mr-2" />
                    <span className="text-white text-sm font-medium">Riding Style</span>
                  </div>
                  <span className="text-xs text-gray-400">Eco-focused</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-full bg-gray-700 h-1.5 rounded-full mr-3">
                    <div className="bg-purple-500 h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-xs text-white whitespace-nowrap">+8% impact</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Your smooth acceleration patterns extend range</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trips">
            <div className="space-y-3">
              {upcomingTrips.map((trip) => (
                <div 
                  key={trip.id}
                  className="bg-gray-800 rounded-lg p-3 border border-gray-700/30"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-white text-sm font-medium">{trip.title}</span>
                      {trip.recurring && (
                        <span className="ml-2 text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full">
                          Recurring
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{trip.time}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="bg-gray-700/50 rounded p-2">
                      <div className="text-xs text-gray-400">Distance</div>
                      <div className="text-sm text-white">{trip.distance} km</div>
                    </div>
                    
                    <div className="bg-gray-700/50 rounded p-2">
                      <div className="text-xs text-gray-400">Range Impact</div>
                      <div className="text-sm text-white">
                        {Math.round(trip.distance / 110 * 100)}% of battery
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      {trip.distance <= 100 ? (
                        <span className="text-green-400 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Range sufficient
                        </span>
                      ) : (
                        <span className="text-yellow-400">Charging needed</span>
                      )}
                    </div>
                    
                    <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded transition-colors flex items-center">
                      <Navigation className="h-3 w-3 mr-1" />
                      Navigate
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Sync with Calendar
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 p-3 rounded-lg text-sm">
          <div className="flex items-center">
            <div className="bg-blue-500/20 p-2 rounded-full mr-3">
              <Sparkles className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-white">AI Enhancement</h4>
              <p className="text-gray-400 text-xs mt-1">
                Our AI model has analyzed your last 28 rides to optimize range prediction. 
                Based on your riding style, we've increased estimated range by 7%.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
