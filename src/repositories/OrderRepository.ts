import { Order } from '@/types';
import { MOCK_RAW_DATA } from '@/data/mockData';
import { OrderTransformer } from '@/transformers/OrderTransformer';

export class OrderRepository {
  /**
   * Fetches the raw data, applies transformation, and returns the normalized Dataset.
   * In a real application, this would fetch from an API or parse a CSV file.
   */
  static async getOrders(): Promise<Order[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Transform the raw data through the Transformation Layer
    return OrderTransformer.transformMany(MOCK_RAW_DATA);
  }
}
