import React from 'react';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, subtitle, action, children, className }: ChartCardProps) {
  return (
    <div className={cn("flex flex-col rounded-xl border border-surface bg-card shadow-sm", className)}>
      <div className="flex items-center justify-between border-b border-surface p-6">
        <div>
          <h3 className="text-base font-semibold text-primary">{title}</h3>
          {subtitle && <p className="text-sm text-secondary mt-1">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="p-6 flex-1">
        {children}
      </div>
    </div>
  );
}
