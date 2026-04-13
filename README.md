# Why is there a `route.ts` file?

## Problem

This project uses [Fake Store API](https://fakestoreapi.com) to fetch products.
When deployed on Vercel, the API calls were failing silently and returning an
empty array `[]` — even though everything worked perfectly on localhost.

## Root Cause

`fakestoreapi.com` blocks requests coming from Vercel/Netlify server IP ranges.
This is common with free public APIs to prevent abuse.

## Solution

Created a custom Next.js route handler at `app/api/products/route.ts` that acts as a proxy:

1. The page (`page.tsx`) calls `/api/products` — our own internal API
2. The route handler calls `fakestoreapi.com` via [allorigins.win](https://api.allorigins.win) — a free CORS proxy
3. The proxy bypasses the IP block and returns the data successfully

The page calls the internal API using the correct base URL depending on the environment:

```ts
const baseUrl = process.env.NODE_ENV === "production"
  ? "https://appscrip-task-ritwik-bhowmik.vercel.app"
  : "http://localhost:3000";
```

## Why is there a delay when switching categories or sorting?

Every time you switch a category or change the sort order, the page does a full
server-side re-render. That means the entire request chain runs again:
