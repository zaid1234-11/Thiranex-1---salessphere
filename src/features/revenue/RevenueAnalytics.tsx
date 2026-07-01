import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";
import { FilterBar } from "@/widgets/FilterBar";
import { DataTable, type ColumnDef } from "@/widgets/DataTable";
import type { FactSales } from "@/shared/types";
import { format } from "date-fns";

export function RevenueAnalytics() {
  const { sales, isLoading } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return sales;
    const lowerQuery = searchQuery.toLowerCase();
    return sales.filter(s => 
      s.orderId.toLowerCase().includes(lowerQuery) || 
      s.productId.toLowerCase().includes(lowerQuery) ||
      s.regionId.toLowerCase().includes(lowerQuery)
    );
  }, [sales, searchQuery]);

  const columns: ColumnDef<FactSales>[] = [
    { header: "Order ID", accessorKey: "orderId" },
    { 
      header: "Date", 
      cell: (item) => format(new Date(item.orderDate), "MMM dd, yyyy")
    },
    { header: "Product", accessorKey: "productId" },
    { header: "Region", accessorKey: "regionId" },
    { 
      header: "Revenue", 
      cell: (item) => <span className="font-medium">${item.revenue.toLocaleString()}</span>
    },
    { 
      header: "Profit", 
      cell: (item) => (
        <span className={item.profit > 0 ? "text-primary" : "text-destructive"}>
          ${item.profit.toLocaleString()}
        </span>
      )
    },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHeader 
        title="Revenue Analytics" 
        description="Deep dive into your revenue streams and profit margins."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Analytics' }
        ]}
      />

      <FilterBar 
        placeholder="Search orders, products, or regions..." 
        onSearch={setSearchQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Detailed Sales Records</CardTitle>
          <CardDescription>Transaction-level view of all revenue events</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={filteredData.slice(0, 100)} // Limiting to 100 for performance in this demo
            columns={columns} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
