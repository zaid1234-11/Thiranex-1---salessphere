import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";
import { FilterBar } from "@/widgets/FilterBar";
import { DataTable, type ColumnDef } from "@/widgets/DataTable";
import type { Product } from "@/shared/types";
import { format } from "date-fns";
import { Badge } from "@/components/design-system/badge";

export function ProductsModule() {
  const { products, isLoading } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.category.toLowerCase().includes(lowerQuery) ||
      p.subCategory.toLowerCase().includes(lowerQuery)
    );
  }, [products, searchQuery]);

  const columns: ColumnDef<Product>[] = [
    { header: "ID", accessorKey: "id" },
    { 
      header: "Product Name", 
      cell: (item) => <span className="font-medium text-foreground">{item.name}</span>
    },
    { 
      header: "Category", 
      cell: (item) => <Badge variant="secondary">{item.category}</Badge>
    },
    { header: "Sub-Category", accessorKey: "subCategory" },
    { 
      header: "Cost Price", 
      cell: (item) => <span>${item.costPrice.toFixed(2)}</span>
    },
    { 
      header: "Launch Date", 
      cell: (item) => format(new Date(item.launchDate), "MMM dd, yyyy")
    },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHeader 
        title="Product Performance" 
        description="Analyze which products and categories are driving growth."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Products' }
        ]}
      />

      <FilterBar 
        placeholder="Search by product name, category, or sub-category..." 
        onSearch={setSearchQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Metrics by SKU</CardDescription>
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
