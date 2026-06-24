import React from 'react';
import { Zap, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChargingHeroProps {
  vehicleName: string;
  socPct: number;          // 0–100
  rangeKm: number;
  charging?: boolean;
  etaMinutes?: number;     // minutes to full
  savedToday?: string;     // formatted savings string (e.g. "₹38")
}

/**
 * The single most-important surface on the dashboard: at-a-glance state
 * of charge, range, connection status. Tesla-grade radial readout.
 */
export function ChargingHero({
  vehicleName,
  socPct,
  rangeKm,
  charging = false,
  etaMinutes,
  savedToday,
}: ChargingHeroProps) {
  const clamped = Math.max(0, Math.min(100, socPct));
  const radius = 78;
  const circ = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circ;

  return (
    <div className="surface-card relative overflow-hidden p-5 sm:p-6">
      {/* ambient accent wash */}
      <div className="absolute inset-0 bg-grad-radial-accent pointer-events-none" aria-hidden />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-eyebrow">My Vehicle</p>
          <h2 className="text-display text-lg sm:text-xl text-foreground truncate">{vehicleName}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border',
                charging
                  ? 'bg-primary/10 text-primary border-primary/30'
                  : 'bg-surface-2 text-muted-foreground border-border',
              )}
            >
              {charging ? <Zap className="w-3 h-3" /> : <Battery className="w-3 h-3" />}
              {charging ? 'Charging' : 'Idle'}
            </span>
            {charging && etaMinutes && (
              <span className="text-[11px] text-muted-foreground tabular">
                Full in {Math.floor(etaMinutes / 60)}h {etaMinutes % 60}m
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="relative mt-4 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200" className="rotate-[-90deg]">
          <circle cx="100" cy="100" r={radius} stroke="hsl(var(--border))" strokeWidth="10" fill="none" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="url(#charging-grad)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ - dash}`}
            className={cn(charging && 'animate-pulse-glow')}
          />
          <defs>
            <linearGradient id="charging-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1FE074" />
              <stop offset="100%" stopColor="#00FF94" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">State of charge</span>
          <span className="tabular text-display text-5xl text-foreground leading-none mt-1">{clamped}%</span>
          <span className="tabular text-sm text-primary mt-2">{rangeKm} km range</span>
        </div>
      </div>

      {savedToday && (
        <div className="relative mt-4 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Saved today</span>
          <span className="tabular text-primary font-semibold">{savedToday}</span>
        </div>
      )}
    </div>
  );
}
