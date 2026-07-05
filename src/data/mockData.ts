import { RawOrder } from '@/types';

// Generate 500 records of mock data across 2024
export const generateMockData = (): RawOrder[] => {
  const data: RawOrder[] = [];
  const categories = ['Technology', 'Office Supplies', 'Furniture'];
  const regions = ['North America', 'EMEA', 'APAC', 'LATAM'];
  const states = ['CA', 'NY', 'TX', 'UK', 'DE', 'FR', 'JP', 'AU', 'BR'];
  const segments = ['Consumer', 'Corporate', 'Home Office'];
  const products = ['Laptop Pro', 'Ergo Chair', 'Wireless Mouse', 'Desk Monitor', 'Mechanical Keyboard', 'Standing Desk'];

  for (let i = 1; i <= 500; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const region = regions[Math.floor(Math.random() * regions.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const segment = segments[Math.floor(Math.random() * segments.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    
    // Spread dates across 2024
    const start = new Date(2024, 0, 1).getTime();
    const end = new Date(2024, 11, 31).getTime();
    const date = new Date(start + Math.random() * (end - start)).toISOString().split('T')[0];

    const quantity = Math.floor(Math.random() * 10) + 1;
    const unitPrice = Math.floor(Math.random() * 1000) + 50;
    const discount = Number((Math.random() * 0.2).toFixed(2));
    const sales = Number((quantity * unitPrice * (1 - discount)).toFixed(2));
    const profit = Number((sales * (Math.random() * 0.4 + 0.1)).toFixed(2)); // 10% to 50% profit margin

    data.push({
      "Order ID": `ORD-${2024}-${i.toString().padStart(4, '0')}`,
      "Order Date": date,
      "Customer ID": `CUST-${Math.floor(Math.random() * 100) + 1}`,
      "Product ID": product,
      "Category": category,
      "Quantity": quantity,
      "Unit Price": unitPrice,
      "Discount": discount,
      "Sales": sales,
      "Profit": profit,
      "Region": region,
      "State": state,
      "Segment": segment
    });
  }
  
  return data;
};

export const MOCK_RAW_DATA = generateMockData();
