import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface BarData {
  name: string;
  value: number;
}

interface BarChartComponentProps {
  data: BarData[];
  layout?: 'horizontal' | 'vertical';
  fill?: string;
}

export function BarChartComponent({ 
  data, 
  layout = 'vertical', 
  fill = 'var(--color-chart-revenue)'
}: BarChartComponentProps) {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={layout === 'vertical'} horizontal={layout === 'horizontal'} stroke="var(--color-border)" opacity={0.4} />
          <XAxis 
            type={layout === 'horizontal' ? 'category' : 'number'}
            dataKey={layout === 'horizontal' ? 'name' : undefined}
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-secondary)', fontSize: 11 }}
            tickMargin={12}
            hide={layout === 'vertical'}
          />
          <YAxis 
            type={layout === 'vertical' ? 'category' : 'number'}
            dataKey={layout === 'vertical' ? 'name' : undefined}
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-secondary)', fontSize: 11 }}
            tickMargin={12}
            width={layout === 'vertical' ? 100 : 60}
          />
          <Tooltip 
            cursor={{ fill: 'var(--color-surface)', opacity: 0.4 }}
          />
          <Bar dataKey="value" fill={fill} radius={[4, 4, 4, 4]} barSize={layout === 'vertical' ? 24 : 32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
