import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AppShell } from '@/app/layouts/AppShell';

// Placeholder for Dashboard component
const DashboardOverview = () => (
  <div className="flex items-center justify-center h-64 border border-dashed border-surface rounded-lg">
    <p className="text-secondary">Dashboard Overview Content (To be implemented)</p>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/overview" replace />,
      },
      {
        path: 'overview',
        element: <DashboardOverview />,
      },
      {
        path: '*',
        element: <Navigate to="/overview" replace />,
      }
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
