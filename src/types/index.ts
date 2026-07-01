export interface Region {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  costPrice: number;
  launchDate: string;
}

export interface Customer {
  id: string;
  name: string;
  segment: 'New' | 'Returning';
  joinDate: string;
  region: string;
}

export interface FactSales {
  orderId: string;
  orderDate: string;
  customerId: string;
  productId: string;
  regionId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  costPrice: number;
  salesAmount: number;
  revenue: number;
  profit: number;
}
