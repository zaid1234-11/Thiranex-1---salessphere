import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppShell } from '@/app/layouts/AppShell';
import { OverviewPage } from '@/features/dashboard/OverviewPage';
import { PerformancePage } from '@/features/dashboard/PerformancePage';
import { ProductsPage } from '@/features/dashboard/ProductsPage';
import { CustomersPage } from '@/features/dashboard/CustomersPage';
import { IntelligencePage } from '@/features/dashboard/IntelligencePage';
import { BoardReportsPage } from '@/features/dashboard/BoardReportsPage';
import { LandingPage } from '@/app/pages/LandingPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/dashboard',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/overview" replace />,
      },
      {
        path: 'overview',
        element: <OverviewPage />,
      },
      {
        path: 'performance',
        element: <PerformancePage />,
      },
      {
        path: 'products',
        element: <ProductsPage />,
      },
      {
        path: 'customers',
        element: <CustomersPage />,
      },
      {
        path: 'intelligence',
        element: <IntelligencePage />,
      },
      {
        path: 'reports',
        element: <BoardReportsPage />,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard/overview" replace />,
      }
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
