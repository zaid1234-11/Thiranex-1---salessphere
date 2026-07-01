import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";

export function CustomersModule() {
  const { customers } = useDashboardStore();
  
  return (
    <motion.div 
      className="space-y-8"
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

      <Card>
        <CardHeader>
          <CardTitle>Customer Demographics</CardTitle>
          <CardDescription>Metrics by segment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex flex-col gap-4 items-center justify-center text-muted-foreground border border-dashed rounded-lg">
            <div>Customers Module Placeholder</div>
            <div className="text-sm">Tracking {customers.length} unique customers</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
