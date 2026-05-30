import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BikeStatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  iconColor?: string;
  className?: string;
}

export function BikeStatCard({ icon: Icon, value, label, iconColor = '#00FF94', className }: BikeStatCardProps) {
  return (
    <div className={cn(
      "bg-[#0F0F0F] border border-[#1F1F23] rounded-2xl p-4 flex flex-col gap-2 shadow-lg",
      className
    )}>
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${iconColor}18` }}>
        <Icon style={{ color: iconColor }} className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xl font-bold text-white leading-tight tracking-tight">{value}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}
