import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { BusinessRules } from '@/decisions/BusinessRules';

interface BusinessInsightsProps {
  orders: Order[];
}

export function BusinessInsights({ orders }: BusinessInsightsProps) {
  // Generate some simple insights based on the data
  const generateInsights = () => {
    const insights = [];
    
    const revenue = SalesAnalytics.calculateRevenue(orders);
    const profit = SalesAnalytics.calculateProfit(orders);
    
    // Profit margin insight
    const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
    const marginStatus = BusinessRules.evaluateMarginStatus(margin);
    
    if (marginStatus === 'danger') {
      insights.push({
        type: 'negative',
        message: `Profit margins are critically low at ${margin.toFixed(1)}%. Review discount strategies in high-volume regions.`,
      });
    } else if (marginStatus === 'excellent') {
      insights.push({
        type: 'positive',
        message: `Outstanding profit margin of ${margin.toFixed(1)}%. Core products are highly profitable.`,
      });
    }

    // Top Category Insight
    const byCategory = SalesAnalytics.aggregateByDimension(orders, 'category', 'sales');
    const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
    
    if (categories.length > 0) {
      insights.push({
        type: 'neutral',
        message: `${categories[0][0]} is your top-performing category, driving $${categories[0][1].toLocaleString(undefined, { maximumFractionDigits: 0 })} in sales.`,
      });
    }

    // Top Region Insight
    const byRegion = SalesAnalytics.aggregateByDimension(orders, 'region', 'sales');
    const regions = Object.entries(byRegion).sort((a, b) => b[1] - a[1]);
    
    if (regions.length > 0) {
      insights.push({
        type: 'positive',
        message: `${regions[0][0]} region leads all sales. Consider allocating more marketing budget here to accelerate growth.`,
      });
    }

    return insights;
  };

  const insights = generateInsights();

  if (insights.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-secondary">
        Gathering data for insights...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {insights.map((insight, idx) => (
        <div key={idx} className="flex items-start gap-3 rounded-lg border border-surface bg-background/50 p-4">
          <div className={cn(
            "mt-0.5 rounded-full p-1",
            insight.type === 'positive' ? 'bg-success/10 text-success' :
            insight.type === 'negative' ? 'bg-danger/10 text-danger' :
            'bg-info/10 text-info'
          )}>
            <Sparkles className="h-4 w-4" />
          </div>
          <p className="text-sm text-primary leading-relaxed flex-1">
            {insight.message}
          </p>
          <button className="text-secondary hover:text-primary transition-colors">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
