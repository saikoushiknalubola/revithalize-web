import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  subtext?: string;
}

export function CircularProgress({ value, size = 160, strokeWidth = 10, color = '#1E6BFF', label = 'Battery', subtext }: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
            filter: 'blur(8px)',
          }}
        />
        <svg width={size} height={size} className="relative z-10 -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2A2A2E"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="text-3xl font-bold text-white">{value}%</span>
          <span className="text-xs text-[#A1A1AA] mt-0.5">{label}</span>
        </div>
      </div>
      {subtext && (
        <p className="text-xs text-[#A1A1AA] mt-2 text-center">{subtext}</p>
      )}
    </div>
  );
}

interface BikeHeroSectionProps {
  bikeName?: string;
  batteryLevel?: number;
  range?: number;
  isConnected?: boolean;
}

export function BikeHeroSection({
  bikeName = 'Hero Honda Passion Pro',
  batteryLevel = 82,
  range = 118,
  isConnected = true,
}: BikeHeroSectionProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Bike Name + Connected Badge */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-bold text-white font-poppins">{bikeName}</h2>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${isConnected ? 'bg-[#22C55E]/15 text-[#22C55E]' : 'bg-red-500/15 text-red-400'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#22C55E] animate-pulse' : 'bg-red-400'}`} />
          {isConnected ? 'Connected' : 'Offline'}
        </div>
      </div>

      {/* Hero Bike Image with glow */}
      <div className="relative w-full flex items-center justify-center py-2">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-32 rounded-full bg-[#1E6BFF]/10 blur-2xl" />
        </div>
        <motion.img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=80"
          alt="Hero Honda Passion Pro"
          className="relative z-10 w-72 h-40 object-contain drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ filter: 'drop-shadow(0 0 20px rgba(30, 107, 255, 0.3))' }}
        />
      </div>

      {/* Circular Progress - Battery */}
      <CircularProgress
        value={batteryLevel}
        size={160}
        strokeWidth={12}
        color="#1E6BFF"
        label="Battery"
        subtext={`Approx. ${range} km range remaining`}
      />
    </div>
  );
}
