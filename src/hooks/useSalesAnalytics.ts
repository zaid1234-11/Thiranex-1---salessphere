import { useMemo } from 'react';
import type { FactSales } from '@/shared/types';
import { format, subMonths } from 'date-fns';

export function useSalesAnalytics(sales: FactSales[]) {
  return useMemo(() => {
    const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
    const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
    const totalOrders = sales.length;

    // In a real application, you would group the fact table by month.
    // Since this is a template using static mock data, we generate some
    // random aggregated data for the charts to make the dashboard look alive.
    // The "last6Months" data aligns with our mock date logic in CommandCenter.
    const last6Months = Array.from({ length: 6 }).map((_, i) => ({
      name: format(subMonths(new Date(), 5 - i), 'MMM'),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      profit: Math.floor(Math.random() * 20000) + 5000,
      orders: Math.floor(Math.random() * 500) + 100,
    }));

    return {
      kpis: {
        totalRevenue,
        totalProfit,
        totalOrders,
      },
      trends: {
        revenue: { value: 12.4, label: "vs last quarter", isPositive: true },
        profit: { value: 8.1, label: "vs last quarter", isPositive: true },
        orders: { value: -2.3, label: "vs last quarter", isPositive: false },
      },
      timeseries: {
        last6Months
      }
    };
  }, [sales]);
}
