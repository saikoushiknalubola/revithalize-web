import React from 'react';
import { cn } from '@/lib/utils';
import logoAsset from '@/assets/revithalize-logo.jpg.asset.json';
import { LogoMark } from './LogoMark';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;          // legacy prop kept for compatibility
  variant?: 'lockup' | 'mark'; // lockup = full bolt+wordmark, mark = bolt only
  animated?: boolean;
}

const heightMap = {
  sm: 22,
  md: 30,
  lg: 40,
  xl: 56,
};

/**
 * ReVithalize brand lockup. By default renders the full bolt+wordmark
 * image. Pass variant="mark" for icon-only use (small headers, favicons).
 */
export function Logo({
  className,
  size = 'md',
  showText = true,
  variant,
  animated = true,
}: LogoProps) {
  const resolved = variant ?? (showText ? 'lockup' : 'mark');
  const h = heightMap[size];

  if (resolved === 'mark') {
    return <LogoMark size={h} className={className} animated={animated} />;
  }

  return (
    <img
      src={logoAsset.url}
      alt="ReVithalize"
      height={h}
      style={{ height: h, width: 'auto' }}
      className={cn('select-none object-contain drop-shadow-[0_0_10px_rgba(0,255,148,0.18)]', className)}
      draggable={false}
    />
  );
}
