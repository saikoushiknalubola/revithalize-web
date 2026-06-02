import React, { useEffect, useState } from 'react';
import { useScreenSize } from '@/hooks/use-mobile';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  subtext?: string;
}

export function CircularProgress({ value, size = 180, strokeWidth = 12, color = '#00FF94', label = 'Battery', subtext }: CircularProgressProps) {
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
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${color}25 0%, transparent 70%)`,
            filter: 'blur(12px)',
          }}
        />
        <svg width={size} height={size} className="relative z-10 -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1F1F23"
            strokeWidth={strokeWidth}
          />
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
            style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className="text-4xl font-bold text-white tracking-tight">{value}<span className="text-2xl text-gray-400">%</span></span>
          <span className="text-[11px] uppercase tracking-widest text-gray-500 mt-1">{label}</span>
        </div>
      </div>
      {subtext && (
        <p className="text-xs text-gray-400 mt-3 text-center">{subtext}</p>
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
  const { isMobile } = useScreenSize();

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="flex max-w-full flex-wrap items-center justify-center gap-2 text-center">
        <h2 className="min-w-0 text-sm sm:text-base font-semibold text-white tracking-tight">{bikeName}</h2>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${isConnected ? 'bg-revithalize-green/15 text-revithalize-green' : 'bg-red-500/15 text-red-400'}`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-revithalize-green animate-pulse' : 'bg-red-400'}`} />
          {isConnected ? 'LIVE' : 'OFFLINE'}
        </div>
      </div>

      <CircularProgress
        value={batteryLevel}
        size={isMobile ? 168 : 200}
        strokeWidth={isMobile ? 12 : 14}
        color="#00FF94"
        label="Battery"
        subtext={`${range} km range remaining`}
      />
    </div>
  );
}
