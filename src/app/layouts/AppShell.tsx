import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNavigation } from '@/components/layout/TopNavigation';

export function AppShell() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-primary selection:bg-info selection:text-white">
      {/* 
        Top Navigation is persistent across all pages. 
        It contains global controls like Search, Date Range, Export, Notifications.
      */}
      <TopNavigation />

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Simple Footer */}
      <footer className="border-t border-surface py-6 text-center text-sm text-secondary">
        <p>© {new Date().getFullYear()} SalesSphere. Enterprise Sales Intelligence Platform.</p>
      </footer>
    </div>
  );
}
