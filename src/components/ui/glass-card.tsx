import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  padded?: boolean;
  interactive?: boolean;
}

/**
 * Premium card surface — dark gradient base, hairline border, inset highlight,
 * optional accent glow on focus/hover. Use everywhere instead of raw bg-* divs.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, padded = true, interactive, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'surface-card relative overflow-hidden',
        padded && 'p-4 sm:p-5',
        interactive && 'transition-all duration-200 hover:border-primary/40 hover:-translate-y-px',
        glow && 'shadow-glow',
        className,
      )}
      {...props}
    >
      {/* subtle top highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      {children}
    </div>
  ),
);
GlassCard.displayName = 'GlassCard';
