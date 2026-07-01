# Performance & Optimization

SalesSphere was explicitly engineered to handle large-scale data visualization without compromising the end-user experience. This document outlines the performance strategies implemented.

## 1. Build-Time Data Processing (ETL)
The most significant performance bottleneck in web analytics is client-side data parsing. 100,000 rows of CSV data is roughly 15MB uncompressed. Asking the browser to download, parse, join, and aggregate this data synchronously blocks the main thread, leading to frozen UIs.

**Solution:** We moved all heavy computation to a Node.js ETL pipeline. The frontend never computes a join. It receives highly optimized, pre-aggregated JSON documents. 

## 2. Aggressive Route Splitting & Lazy Loading
Using `React.lazy()` and `<Suspense>`, we ensure that only the code required for the current view is downloaded.

- **Module Splitting:** The `/analytics`, `/products`, and `/customers` modules are their own distinct chunks.
- **Chart Splitting:** The D3/Recharts dependency is notoriously large. We explicitly lazy-load heavy chart components (`TrendAreaChart`, `SparklineChart`) so that the App Shell and sidebars render instantly while the charts stream in.

## 3. The Repository Cache
React Query is excellent, but for static, read-only data, it introduces unnecessary bundle bloat (13KB). 

We implemented a custom `RepositoryCache` (`src/repositories/RepositoryCache.ts`). 
- When a user visits the "Revenue" page, `factSales.json` is fetched and cached in memory.
- If they navigate to "Overview" and back to "Revenue", the Repository intercepts the request and instantly resolves the Promise from the `Map`, resulting in zero network latency.

## 4. Virtualization
Rendering 100,000 `<tr>` DOM nodes will crash any modern browser. 
In `DataTable.tsx`, we implemented `@tanstack/react-virtual`. This ensures that no matter how large the underlying `factSales.json` array is, the DOM only ever renders the 15-20 rows currently visible in the viewport (plus a small overscan buffer). Scrolling is buttery smooth at 60fps.

## 5. Memoization Strategy
We strictly adhere to the rule: **Profile First, Memoize Second**.
We avoid wrapping every component in `React.memo()`. We reserve memoization exclusively for deeply nested chart components that receive complex props, ensuring we don't pay the overhead cost of shallow prop comparisons unnecessarily.

## 6. Font Optimization
The primary font (Inter) is loaded from Google Fonts using `display=swap`. This ensures the browser renders fallback text immediately, preventing FOIT (Flash of Invisible Text) and vastly improving the First Contentful Paint (FCP) metric.

## Expected Lighthouse Targets
- **Performance:** > 95
- **Accessibility:** > 95
- **Best Practices:** > 95
- **SEO:** > 90
