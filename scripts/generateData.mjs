import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'src', 'data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Generate Regions
const regions = [
  { id: 'R1', name: 'North America', country: 'USA', lat: 37.09, lng: -95.71 },
  { id: 'R2', name: 'Europe', country: 'Germany', lat: 51.16, lng: 10.45 },
  { id: 'R3', name: 'Asia Pacific', country: 'Japan', lat: 36.20, lng: 138.25 },
  { id: 'R4', name: 'Latin America', country: 'Brazil', lat: -14.23, lng: -51.92 },
  { id: 'R5', name: 'Middle East', country: 'UAE', lat: 23.42, lng: 53.84 }
];

// Generate Products
const categories = ['Electronics', 'Software', 'Services', 'Hardware'];
const products = [];
for (let i = 1; i <= 25; i++) {
  const cat = categories[i % categories.length];
  products.push({
    id: `P${i}`,
    name: `${cat} Pro ${i}`,
    category: cat,
    subCategory: `${cat} Sub ${i%3}`,
    costPrice: 50 + (i * 10),
    launchDate: '2023-01-01'
  });
}

// Generate Customers
const customers = [];
for (let i = 1; i <= 250; i++) {
  customers.push({
    id: `C${i}`,
    name: `Enterprise Client ${i}`,
    segment: i % 4 === 0 ? 'New' : 'Returning',
    joinDate: '2023-05-01',
    region: regions[i % regions.length].id
  });
}

// Generate FactSales (24 months: July 2024 - June 2026)
const factSales = [];
let orderIdCounter = 1000;
const startDate = new Date('2024-07-01');

for (let month = 0; month < 24; month++) {
  const currentMonth = new Date(startDate);
  currentMonth.setMonth(currentMonth.getMonth() + month);
  
  // Seasonal modifier: higher in Q4 (months 9, 10, 11 of year, but let's say Nov/Dec)
  const isQ4 = currentMonth.getMonth() === 10 || currentMonth.getMonth() === 11;
  const numOrders = isQ4 ? 600 : 400; // Total ~11,000 facts
  
  for (let o = 0; o < numOrders; o++) {
    const p = products[Math.floor(Math.random() * products.length)];
    const c = customers[Math.floor(Math.random() * customers.length)];
    const r = regions.find(reg => reg.id === c.region);
    
    const qty = Math.floor(Math.random() * 5) + 1;
    const unitPrice = p.costPrice * (1.5 + Math.random()); // 50-100% markup
    const discount = Math.random() > 0.8 ? 0.1 : 0; // 10% discount on some
    const salesAmount = qty * unitPrice;
    const revenue = salesAmount * (1 - discount);
    const profit = revenue - (p.costPrice * qty);
    
    // Add random day in the month
    const day = Math.floor(Math.random() * 28) + 1;
    const orderDate = new Date(currentMonth);
    orderDate.setDate(day);
    
    factSales.push({
      orderId: `ORD-${orderIdCounter++}`,
      orderDate: orderDate.toISOString(),
      customerId: c.id,
      productId: p.id,
      regionId: r.id,
      quantity: qty,
      unitPrice: Number(unitPrice.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      costPrice: p.costPrice,
      salesAmount: Number(salesAmount.toFixed(2)),
      revenue: Number(revenue.toFixed(2)),
      profit: Number(profit.toFixed(2))
    });
  }
}

fs.writeFileSync(path.join(dataDir, 'regions.json'), JSON.stringify(regions, null, 2));
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(dataDir, 'customers.json'), JSON.stringify(customers, null, 2));
fs.writeFileSync(path.join(dataDir, 'factSales.json'), JSON.stringify(factSales, null, 2));

console.log('Mock data generated successfully.');
