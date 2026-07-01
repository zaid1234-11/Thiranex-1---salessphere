import type { Region, Product, Customer, FactSales } from '@/shared/types';

import regionsData from '@/mock/regions.json';
import productsData from '@/mock/products.json';
import customersData from '@/mock/customers.json';
import factSalesData from '@/mock/factSales.json';

// Simulate network delay for loading skeletons
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const salesService = {
  getRegions: async (): Promise<Region[]> => {
    await delay(300);
    return regionsData as Region[];
  },
  getProducts: async (): Promise<Product[]> => {
    await delay(300);
    return productsData as Product[];
  },
  getCustomers: async (): Promise<Customer[]> => {
    await delay(400);
    return customersData as Customer[];
  },
  getSales: async (): Promise<FactSales[]> => {
    await delay(600);
    return factSalesData as FactSales[];
  },
  
  // A combined function for initial load
  getDashboardData: async () => {
    const [regions, products, customers, sales] = await Promise.all([
      salesService.getRegions(),
      salesService.getProducts(),
      salesService.getCustomers(),
      salesService.getSales()
    ]);
    
    return { regions, products, customers, sales };
  }
};
