import { create } from 'zustand';

interface FilterState {
  year: string | null;
  quarter: string | null;
  region: string | null;
  category: string | null;
  
  setYear: (year: string | null) => void;
  setQuarter: (quarter: string | null) => void;
  setRegion: (region: string | null) => void;
  setCategory: (category: string | null) => void;
  
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  year: null,
  quarter: null,
  region: null,
  category: null,
  
  setYear: (year) => set({ year }),
  setQuarter: (quarter) => set({ quarter }),
  setRegion: (region) => set({ region }),
  setCategory: (category) => set({ category }),
  
  resetFilters: () => set({ year: null, quarter: null, region: null, category: null })
}));
