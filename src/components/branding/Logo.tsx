import React from 'react';
import logo from '@/assets/revithalize-logo.png';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = {
  sm: 'h-7',
  md: 'h-9',
  lg: 'h-12',
  xl: 'h-16',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Revithalize"
      className={cn(sizeMap[size], 'w-auto object-contain select-none', className)}
      draggable={false}
    />
  );
}
