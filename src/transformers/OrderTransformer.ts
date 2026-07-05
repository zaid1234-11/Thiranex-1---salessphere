import { RawOrder, Order } from '@/types';

export class OrderTransformer {
  /**
   * Transforms raw data from the data source (e.g. CSV/JSON schema) 
   * into normalized, strictly typed objects for the application.
   */
  static transform(raw: RawOrder): Order {
    return {
      id: raw['Order ID'],
      date: new Date(raw['Order Date']),
      customerId: raw['Customer ID'],
      productId: raw['Product ID'],
      category: raw['Category'],
      quantity: Number(raw['Quantity']),
      unitPrice: Number(raw['Unit Price']),
      discount: Number(raw['Discount']),
      sales: Number(raw['Sales']),
      profit: Number(raw['Profit']),
      region: raw['Region'],
      state: raw['State'],
      segment: raw['Segment']
    };
  }

  static transformMany(rawOrders: RawOrder[]): Order[] {
    return rawOrders.map(this.transform);
  }
}
