# Internal API & Repository Contracts

SalesSphere currently operates without a live backend server, utilizing a build-time ETL pipeline to generate JSON documents. However, to ensure scalability and future-proofing, the application strictly adheres to the **Repository Pattern**. 

This document outlines the internal API contracts that components use to fetch data.

## The Data Flow

```mermaid
graph LR
    A[Component / Hook] -->|requests data| B[SalesRepository]
    B -->|checks| C[RepositoryCache]
    C -- Miss --> D[Fetch API (Processed JSON)]
    C -- Hit --> A
    D --> C
    C --> A
```

## `BaseRepository`

Located in `src/repositories/BaseRepository.ts`.

All domain repositories extend this base class. It handles:
1. Base URL construction.
2. Standard HTTP fetch abstractions (simulated or real).
3. Common error handling.

## `SalesRepository`

Located in `src/repositories/SalesRepository.ts`.

This is the primary interface for the dashboard. It exposes specific methods that return strictly typed Promises.

### Methods

#### `getSales()`
Fetches the core fact table containing 100,000+ un-aggregated order records.
- **Returns:** `Promise<FactSales[]>`
- **Usage:** Deep-dive analytics, scatter plots, massive data tables.

#### `getDateDimension()`
Fetches pre-aggregated daily/monthly revenue and profit totals.
- **Returns:** `Promise<DateDimension[]>`
- **Usage:** Sparklines, Top-level Revenue Area Charts. (Instant load, bypassing `factSales` processing).

#### `getKPISummary()`
Fetches the absolute top-level metrics.
- **Returns:** `Promise<KPISummary>`
- **Shape:** `{ totalRevenue, totalProfit, totalOrders, activeCustomers }`
- **Usage:** Overview page metric cards.

## Why this Architecture?

If SalesSphere migrates to a live backend (e.g., Node.js/Express with PostgreSQL), **zero components need to change**. 

We simply update `SalesRepository.ts` to execute a `fetch()` against the new live endpoints:
```typescript
async getSales(): Promise<FactSales[]> {
  const res = await fetch('https://api.salessphere.com/v1/sales');
  return res.json();
}
```
The React hooks, Zustand store, and UI components remain completely ignorant of the underlying data source mechanism.
