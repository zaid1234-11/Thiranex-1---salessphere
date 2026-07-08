import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChartCard } from '@/components/ui/ChartCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { Order } from '@/types';
import { TrendingUp, BarChart2, PieChart, Target, AlertCircle } from 'lucide-react';

export function PerformancePage() {
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

  const { revenueData, productData, regionData } = useMemo(() => {
    const salesByMonth = SalesAnalytics.aggregateByDimension(orders, 'date', 'sales');
    const revenueData = Object.entries(salesByMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, value]) => ({
        name: new Date(date).toLocaleString('default', { month: 'short' }),
        revenue: value,
        profit: value * 0.22,
        forecast: value * 1.05,
        previous: value * 0.85,
        target: 120000 
      }));

    const salesByProduct = SalesAnalytics.aggregateByDimension(orders, 'productId', 'sales');
    const productData = Object.entries(salesByProduct)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([name, value]) => ({ name, value }));

    const salesByRegion = SalesAnalytics.aggregateByDimension(orders, 'region', 'sales');
    const regionData = Object.entries(salesByRegion)
      .sort(([,a], [,b]) => b - a)
      .map(([name, value]) => ({ name, value }));

    return { revenueData, productData, regionData };
  }, [orders]);

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">
      <div className="text-secondary animate-pulse font-medium">Loading performance data...</div>
    </div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16"
    >
      
      {/* 1. Revenue Momentum */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Revenue Momentum
        </h2>
        <div className="bg-card border border-surface/50 rounded-xl p-6 shadow-sm">
          <RevenueChart data={revenueData} />
        </div>
      </section>

      {/* 2. Growth Drivers */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Target className="w-4 h-4" /> Growth Drivers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard 
            title="Top Performing Products" 
            subtitle="Highest revenue generating SKUs"
          >
            <BarChartComponent data={productData} layout="vertical" />
          </ChartCard>
          <ChartCard 
            title="Regional Performance" 
            subtitle="Revenue distribution across regions"
          >
            <BarChartComponent data={regionData} layout="horizontal" fill="var(--color-chart-profit)" />
          </ChartCard>
        </div>
      </section>

      {/* 4. Forecast */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <Target className="w-4 h-4" /> Forecast
        </h2>
        <div className="bg-card border border-surface/50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 space-y-4">
              <h3 className="text-xl font-medium text-primary">Q4 Revenue Projection</h3>
              <p className="text-sm text-secondary leading-relaxed">
                Based on current momentum and Enterprise pipeline, the AI model projects a 14% overachievement against the initial Q4 operating plan.
              </p>
            </div>
            <div className="flex-shrink-0 text-right">
              <span className="block text-[11px] text-secondary uppercase tracking-widest mb-2 font-medium">Projected Finish</span>
              <span className="block text-5xl font-semibold text-success">₹4.2M</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Variance */}
      <section className="space-y-6">
        <h2 className="text-xs uppercase tracking-widest text-secondary font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Variance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-surface/50 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-primary">SMB Segment Target</h4>
              <p className="text-xs text-secondary mt-1">Underperforming by ₹120k</p>
            </div>
            <span className="text-lg font-semibold text-danger">-8.4%</span>
          </div>
          <div className="bg-card border border-surface/50 rounded-xl p-6 flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-primary">Enterprise Margin</h4>
              <p className="text-xs text-secondary mt-1">Exceeding plan by 220bps</p>
            </div>
            <span className="text-lg font-semibold text-success">+2.2%</span>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
