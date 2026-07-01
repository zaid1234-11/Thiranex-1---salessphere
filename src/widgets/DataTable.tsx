import React, { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/design-system/table";
import { Skeleton } from "@/components/design-system/skeleton";

export interface ColumnDef<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  maxHeight?: string;
}

export function DataTable<T>({ 
  data, 
  columns, 
  isLoading = false,
  emptyMessage = "No results found.",
  maxHeight = "600px"
}: DataTableProps<T>) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  return (
    <div 
      ref={parentRef} 
      className="rounded-md border border-border bg-card overflow-auto"
      style={{ maxHeight }}
    >
      <Table>
        <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
          <TableRow className="hover:bg-transparent">
            {columns.map((col, idx) => (
              <TableHead key={idx} className="font-semibold text-muted-foreground bg-card">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = data[virtualRow.index];
              return (
                <TableRow 
                  key={virtualRow.index} 
                  className="border-b border-border/50 absolute top-0 left-0 w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    height: `${virtualRow.size}px`
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} className="py-3 truncate max-w-xs">
                      {col.cell 
                        ? col.cell(row) 
                        : col.accessorKey 
                          ? String(row[col.accessorKey])
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
