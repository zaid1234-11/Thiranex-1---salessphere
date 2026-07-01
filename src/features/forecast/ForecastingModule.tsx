import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/design-system/card";
import { TrendAreaChart } from "@/components/charts/TrendAreaChart";
import { useDashboardStore } from "@/store/useDashboardStore";

const MOCK_FORECAST_DATA = [
  { label: 'Q1', value: 150000 },
  { label: 'Q2', value: 185000 },
  { label: 'Q3', value: 210000 },
  { label: 'Q4', value: 245000 },
  { label: 'Q1 (Next Yr)', value: 275000 },
];

export function ForecastingModule() {
  const { isLoading } = useDashboardStore();

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <PageHeader 
        title="Predictive Forecasting" 
        description="AI-driven projections for future sales trends."
        breadcrumbs={[
          { label: 'Dashboard', href: '/' },
          { label: 'Forecasting' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Sales Projections</CardTitle>
            <CardDescription>Estimated revenue for the next 5 quarters based on historical models</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[400px] flex items-center justify-center">Loading model...</div>
            ) : (
              <div className="h-[400px] w-full">
                <TrendAreaChart 
                  data={MOCK_FORECAST_DATA}
                  xAxisKey="label"
                  series={[
                    { key: "value", color: "#8b5cf6", name: "Projected Revenue" }
                  ]}
                  valueFormatter={(val) => `$${(val / 1000)}k`}
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Confidence Score</CardTitle>
            <CardDescription>Model reliability</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-5xl font-bold text-primary">94%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Driver</CardTitle>
            <CardDescription>Primary growth factor</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-xl font-medium text-center">Enterprise SaaS Renewals</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projected Growth</CardTitle>
            <CardDescription>YoY Estimate</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="text-5xl font-bold text-green-500">+22.4%</div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
