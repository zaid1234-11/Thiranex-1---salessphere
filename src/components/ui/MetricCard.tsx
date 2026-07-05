import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { KPIStatus } from '@/decisions/BusinessRules';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  status?: KPIStatus;
  icon?: React.ReactNode;
  className?: string;
}

export function MetricCard({ title, value, trend, status = 'good', icon, className }: MetricCardProps) {
  
  const getStatusColor = () => {
    switch (status) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-info';
      case 'warning': return 'text-warning';
      case 'danger': return 'text-danger';
      default: return 'text-secondary';
    }
  };

  return (
    <div className={cn("flex flex-col rounded-xl border border-surface bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-secondary">{title}</h3>
        {icon && <div className="text-secondary opacity-70">{icon}</div>}
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-primary">{value}</span>
      </div>
      
      {trend !== undefined && (
        <div className="mt-2 flex items-center text-xs">
          <div className={cn("flex items-center font-medium", trend > 0 ? "text-success" : trend < 0 ? "text-danger" : "text-secondary")}>
            {trend > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : trend < 0 ? <ArrowDownRight className="mr-1 h-3 w-3" /> : <Minus className="mr-1 h-3 w-3" />}
            {Math.abs(trend).toFixed(1)}%
          </div>
          <span className="ml-2 text-secondary">vs last period</span>
        </div>
      )}
    </div>
  );
}
