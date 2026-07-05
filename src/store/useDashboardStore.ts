import { create } from 'zustand';

interface DateRange {
  start: Date | null;
  end: Date | null;
}

interface DashboardState {
  dateRange: DateRange;
  region: string | 'All';
  category: string | 'All';
  
  // Actions
  setDateRange: (range: DateRange) => void;
  setRegion: (region: string) => void;
  setCategory: (category: string) => void;
  resetFilters: () => void;
}

const initialState = {
  dateRange: { start: null, end: null },
  region: 'All',
  category: 'All',
};

export const useDashboardStore = create<DashboardState>((set) => ({
  ...initialState,
  
  setDateRange: (range) => set({ dateRange: range }),
  setRegion: (region) => set({ region }),
  setCategory: (category) => set({ category }),
  resetFilters: () => set(initialState),
}));
