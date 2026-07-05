import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarData {
  name: string;
  value: number;
}

interface BarChartComponentProps {
  data: BarData[];
  layout?: 'horizontal' | 'vertical';
  fill?: string;
  valueFormatter?: (value: number) => string;
}

export function BarChartComponent({ 
  data, 
  layout = 'horizontal', 
  fill = '#4E8EF7',
  valueFormatter = (val) => `$${(val / 1000).toFixed(0)}k`
}: BarChartComponentProps) {
  return (
    <div className="h-full w-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={data} 
          layout={layout} 
          margin={{ top: 0, right: 20, left: layout === 'vertical' ? 40 : 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={layout === 'horizontal'} vertical={layout === 'vertical'} stroke="#1F2630" />
          
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#AEB4C0', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#AEB4C0', fontSize: 12 }} tickFormatter={valueFormatter} dx={-10} />
            </>
          ) : (
            <>
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#AEB4C0', fontSize: 12 }} tickFormatter={valueFormatter} dy={10} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#AEB4C0', fontSize: 12 }} dx={-10} />
            </>
          )}

          <Tooltip 
            cursor={{ fill: '#171B22' }}
            contentStyle={{ backgroundColor: '#171B22', borderColor: '#1F2630', borderRadius: '8px', color: '#F5F5F5' }}
            itemStyle={{ color: '#F5F5F5' }}
            formatter={(value: number) => [valueFormatter(value), '']}
            labelStyle={{ color: '#AEB4C0', marginBottom: '4px' }}
          />
          <Bar dataKey="value" fill={fill} radius={[4, 4, 4, 4]} barSize={layout === 'vertical' ? 24 : 32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
