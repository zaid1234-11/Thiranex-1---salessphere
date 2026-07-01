# Architecture & Engineering Decisions

This document captures the "Why" behind the technical choices made in SalesSphere. In modern front-end engineering, selecting a stack is easy, but justifying those choices based on project requirements is the hallmark of a senior engineer.

## Why React + Vite?

**Decision:** We chose React 19 combined with Vite instead of a full-stack framework like Next.js.
**Why:** SalesSphere is a highly interactive, client-heavy Single Page Application (SPA). The primary challenge is rendering and animating complex data visualizations (Recharts) and managing complex client-side state. We do not need Server-Side Rendering (SSR) for SEO because this is an authenticated, internal business tool. Vite provides lightning-fast HMR and an optimized production build without the overhead of a Node.js server environment required by Next.js.

## Why Zustand?

**Decision:** We chose Zustand over Redux Toolkit or Context API for global state management.
**Why:** 
- **vs Redux:** Redux introduces significant boilerplate (actions, reducers, dispatchers). Zustand allows us to define our store in a single file with simple hooks, keeping our domain logic lean.
- **vs Context API:** React Context triggers re-renders for all consumers when any part of the context changes. Zustand allows components to selectively subscribe to specific slices of state (e.g., `useDashboardStore(state => state.sales)`), avoiding unnecessary renders in a performance-critical dashboard.

## Why the Repository Pattern?

**Decision:** We abstracted data fetching into `SalesRepository.ts` instead of calling `fetch()` directly in our components or hooks.
**Why:**
1. **Decoupling:** If we ever switch our backend from static JSON files to a live GraphQL or REST API, we only need to update the Repository class. The UI components remain completely untouched.
2. **Predictability:** The Repository guarantees a strict contract (returning specific Types), ensuring our components always receive data in the expected shape.
3. **Caching Strategy:** By keeping the cache logic in the Repository layer, we avoid duplicating caching logic across different hooks.

## Why No React Query?

**Decision:** We intentionally did not use TanStack Query (React Query) for data fetching.
**Why:** React Query is incredible for server-state synchronization (polling, mutations, invalidation). However, SalesSphere relies on static, pre-computed JSON payloads served at the edge. The data does not mutate during a user session. Introducing a 13KB library for a simple "fetch once and cache in memory" requirement violates our goal of an ultra-lean bundle. Our custom `RepositoryCache` accomplishes the same goal in 20 lines of code.

## Why Build a Custom ETL Pipeline?

**Decision:** We wrote a Node.js script (`process-kaggle-data.js`) to process the 110,000+ row Kaggle dataset at build-time.
**Why:** 
- **Browser Limits:** Browsers struggle to parse and aggregate 100MB of raw CSV data on the fly. It causes UI freezes and crashes on lower-end devices.
- **The "Right" Way:** In a real enterprise architecture, the front-end should never compute large-scale aggregations. That is the job of a data warehouse. Our ETL script acts as our simulated data warehouse, transforming raw relational CSVs into highly optimized JSON documents (Star Schema) that the browser can render instantly.

## Why Deterministic Margins vs. Random Sampling?

**Decision:** When calculating profit, we applied a hardcoded margin based on product categories (e.g., Electronics = 18%, Fashion = 45%) rather than using `Math.random()`.
**Why:** Random data makes a dashboard look artificial and untrustworthy. It also breaks reproducibility—refreshing the page would change the profit metrics, making it impossible to analyze actual trends. A deterministic margin model guarantees that the data tells a consistent, logical story that can be explained in a technical review.

## Why Lazy Loading and Code Splitting?

**Decision:** We wrapped all major routes and heavy chart components in `React.lazy()` and `<Suspense>`.
**Why:** 
- **Performance:** Recharts is a heavy dependency. If a user only wants to view the Data Table, they shouldn't have to download the D3.js dependencies required for the Charts. 
- **UX:** Combined with our contextual `SkeletonSystem`, code-splitting allows the App Shell and navigation to render instantly, followed progressively by the heavy visualizations.

## Why a Single Dark Theme? (Wait, we use a custom theme)

**Decision:** We focused entirely on a cohesive, modern theme (SalesSphere custom UI) rather than supporting arbitrary light/dark toggles in the initial release.
**Why:** Perfecting one theme with highly intentional contrast, data visualization color palettes, and micro-interactions yields a more premium feel than two mediocre themes. 

## Summary

Every decision in SalesSphere was driven by three core philosophies:
1. **Protect the Main Thread** (Shift heavy work to build-time).
2. **Keep the Bundle Lean** (Only import what you absolutely need).
3. **Design for Scale** (Decouple UI from data via Repositories).
