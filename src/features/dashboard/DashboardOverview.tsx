import React, { useEffect, useState, useMemo } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { BusinessRules } from '@/decisions/BusinessRules';
import { Order } from '@/types';
import { DollarSign, TrendingUp, ShoppingCart, Users, Activity } from 'lucide-react';
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

  if (isLoading) {
    return <div className="flex h-[50vh] items-center justify-center">
      <div className="text-secondary animate-pulse">Loading dashboard data...</div>
    </div>;
  }

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
        date: new Date(date).toLocaleString('default', { month: 'short' }),
        revenue: value
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Global Filters Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface pb-4 gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Overview</h1>
        <GlobalFilters />
      </div>

      {/* 2. Executive KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard 
          title="Total Revenue" 
          value={`$${metrics.revenue.toLocaleString()}`} 
          trend={metrics.growth} 
          status={metrics.growthStatus}
          icon={<DollarSign className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Total Profit" 
          value={`$${metrics.profit.toLocaleString()}`} 
          trend={12.5} 
          status="good"
          icon={<TrendingUp className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Orders" 
          value={metrics.totalOrders.toLocaleString()} 
          trend={-2.1} 
          status="warning"
          icon={<ShoppingCart className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Average Order Value" 
          value={`$${Math.round(metrics.aov).toLocaleString()}`} 
          trend={5.4} 
          status="good"
          icon={<Activity className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Customers" 
          value={metrics.customers.toLocaleString()} 
          trend={18.2} 
          status="excellent"
          icon={<Users className="h-4 w-4" />} 
        />
      </div>

      {/* 3. Revenue Analytics (Large Hero Chart) */}
      <ChartCard title="Revenue Analytics" subtitle="Monthly revenue vs. target">
        <RevenueChart data={revenueData} />
      </ChartCard>

      {/* 4. Sales Performance (Products & Regions) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Product Performance" subtitle="Revenue by product line">
          <BarChartComponent data={productData} layout="vertical" />
        </ChartCard>
        <ChartCard title="Regional Performance" subtitle="Revenue by geography">
          <BarChartComponent data={regionData} layout="horizontal" fill="#3FA96B" />
        </ChartCard>
      </div>

      {/* 5. Customer Intelligence */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Category Mix" subtitle="Revenue distribution by category">
          <DonutChart data={categoryData} />
        </ChartCard>
        <ChartCard title="Top Customers" subtitle="Highest lifetime value customers">
          <TopCustomersList orders={orders} />
        </ChartCard>
      </div>

      {/* 6. Business Insights (AI-assisted) */}
      <ChartCard title="Business Insights" subtitle="AI-assisted observations">
        <BusinessInsights orders={orders} />
      </ChartCard>

      {/* 7. Recent Orders Table */}
      <ChartCard title="Recent Orders">
        <OrdersTable data={orders} />
      </ChartCard>

    </div>
  );
}
