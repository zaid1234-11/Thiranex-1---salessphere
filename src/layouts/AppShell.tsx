import { Outlet, NavLink } from 'react-router-dom';

import { cn } from '@/utils';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useEffect } from 'react';
import { dashboardModules } from '@/config/dashboardModules';

export function AppShell() {
  const fetchData = useDashboardStore(state => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Separate modules by layout/type if needed
  const sidebarModules = dashboardModules.filter(m => m.showInSidebar && m.layout !== 'full');
  const systemModules = dashboardModules.filter(m => m.showInSidebar && m.layout === 'full');

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
          {sidebarModules.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
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
              {item.title}
              {item.badge && (
                <span className="ml-auto text-[10px] uppercase tracking-wider font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}

          {systemModules.length > 0 && (
            <div className="pt-8 pb-2">
              <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                System
              </div>
            </div>
          )}
          
          {systemModules.map((item) => (
            <NavLink
              key={item.id}
              to={item.route}
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
              {item.title}
            </NavLink>
          ))}

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
