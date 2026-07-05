import { useDashboardStore } from "@/store/useDashboardStore";
import { useSalesAnalytics } from "@/hooks/useSalesAnalytics";
import { ExecutiveSummary } from "@/widgets/ExecutiveSummary";
import { AlertCenter } from "@/widgets/AlertCenter";
import type { AlertItem } from "@/widgets/AlertCenter";
import { RecentActivity } from "@/widgets/RecentActivity";
import type { ActivityItem } from "@/widgets/RecentActivity";
import { MetricCard } from "@/components/design-system/MetricCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { Skeleton } from "@/components/design-system/skeleton";
import { SkeletonExecutiveSummary, SkeletonMetricCard, SkeletonChart } from "@/components/feedback/SkeletonSystem";
import { ErrorState } from "@/components/feedback/ErrorState";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { lazy, Suspense } from 'react';

const SparklineChart = lazy(() => import("@/components/charts/SparklineChart").then(m => ({ default: m.SparklineChart })));
const TrendAreaChart = lazy(() => import("@/components/charts/TrendAreaChart").then(m => ({ default: m.TrendAreaChart })));

import { toast } from "sonner";
import { Download } from "lucide-react";

export function CommandCenter() {
  const { sales, isLoading, error } = useDashboardStore();
  const { kpis, trends, timeseries } = useSalesAnalytics(sales);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <SkeletonExecutiveSummary />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SkeletonMetricCard />
          <SkeletonMetricCard />
          <SkeletonMetricCard />
        </div>
        <SkeletonChart />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to load dashboard" 
        message={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const mockAlerts: AlertItem[] = [
    { id: 1, type: 'warning', message: 'Furniture margin below 20% target' },
    { id: 2, type: 'success', message: 'Q3 Revenue exceeded company goal' },
    { id: 3, type: 'warning', message: 'Europe region showing slowing growth' },
    { id: 4, type: 'success', message: 'Customer acquisition remains healthy' },
  ];

  const mockActivities: ActivityItem[] = [
    { id: 1, title: 'Forecast regenerated', timestamp: 'Today, 09:42 AM', color: 'primary' },
    { id: 2, title: 'Revenue models updated', timestamp: 'Yesterday, 14:15 PM', color: 'secondary' },
    { id: 3, title: 'New customer segment detected', timestamp: 'Yesterday, 10:00 AM', color: 'accent' },
  ];

  const execItems = [
    { text: 'Revenue increased 14% compared to the previous quarter.' },
    { text: 'North America region generated highest profit margins.' },
    { text: 'Software subscriptions contributed 42% of total sales.' },
    { text: 'Customer retention improved by 8% year-over-year.' },
  ];

  const handleExport = () => {
    toast.success("Dashboard exported successfully");
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <PageHeader 
        title="Overview" 
        description="Welcome back to SalesSphere. Here is your enterprise snapshot."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Overview' }
        ]}
        actions={
          <button 
            onClick={handleExport}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        }
      />

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <ExecutiveSummary items={execItems} />
        </motion.div>
        
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <AlertCenter alerts={mockAlerts} />
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <RecentActivity activities={mockActivities} />
        </motion.div>
      </div>

    {/* Vercel-style KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={itemVariants}>
          <MetricCard
            title="Total Revenue"
            value={(kpis.totalRevenue / 1000000).toFixed(2)}
            valuePrefix="$"
            valueSuffix="M"
            trend={trends.revenue}
          >
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SparklineChart data={timeseries.last6Months} dataKey="revenue" color="hsl(var(--primary))" />
            </Suspense>
          </MetricCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MetricCard
            title="Total Profit"
            value={(kpis.totalProfit / 1000).toFixed(1)}
            valuePrefix="$"
            valueSuffix="K"
            trend={trends.profit}
          >
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SparklineChart data={timeseries.last6Months} dataKey="profit" color="hsl(var(--secondary))" />
            </Suspense>
          </MetricCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MetricCard
            title="Total Orders"
            value={kpis.totalOrders.toLocaleString()}
            trend={trends.orders}
          >
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <SparklineChart data={timeseries.last6Months} dataKey="orders" color="hsl(var(--destructive))" />
            </Suspense>
          </MetricCard>
        </motion.div>
      </div>

      {/* Main Revenue Chart */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Profit Trend</CardTitle>
            <CardDescription>Trailing 6 months aggregated view</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <Suspense fallback={<Skeleton className="h-full w-full" />}>
              <TrendAreaChart 
                data={timeseries.last6Months}
                xAxisKey="name"
                valueFormatter={(val) => `$${val/1000}k`}
                series={[
                  { key: 'revenue', name: 'Revenue', color: 'hsl(var(--primary))' },
                  { key: 'profit', name: 'Profit', color: 'hsl(var(--secondary))' }
                ]}
              />
            </Suspense>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
