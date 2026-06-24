import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Segment {
  label: string;
  value: number; // 0–100
  to?: string;
}

interface HealthRingProps {
  segments: Segment[]; // up to 3
}

/**
 * Three concentric arcs visualising overall vehicle health (battery / motor / brakes).
 */
export function HealthRing({ segments }: HealthRingProps) {
  const radii = [70, 56, 42];
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-eyebrow">Vehicle health</p>
        <span className="tabular text-xs text-primary">
          {Math.round(segments.reduce((s, x) => s + x.value, 0) / segments.length)}% avg
        </span>
      </div>

      <div className="flex items-center gap-4">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90 shrink-0">
          {segments.slice(0, 3).map((seg, i) => {
            const r = radii[i];
            const circ = 2 * Math.PI * r;
            const dash = (seg.value / 100) * circ;
            return (
              <g key={seg.label}>
                <circle cx="80" cy="80" r={r} stroke="hsl(var(--border))" strokeWidth="7" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r={r}
                  stroke="hsl(var(--primary))"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${dash} ${circ - dash}`}
                  style={{ opacity: 0.5 + i * 0.18 }}
                />
              </g>
            );
          })}
        </svg>

        <ul className="flex-1 space-y-2 min-w-0">
          {segments.slice(0, 3).map((seg) => {
            const Inner = (
              <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl hairline bg-surface/60">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-6 rounded-full bg-primary/70" />
                  <span className="text-sm text-foreground truncate">{seg.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="tabular text-sm text-foreground">{seg.value}%</span>
                  {seg.to && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>
            );
            return (
              <li key={seg.label}>
                {seg.to ? <Link to={seg.to}>{Inner}</Link> : Inner}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
