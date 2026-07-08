import React, { useState } from 'react';
import { Search, Download, Bell, User, LayoutDashboard, ChevronDown, CheckCircle2, Bookmark, Activity, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export function TopNavigation() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "h-full flex items-center text-primary font-medium border-b-2 border-[#B8925A]"
      : "h-full flex items-center text-secondary hover:opacity-80 transition-opacity border-b-2 border-transparent";

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "block px-4 py-3 text-primary font-medium bg-surface/50 border-l-2 border-[#B8925A]"
      : "block px-4 py-3 text-secondary hover:bg-surface/30 hover:text-primary transition-colors border-l-2 border-transparent";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface/30 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all">
      <div className="w-full max-w-[1600px] mx-auto flex h-16 items-center justify-between px-4 md:px-10">
        
        {/* Logo, Brand & Main Navigation */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-1.5 -ml-1.5 text-secondary hover:text-primary hover:bg-surface/30 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info/20 text-info ml-1 md:ml-0">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-primary mr-6">
            SalesSphere
          </span>
          
          <nav className="hidden md:flex items-center gap-6 text-sm h-16">
            <NavLink to="/dashboard/overview" className={getNavLinkClass}>Overview</NavLink>
            <NavLink to="/dashboard/performance" className={getNavLinkClass}>Performance</NavLink>
            <NavLink to="/dashboard/products" className={getNavLinkClass}>Products</NavLink>
            <NavLink to="/dashboard/customers" className={getNavLinkClass}>Customers</NavLink>
            <NavLink to="/dashboard/intelligence" className={getNavLinkClass}>Intelligence</NavLink>
            <NavLink to="/dashboard/reports" className={getNavLinkClass}>Board Reports</NavLink>
          </nav>
        </div>

        {/* Right Section: Utilities & Actions */}
        <div className="flex items-center gap-3">
          


          <div className="h-6 w-px bg-surface/50 mx-1"></div>

          {/* Export */}
          <button className="flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-primary transition-colors px-2 py-1.5 rounded-md hover:bg-surface/30">
            <Download className="w-4 h-4" />
            Export
          </button>

          {/* Notifications / Activity Feed */}
          <div className="relative group ml-2">
            <button className="p-1.5 text-secondary hover:text-primary transition-colors rounded-full hover:bg-surface/30 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-info border-2 border-background"></span>
            </button>
            
            <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-surface/50 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-surface/50 flex justify-between items-center bg-surface/20">
                <span className="text-sm font-medium text-primary">Activity Feed</span>
                <button className="text-[11px] text-info hover:underline">Mark all read</button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-surface/30 transition-colors border-b border-surface/20 cursor-pointer">
                  <div className="flex gap-3">
                    <div className="mt-0.5"><Activity className="w-4 h-4 text-info" /></div>
                    <div>
                      <p className="text-sm text-primary leading-tight font-medium">New AI Recommendation</p>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">Inventory shortage predicted for Technology category. Impact: ₹420K.</p>
                      <p className="text-[10px] text-secondary mt-1 uppercase tracking-wider">2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-surface/30 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <div className="mt-0.5"><Download className="w-4 h-4 text-success" /></div>
                    <div>
                      <p className="text-sm text-primary leading-tight font-medium">Export Complete</p>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">Q3 Regional Performance Report is ready to download.</p>
                      <p className="text-[10px] text-secondary mt-1 uppercase tracking-wider">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="relative group ml-1">
            <button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-surface/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-surface border border-surface/50 flex items-center justify-center text-secondary">
                <User className="w-4 h-4" />
              </div>
            </button>
            
            <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-surface/50 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1">
              <div className="px-4 py-2 border-b border-surface/50 mb-1">
                <p className="text-sm font-medium text-primary">Executive User</p>
                <p className="text-xs text-secondary mt-0.5">Updated 2 mins ago</p>
              </div>
              <button className="w-full text-left px-4 py-1.5 text-sm text-secondary hover:bg-surface/50 hover:text-primary transition-colors">Preferences</button>
              <button className="w-full text-left px-4 py-1.5 text-sm text-secondary hover:bg-surface/50 hover:text-primary transition-colors">Appearance</button>
              <button className="w-full text-left px-4 py-1.5 text-sm text-secondary hover:bg-surface/50 hover:text-primary transition-colors flex justify-between items-center">
                Keyboard Shortcuts
                <kbd className="font-mono text-[10px] bg-surface px-1 py-0.5 rounded border border-surface/50">?</kbd>
              </button>
              <button className="w-full text-left px-4 py-1.5 text-sm text-secondary hover:bg-surface/50 hover:text-primary transition-colors">Help</button>
              <div className="h-px bg-surface/50 my-1"></div>
              <button className="w-full text-left px-4 py-1.5 text-sm text-danger hover:bg-danger/10 transition-colors">Sign Out</button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
