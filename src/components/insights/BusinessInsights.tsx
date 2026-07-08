import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Order } from '@/types';

interface BusinessInsightsProps {
  orders: Order[];
}

export function BusinessInsights({ orders }: BusinessInsightsProps) {
  // Hardcoded for demonstration of v8.0 polish as requested
  const recommendations = [
    {
      priority: 'HIGH PRIORITY',
      priorityColor: 'text-danger',
      title: 'Increase Technology inventory',
      impact: '+₹420K Impact',
      confidence: '92% Confidence',
      why: [
        { label: 'Technology revenue', value: '+18%' },
        { label: 'Inventory', value: 'unchanged' },
        { label: 'Demand', value: 'highest in 6 months' }
      ],
      action: 'View affected products'
    },
    {
      priority: 'MEDIUM',
      priorityColor: 'text-warning',
      title: 'Review Furniture pricing',
      impact: '+₹150K Impact',
      confidence: '78% Confidence',
      why: [
        { label: 'Category margin', value: '-4.2%' },
        { label: 'Competitor pricing', value: 'lower' },
        { label: 'Sales velocity', value: 'slowing' }
      ],
      action: 'Analyze pricing model'
    },
    {
      priority: 'LOW',
      priorityColor: 'text-info',
      title: 'Expand South marketing',
      impact: '+₹85K Impact',
      confidence: '65% Confidence',
      why: [
        { label: 'Customer acquisition', value: 'efficient' },
        { label: 'Market penetration', value: 'low' },
        { label: 'Current spend', value: 'under budget' }
      ],
      action: 'Review campaign options'
    }
  ];

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center rounded-2xl border border-surface bg-card p-6 shadow-sm">
        <Sparkles className="h-8 w-8 text-secondary mb-4 opacity-50" />
        <h3 className="text-base font-medium text-primary">No recommendations available</h3>
        <p className="text-sm text-secondary mt-2 max-w-sm">
          Current performance is within expected thresholds. Check back after the next data refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recommendations.map((rec, idx) => (
        <div key={idx} className="flex flex-col rounded-2xl border border-surface bg-card p-6 shadow-sm space-y-4">
          
          <div className="flex flex-col">
            <span className={`text-[11px] font-bold tracking-widest uppercase ${rec.priorityColor}`}>
              {rec.priority}
            </span>
            <h3 className="text-[18px] font-medium text-primary mt-2">{rec.title}</h3>
          </div>
          
          <div className="flex items-center gap-6 pt-2">
            <div>
              <span className="text-[14px] text-success font-medium">{rec.impact}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-surface"></div>
            <div>
              <span className="text-[14px] text-primary font-medium">{rec.confidence}</span>
            </div>
          </div>
          
          <div className="border-t border-surface/50 pt-4 mt-2">
            <span className="text-[12px] font-medium text-secondary uppercase tracking-widest mb-3 block">Why?</span>
            <div className="grid grid-cols-1 gap-2">
              {rec.why.map((reason, i) => (
                <div key={i} className="flex items-center justify-between text-[13px]">
                  <span className="text-secondary">{reason.label}</span>
                  <span className="text-primary font-medium">{reason.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-surface/50">
            <button className="flex items-center gap-2 text-[14px] text-info hover:text-primary transition-colors font-medium">
              {rec.action} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
        </div>
      ))}
    </div>
  );
}
