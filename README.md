# Why is there a `route.ts` file?

## Problem

This project uses [Fake Store API](https://fakestoreapi.com) to fetch products.

When deployed on Vercel, the API calls were failing silently and returning an empty array `[]` — even though everything worked perfectly on localhost.

## Root Cause

`fakestoreapi.com` blocks requests coming from Vercel/Netlify server IP ranges. This is common with free public APIs to prevent abuse.

## Solution

Created a custom Next.js route handler at `app/api/products/route.ts` that acts as a proxy:

1. The page (`page.tsx`) calls `/api/products` — our own internal API
2. The route handler calls `fakestoreapi.com` via [allorigins.win](https://api.allorigins.win) — a free CORS proxy
3. The proxy bypasses the IP block and returns the data successfully

