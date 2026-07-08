import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CustomTooltip } from './CustomTooltip';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function DonutChart({ data }: DonutChartProps) {
  const colors = [
    'var(--color-chart-revenue)',
    'var(--color-chart-profit)',
    'var(--color-chart-forecast)',
    'var(--color-chart-orders)',
    'var(--color-chart-customers)',
  ];

  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
            stroke="none"
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((_entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                style={{ outline: 'none', transition: 'all 0.3s ease' }}
              />
            ))}
          </Pie>
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ fill: 'transparent' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
