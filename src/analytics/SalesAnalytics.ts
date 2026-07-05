import { Order } from '@/types';

export class SalesAnalytics {
  /**
   * Total Revenue: Sum of Sales
   */
  static calculateRevenue(orders: Order[]): number {
    return orders.reduce((sum, order) => sum + order.sales, 0);
  }

  /**
   * Total Profit: Sum of Profit
   */
  static calculateProfit(orders: Order[]): number {
    return orders.reduce((sum, order) => sum + order.profit, 0);
  }

  /**
   * Profit Margin: (Profit / Revenue) * 100
   */
  static calculateProfitMargin(orders: Order[]): number {
    const revenue = this.calculateRevenue(orders);
    if (revenue === 0) return 0;
    return (this.calculateProfit(orders) / revenue) * 100;
  }

  /**
   * Average Order Value (AOV): Revenue / Number of Orders
   */
  static calculateAOV(orders: Order[]): number {
    if (orders.length === 0) return 0;
    return this.calculateRevenue(orders) / orders.length;
  }

  /**
   * Calculates growth percentage between two values
   */
  static calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return 0; // Avoid division by zero
    return ((current - previous) / previous) * 100;
  }

  /**
   * Returns total orders
   */
  static calculateTotalOrders(orders: Order[]): number {
    return orders.length;
  }

  /**
   * Returns total unique customers
   */
  static calculateTotalCustomers(orders: Order[]): number {
    const uniqueCustomers = new Set(orders.map(o => o.customerId));
    return uniqueCustomers.size;
  }

  /**
   * Groups metric (e.g. Sales) by a specific dimension (e.g. Category, Region)
   */
  static aggregateByDimension(orders: Order[], dimension: keyof Order, metric: 'sales' | 'profit' = 'sales'): Record<string, number> {
    const aggregation: Record<string, number> = {};
    for (const order of orders) {
      const key = String(order[dimension]);
      if (!aggregation[key]) {
        aggregation[key] = 0;
      }
      aggregation[key] += order[metric];
    }
    return aggregation;
  }
}
