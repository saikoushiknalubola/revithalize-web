import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  to?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ eyebrow, title, to, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-3 mb-3', className)}>
      <div className="min-w-0">
        {eyebrow && <p className="text-eyebrow">{eyebrow}</p>}
        <h2 className="text-display text-base sm:text-lg text-foreground truncate">{title}</h2>
      </div>
      {to ? (
        <Link
          to={to}
          className="text-xs font-medium text-primary inline-flex items-center gap-0.5 shrink-0 hover:opacity-80"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      ) : (
        action
      )}
    </div>
  );
}
