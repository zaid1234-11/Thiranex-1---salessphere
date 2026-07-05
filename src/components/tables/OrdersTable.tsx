import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Order } from '@/types';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const columnHelper = createColumnHelper<Order>();

const columns = [
  columnHelper.accessor('id', {
    header: 'Order ID',
    cell: info => <span className="font-medium text-primary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('date', {
    header: 'Date',
    cell: info => <span className="text-secondary">{info.getValue().toLocaleDateString()}</span>,
  }),
  columnHelper.accessor('customerId', {
    header: 'Customer',
    cell: info => <span className="text-secondary">{info.getValue()}</span>,
  }),
  columnHelper.accessor('productId', {
    header: 'Product',
    cell: info => <span className="text-primary truncate max-w-[150px] inline-block" title={info.getValue()}>{info.getValue()}</span>,
  }),
  columnHelper.accessor('sales', {
    header: () => <div className="text-right">Sales</div>,
    cell: info => <div className="text-right font-medium text-primary">${info.getValue().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>,
  }),
  columnHelper.accessor('profit', {
    header: () => <div className="text-right">Profit</div>,
    cell: info => {
      const profit = info.getValue();
      return (
        <div className={cn("text-right font-medium", profit > 0 ? "text-success" : "text-danger")}>
          ${profit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      );
    }
  }),
];

interface OrdersTableProps {
  data: Order[];
}

export function OrdersTable({ data }: OrdersTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="w-full text-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-surface">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="pb-3 pt-2 font-medium text-secondary">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-surface hover:bg-surface/30 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-secondary text-xs">
          Showing {table.getRowModel().rows.length} of {data.length} results
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded-md border border-surface text-secondary hover:text-primary hover:bg-surface disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs text-primary font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            className="p-1 rounded-md border border-surface text-secondary hover:text-primary hover:bg-surface disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
