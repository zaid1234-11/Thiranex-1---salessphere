# Interview Guide & Talking Points

This document is for *you*. Before a technical interview or a portfolio presentation, review this sheet to ensure you communicate the engineering depth of SalesSphere effectively.

## 1. The Elevator Pitch (30 seconds)
"SalesSphere is an enterprise-grade analytics dashboard I built to process and visualize over 100,000 real-world e-commerce records. Instead of a typical React dashboard that fetches mock data, I built a custom Node.js ETL pipeline to transform raw Kaggle CSVs into an optimized Star Schema at build-time. On the front-end, I implemented a strict Repository Pattern with custom memory caching, and heavily utilized route splitting and table virtualization to ensure the application stays under a 300KB initial load and scrolls at a buttery 60fps."

## 2. Architecture Explanation (2 minutes)
**If asked: "Walk me through the architecture."**

"The architecture is split into two distinct phases: Build-time and Run-time. 
At build-time, my Node.js ETL script streams the raw Olist dataset, cleans it, maps the relational tables, and applies a deterministic margin model to calculate profit. It outputs these as optimized JSON blobs.

At run-time, the React application is strictly layered. 
1. The UI components are completely dumb to the network. 
2. They read from a Zustand global store.
3. The Zustand store talks to a `SalesRepository`.
4. The `SalesRepository` checks an internal `RepositoryCache` before fetching the precomputed JSON. 
This decoupling means if I wanted to hook this up to a GraphQL server tomorrow, I only change the Repository class, and the entire app continues working flawlessly."

## 3. The ETL Explanation
**If asked: "Why not just parse the CSVs in the browser?"**

"Parsing 15MB of CSV data synchronously in V8 blocks the main thread. It causes the UI to freeze, especially on lower-end machines. By moving that to a build-time ETL pipeline, I simulated a real-world Data Warehouse. The browser only receives pre-aggregated data it actually needs, exactly how a production enterprise system operates."

## 4. Biggest Challenges
**Challenge: Rendering massive data sets without crashing.**
"The dataset has 100,000 rows. Initially, rendering this in a standard HTML table caused massive DOM bloat and crashed the browser tab. I solved this by implementing `@tanstack/react-virtual`. It only renders the ~15 rows visible in the viewport, swapping the data out as you scroll. It took the memory footprint from hundreds of megabytes down to almost nothing."

**Challenge: Recharts Bundle Size.**
"Recharts relies on D3 and is very heavy. To prevent this from ruining my Lighthouse score, I implemented route-level splitting with `React.lazy()` for the pages, and then did component-level splitting for the heaviest charts. I paired this with a custom `SkeletonSystem` so the user sees a beautiful shimmer effect while the chart chunk streams in."

## 5. Why specific technical decisions were made
- **Why Zustand?** "Redux has too much boilerplate for this use case, and React Context causes unnecessary re-renders for all consumers. Zustand let me bind specific components to specific slices of state seamlessly."
- **Why no React Query?** "React Query is amazing for server-state synchronization. But my data is static pre-computed JSON served at the Edge. It doesn't mutate during a session. Adding a 13KB library for data that never changes didn't make sense, so I built a 20-line `RepositoryCache` instead."
- **Why deterministic margins?** "I needed profit data, which didn't exist in the raw dataset. Using `Math.random()` to generate costs makes the dashboard look artificial and breaks reproducibility. So I built a category-based margin model (e.g. Electronics = 18%, Fashion = 45%) to ensure the data tells a consistent, logical story."

## 6. Lessons Learned & Future Improvements
- **Lessons:** Architecture matters more than the UI framework. By decoupling the data layer (Repository) from the presentation layer, I was able to easily implement caching and lazy loading without spaghetti code.
- **Future Improvements:** 
  1. Add Playwright for End-to-End testing the critical user flows.
  2. Implement an actual Node.js/PostgreSQL backend and swap out the Repository fetch methods to prove the decoupling works.
