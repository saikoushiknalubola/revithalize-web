import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuickActionChipProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
}

export function QuickActionChip({ icon: Icon, label, onClick, active }: QuickActionChipProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="flex flex-col items-center gap-2 min-w-0 group"
    >
      <span
        className={cn(
          'w-14 h-14 rounded-2xl flex items-center justify-center surface-card transition-colors',
          active
            ? 'border-primary/60 bg-primary/10'
            : 'group-hover:border-primary/40',
        )}
      >
        <Icon className={cn('w-5 h-5', active ? 'text-primary' : 'text-foreground')} />
      </span>
      <span className="text-[11px] font-medium text-muted-foreground truncate max-w-[68px]">
        {label}
      </span>
    </motion.button>
  );
}
