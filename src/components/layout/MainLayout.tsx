import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Package, 
  Users, 
  Globe, 
  LineChart, 
  Cpu 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useEffect } from 'react';

const navigation = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Regions', href: '/regions', icon: Globe },
  { name: 'Forecasting', href: '/forecasting', icon: LineChart },
];

export function MainLayout() {
  const fetchData = useDashboardStore(state => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card flex flex-col p-4 shadow-xl z-10">
        <div className="flex items-center gap-2 mb-8 px-2 mt-4">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
            S
          </div>
          <h1 className="text-xl font-bold tracking-tight">SalesSphere</h1>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-secondary text-secondary-foreground" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )
              }
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}

          <div className="pt-8 pb-2">
            <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              System
            </div>
          </div>
          
          <NavLink
            to="/technology"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                isActive 
                  ? "bg-secondary text-secondary-foreground" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )
            }
          >
            <Cpu className="w-4 h-4" />
            Technology
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
