import React from 'react';
import { cn } from '@/lib/utils';

interface LogoMarkProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * The ReVithalize bolt mark — extracted as inline SVG for crisp rendering
 * at any size. Uses an accent gradient and an optional charge-pulse glow.
 */
export function LogoMark({ size = 28, className, animated = true }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animated && 'animate-pulse-glow', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="rv-bolt" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1FE074" />
          <stop offset="100%" stopColor="#00FF94" />
        </linearGradient>
      </defs>
      <path
        d="M36 4 L14 36 L28 36 L22 60 L50 26 L34 26 L40 4 Z"
        fill="url(#rv-bolt)"
        stroke="url(#rv-bolt)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
