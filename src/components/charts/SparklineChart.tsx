import { Line, LineChart, ResponsiveContainer } from "recharts";

export interface SparklineChartProps {
  data: any[];
  dataKey: string;
  color?: string;
  strokeWidth?: number;
}

export function SparklineChart({ 
  data, 
  dataKey, 
  color = "hsl(var(--primary))", 
  strokeWidth = 2 
}: SparklineChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={strokeWidth} 
          dot={false} 
          isAnimationActive={false} // Performance optimization for sparklines
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
