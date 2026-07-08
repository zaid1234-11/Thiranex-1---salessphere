import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { TopNavigation } from '@/components/layout/TopNavigation';
import { ChevronRight } from 'lucide-react';

export function AppShell() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary selection:bg-info selection:text-white transition-all duration-500">
      <TopNavigation />

      {/* Main Content Area */}
      <main className="flex-1 w-full mx-auto max-w-[1600px] px-4 py-4 md:px-10 md:py-10 transition-all duration-500">
        
        {/* Breadcrumb */}
        {pathnames.length > 0 && (
          <nav className="flex items-center gap-2 text-xs font-medium text-secondary mb-8">
            <Link to="/dashboard/overview" className="hover:text-primary transition-colors">SalesSphere</Link>
            {pathnames.slice(1).map((value, index) => {
              const to = `/${pathnames.slice(0, index + 2).join('/')}`;
              const isLast = index === pathnames.length - 2;
              const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' ');

              return (
                <React.Fragment key={to}>
                  <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  {isLast ? (
                    <span className="text-primary">{formattedValue}</span>
                  ) : (
                    <Link to={to} className="hover:text-primary transition-colors">{formattedValue}</Link>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        )}

        <Outlet />
      </main>
      
      <footer className="border-t border-surface py-6 text-center text-sm text-secondary mt-auto">
        <p>© {new Date().getFullYear()} SalesSphere. Enterprise Sales Intelligence Platform.</p>
      </footer>
    </div>
  );
}
