import React, { useEffect, useState } from 'react';
import { ChartCard } from '@/components/ui/ChartCard';
import { TopCustomersList } from '@/components/insights/TopCustomersList';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { Order } from '@/types';
import { Users, HeartPulse, CreditCard, ShieldAlert, Target, BarChart2, Info, Lightbulb, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

export function CustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { dateRange, region, category } = useDashboardStore();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await OrderRepository.getOrders();
      const filtered = data.filter(order => {
        if (region !== 'All' && order.region !== region) return false;
        if (category !== 'All' && order.category !== category) return false;
        return true;
      });
      setOrders(filtered);
      setIsLoading(false);
    };
    loadData();
  }, [dateRange, region, category]);

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">
      <div className="text-secondary animate-pulse font-medium">Loading customer intelligence...</div>
    </div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      
      {/* 1. Customer Intelligence */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Users className="w-4 h-4" /> Customer Intelligence
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Total Active</span>
            <span className="block text-3xl font-semibold text-primary">12,482</span>
            <span className="block text-sm text-success mt-1">+4.2% Growth</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Avg LTV</span>
            <span className="block text-3xl font-semibold text-primary">₹42k</span>
            <span className="block text-sm text-success mt-1">Enterprise driving increase</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Retention Rate</span>
            <span className="block text-3xl font-semibold text-primary">92.4%</span>
            <span className="block text-sm text-warning mt-1">-1.2% vs previous period</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-danger/5 rounded-bl-full"></div>
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2 relative z-10">At-Risk Accounts</span>
            <span className="block text-3xl font-semibold text-danger relative z-10">14</span>
            <span className="block text-sm text-secondary relative z-10">Requires immediate attention</span>
          </div>
        </div>
      </section>

      {/* 2. Segments */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Target className="w-4 h-4" /> Segments
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ChartCard 
              title="Top Accounts" 
              subtitle="Ranked by total lifetime value (LTV)"
            >
              <TopCustomersList orders={orders} />
            </ChartCard>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <ChartCard title="Customer Segments" subtitle="Distribution across Enterprise, Mid-Market, and SMB">
               <div className="flex items-center justify-center h-[200px] border border-surface/50 rounded-xl bg-surface/10">
                  <span className="text-sm text-secondary font-mono">Segment Distribution View</span>
               </div>
            </ChartCard>
          </div>
        </div>
      </section>

      {/* 3. Retention */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <HeartPulse className="w-4 h-4" /> Retention
        </h2>
        <ChartCard title="Retention Curve" subtitle="Cohort analysis over the last 12 months">
           <div className="flex items-center justify-center h-[250px] border border-surface/50 rounded-xl bg-surface/10">
              <span className="text-sm text-secondary font-mono">Retention Heatmap Visualization</span>
           </div>
        </ChartCard>
      </section>

      {/* 4. Lifetime Value */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <CreditCard className="w-4 h-4" /> Lifetime Value
        </h2>
        <div className="bg-card border border-surface/50 rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px]">
          <span className="text-secondary mb-2">Average Expansion Revenue</span>
          <span className="text-5xl font-semibold text-primary">₹18.5k</span>
          <span className="text-sm text-success mt-4">Up-sell initiatives in Q2 drove significant expansion</span>
        </div>
      </section>

      {/* 5. Executive Recommendations */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Executive Recommendations
          </h2>
          <Link to="/dashboard/intelligence" className="text-xs text-info hover:text-info/80 font-medium">View AI Rationale →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-danger/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-danger group-hover:bg-danger/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-danger bg-danger/10 px-2 py-1 rounded">HIGH</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">Execute Executive Sponsorship Program</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Customer Success VP</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">Immediate</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-danger">Prevents ₹1.2M Churn</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">95%</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-success/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-success group-hover:bg-success/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-success bg-success/10 px-2 py-1 rounded">MEDIUM</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">Expand "Emerging Accounts" Tier</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Marketing</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">End of Quarter</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-success">+₹450K LTV Expansion</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">82%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
