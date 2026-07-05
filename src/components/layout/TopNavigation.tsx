import React from 'react';
import { Search, Calendar, Download, Bell, User, LayoutDashboard } from 'lucide-react';

export function TopNavigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info text-primary">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-primary">
            SalesSphere
          </span>
        </div>

        {/* Global Controls & Actions */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <button className="flex items-center gap-2 rounded-md border border-surface bg-surface/50 px-3 py-1.5 text-sm text-secondary hover:bg-surface hover:text-primary transition-colors">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline-block w-40 text-left">Search...</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-surface bg-background px-1.5 font-mono text-[10px] font-medium text-secondary">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Date Range (Placeholder) */}
          <button className="hidden md:flex items-center gap-2 rounded-md border border-surface bg-background px-3 py-1.5 text-sm text-secondary hover:bg-surface hover:text-primary transition-colors">
            <Calendar className="h-4 w-4" />
            <span>This Quarter</span>
          </button>

          {/* Export */}
          <button className="hidden sm:flex items-center gap-2 rounded-md border border-surface bg-background px-3 py-1.5 text-sm text-secondary hover:bg-surface hover:text-primary transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>

          <div className="h-6 w-px bg-surface mx-2 hidden sm:block"></div>

          {/* Notifications */}
          <button className="relative rounded-full p-2 text-secondary hover:bg-surface hover:text-primary transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-danger"></span>
          </button>

          {/* Profile */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-surface text-secondary hover:text-primary transition-colors">
            <User className="h-5 w-5" />
          </button>
          
        </div>
      </div>
    </header>
  );
}
