import type { Region, Product, Customer, FactSales } from '@/shared/types';
import { BaseRepository } from './BaseRepository';

import regionsData from '@/mock/regions.json';
import productsData from '@/mock/products.json';
import customersData from '@/mock/customers.json';
import factSalesData from '@/mock/factSales.json';

class SalesRepository extends BaseRepository {
  constructor() {
    super('/api/v1/sales');
  }

  async getRegions(): Promise<Region[]> {
    return this.get<Region[]>('/regions', regionsData as Region[], 300);
  }

  async getProducts(): Promise<Product[]> {
    return this.get<Product[]>('/products', productsData as Product[], 300);
  }

  async getCustomers(): Promise<Customer[]> {
    return this.get<Customer[]>('/customers', customersData as Customer[], 400);
  }

  async getSales(): Promise<FactSales[]> {
    return this.get<FactSales[]>('/facts', factSalesData as FactSales[], 600);
  }
  
  // A combined function for initial dashboard load
  async getDashboardData() {
    const [regions, products, customers, sales] = await Promise.all([
      this.getRegions(),
      this.getProducts(),
      this.getCustomers(),
      this.getSales()
    ]);
    
    return { regions, products, customers, sales };
  }
}

// Export a singleton instance
export const salesRepository = new SalesRepository();
