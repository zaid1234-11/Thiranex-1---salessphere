import { useDashboardStore } from "@/store/useDashboardStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from "recharts";
import { format, subMonths } from "date-fns";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function CommandCenter() {
  const { sales, isLoading, error } = useDashboardStore();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[120px] w-full" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive">Error: {error}</div>;
  }

  // Calculate some basic metrics for the cards
  // In a real app, this would be memoized or computed in the store
  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const totalOrders = sales.length;

  // Mock monthly aggregated data for sparklines
  const last6Months = Array.from({ length: 6 }).map((_, i) => ({
    name: format(subMonths(new Date(), 5 - i), 'MMM'),
    revenue: Math.floor(Math.random() * 50000) + 10000,
    profit: Math.floor(Math.random() * 20000) + 5000,
    orders: Math.floor(Math.random() * 500) + 100,
  }));

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
        <h2 className="text-3xl font-bold tracking-tight mb-2">Overview</h2>
        <p className="text-muted-foreground">Welcome back to SalesSphere. Here is your enterprise snapshot.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Executive Summary */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full bg-gradient-to-br from-card to-card/50 border-primary/20">
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm font-medium">
              <p className="flex items-start gap-2">
                <span className="text-primary mt-1">✦</span>
                Revenue increased 14% compared to the previous quarter.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary mt-1">✦</span>
                North America region generated highest profit margins.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary mt-1">✦</span>
                Software subscriptions contributed 42% of total sales.
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary mt-1">✦</span>
                Customer retention improved by 8% year-over-year.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alert Center */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Alert Center</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-sm">Furniture margin below 20% target</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Q3 Revenue exceeded company goal</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-sm">Europe region showing slowing growth</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm">Customer acquisition remains healthy</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">Forecast regenerated</p>
                  <p className="text-xs text-muted-foreground">Today, 09:42 AM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-secondary" />
                <div>
                  <p className="text-sm font-medium">Revenue models updated</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 14:15 PM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-accent" />
                <div>
                  <p className="text-sm font-medium">New customer segment detected</p>
                  <p className="text-xs text-muted-foreground">Yesterday, 10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Vercel-style KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Revenue</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">${(totalRevenue / 1000000).toFixed(2)}M</CardTitle>
                <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20">
                  ▲ 12.4%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last6Months}>
                  <Line type="monotone" dataKey="revenue" stroke="#743014" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Profit</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">${(totalProfit / 1000).toFixed(1)}K</CardTitle>
                <Badge variant="outline" className="text-green-500 bg-green-500/10 border-green-500/20">
                  ▲ 8.1%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last6Months}>
                  <Line type="monotone" dataKey="profit" stroke="#84592B" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Orders</CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl">{totalOrders.toLocaleString()}</CardTitle>
                <Badge variant="outline" className="text-destructive bg-destructive/10 border-destructive/20">
                  ▼ 2.3%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last6Months}>
                  <Line type="monotone" dataKey="orders" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Revenue Chart */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Profit Trend</CardTitle>
            <CardDescription>Trailing 6 months aggregated view</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last6Months} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#743014" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#743014" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84592B" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#84592B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#6B5541" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B5541" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#3A2516', borderColor: '#743014', borderRadius: '8px' }}
                  itemStyle={{ color: '#E8D1A7' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#743014" fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#84592B" fillOpacity={1} fill="url(#colorPro)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
