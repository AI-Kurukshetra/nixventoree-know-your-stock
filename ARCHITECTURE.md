# Nixventoree Architecture

## Overview

Nixventoree is a multi-tenant inventory and order management platform for product businesses.

The current build is designed to demonstrate:

- real-time style inventory visibility
- centralized order operations
- purchase order and replenishment workflows
- supplier and warehouse management
- returns and reporting flows
- a populated first-run demo experience

## Stack

- Frontend: Next.js 16, App Router, TypeScript
- Styling: Tailwind CSS v4 with custom theme tokens and responsive breakpoints
- Auth: Supabase Auth
- Database: Supabase Postgres
- Backend: Next.js Route Handlers and server-side data fetching
- Realtime and background jobs: planned via Supabase Realtime and Edge Functions

### Responsive Breakpoints

The frontend currently uses these responsive breakpoints:

- `480px`
- `768px`
- `996px`
- `1200px`
- `1400px`

## High-Level Architecture

```text
Users
  |
  v
Next.js App Router UI
  |
  +--> Server Components / Route Handlers
  |       |
  |       +--> Supabase Auth
  |       +--> Supabase Postgres
  |
  +--> Demo data fallback for preview environments
```

## Core Architectural Decisions

### 1. Multi-tenant by default

All business data is scoped by `organization_id`.

This supports:

- multiple customer organizations in one system
- tenant isolation with Postgres row-level security
- future SaaS expansion without redesigning the schema

### 2. Inventory ledger plus balances

Inventory is modeled using:

- `inventory_balances` for current stock state
- `inventory_movements` for immutable audit history

This is important because:

- dashboards need fast current values
- operations need a reliable movement trail for debugging and trust

### 3. Server-first application model

The app is built around server rendering and route handlers instead of a heavy client-only architecture.

Benefits:

- better initial load performance
- simpler data access patterns
- cleaner deployment on Vercel

### 4. Demo-first UX for preview environments

The current build includes seeded/demo content and fallback UI data so the app looks active immediately.

This avoids:

- empty tables
- weak first impressions
- setup friction during a live demo

## Main Modules

### Auth and Identity

- Supabase Auth users
- `profiles`
- `roles`
- organization membership

### Product Catalog

- products
- variants
- categories
- bundle-ready model

### Inventory

- warehouses
- stock balances
- inventory movements
- cycle count and adjustment support

### Orders and Fulfillment

- customers
- orders
- order items
- shipment-ready workflow

### Purchasing

- suppliers
- purchase orders
- reorder-point driven replenishment

### Returns

- returns
- return items
- inspection and restock/refund flow

### Reporting

- dashboard KPIs
- inventory health
- purchasing visibility
- operational summary views

## Current Repository Structure

```text
app/                  Next.js routes and pages
components/           shared UI and shell components
lib/                  demo data, helpers, Supabase utilities
supabase/             migrations, seed data, edge function stubs
docs/                 supporting product/API notes
BUILD_PLAN.md         full build plan
ARCHITECTURE.md       concise technical architecture
```

Frontend implementation note:

- The UI is now driven by Tailwind utility classes and Tailwind-backed component classes in `app/globals.css`
- Shared visual primitives live in `components/shared`
- The app shell and dashboard are optimized for a strong demo-first presentation

## Data Flow

### Current preview mode

1. User opens the app
2. Next.js pages render demo-backed UI
3. API routes return seeded/mock operational data
4. Supabase integration points are scaffolded for later wiring

### Intended full mode

1. User signs in with Supabase Auth
2. Request is scoped to their organization
3. Server components query Supabase
4. Mutations write business records and inventory movements
5. Dashboard and operational screens reflect updated state

## Deployment Model

Current target:

- Vercel for frontend and route handlers
- Supabase for auth and database

Why this is a good fit:

- fast deployment for product review
- managed Postgres and auth
- low ops overhead
- easy preview deployments

## Non-Goals for the Current MVP

These are intentionally not fully built yet:

- advanced AI demand forecasting
- dynamic pricing
- deep external integrations
- customer-facing self-service portal
- native mobile apps

## Next Technical Steps

1. Replace demo data reads with real Supabase queries
2. Wire auth pages to Supabase Auth
3. Add protected route behavior by organization and role
4. Connect order, purchase order, and inventory mutations
5. Add seed automation for richer demo datasets


