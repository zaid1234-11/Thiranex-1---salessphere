import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';

// Lazy load feature modules
const CommandCenter = lazy(() => import('@/features/dashboard/CommandCenter').then(m => ({ default: m.CommandCenter })));
const RevenueAnalytics = lazy(() => import('@/features/revenue/RevenueAnalytics').then(m => ({ default: m.RevenueAnalytics })));
const ProductsModule = lazy(() => import('@/features/products/ProductsModule').then(m => ({ default: m.ProductsModule })));
const CustomersModule = lazy(() => import('@/features/customers/CustomersModule').then(m => ({ default: m.CustomersModule })));
const RegionsModule = lazy(() => import('@/features/regions/RegionsModule').then(m => ({ default: m.RegionsModule })));
const ForecastingModule = lazy(() => import('@/features/forecast/ForecastingModule').then(m => ({ default: m.ForecastingModule })));
const TechnologyPage = lazy(() => import('@/features/technology/TechnologyPage').then(m => ({ default: m.TechnologyPage })));

const routeComponents: Record<string, React.ReactNode> = {
  '/': <CommandCenter />,
  '/analytics': <RevenueAnalytics />,
  '/products': <ProductsModule />,
  '/customers': <CustomersModule />,
  '/regions': <RegionsModule />,
  '/forecasting': <ForecastingModule />,
  '/technology': <TechnologyPage />
};

import { dashboardModules } from '@/config/dashboardModules';

// Fallback for module loading
const ModuleFallback = () => (
  <div className="flex h-full w-full items-center justify-center p-12">
    <div className="text-muted-foreground animate-pulse flex flex-col items-center space-y-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p>Loading module...</p>
    </div>
  </div>
);

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {dashboardModules.map((module) => (
            module.visible && (
              <Route 
                key={module.id} 
                {...(module.route === '/' ? { index: true } : { path: module.route.replace('/', '') })}
                element={
                  <Suspense fallback={<ModuleFallback />}>
                    {routeComponents[module.route]}
                  </Suspense>
                } 
              />
            )
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
