import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATASET_DIR = path.join(__dirname, '../public/dataset');
const OUTPUT_DIR = path.join(__dirname, '../public/dataset/processed');

// Margin Model
const MARGIN_MODEL = {
  method: "Category Margin Model",
  defaultMargin: 0.25,
  overrides: {
    "beleza_saude": 0.35,
    "informatica_acessorios": 0.18,
    "automotivo": 0.20,
    "cama_mesa_banho": 0.30,
    "moveis_decoracao": 0.28,
    "esporte_lazer": 0.32,
    "relogios_presentes": 0.40,
    "telefonia": 0.15,
    "brinquedos": 0.25,
    "fashion": 0.45,
    "livros_tecnicos": 0.22
  }
};

function getMargin(category) {
  if (!category) return MARGIN_MODEL.defaultMargin;
  return MARGIN_MODEL.overrides[category] || MARGIN_MODEL.defaultMargin;
}

// Ensure output directories exist
const dirs = [
  '', 'summary', 'summary/dashboard', 'summary/products', 
  'summary/customers', 'summary/regions', 'summary/forecast'
];
dirs.forEach(d => {
  const p = path.join(OUTPUT_DIR, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

async function parseCSV(fileName) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(DATASET_DIR, fileName);
    if (!fs.existsSync(filePath)) {
      console.warn(`Missing file: ${filePath}`);
      return resolve([]);
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => resolve(results.data),
      error: (err) => reject(err)
    });
  });
}

async function run() {
  console.log("Loading Kaggle Dataset...");

  const [orders, orderItems, products, customers] = await Promise.all([
    parseCSV('olist_orders_dataset.csv'),
    parseCSV('olist_order_items_dataset.csv'),
    parseCSV('olist_products_dataset.csv'),
    parseCSV('olist_customers_dataset.csv')
  ]);

  console.log(`Loaded ${orders.length} orders, ${orderItems.length} items.`);

  // Validation
  let missingValues = 0;
  
  // Maps
  const productMap = new Map();
  products.forEach(p => productMap.set(p.product_id, p));

  const customerMap = new Map();
  customers.forEach(c => customerMap.set(c.customer_id, c));

  const orderMap = new Map();
  orders.forEach(o => orderMap.set(o.order_id, o));

  // Relationships & Feature Engineering
  console.log("Transforming and joining data...");
  const factSales = [];
  
  for (const item of orderItems) {
    const order = orderMap.get(item.order_id);
    if (!order) continue;
    if (order.order_status !== 'delivered') continue; // only count delivered

    const product = productMap.get(item.product_id);
    const customer = customerMap.get(order.customer_id);

    if (!product || !customer) {
      missingValues++;
      continue;
    }

    const price = item.price || 0;
    const category = product.product_category_name || 'other';
    const margin = getMargin(category);
    const cost = price * (1 - margin);
    const profit = price - cost;

    const orderDate = new Date(order.order_purchase_timestamp);

    factSales.push({
      orderId: item.order_id,
      orderDate: order.order_purchase_timestamp,
      orderYear: orderDate.getFullYear(),
      orderMonth: orderDate.getMonth() + 1,
      orderQuarter: Math.floor(orderDate.getMonth() / 3) + 1,
      customerId: order.customer_id,
      productId: item.product_id,
      regionId: customer.customer_state,
      quantity: 1, // each row in items is 1 unit
      unitPrice: price,
      discount: 0,
      costPrice: cost,
      salesAmount: price,
      revenue: price,
      profit: profit,
      margin: margin,
      category: category,
      customerCity: customer.customer_city,
      customerState: customer.customer_state
    });
  }

  console.log(`Generated ${factSales.length} FactSales records.`);

  // Write base files
  fs.writeFileSync(path.join(OUTPUT_DIR, 'factSales.json'), JSON.stringify(factSales));
  fs.writeFileSync(path.join(OUTPUT_DIR, 'profitModel.json'), JSON.stringify(MARGIN_MODEL, null, 2));

  // Date Dimension
  const dateDimension = {};
  factSales.forEach(f => {
    const d = f.orderDate.split(' ')[0]; // YYYY-MM-DD
    if (!dateDimension[d]) {
      const dt = new Date(d);
      dateDimension[d] = {
        date: d,
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        quarter: Math.floor(dt.getMonth() / 3) + 1,
        day: dt.getDate()
      };
    }
  });
  fs.writeFileSync(path.join(OUTPUT_DIR, 'dateDimension.json'), JSON.stringify(Object.values(dateDimension)));

  // Summaries: Dashboard
  const totalRevenue = factSales.reduce((sum, f) => sum + f.revenue, 0);
  const totalProfit = factSales.reduce((sum, f) => sum + f.profit, 0);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'summary/dashboard/kpiSummary.json'), JSON.stringify({
    revenue: totalRevenue,
    profit: totalProfit,
    orders: new Set(factSales.map(f => f.orderId)).size,
    averageOrderValue: totalRevenue / new Set(factSales.map(f => f.orderId)).size
  }));

  // ETL Report
  const etlReport = {
    dataset: "Olist",
    processedAt: new Date().toISOString(),
    records: factSales.length,
    missingValues,
    version: "1.0.0",
    source: "Kaggle Olist",
    etlVersion: "1.0.0"
  };
  fs.writeFileSync(path.join(OUTPUT_DIR, 'metadata.json'), JSON.stringify(etlReport, null, 2));

  console.log("ETL Pipeline completed successfully.");
}

run().catch(console.error);
