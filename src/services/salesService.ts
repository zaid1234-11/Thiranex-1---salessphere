import { Region, Product, Customer, FactSales } from '../types';

import regionsData from '../data/regions.json';
import productsData from '../data/products.json';
import customersData from '../data/customers.json';
import factSalesData from '../data/factSales.json';

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
