import React from 'react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Activity, CheckCircle2, Target, Info, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export function IntelligencePage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      
      {/* 1. Primary KPI (Confidence Metrics) */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Target className="w-4 h-4" /> Confidence Metrics
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Business Confidence</span>
            <span className="block text-3xl font-semibold text-primary">91%</span>
            <span className="block text-sm text-success mt-1">High probability of meeting targets</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Forecast Reliability</span>
            <span className="block text-3xl font-semibold text-primary">94%</span>
            <span className="block text-sm text-secondary mt-1">Based on historical accuracy</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-warning/5 rounded-bl-full"></div>
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2 relative z-10">Risk Exposure</span>
            <span className="block text-3xl font-semibold text-warning relative z-10">Medium</span>
            <span className="block text-sm text-secondary relative z-10">Supply chain vulnerabilities</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">AI Agreement</span>
            <span className="block text-3xl font-semibold text-info">95%</span>
            <span className="block text-sm text-secondary mt-1">Consensus across 4 models</span>
          </div>
        </div>
      </section>

      {/* 3. Visual Analysis (Decision Feed & Signals) */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Activity className="w-4 h-4" /> Activity & Signals
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Decision Feed */}
          <div className="bg-card border border-surface/50 rounded-2xl p-8">
            <h3 className="text-lg font-medium text-primary mb-6">Decision Feed</h3>
            <div className="relative border-l border-surface/50 ml-2 space-y-8 pb-2">
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-info"></div>
                <p className="text-sm font-medium text-primary leading-tight">Recommendation generated</p>
                <p className="text-sm text-secondary mt-1">Increase Technology inventory based on lead indicators.</p>
                <p className="text-[10px] text-secondary/70 mt-2 uppercase tracking-wider">12 mins ago</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-success"></div>
                <p className="text-sm font-medium text-primary leading-tight">Forecast updated</p>
                <p className="text-sm text-secondary mt-1">Adjusted Q3 projections +4%.</p>
                <p className="text-[10px] text-secondary/70 mt-2 uppercase tracking-wider">1 hour ago</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary"></div>
                <p className="text-sm font-medium text-primary leading-tight">Model recalibrated</p>
                <p className="text-sm text-secondary mt-1">Incorporated new seasonal weighting vectors.</p>
                <p className="text-[10px] text-secondary/70 mt-2 uppercase tracking-wider">3 hours ago</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-warning"></div>
                <p className="text-sm font-medium text-primary leading-tight">Customer risk detected</p>
                <p className="text-sm text-secondary mt-1">Usage dropped by 40% across 3 Enterprise accounts.</p>
                <p className="text-[10px] text-secondary/70 mt-2 uppercase tracking-wider">5 hours ago</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Risks */}
            <div className="bg-card border border-surface/50 rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-widest text-secondary font-medium mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-danger" /> Active Risks
              </h3>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-primary">Furniture demand slowing</span>
                  <span className="text-xs text-secondary">-4.2% MoM • Medium Risk</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-primary">Supplier delays</span>
                  <span className="text-xs text-secondary">Avg 4.1 days • High Risk</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-primary">Customer churn</span>
                  <span className="text-xs text-secondary">2 accounts at risk • Urgent</span>
                </li>
              </ul>
            </div>

            {/* Opportunities */}
            <div className="bg-card border border-surface/50 rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-widest text-secondary font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-success" /> Growth Opportunities
              </h3>
              <ul className="space-y-4">
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-primary">Expand APAC</span>
                  <span className="text-xs text-secondary">High conversion signals detected</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-primary">Increase bundles</span>
                  <span className="text-xs text-secondary">Cross-sell attachment rate high</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-primary">Upsell Premium</span>
                  <span className="text-xs text-secondary">+₹1.2M potential pipeline</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Executive Recommendations & Explainability Panel */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Executive Recommendations
        </h2>
        
        <div className="bg-card border border-info/30 rounded-2xl p-8 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-info"></div>
          
          <div className="flex justify-between items-start mb-2">
            <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-info bg-info/10 px-2.5 py-1 rounded">Priority Action</span>
            <span className="text-xs font-mono text-secondary">Generated 12 mins ago</span>
          </div>
          
          <h3 className="text-3xl font-playfair text-primary mb-8">Increase Technology Inventory</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1.5 font-medium">Potential Impact</span>
              <span className="block text-2xl font-semibold text-success">+₹420K</span>
            </div>
            <div>
              <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1.5 font-medium">Confidence</span>
              <span className="block text-2xl font-semibold text-primary">92%</span>
            </div>
            <div>
              <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1.5 font-medium">Estimated Timeline</span>
              <span className="block text-2xl font-semibold text-primary">30 days</span>
            </div>
            <div>
              <span className="block text-[10px] text-secondary uppercase tracking-widest mb-1.5 font-medium">Owner</span>
              <span className="block text-2xl font-semibold text-primary">Operations</span>
            </div>
          </div>

          <div className="border-t border-surface/50 pt-8">
            <h4 className="text-sm uppercase tracking-widest text-secondary font-medium mb-6">Explainability Panel (Why?)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded bg-success/10 text-success flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-primary">Technology Demand</span>
                    <span className="block text-xs text-secondary mt-1">Increased 18% month-over-month.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded bg-success/10 text-success flex items-center justify-center shrink-0">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-primary">Enterprise Contracts</span>
                    <span className="block text-xs text-secondary mt-1">Signed contracts up 11% this quarter.</span>
                  </div>
                </li>
              </ul>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded bg-warning/10 text-warning flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-primary">Inventory Levels</span>
                    <span className="block text-xs text-secondary mt-1">Stable, but projected to deplete in 14 days.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-0.5 w-6 h-6 rounded bg-info/10 text-info flex items-center justify-center shrink-0">
                    <Brain className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-primary">Market Growth</span>
                    <span className="block text-xs text-secondary mt-1">External signals indicate positive macro trend.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-surface/50 flex gap-4">
            <button className="px-6 py-2.5 bg-primary text-background text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">
              Approve & Assign
            </button>
            <button className="px-6 py-2.5 bg-surface text-primary text-sm font-medium rounded-lg hover:bg-surface/80 transition-colors border border-surface/50 cursor-pointer">
              Dismiss
            </button>
          </div>
        </div>

      </section>

      {/* 5. Transaction Explorer */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Database className="w-4 h-4" /> Transaction Explorer
        </h2>
        <div className="flex items-center justify-center h-[120px] border border-surface/50 rounded-xl bg-card">
           <span className="text-sm text-secondary font-mono">Model confidence matrices & raw signals</span>
        </div>
      </section>

    </motion.div>
  );
}
