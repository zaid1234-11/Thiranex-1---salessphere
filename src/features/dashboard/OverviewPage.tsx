import React, { useEffect, useState, useMemo } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { Order } from '@/types';
import { TrendingUp, ArrowRight, Activity, Users, DollarSign, Target, Package, Globe, Info, Lightbulb, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function OverviewPage() {
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

  const { metrics } = useMemo(() => {
    const revenue = SalesAnalytics.calculateRevenue(orders);
    const profit = SalesAnalytics.calculateProfit(orders);
    const totalOrders = SalesAnalytics.calculateTotalOrders(orders);
    const customers = SalesAnalytics.calculateTotalCustomers(orders);
    
    const prevRevenue = revenue * 0.88;
    const growth = SalesAnalytics.calculateGrowth(revenue, prevRevenue);

    return { 
      metrics: { revenue, profit, totalOrders, customers, growth }
    };
  }, [orders]);

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">
      <div className="text-secondary animate-pulse font-medium">Loading executive briefing...</div>
    </div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      
      {/* 1. Executive Brief */}
      <section className="flex flex-col gap-6 max-w-[900px]">
        <h1 className="font-playfair text-[32px] sm:text-[40px] text-primary tracking-tight leading-tight">
          Executive Briefing
        </h1>
        
        <div className="flex flex-col gap-4 mt-2 text-[20px] leading-relaxed text-primary">
          <p>
            Revenue exceeded expectations this quarter, driven primarily by <span className="font-semibold text-primary">Technology</span> and <span className="font-semibold text-primary">Enterprise customers</span>.
          </p>
          <p className="text-secondary">
            Profitability continues to improve while Furniture remains below target.
          </p>
          <p>
            <span className="font-medium text-warning border-b border-warning/50">Three recommendations</span> require executive review.
          </p>
        </div>
      </section>

      <hr className="border-surface/50" />

      {/* 2. Primary KPIs */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Target className="w-4 h-4" /> Primary KPIs
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          <MetricCard 
            title="Revenue" 
            value={`₹${(metrics.revenue / 1000000).toFixed(2)}M`} 
            trend={metrics.growth} 
            icon={DollarSign} 
            to="/dashboard/performance"
          />
          <MetricCard 
            title="Profit" 
            value={`₹${(metrics.profit / 1000000).toFixed(2)}M`} 
            trend={8.2} 
            icon={TrendingUp} 
            to="/dashboard/performance"
          />
          <MetricCard 
            title="Orders" 
            value={metrics.totalOrders.toLocaleString()} 
            trend={4.1} 
            icon={Package} 
          />
          <MetricCard 
            title="Customers" 
            value={metrics.customers.toLocaleString()} 
            trend={12.5} 
            icon={Users} 
            to="/dashboard/customers"
          />
          <MetricCard 
            title="Growth" 
            value={`${metrics.growth.toFixed(1)}%`} 
            trend={2.4} 
            icon={Activity} 
          />
          <MetricCard 
            title="Forecast Accuracy" 
            value="94.2%" 
            trend={1.2} 
            icon={Target} 
          />
        </div>
      </section>

      {/* 3. Executive Recommendations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
            <Lightbulb className="w-4 h-4" /> Executive Recommendations
          </h2>
          <Link to="/dashboard/intelligence" className="text-xs font-medium text-info hover:text-info/80 flex items-center gap-1 transition-colors">
            View Intelligence Engine <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-card border border-info/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-info group-hover:bg-info/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-danger bg-danger/10 px-2 py-1 rounded">HIGH</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">
              Increase Technology Inventory
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Operations</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">June 30</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-success">+₹420K</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">92%</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-surface/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-warning group-hover:bg-warning/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-warning bg-warning/10 px-2 py-1 rounded">MEDIUM</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">
              Re-engage churn-risk Enterprise accounts
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Customer Success</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">July 15</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-success">+₹180K</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">87%</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-surface/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-success group-hover:bg-success/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-success bg-success/10 px-2 py-1 rounded">LOW</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">
              Bundle premium warranty with hardware
            </h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Sales</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">August 1</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-success">+₹95K</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">78%</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 4. Operational Health */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Info className="w-4 h-4" /> Operational Health
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Link to="/dashboard/performance" className="bg-surface/30 border border-surface/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer block">
            <span className="block text-[11px] uppercase tracking-wider text-secondary mb-2">Highest Growth Region</span>
            <span className="block text-lg font-semibold text-primary">West</span>
            <span className="block text-xs text-success mt-1">+24% YoY</span>
          </Link>
          <Link to="/dashboard/performance" className="bg-surface/30 border border-surface/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer block">
            <span className="block text-[11px] uppercase tracking-wider text-secondary mb-2">Highest Risk Region</span>
            <span className="block text-lg font-semibold text-primary">Central</span>
            <span className="block text-xs text-danger mt-1">-8% vs Target</span>
          </Link>
          <Link to="/dashboard/products" className="bg-surface/30 border border-surface/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer block">
            <span className="block text-[11px] uppercase tracking-wider text-secondary mb-2">Top Product</span>
            <span className="block text-lg font-semibold text-primary truncate">MacBook Pro</span>
            <span className="block text-xs text-secondary mt-1">1,204 Units</span>
          </Link>
          <Link to="/dashboard/customers" className="bg-surface/30 border border-surface/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer block">
            <span className="block text-[11px] uppercase tracking-wider text-secondary mb-2">Top Customer</span>
            <span className="block text-lg font-semibold text-primary truncate">Acme Corp</span>
            <span className="block text-xs text-secondary mt-1">₹1.4M LTV</span>
          </Link>
          <div className="bg-surface/30 border border-surface/50 rounded-xl p-4 hover:border-surface transition-colors">
            <span className="block text-[11px] uppercase tracking-wider text-secondary mb-2">Largest Deal</span>
            <span className="block text-lg font-semibold text-primary truncate">Global Tech</span>
            <span className="block text-xs text-success mt-1">₹450K</span>
          </div>
          <Link to="/dashboard/products" className="bg-surface/30 border border-surface/50 rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer block">
            <span className="block text-[11px] uppercase tracking-wider text-secondary mb-2">Highest Margin Cat</span>
            <span className="block text-lg font-semibold text-primary truncate">Software</span>
            <span className="block text-xs text-secondary mt-1">82% Margin</span>
          </Link>
        </div>
      </section>

      {/* 5. Transaction Explorer */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Database className="w-4 h-4" /> Transaction Explorer
        </h2>
        <div className="bg-card border border-surface/50 rounded-2xl overflow-hidden divide-y divide-surface/50">
          <div className="px-6 py-4 flex items-center justify-between hover:bg-surface/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-secondary">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Recommendation updated: Technology Inventory</p>
                <p className="text-xs text-secondary mt-0.5">AI Engine analyzed new regional demand data.</p>
              </div>
            </div>
            <span className="text-xs text-secondary">10m ago</span>
          </div>
          <div className="px-6 py-4 flex items-center justify-between hover:bg-surface/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-secondary">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Data refresh completed</p>
                <p className="text-xs text-secondary mt-0.5">Synced 12,402 new transaction records.</p>
              </div>
            </div>
            <span className="text-xs text-secondary">1h ago</span>
          </div>
          <div className="px-6 py-4 flex items-center justify-between hover:bg-surface/20 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-secondary">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary">Saved view accessed</p>
                <p className="text-xs text-secondary mt-0.5">"Executive Board Report" was viewed by your team.</p>
              </div>
            </div>
            <span className="text-xs text-secondary">3h ago</span>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
