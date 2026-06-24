import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface StatTileProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;          // percent change vs prior period
  hint?: string;
  accent?: boolean;        // tint the value with brand accent
  className?: string;
}

export function StatTile({ icon: Icon, label, value, unit, delta, hint, accent, className }: StatTileProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className={cn(
        'surface-card p-4 min-w-0 flex flex-col gap-2',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-eyebrow truncate">{label}</span>
        {Icon && <Icon className="w-4 h-4 text-muted-foreground shrink-0" />}
      </div>
      <div className="flex items-baseline gap-1 min-w-0">
        <span
          className={cn(
            'tabular text-display text-2xl sm:text-3xl leading-none truncate',
            accent ? 'text-primary' : 'text-foreground',
          )}
        >
          {value}
        </span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        {hint && <span className="truncate">{hint}</span>}
        {typeof delta === 'number' && (
          <span
            className={cn(
              'inline-flex items-center gap-0.5 tabular font-medium ml-auto',
              positive ? 'text-primary' : 'text-destructive',
            )}
          >
            {positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  );
}
