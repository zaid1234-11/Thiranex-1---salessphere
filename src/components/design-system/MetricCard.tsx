import { Card, CardContent, CardHeader, CardTitle } from '@/components/design-system/card';
import { cn } from '@/utils';
import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className,
  valuePrefix = '',
  valueSuffix = ''
}: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {valuePrefix}{value}{valueSuffix}
        </div>
        {trend && (
          <p className="flex items-center text-xs mt-1">
            <span
              className={cn(
                "font-medium mr-1",
                trend.isPositive === undefined
                  ? "text-muted-foreground"
                  : trend.isPositive
                  ? "text-emerald-600 dark:text-emerald-500"
                  : "text-red-600 dark:text-red-500"
              )}
            >
              {trend.isPositive === true ? '+' : trend.isPositive === false ? '-' : ''}
              {Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
