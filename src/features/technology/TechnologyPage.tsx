import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/design-system/card";
import { Badge } from "@/components/design-system/badge";
import { motion } from "framer-motion";
import { Database, FileJson, ArrowRight, Activity, LineChart as ChartIcon, Zap } from "lucide-react";

export function TechnologyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Technology & Architecture</h2>
        <p className="text-muted-foreground">The data pipeline and business logic powering SalesSphere.</p>
      </div>

      <div className="grid gap-6">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Data Pipeline Flow</CardTitle>
              <CardDescription>End-to-end data transformation architecture</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center space-y-2 w-32">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/50 text-secondary">
                    <FileJson className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-sm">JSON / CSV</h4>
                  <p className="text-xs text-muted-foreground">Raw Data Source</p>
                </div>

                <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center space-y-2 w-32">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
                    <Database className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-sm">Transformation</h4>
                  <p className="text-xs text-muted-foreground">Cleaning & Shaping</p>
                </div>

                <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center space-y-2 w-32">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 text-accent">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-sm">Business Logic</h4>
                  <p className="text-xs text-muted-foreground">Zustand State</p>
                </div>

                <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center space-y-2 w-32">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 text-primary">
                    <ChartIcon className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-sm">Visualizations</h4>
                  <p className="text-xs text-muted-foreground">Recharts & Framer</p>
                </div>

                <ArrowRight className="hidden md:block w-6 h-6 text-muted-foreground" />

                {/* Step 5 */}
                <div className="flex flex-col items-center text-center space-y-2 w-32">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/50 text-secondary">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-sm">Executive Insights</h4>
                  <p className="text-xs text-muted-foreground">Actionable BI</p>
                </div>

              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Frontend Stack</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm">Framework</span>
                  <Badge variant="outline">React + Vite</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm">Styling</span>
                  <Badge variant="outline">Tailwind v4 + shadcn/ui</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm">State Management</span>
                  <Badge variant="outline">Zustand</Badge>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm">Animations</span>
                  <Badge variant="outline">Framer Motion</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">Data Visualization</span>
                  <Badge variant="outline">Recharts</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Data Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm text-primary">FactSales</span>
                  <span className="text-xs text-muted-foreground">11,000+ Records</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm text-secondary">DimProduct</span>
                  <span className="text-xs text-muted-foreground">25 Entities</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm text-secondary">DimCustomer</span>
                  <span className="text-xs text-muted-foreground">250 Entities</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-sm text-secondary">DimRegion</span>
                  <span className="text-xs text-muted-foreground">5 Entities</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm text-accent">DimDate</span>
                  <span className="text-xs text-muted-foreground">24 Months</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
