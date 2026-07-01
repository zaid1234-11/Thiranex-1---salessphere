import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";

export function RevenueAnalytics() {
  const { sales } = useDashboardStore();
  
  return (
    <motion.div 
      className="space-y-8"
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

      <Card>
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Revenue and profit by dimension</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center text-muted-foreground border border-dashed rounded-lg">
            Analytics Module Placeholder ({sales.length} records loaded)
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
