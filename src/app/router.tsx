import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';

// Features (These should be lazy loaded in a production app, but we keep them static here for simplicity unless requested)
import { CommandCenter } from '@/features/dashboard/CommandCenter';
import { RevenueAnalytics } from '@/features/revenue/RevenueAnalytics';
import { ProductsModule } from '@/features/products/ProductsModule';
import { CustomersModule } from '@/features/customers/CustomersModule';
import { RegionsModule } from '@/features/regions/RegionsModule';
import { ForecastingModule } from '@/features/forecast/ForecastingModule';
import { TechnologyPage } from '@/features/technology/TechnologyPage';

// We map the registry routes to components here
// In a highly advanced setup, this could be dynamic, but a static map is safer for TypeScript
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

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          {dashboardModules.map((module) => (
            module.visible && (
              <Route 
                key={module.id} 
                path={module.route === '/' ? 'index' : module.route.replace('/', '')} 
                index={module.route === '/'}
                element={routeComponents[module.route]} 
              />
            )
          ))}
        </Route>
      </Routes>
    </Router>
  );
}
