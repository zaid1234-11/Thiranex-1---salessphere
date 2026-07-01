import { create } from 'zustand';
import type { Region, Product, Customer, FactSales } from '@/shared/types';
import { salesRepository } from '@/repositories/SalesRepository';

interface DashboardState {
  regions: Region[];
  products: Product[];
  customers: Customer[];
  sales: FactSales[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  regions: [],
  products: [],
  customers: [],
  sales: [],
  isLoading: false,
  error: null,
  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await salesRepository.getDashboardData();
      set({ 
        regions: data.regions,
        products: data.products,
        customers: data.customers,
        sales: data.sales,
        isLoading: false 
      });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch data', isLoading: false });
    }
  }
}));
