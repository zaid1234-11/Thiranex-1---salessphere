# Deployment Guide

SalesSphere is a statically built Single Page Application (SPA) utilizing Vite, making it incredibly cheap, fast, and easy to deploy to Edge networks like Vercel, Netlify, or AWS S3/CloudFront.

## Target Architecture (Vercel)

We recommend Vercel for zero-config deployments. 

### 1. Build Process
When code is pushed to the `main` branch, Vercel executes:
```bash
npm install
npm run build
```

The `dist/` folder is generated, containing:
- `index.html`
- Minified JS/CSS chunks (cache-busted with hashes)
- `dataset/processed/*.json` (Served as static assets)

### 2. Route Refresh Handling (404 Fallback)
Because this is an SPA governed by `react-router-dom`, navigating directly to `https://salessphere.com/analytics` will result in a 404 from the static file server if not configured properly.

On Vercel, we use a `vercel.json` file in the root to rewrite all traffic to `index.html`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 3. Caching Strategy
The precomputed JSON files in `/dataset/processed/` act as our "database." 
Vercel automatically applies Edge caching. 
- For dynamic data, we would configure `Cache-Control` headers, but for this static demonstration, Edge caching ensures global sub-100ms latency for all data queries.
- Asset compression (Gzip / Brotli) is handled automatically by Vercel.

## Environment Variables

For this specific architecture (static JSON), no environment variables are strictly required for production. 

If connecting to a live backend in the future:
```env
VITE_API_BASE_URL=https://api.salessphere.com/v1
```
This variable would be consumed by the `BaseRepository.ts` constructor.

## Troubleshooting

- **White Screen on Load:** Often caused by a missing `vercel.json` rewrite rule causing chunk loading to fail on deep links.
- **Data Not Loading:** Ensure the ETL script (`npm run process-data`) ran successfully and output the JSON files into `public/dataset/processed/` before the Vite build step.
