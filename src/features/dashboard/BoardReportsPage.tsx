import React from 'react';
import { Target, BarChart2, Info, Lightbulb, Database, FileText, Download, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export function BoardReportsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      
      {/* 1. Primary KPI */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Target className="w-4 h-4" /> Reporting Status
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Automated Reports</span>
            <span className="block text-3xl font-semibold text-primary">12</span>
            <span className="block text-sm text-success mt-1">Generated this month</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Data Freshness</span>
            <span className="block text-3xl font-semibold text-primary">Live</span>
            <span className="block text-sm text-success mt-1">Last synced 2 mins ago</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Saved Views</span>
            <span className="block text-3xl font-semibold text-primary">4</span>
            <span className="block text-sm text-secondary mt-1">Personalized dashboards</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-info/5 rounded-bl-full"></div>
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2 relative z-10">Next Board Meeting</span>
            <span className="block text-3xl font-semibold text-info relative z-10">14 Days</span>
            <span className="block text-sm text-secondary relative z-10">Q3 Review Pack</span>
          </div>
        </div>
      </section>

      {/* 3. Visual Analysis (Report Catalog) */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <FileText className="w-4 h-4" /> Standard Reports
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-card border border-surface/50 rounded-2xl p-6 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-secondary px-2 py-1 bg-surface/50 rounded">PDF</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-2">Monthly Business Review</h3>
            <p className="text-sm text-secondary mb-6">Comprehensive overview of revenue, regional performance, and top products for the current month.</p>
            <div className="flex items-center gap-4 text-xs text-secondary font-medium border-t border-surface/50 pt-4 mt-auto">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Auto-runs on 1st</span>
              <button className="ml-auto flex items-center gap-1.5 text-info hover:text-info/80"><Download className="w-3.5 h-3.5" /> Generate</button>
            </div>
          </div>

          <div className="bg-card border border-surface/50 rounded-2xl p-6 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-secondary px-2 py-1 bg-surface/50 rounded">PDF / PPTX</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-2">Quarterly Board Report</h3>
            <p className="text-sm text-secondary mb-6">High-level strategic presentation focused on target attainment, profitability, and major risk factors.</p>
            <div className="flex items-center gap-4 text-xs text-secondary font-medium border-t border-surface/50 pt-4 mt-auto">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Last run 45 days ago</span>
              <button className="ml-auto flex items-center gap-1.5 text-info hover:text-info/80"><Download className="w-3.5 h-3.5" /> Generate</button>
            </div>
          </div>

          <div className="bg-card border border-surface/50 rounded-2xl p-6 hover:border-primary/30 transition-all group cursor-pointer">
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-secondary px-2 py-1 bg-surface/50 rounded">CSV / XLSX</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-2">Full Order Export</h3>
            <p className="text-sm text-secondary mb-6">Raw transactional data including all line items, customer IDs, and applied discounts for external analysis.</p>
            <div className="flex items-center gap-4 text-xs text-secondary font-medium border-t border-surface/50 pt-4 mt-auto">
              <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> 12,482 Rows</span>
              <button className="ml-auto flex items-center gap-1.5 text-info hover:text-info/80"><Download className="w-3.5 h-3.5" /> Generate</button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Business Context */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Info className="w-4 h-4" /> Business Context
        </h2>
        <div className="bg-card border border-surface/50 rounded-xl p-6 text-primary leading-relaxed">
          <p className="mb-4">
            The Quarterly Board Report requires finalization by next Friday. The system has automatically pre-populated the <strong className="font-semibold text-info">Executive Summary</strong> based on Q3 performance.
          </p>
          <p>
            Please review the AI-generated recommendations in the Intelligence tab before exporting the final PDF.
          </p>
        </div>
      </section>

      {/* 4. Executive Recommendations */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Lightbulb className="w-4 h-4" /> Executive Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-surface/50 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-primary mb-2">Automate MBR Distribution</h3>
            <p className="text-sm text-secondary mb-4">You manually generate the Monthly Business Review on the 1st of every month. Would you like to automate emailing this to the Executive group?</p>
            <button className="text-sm font-medium text-info hover:text-info/80 cursor-pointer">Setup Automation →</button>
          </div>
        </div>
      </section>

      {/* 5. Transaction Explorer */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Database className="w-4 h-4" /> Transaction Explorer
        </h2>
        <div className="flex items-center justify-center h-[120px] border border-surface/50 rounded-xl bg-card">
           <span className="text-sm text-secondary font-mono">Report generation logs and export history</span>
        </div>
      </section>

    </motion.div>
  );
}
