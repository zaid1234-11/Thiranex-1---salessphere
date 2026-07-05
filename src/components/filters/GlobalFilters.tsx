import React from 'react';
import { useDashboardStore } from '@/store/useDashboardStore';
import { RefreshCcw } from 'lucide-react';

export function GlobalFilters() {
  const { region, category, setRegion, setCategory, resetFilters } = useDashboardStore();

  return (
    <div className="flex items-center gap-3">
      <select 
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="bg-surface border border-surface text-secondary text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-info"
      >
        <option value="All">All Regions</option>
        <option value="North America">North America</option>
        <option value="EMEA">EMEA</option>
        <option value="APAC">APAC</option>
        <option value="LATAM">LATAM</option>
      </select>

      <select 
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="bg-surface border border-surface text-secondary text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-info"
      >
        <option value="All">All Categories</option>
        <option value="Technology">Technology</option>
        <option value="Office Supplies">Office Supplies</option>
        <option value="Furniture">Furniture</option>
      </select>

      {(region !== 'All' || category !== 'All') && (
        <button 
          onClick={resetFilters}
          className="flex items-center gap-1 text-xs text-secondary hover:text-danger transition-colors"
        >
          <RefreshCcw className="h-3 w-3" />
          Reset
        </button>
      )}
    </div>
  );
}
