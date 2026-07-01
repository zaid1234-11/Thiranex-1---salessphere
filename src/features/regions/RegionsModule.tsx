import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";

export function RegionsModule() {
  const { regions } = useDashboardStore();
  
  return (
    <motion.div 
      className="space-y-8"
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

      <Card>
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>Sales by territory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex flex-col gap-4 items-center justify-center text-muted-foreground border border-dashed rounded-lg">
            <div>Regions Module Placeholder</div>
            <div className="text-sm">Operating in {regions.length} active regions</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
