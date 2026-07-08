import React, { useEffect, useState, useMemo } from 'react';
import { ChartCard } from '@/components/ui/ChartCard';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { DonutChart } from '@/components/charts/DonutChart';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { Order } from '@/types';
import { Package, TrendingDown, ArrowUpRight, BarChart2, PieChart, Box, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function ProductsPage() {
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

  const { productData, categoryData } = useMemo(() => {
    const salesByProduct = SalesAnalytics.aggregateByDimension(orders, 'productId', 'sales');
    const productData = Object.entries(salesByProduct)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }));

    const salesByCategory = SalesAnalytics.aggregateByDimension(orders, 'category', 'sales');
    const categoryData = Object.entries(salesByCategory)
      .sort(([,a], [,b]) => b - a)
      .map(([name, value]) => ({ name, value }));

    return { productData, categoryData };
  }, [orders]);

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">
      <div className="text-secondary animate-pulse font-medium">Loading portfolio intelligence...</div>
    </div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      
      {/* 1. Portfolio Health */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Package className="w-4 h-4" /> Portfolio Health
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Category Concentration</span>
            <span className="block text-3xl font-semibold text-primary flex items-center gap-2">
              Software <ArrowUpRight className="w-5 h-5 text-success" />
            </span>
            <span className="block text-sm text-secondary mt-1">Drives 64% of total revenue</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Active SKUs</span>
            <span className="block text-3xl font-semibold text-primary">1,204</span>
            <span className="block text-sm text-success mt-1">+12% vs last quarter</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6">
            <span className="block text-xs uppercase tracking-widest text-secondary font-medium mb-2">Underperforming Items</span>
            <span className="block text-3xl font-semibold text-danger flex items-center gap-2">
              42 <TrendingDown className="w-5 h-5 text-danger" />
            </span>
            <span className="block text-sm text-secondary mt-1">Require liquidation strategy</span>
          </div>
        </div>
      </section>

      {/* 2. Top Products */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <BarChart2 className="w-4 h-4" /> Top Products
        </h2>
        <ChartCard 
          title="Revenue Distribution" 
          subtitle="Highest revenue generating SKUs across all regions"
        >
          <BarChartComponent data={productData} layout="vertical" />
        </ChartCard>
      </section>

      {/* 3. Margins */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <PieChart className="w-4 h-4" /> Margins
        </h2>
        <ChartCard 
          title="Margin Leaders" 
          subtitle="Product mix contribution to net profit"
        >
          <div className="h-[300px]">
            <DonutChart data={categoryData} />
          </div>
        </ChartCard>
      </section>

      {/* 4. Inventory */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Box className="w-4 h-4" /> Inventory
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface/30 border border-surface/50 rounded-xl p-6">
            <h4 className="text-sm font-medium text-primary mb-2">Stockout Risk</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                <span className="text-sm text-primary">MacBook Pro 16"</span>
                <span className="text-sm font-medium text-danger">3 days supply</span>
              </div>
              <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                <span className="text-sm text-primary">AirPods Max</span>
                <span className="text-sm font-medium text-danger">8 days supply</span>
              </div>
            </div>
          </div>
          <div className="bg-surface/30 border border-surface/50 rounded-xl p-6">
            <h4 className="text-sm font-medium text-primary mb-2">Excess Capital</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                <span className="text-sm text-primary">Office Desk V2</span>
                <span className="text-sm font-medium text-warning">142 days supply</span>
              </div>
              <div className="flex justify-between items-center border-b border-surface/50 pb-2">
                <span className="text-sm text-primary">Ergonomic Chair</span>
                <span className="text-sm font-medium text-warning">94 days supply</span>
              </div>
            </div>
          </div>
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
          <div className="bg-card border border-info/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-info group-hover:bg-info/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-info bg-info/10 px-2 py-1 rounded">HIGH</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">Bundle Software with Hardware</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Sales</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">End of Month</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-success">+₹280K Margin</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">88%</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-surface/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-warning group-hover:bg-warning/80 transition-colors"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-warning bg-warning/10 px-2 py-1 rounded">MEDIUM</span>
            </div>
            <h3 className="text-lg font-medium text-primary mb-6 leading-tight">Liquidate Furniture Inventory</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-t border-surface/50 pt-4">
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Owner</span>
                <span className="block text-sm font-medium text-primary">Operations</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Due</span>
                <span className="block text-sm font-medium text-primary">Immediate</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Impact</span>
                <span className="block text-base font-semibold text-success">+₹45K Capital</span>
              </div>
              <div>
                <span className="block text-[11px] text-secondary uppercase tracking-widest mb-1">Confidence</span>
                <span className="block text-base font-semibold text-primary">94%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
