import { Order } from '@/types';
import { OrderTransformer } from '@/transformers/OrderTransformer';

export class OrderRepository {
  /**
   * Fetches the real data from the processed Olist dataset (10k subset).
   */
  static async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch('/dataset/processed/factSales_10k.json');
      if (!response.ok) {
        throw new Error('Failed to fetch orders data');
      }
      
      const rawData = await response.json();
      
      // Transform the raw data through the Transformation Layer
      return OrderTransformer.transformMany(rawData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }
}
