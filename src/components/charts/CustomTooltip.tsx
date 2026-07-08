import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  primaryValuePrefix?: string;
  comparisonText?: string;
  contextText?: string;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ 
  active, 
  payload, 
  label,
  primaryValuePrefix = '₹',
  comparisonText = "Compared to previous quarter",
  contextText = "Technology contributed 41%"
}) => {
  if (active && payload && payload.length) {
    const primaryData = payload[0];
    const value = primaryData.value;
    
    // Check if there is a 'previous' or 'forecast' metric to calculate a trend
    // In a real app this might be explicitly passed or calculated
    let trend = 13.6; // Mock trend for the beautiful enterprise tooltip feel
    if (payload.length > 1) {
       // If we have previous value, calculate real trend
       const prevValue = payload.find(p => p.dataKey === 'previous')?.value;
       if (prevValue) {
          trend = ((value - prevValue) / prevValue) * 100;
       }
    }

    const isPositive = trend > 0;
    
    // Formatting the value nicely
    const formattedValue = new Intl.NumberFormat('en-US', {
      notation: value > 1000000 ? "compact" : "standard",
      maximumFractionDigits: 1
    }).format(value);

    return (
      <div className="bg-surface/95 backdrop-blur-sm border border-surface/50 p-4 rounded-xl shadow-lg min-w-[200px] z-50">
        <div className="text-xs uppercase tracking-widest text-secondary font-medium mb-1">
          {label}
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-semibold text-primary leading-none">
            {primaryValuePrefix}{formattedValue}
          </span>
          <span className={`text-sm font-medium leading-tight ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? '+' : ''}{trend.toFixed(1)}%
          </span>
        </div>
        
        <div className="space-y-2 border-t border-surface/50 pt-3">
          <div className="text-xs text-secondary">
            {comparisonText}
          </div>
          <div className="text-sm font-medium text-primary">
            {contextText}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
