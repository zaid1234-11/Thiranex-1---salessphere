import React, { useEffect, useState } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { RevenueChart } from '@/components/charts/RevenueChart';
import { useDashboardStore } from '@/store/useDashboardStore';
import { OrderRepository } from '@/repositories/OrderRepository';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { BusinessRules } from '@/decisions/BusinessRules';
import { Order } from '@/types';
import { DollarSign, TrendingUp, ShoppingCart, Users, Activity } from 'lucide-react';

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

  // Calculate Metrics via Analytics Layer
  const revenue = SalesAnalytics.calculateRevenue(orders);
  const profit = SalesAnalytics.calculateProfit(orders);
  const totalOrders = SalesAnalytics.calculateTotalOrders(orders);
  const aov = SalesAnalytics.calculateAOV(orders);
  const customers = SalesAnalytics.calculateTotalCustomers(orders);
  
  // Fake previous period for demo purposes
  const prevRevenue = revenue * 0.88;
  const growth = SalesAnalytics.calculateGrowth(revenue, prevRevenue);
  const growthStatus = BusinessRules.evaluateGrowthStatus(growth);

  // Prepare Chart Data
  const salesByMonth = SalesAnalytics.aggregateByDimension(orders, 'date', 'sales');
  const revenueData = Object.entries(salesByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, value]) => ({
      date: new Date(date).toLocaleString('default', { month: 'short' }),
      revenue: value
    }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Global Filters Area (Stubbed) */}
      <div className="flex items-center justify-between border-b border-surface pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Overview</h1>
        <div className="flex gap-2">
          {/* Filters will be extracted to a separate component later */}
          <select className="bg-surface border border-surface text-secondary text-sm rounded-md px-3 py-1.5">
            <option>All Regions</option>
            <option>North America</option>
            <option>EMEA</option>
          </select>
        </div>
      </div>

      {/* 2. Executive KPI Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard 
          title="Total Revenue" 
          value={`$${revenue.toLocaleString()}`} 
          trend={growth} 
          status={growthStatus}
          icon={<DollarSign className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Total Profit" 
          value={`$${profit.toLocaleString()}`} 
          trend={12.5} 
          status="good"
          icon={<TrendingUp className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Orders" 
          value={totalOrders.toLocaleString()} 
          trend={-2.1} 
          status="warning"
          icon={<ShoppingCart className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Average Order Value" 
          value={`$${Math.round(aov).toLocaleString()}`} 
          trend={5.4} 
          status="good"
          icon={<Activity className="h-4 w-4" />} 
        />
        <MetricCard 
          title="Customers" 
          value={customers.toLocaleString()} 
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
          <div className="flex h-[300px] items-center justify-center border border-dashed border-surface rounded-lg">
            <span className="text-secondary text-sm">Horizontal Bar Chart (Pending)</span>
          </div>
        </ChartCard>
        <ChartCard title="Regional Performance" subtitle="Revenue by geography">
          <div className="flex h-[300px] items-center justify-center border border-dashed border-surface rounded-lg">
            <span className="text-secondary text-sm">Bar / Map Chart (Pending)</span>
          </div>
        </ChartCard>
      </div>

      {/* 5. Customer Intelligence */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Category Mix" subtitle="Revenue distribution by category">
          <div className="flex h-[300px] items-center justify-center border border-dashed border-surface rounded-lg">
            <span className="text-secondary text-sm">Donut Chart (Pending)</span>
          </div>
        </ChartCard>
        <ChartCard title="Top Customers" subtitle="Highest lifetime value customers">
          <div className="flex h-[300px] items-center justify-center border border-dashed border-surface rounded-lg">
            <span className="text-secondary text-sm">Customer List (Pending)</span>
          </div>
        </ChartCard>
      </div>

      {/* 6. Business Insights (AI-assisted) */}
      <ChartCard title="Business Insights" subtitle="AI-assisted observations">
        <div className="flex h-[150px] items-center justify-center border border-dashed border-surface rounded-lg">
          <span className="text-secondary text-sm">AI Insights (Pending)</span>
        </div>
      </ChartCard>

      {/* 7. Recent Orders Table */}
      <ChartCard title="Recent Orders">
        <div className="flex h-[400px] items-center justify-center border border-dashed border-surface rounded-lg">
          <span className="text-secondary text-sm">Orders Data Table (Pending)</span>
        </div>
      </ChartCard>

    </div>
  );
}
