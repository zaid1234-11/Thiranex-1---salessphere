export interface RawOrder {
  "Order ID": string;
  "Order Date": string;
  "Customer ID": string;
  "Product ID": string;
  "Category": string;
  "Quantity": number;
  "Unit Price": number;
  "Discount": number;
  "Sales": number;
  "Profit": number;
  "Region": string;
  "State": string;
  "Segment": string;
}

export interface Order {
  id: string;
  date: Date;
  customerId: string;
  productId: string;
  category: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  sales: number;
  profit: number;
  region: string;
  state: string;
  segment: string;
}
