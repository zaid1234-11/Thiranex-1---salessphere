import type { Region, Product, Customer, FactSales } from '@/shared/types';
import { BaseRepository } from './BaseRepository';

// Fallbacks if fetch fails
import regionsData from '@/mock/regions.json';
import productsData from '@/mock/products.json';
import customersData from '@/mock/customers.json';
import factSalesData from '@/mock/factSales.json';

class SalesRepository extends BaseRepository {
  constructor() {
    super('/api/v1/sales');
  }

  private async fetchProcessed<T>(filename: string, fallback: any): Promise<T> {
    try {
      const res = await fetch(`/dataset/processed/${filename}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      console.warn(`Failed to load ${filename}, falling back to mock.`);
    }
    return fallback;
  }

  async getRegions(): Promise<Region[]> {
    return this.fetchProcessed<Region[]>('regions.json', regionsData as Region[]);
  }

  async getProducts(): Promise<Product[]> {
    return this.fetchProcessed<Product[]>('products.json', productsData as Product[]);
  }

  async getCustomers(): Promise<Customer[]> {
    return this.fetchProcessed<Customer[]>('customers.json', customersData as Customer[]);
  }

  async getSales(): Promise<FactSales[]> {
    return this.fetchProcessed<FactSales[]>('factSales.json', factSalesData as FactSales[]);
  }
  
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

export const salesRepository = new SalesRepository();
