import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DonutData {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: DonutData[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
}

export function DonutChart({ 
  data, 
  colors = ['#4E8EF7', '#3FA96B', '#E5B25D', '#E06B6B', '#AEB4C0'],
  valueFormatter = (val) => `$${(val / 1000).toFixed(0)}k`
}: DonutChartProps) {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#171B22', borderColor: '#1F2630', borderRadius: '8px', color: '#F5F5F5' }}
            itemStyle={{ color: '#F5F5F5' }}
            formatter={(value: number) => [valueFormatter(value), '']}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-secondary text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
