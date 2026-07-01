import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { useDashboardStore } from "@/store/useDashboardStore";

export function ProductsModule() {
  const { products } = useDashboardStore();
  
  return (
    <motion.div 
      className="space-y-8"
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

      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Metrics by SKU</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex flex-col gap-4 items-center justify-center text-muted-foreground border border-dashed rounded-lg">
            <div>Products Module Placeholder</div>
            <div className="text-sm">Managing {products.length} active products</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
