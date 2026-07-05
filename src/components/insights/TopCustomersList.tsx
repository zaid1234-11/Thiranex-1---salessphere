import React from 'react';
import { Order } from '@/types';
import { SalesAnalytics } from '@/analytics/SalesAnalytics';
import { UserCircle } from 'lucide-react';

interface TopCustomersListProps {
  orders: Order[];
  limit?: number;
}

export function TopCustomersList({ orders, limit = 5 }: TopCustomersListProps) {
  // Aggregate revenue by customer
  const salesByCustomer = SalesAnalytics.aggregateByDimension(orders, 'customerId', 'sales');
  const topCustomers = Object.entries(salesByCustomer)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([id, sales]) => ({ id, sales }));

  return (
    <div className="flex h-full w-full flex-col space-y-4">
      {topCustomers.map((customer, index) => (
        <div key={customer.id} className="flex items-center justify-between border-b border-surface/50 pb-4 last:border-0 last:pb-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-secondary">
              <UserCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">{customer.id}</p>
              <p className="text-xs text-secondary">Rank #{index + 1}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-primary">
              ${customer.sales.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
            <p className="text-xs text-secondary">LTV</p>
          </div>
        </div>
      ))}
    </div>
  );
}
