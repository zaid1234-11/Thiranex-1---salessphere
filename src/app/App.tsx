import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';
import { CommandCenter } from '@/features/dashboard/CommandCenter';
import { RevenueAnalytics } from '@/features/revenue/RevenueAnalytics';
import { ProductsModule } from '@/features/products/ProductsModule';
import { CustomersModule } from '@/features/customers/CustomersModule';
import { RegionsModule } from '@/features/regions/RegionsModule';
import { ForecastingModule } from '@/features/forecast/ForecastingModule';
import { TechnologyPage } from '@/features/technology/TechnologyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<CommandCenter />} />
          <Route path="analytics" element={<RevenueAnalytics />} />
          <Route path="products" element={<ProductsModule />} />
          <Route path="customers" element={<CustomersModule />} />
          <Route path="regions" element={<RegionsModule />} />
          <Route path="forecasting" element={<ForecastingModule />} />
          <Route path="technology" element={<TechnologyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
