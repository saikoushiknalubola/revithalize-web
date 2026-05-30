import React from 'react';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const sizeMap = {
  sm: { icon: 18, text: 'text-base', gap: 'gap-1.5' },
  md: { icon: 22, text: 'text-lg', gap: 'gap-2' },
  lg: { icon: 28, text: 'text-2xl', gap: 'gap-2' },
  xl: { icon: 36, text: 'text-3xl', gap: 'gap-2.5' },
};

export function Logo({ className, size = 'md', showText = true }: LogoProps) {
  const s = sizeMap[size];
  return (
    <div className={cn('flex items-center select-none', s.gap, className)}>
      <div className="relative flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full bg-revithalize-green/30 blur-md"
          aria-hidden
        />
        <Zap
          size={s.icon}
          strokeWidth={2.5}
          className="relative text-revithalize-green fill-revithalize-green"
        />
      </div>
      {showText && (
        <span className={cn('font-bold tracking-tight text-white leading-none', s.text)}>
          Re<span className="text-revithalize-green">V</span>ithalize
        </span>
      )}
    </div>
  );
}
