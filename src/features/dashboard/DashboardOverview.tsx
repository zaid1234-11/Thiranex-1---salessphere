import React, { useEffect, useState, useMemo } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { BusinessRules } from '@/decisions/BusinessRules';
import { Order } from '@/types';
import { DollarSign, TrendingUp, ShoppingCart, Users, Activity, Coins, Package } from 'lucide-react';
import { BarChartComponent } from '@/components/charts/BarChartComponent';
import { DonutChart } from '@/components/charts/DonutChart';
import { OrdersTable } from '@/components/tables/OrdersTable';
import { BusinessInsights } from '@/components/insights/BusinessInsights';
import { TopCustomersList } from '@/components/insights/TopCustomersList';

import { GlobalFilters } from '@/components/filters/GlobalFilters';

export function DashboardOverview() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { dateRange, region, category } = useDashboardStore();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await OrderRepository.getOrders();
      
      // In a real app, filtering happens here or on the backend
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

  // Calculate Metrics via Analytics Layer (Memoized)
  const metrics = useMemo(() => {
    const revenue = SalesAnalytics.calculateRevenue(orders);
    const profit = SalesAnalytics.calculateProfit(orders);
    const totalOrders = SalesAnalytics.calculateTotalOrders(orders);
    const aov = SalesAnalytics.calculateAOV(orders);
    const customers = SalesAnalytics.calculateTotalCustomers(orders);
    
    // Fake previous period for demo purposes
    const prevRevenue = revenue * 0.88;
    const growth = SalesAnalytics.calculateGrowth(revenue, prevRevenue);
    const growthStatus = BusinessRules.evaluateGrowthStatus(growth);

    return { revenue, profit, totalOrders, aov, customers, growth, growthStatus };
  }, [orders]);

  // Prepare Chart Data (Memoized)
  const { revenueData, productData, regionData, categoryData } = useMemo(() => {
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

    const salesByCategory = SalesAnalytics.aggregateByDimension(orders, 'category', 'sales');
    const categoryData = Object.entries(salesByCategory)
      .sort(([,a], [,b]) => b - a)
      .map(([name, value]) => ({ name, value }));

    return { revenueData, productData, regionData, categoryData };
  }, [orders]);

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">
      <div className="text-secondary animate-pulse">Loading dashboard data...</div>
    </div>;
  }

  return (
    <div className="space-y-12">
      
      {/* 1. Executive Summary (Hero) */}
      <div className="flex flex-col gap-6 max-w-[900px]">
        <h1 className="font-playfair text-[32px] sm:text-[40px] text-primary tracking-tight leading-tight">
          Executive Summary
        </h1>
        
        <div className="flex flex-col gap-6 mt-2 text-[16px] leading-relaxed text-secondary">
          <p>
            Revenue continues to outperform quarterly expectations, driven by Enterprise Technology sales. Furniture remains the weakest-performing category, while West region exceeded forecasts.
          </p>
          <span className="text-[13px] text-muted">Updated 2 minutes ago.</span>
        </div>

        <div className="mt-4 border border-surface/50 rounded-2xl p-6 bg-card grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1 border-r border-surface/50 pr-6">
            <span className="text-[12px] text-secondary uppercase tracking-widest font-medium">Revenue</span>
            <span className="text-[20px] text-success font-medium">+13.6%</span>
          </div>
          <div className="flex flex-col gap-1 sm:border-r border-surface/50 pr-6">
            <span className="text-[12px] text-secondary uppercase tracking-widest font-medium">Profit</span>
            <span className="text-[20px] text-success font-medium">+8.2%</span>
          </div>
          <div className="flex flex-col gap-1 border-r border-surface/50 pr-6">
            <span className="text-[12px] text-secondary uppercase tracking-widest font-medium">Top Region</span>
            <span className="text-[20px] text-primary font-medium">West</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-secondary uppercase tracking-widest font-medium">Top Category</span>
            <span className="text-[20px] text-primary font-medium">Technology</span>
          </div>
        </div>
      </div>

      {/* 2. Executive KPI Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard 
          title="Total Revenue" 
          value={`₹${(metrics.revenue / 1000000).toFixed(2)}M`} 
          trend={metrics.growth} 
          status={metrics.growthStatus}
          sparklineData={[1200, 1300, 1150, 1400, 1350, 1500, 1800, 1750, 1900]}
          icon={TrendingUp}
        />
        <MetricCard 
          title="Total Profit" 
          value={`₹${(metrics.profit / 1000).toFixed(1)}K`} 
          trend={12.5} 
          status="good"
          sparklineData={[200, 220, 210, 250, 240, 280, 310, 300, 340]}
          icon={Coins}
        />
        <MetricCard 
          title="Orders" 
          value={(metrics.totalOrders / 1000).toFixed(1) + 'K'} 
          trend={-2.1} 
          status="warning"
          sparklineData={[50, 48, 55, 45, 42, 40, 45, 38, 35]}
          icon={Package}
        />
        <MetricCard 
          title="Average Order Value" 
          value={`₹${Math.round(metrics.aov)}`} 
          trend={0.8} 
          status="good"
          sparklineData={[120, 118, 125, 122, 130, 128, 135, 140, 142]}
          icon={DollarSign}
        />
        <MetricCard 
          title="Customers" 
          value={(metrics.customers / 1000).toFixed(1) + 'K'} 
          trend={5.4} 
          status="good"
          sparklineData={[1200, 1250, 1300, 1280, 1350, 1400, 1450, 1420, 1500]}
          icon={Users}
        />
      </div>

      {/* 3. Revenue Story */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-primary">Revenue Trend</h2>
            <p className="text-sm text-secondary mt-1">Track revenue growth against historical performance and quarterly targets.</p>
          </div>
        </div>
        
        <ChartCard title="Performance" subtitle="Monthly revenue vs. target">
          <RevenueChart data={revenueData} />
        </ChartCard>

        {/* Revenue Drivers */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-surface bg-card p-4 shadow-sm flex items-start gap-3">
            <div className="mt-0.5 text-success">↑</div>
            <div>
              <p className="font-medium text-primary">Technology</p>
              <p className="text-sm text-secondary">Increased 18% YoY driven by Q2 enterprise renewals.</p>
            </div>
          </div>
          <div className="rounded-xl border border-surface bg-card p-4 shadow-sm flex items-start gap-3">
            <div className="mt-0.5 text-success">↑</div>
            <div>
              <p className="font-medium text-primary">West Region</p>
              <p className="text-sm text-secondary">Outperforming quota by 8% due to new tech hub expansion.</p>
            </div>
          </div>
          <div className="rounded-xl border border-surface bg-card p-4 shadow-sm flex items-start gap-3">
            <div className="mt-0.5 text-danger">↓</div>
            <div>
              <p className="font-medium text-primary">Furniture</p>
              <p className="text-sm text-secondary">Declined 7% due to supply chain delays in APAC.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recommendations */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-semibold text-primary">Recommendations</h2>
          <p className="text-sm text-secondary mt-1">Actionable insights generated from your business data.</p>
        </div>
        
        {/* We will build a dedicated RecommendationCards component later. For now, a placeholder structure: */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-surface bg-card p-6 shadow-sm border-t-2 border-t-info">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 bg-surface rounded text-xs font-medium text-primary border border-surface">AI</span>
              <span className="text-xs font-medium text-success">Confidence 92%</span>
            </div>
            <h3 className="text-base font-medium text-primary">Expand Technology inventory.</h3>
            <p className="text-sm text-secondary mt-2">Technology revenue increased 18% while inventory remained stable. Increasing stock could capture unmet demand.</p>
            <div className="mt-4 pt-4 border-t border-surface flex items-center justify-between">
              <span className="text-xs text-secondary">Potential Impact</span>
              <span className="text-sm font-semibold text-success">+₹420K revenue</span>
            </div>
          </div>
          
          <div className="rounded-xl border border-surface bg-card p-6 shadow-sm border-t-2 border-t-warning">
            <div className="flex items-center justify-between mb-4">
              <span className="px-2 py-1 bg-surface rounded text-xs font-medium text-primary border border-surface">AI</span>
              <span className="text-xs font-medium text-warning">Confidence 84%</span>
            </div>
            <h3 className="text-base font-medium text-primary">Review Furniture pricing strategy.</h3>
            <p className="text-sm text-secondary mt-2">Volume is dropping despite flat market demand. A 5% discount could recover volume by end of quarter.</p>
            <div className="mt-4 pt-4 border-t border-surface flex items-center justify-between">
              <span className="text-xs text-secondary">Potential Impact</span>
              <span className="text-sm font-semibold text-success">+₹150K recovered</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Sales Performance (Products & Regions) */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        
        {/* Products */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-lg font-semibold text-primary">Top Products</h3>
            <p className="text-sm text-secondary mt-1">Technology leads with <strong>₹1.2M</strong> in sales.</p>
          </div>
          <ChartCard title="" subtitle="">
            <BarChartComponent data={productData} layout="vertical" />
          </ChartCard>
        </div>

        {/* Regions */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-primary">Regional Performance</h3>
              <p className="text-sm text-secondary mt-1">West region outperforming quota by 8%.</p>
            </div>
            <button className="text-sm text-info hover:underline">View Details →</button>
          </div>
          <ChartCard title="" subtitle="">
            <BarChartComponent data={regionData} layout="horizontal" fill="var(--color-chart-profit)" />
          </ChartCard>
        </div>
      </div>

      {/* 6. Customer Intelligence */}
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold text-primary">Customer Intelligence</h3>
          <p className="text-sm text-secondary mt-1">Top Customer: <strong>Acme Inc.</strong> (₹84K LTV)</p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartCard title="Category Mix" subtitle="Revenue distribution by category">
            <DonutChart data={categoryData} />
          </ChartCard>
          <ChartCard title="Top Customers" subtitle="Highest lifetime value customers">
            <TopCustomersList orders={orders} />
          </ChartCard>
        </div>
      </div>

      {/* 7. Transaction Explorer */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold text-primary">Transaction Explorer</h2>
          <p className="text-sm text-secondary mt-1">Search, filter and inspect individual transactions.</p>
        </div>
        <ChartCard title="" subtitle="">
          <OrdersTable data={orders} />
        </ChartCard>
      </div>

    </div>
  );
}
