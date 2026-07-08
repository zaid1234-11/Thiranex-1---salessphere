import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ReferenceLine,
  ReferenceDot
} from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface RevenueChartProps {
  data: Array<{
    name: string;
    revenue: number;
    target: number;
    profit: number;
    forecast: number;
    previous: number;
  }>;
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-revenue)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-chart-revenue)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-chart-target)" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="var(--color-chart-target)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.4} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-secondary)', fontSize: 11 }}
            tickMargin={12}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tickFormatter={(value) => `₹${value / 1000}k`}
            tick={{ fill: 'var(--color-secondary)', fontSize: 11 }}
            tickMargin={12}
          />
          <Tooltip 
            content={<CustomTooltip primaryValuePrefix="₹" contextText="Enterprise drove 64% of volume" />} 
            cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
          
          <ReferenceLine y={120000} stroke="var(--color-chart-target)" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Target', fill: 'var(--color-chart-target)', fontSize: 12 }} />
          
          <ReferenceDot x="Apr" y={148000} r={4} fill="var(--color-chart-revenue)" stroke="var(--color-surface)" strokeWidth={2} label={{ position: 'top', value: 'Pricing Update ↗', fill: 'var(--color-primary)', fontSize: 11 }} />
          
          <Area 
            type="monotone" 
            dataKey="previous" 
            name="Previous Period" 
            stroke="var(--color-secondary)" 
            strokeWidth={1}
            fill="none" 
            activeDot={false}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            name="Revenue" 
            stroke="var(--color-chart-revenue)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorRevenue)" 
            activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--color-chart-revenue)' }}
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            name="Profit" 
            stroke="var(--color-chart-profit)" 
            strokeWidth={2}
            fill="none" 
            activeDot={{ r: 4, strokeWidth: 0, fill: 'var(--color-chart-profit)' }}
          />
          <Area 
            type="monotone" 
            dataKey="forecast" 
            name="Forecast" 
            stroke="var(--color-chart-forecast)" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none" 
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
