import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";
import { FilterBar } from "@/widgets/FilterBar";
import { DataTable, type ColumnDef } from "@/widgets/DataTable";
import type { Region } from "@/shared/types";
import { MapPin } from "lucide-react";

export function RegionsModule() {
  const { regions, isLoading } = useDashboardStore();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return regions;
    const lowerQuery = searchQuery.toLowerCase();
    return regions.filter(r => 
      r.name.toLowerCase().includes(lowerQuery) || 
      r.country.toLowerCase().includes(lowerQuery)
    );
  }, [regions, searchQuery]);

  const columns: ColumnDef<Region>[] = [
    { 
      header: "Region Name", 
      cell: (item) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium text-foreground">{item.name}</span>
        </div>
      )
    },
    { header: "ID", accessorKey: "id" },
    { header: "Country", accessorKey: "country" },
    { 
      header: "Coordinates", 
      cell: (item) => <span className="text-muted-foreground">{item.lat}, {item.lng}</span>
    },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHeader 
        title="Regional Sales" 
        description="Global performance broken down by geography."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Regions' }
        ]}
      />

      <FilterBar 
        placeholder="Search by region name or country..." 
        onSearch={setSearchQuery} 
      />

      <Card>
        <CardHeader>
          <CardTitle>Geographic Territories</CardTitle>
          <CardDescription>All active sales regions</CardDescription>
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
