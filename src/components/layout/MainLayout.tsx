import { Outlet } from 'react-router-dom';

export function MainLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="w-64 border-r border-border flex flex-col p-4">
        <h1 className="text-xl font-bold mb-8">SalesSphere</h1>
        <nav className="flex-1 space-y-2">
          {/* Navigation Links */}
        </nav>
      </div>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
