import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";
import { FilterBar } from "@/widgets/FilterBar";
import { DataTable, type ColumnDef } from "@/widgets/DataTable";
import type { Customer } from "@/shared/types";
import { format } from "date-fns";
import { Badge } from "@/components/design-system/badge";
import { Avatar, AvatarFallback } from "@/components/design-system/avatar";

export function CustomersModule() {
  const { customers, isLoading } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return customers;
    const lowerQuery = searchQuery.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.region.toLowerCase().includes(lowerQuery) ||
      c.segment.toLowerCase().includes(lowerQuery)
    );
  }, [customers, searchQuery]);

  const columns: ColumnDef<Customer>[] = [
    { 
      header: "Customer", 
      cell: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">{item.name}</span>
        </div>
      )
    },
    { header: "ID", accessorKey: "id" },
    { 
      header: "Segment", 
      cell: (item) => (
        <Badge variant={item.segment === 'New' ? 'default' : 'secondary'}>
          {item.segment}
        </Badge>
      )
    },
    { header: "Region", accessorKey: "region" },
    { 
      header: "Join Date", 
      cell: (item) => format(new Date(item.joinDate), "MMM dd, yyyy")
    },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHeader 
        title="Customer Insights" 
        description="Understand customer behavior, retention, and segments."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Customers' }
        ]}
      />

      <FilterBar 
        placeholder="Search by name, segment, or region..." 
        onSearch={setSearchQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>Segment and demographic data</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable 
            data={filteredData} 
            columns={columns} 
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
