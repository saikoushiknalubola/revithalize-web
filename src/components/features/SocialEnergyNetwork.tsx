
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Share2, Battery, Zap, MapPin, Trophy, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SocialEnergyNetwork() {
  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [sharedEnergy, setSharedEnergy] = useState(45.2);
  const [receivedEnergy, setReceivedEnergy] = useState(23.8);

  useEffect(() => {
    // Simulate nearby users
    const users = [
      { name: "Arjun K.", avatar: "AK", battery: 95, distance: "0.5km", rating: 4.8, shared: 12.5 },
      { name: "Priya S.", avatar: "PS", battery: 88, distance: "1.2km", rating: 4.9, shared: 8.3 },
      { name: "Rajesh M.", avatar: "RM", battery: 78, distance: "0.8km", rating: 4.7, shared: 15.7 },
      { name: "Sneha R.", avatar: "SR", battery: 92, distance: "1.5km", rating: 5.0, shared: 6.2 }
    ];
    setNearbyUsers(users);

    // Simulate real-time energy sharing updates
    const interval = setInterval(() => {
      setSharedEnergy(prev => prev + Math.random() * 0.5);
      setReceivedEnergy(prev => prev + Math.random() * 0.3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const achievements = [
    { title: "Energy Sharer", description: "Shared 50+ kWh", icon: Share2, unlocked: true },
    { title: "Good Neighbor", description: "Helped 10+ users", icon: Users, unlocked: true },
    { title: "Eco Champion", description: "Top 10% in network", icon: Trophy, unlocked: false },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Users className="mr-2 h-6 w-6 text-blue-400" />
          Social Energy Sharing Network
        </CardTitle>
        <p className="text-gray-400 text-sm">
          Connect with nearby EV owners to share energy and build community
        </p>
      </CardHeader>
      <CardContent>
        {/* Energy Sharing Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            className="bg-green-900/30 rounded-lg p-4 border border-green-600/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between">
              <Share2 className="h-8 w-8 text-green-400" />
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">
                  {sharedEnergy.toFixed(1)} kWh
                </div>
                <div className="text-xs text-gray-400">Energy Shared</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-blue-900/30 rounded-lg p-4 border border-blue-600/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between">
              <Battery className="h-8 w-8 text-blue-400" />
              <div className="text-right">
                <div className="text-xl font-bold text-blue-400">
                  {receivedEnergy.toFixed(1)} kWh
                </div>
                <div className="text-xs text-gray-400">Energy Received</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nearby Users */}
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
            Nearby EV Owners
          </h3>
          <div className="space-y-3">
            {nearbyUsers.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/30 rounded-lg p-3 border border-gray-700/50 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-r from-revithalize-green to-revithalize-blue text-black font-semibold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {user.distance}
                      <Star className="h-3 w-3 ml-2 mr-1 text-yellow-400" />
                      {user.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-white">{user.battery}%</div>
                  <div className="text-xs text-gray-400">Battery</div>
                  <button className="mt-1 text-xs bg-revithalize-green/20 text-revithalize-green px-2 py-1 rounded hover:bg-revithalize-green/30 transition-colors">
                    Request Energy
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Achievements */}
        <div>
          <h3 className="text-white font-semibold mb-3 flex items-center">
            <Trophy className="h-4 w-4 mr-2 text-yellow-400" />
            Community Achievements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? 'bg-yellow-900/30 border-yellow-600/20' 
                      : 'bg-gray-800/30 border-gray-600/20'
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-2 ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-500'
                  }`} />
                  <div className={`text-sm font-medium ${
                    achievement.unlocked ? 'text-white' : 'text-gray-500'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className="text-xs text-gray-400">{achievement.description}</div>
                  {achievement.unlocked && (
                    <div className="text-xs text-yellow-400 mt-1">✓ Unlocked</div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
