import { RawOrder, Order } from '@/types';

export class OrderTransformer {
  /**
   * Transforms raw data from the data source (e.g. CSV/JSON schema) 
   * into normalized, strictly typed objects for the application.
   */
  static transform(raw: any): Order {
    // Generate a simple dynamic segment based on salesAmount
    const segment = raw.salesAmount > 500 ? 'Corporate' : 'Consumer';

    return {
      id: raw.orderId,
      date: new Date(raw.orderDate),
      customerId: raw.customerId,
      productId: raw.productId,
      category: raw.category || 'Unknown',
      quantity: Number(raw.quantity) || 1,
      unitPrice: (Number(raw.unitPrice) || 0) * 83,
      discount: (Number(raw.discount) || 0) * 83,
      sales: (Number(raw.salesAmount) || 0) * 83,
      profit: (Number(raw.profit) || 0) * 83,
      region: raw.customerState || 'Unknown',
      state: raw.customerState || 'Unknown',
      segment: segment
    };
  }

  static transformMany(rawOrders: any[]): Order[] {
    return rawOrders.map(this.transform);
  }
}
