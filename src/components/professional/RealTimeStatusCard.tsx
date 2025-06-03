
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface RealTimeStatusCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext: string;
  color: string;
  progress?: number;
}

export function RealTimeStatusCard({ 
  icon: Icon, 
  label, 
  value, 
  subtext, 
  color, 
  progress 
}: RealTimeStatusCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(0, 255, 148, 0.15)' }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 shadow-xl rounded-xl overflow-hidden transition-all duration-300 group"
    >
      <CardHeader className="pb-2 px-4 pt-4">
        <CardDescription className="text-gray-400 flex items-center text-sm">
          <Icon className={cn("mr-2 h-4 w-4 group-hover:animate-pulse", color)} />
          {label}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-white">{value}</span>
          {progress !== undefined && (
            <div className="flex items-center">
              <div className="relative w-12 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className={cn("absolute top-0 left-0 h-full rounded-full", 
                    progress > 80 ? "bg-gradient-to-r from-revithalize-green to-revithalize-blue" :
                    progress > 60 ? "bg-gradient-to-r from-yellow-500 to-orange-500" :
                    "bg-gradient-to-r from-red-500 to-red-600"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-400">{subtext}</p>
      </CardContent>
    </motion.div>
  );
}
