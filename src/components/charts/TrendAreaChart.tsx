import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid
} from "recharts";

export interface TrendSeries {
  key: string;
  color: string;
  name?: string;
}

export interface TrendAreaChartProps {
  data: any[];
  xAxisKey: string;
  series: TrendSeries[];
  valueFormatter?: (value: number) => string;
}

export function TrendAreaChart({ 
  data, 
  xAxisKey, 
  series,
  valueFormatter = (val: number) => val.toString()
}: TrendAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s) => (
            <linearGradient key={`grad-${s.key}`} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={s.color} stopOpacity={0}/>
            </linearGradient>
          ))}
        </defs>
        
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.4} />
        
        <XAxis 
          dataKey={xAxisKey} 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
        
        <YAxis 
          stroke="hsl(var(--muted-foreground))" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={valueFormatter} 
        />
        
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'hsl(var(--card))', 
            borderColor: 'hsl(var(--border))', 
            borderRadius: '8px',
            color: 'hsl(var(--card-foreground))'
          }}
          itemStyle={{ color: 'hsl(var(--primary))' }}
          formatter={(value: any, name: any) => [valueFormatter(value as number), name]}
        />
        
        {series.map((s) => (
          <Area 
            key={s.key}
            type="monotone" 
            dataKey={s.key} 
            name={s.name || s.key}
            stroke={s.color} 
            fillOpacity={1} 
            fill={`url(#grad-${s.key})`} 
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
