import React from 'react';
import { cn } from '@/lib/utils';
import { KPIStatus } from '@/decisions/BusinessRules';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  status?: KPIStatus;
  sparklineData?: number[];
  icon?: LucideIcon;
  className?: string;
  to?: string;
}

export function MetricCard({ title, value, trend, status = 'good', sparklineData, icon: Icon, className, to }: MetricCardProps) {
  
  const getStatusColorHex = () => {
    switch (status) {
      case 'excellent': return 'var(--color-success)';
      case 'good': return 'var(--color-info)';
      case 'warning': return 'var(--color-warning)';
      case 'danger': return 'var(--color-danger)';
      default: return 'var(--color-secondary)';
    }
  };

  const chartData = sparklineData ? sparklineData.map((val, i) => ({ index: i, value: val })) : [];

  const content = (
    <>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-secondary" />}
        <h3 className="text-sm font-medium text-secondary">{title}</h3>
      </div>
      
      <div className="mt-4 text-[40px] font-medium tracking-tight text-primary leading-none">
        {value}
      </div>
      
      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-2 text-sm">
          <div className={cn("flex items-center font-medium", trend > 0 ? "text-success" : trend < 0 ? "text-danger" : "text-secondary")}>
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '−'}
            {Math.abs(trend).toFixed(1)}%
          </div>
          <span className="text-muted">vs previous quarter</span>
        </div>
      )}

      {sparklineData && sparklineData.length > 0 && (
        <div className="h-10 w-full mt-6 pt-6 border-t border-surface/50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-secondary)" 
                strokeWidth={1.5} 
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );

  const baseClasses = cn("flex flex-col rounded-2xl border border-surface bg-card p-6 shadow-sm transition-all duration-200", className);

  const MotionLink = motion.create(Link);

  if (to) {
    return (
      <MotionLink 
        to={to} 
        className={cn(baseClasses, "hover:border-primary/30 hover:shadow-md cursor-pointer block")}
        whileHover={{ y: -4 }}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.div 
      className={baseClasses}
      whileHover={{ y: -4 }}
    >
      {content}
    </motion.div>
  );
}
