import React from 'react';
import { Order } from '@/types';
import { ArrowDownToLine, Filter, Columns, MoreHorizontal } from 'lucide-react';

interface OrdersTableProps {
  data: Order[];
}

export function OrdersTable({ data }: OrdersTableProps) {
  // Take top 10 for display purposes in the dashboard
  const displayData = data.slice(0, 10);

  return (
    <div className="flex flex-col">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center pb-4 gap-4">
        <div className="relative w-full sm:w-64">
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-surface border border-surface rounded-md pl-3 pr-3 py-1.5 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-info transition-shadow"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-md border border-surface bg-transparent px-3 py-1.5 text-xs font-medium text-secondary hover:bg-surface hover:text-primary transition-colors">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </button>
          <button className="flex items-center gap-2 rounded-md border border-surface bg-transparent px-3 py-1.5 text-xs font-medium text-secondary hover:bg-surface hover:text-primary transition-colors">
            <Columns className="h-3.5 w-3.5" />
            <span>Columns</span>
          </button>
          <button className="flex items-center gap-2 rounded-md border border-surface bg-transparent px-3 py-1.5 text-xs font-medium text-secondary hover:bg-surface hover:text-primary transition-colors">
            <ArrowDownToLine className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-surface/50">
        <table className="min-w-full text-left text-sm text-secondary">
          <thead className="bg-surface/30 text-[11px] uppercase tracking-widest text-secondary font-medium">
            <tr>
              <th className="px-5 py-4 font-medium">Order ID</th>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Customer</th>
              <th className="px-5 py-4 font-medium text-right">Amount</th>
              <th className="px-5 py-4 font-medium text-center">Status</th>
              <th className="px-5 py-4 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface/50 bg-card">
            {displayData.map((order) => (
              <tr key={order.id} className="hover:bg-surface/20 transition-colors group cursor-pointer">
                <td className="whitespace-nowrap px-5 py-4 font-medium text-primary">
                  {order.id}
                </td>
                <td className="whitespace-nowrap px-5 py-4">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-primary truncate max-w-[150px]">
                  {order.customerId}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right font-medium text-primary">
                  ${order.sales.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center">
                  <span className="inline-flex items-center rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium text-success border border-success/20">
                    Completed
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <button className="text-secondary hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-xs text-secondary">
        <span>Showing {displayData.length} of {data.length} transactions</span>
        <div className="flex gap-1">
          <button className="px-2 py-1 rounded hover:bg-surface disabled:opacity-50" disabled>Prev</button>
          <button className="px-2 py-1 rounded bg-surface border border-surface text-primary">1</button>
          <button className="px-2 py-1 rounded hover:bg-surface border border-transparent">2</button>
          <button className="px-2 py-1 rounded hover:bg-surface border border-transparent">3</button>
          <button className="px-2 py-1 rounded hover:bg-surface border border-transparent">Next</button>
        </div>
      </div>
    </div>
  );
}
