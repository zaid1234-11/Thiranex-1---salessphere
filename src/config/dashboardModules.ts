import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  Users, 
  Globe, 
  LineChart, 
  Cpu 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DashboardModule {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  route: string;
  order: number;
  showInSidebar: boolean;
  featureFlag?: string;
  permissions?: string[];
  badge?: string;
  color?: string;
  visible: boolean;
  layout: 'standard' | 'full';
  defaultFilters?: Record<string, any>;
}

export const dashboardModules: DashboardModule[] = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'Command center and executive summary',
    icon: LayoutDashboard,
    route: '/',
    order: 1,
    showInSidebar: true,
    visible: true,
    layout: 'standard',
  },
  {
    id: 'revenue',
    title: 'Revenue Analytics',
    description: 'Deep dive into revenue trends and metrics',
    icon: TrendingUp,
    route: '/analytics',
    order: 2,
    showInSidebar: true,
    featureFlag: 'revenueModule',
    visible: true,
    layout: 'standard',
    color: 'emerald',
  },
  {
    id: 'products',
    title: 'Products',
    description: 'Product performance and inventory',
    icon: Package,
    route: '/products',
    order: 3,
    showInSidebar: true,
    visible: true,
    layout: 'standard',
  },
  {
    id: 'customers',
    title: 'Customers',
    description: 'Customer segmentation and retention',
    icon: Users,
    route: '/customers',
    order: 4,
    showInSidebar: true,
    visible: true,
    layout: 'standard',
  },
  {
    id: 'regions',
    title: 'Regions',
    description: 'Geographic performance breakdown',
    icon: Globe,
    route: '/regions',
    order: 5,
    showInSidebar: true,
    visible: true,
    layout: 'standard',
  },
  {
    id: 'forecasting',
    title: 'Forecasting',
    description: 'Predictive analytics and future projections',
    icon: LineChart,
    route: '/forecasting',
    order: 6,
    showInSidebar: true,
    visible: true,
    layout: 'standard',
    badge: 'Beta',
  },
  {
    id: 'technology',
    title: 'Technology',
    description: 'System architecture and data flow',
    icon: Cpu,
    route: '/technology',
    order: 7,
    showInSidebar: true,
    visible: true,
    layout: 'full',
  }
];
