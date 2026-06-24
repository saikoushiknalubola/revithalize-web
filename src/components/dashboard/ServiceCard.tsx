import React from 'react';
import { Wrench, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title?: string;
  description: string;
  ctaLabel?: string;
  to?: string;
}

export function ServiceCard({
  title = 'Next service',
  description,
  ctaLabel = 'Book now',
  to = '/maintenance-ai',
}: ServiceCardProps) {
  return (
    <Link
      to={to}
      className="surface-card flex items-center gap-4 p-4 hover:border-primary/40 transition-colors"
    >
      <span className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
        <Wrench className="w-5 h-5 text-primary" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-eyebrow">{title}</p>
        <p className="text-sm text-foreground truncate">{description}</p>
      </div>
      <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-primary">
        {ctaLabel} <ChevronRight className="w-3.5 h-3.5" />
      </span>
      <ChevronRight className="sm:hidden w-4 h-4 text-muted-foreground" />
    </Link>
  );
}
