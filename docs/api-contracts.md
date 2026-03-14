# API Contracts

Initial scaffolded endpoints:

- `GET /api/products`
- `GET /api/inventory`
- `GET /api/orders`
- `GET /api/purchase-orders`
- `GET /api/reports`
- `POST /api/webhooks/shopify`
- `POST /api/webhooks/shipping`

Current status:

- List endpoints return demo-backed JSON from `lib/demo-data.ts`
- Write endpoints are placeholders until Supabase mutations are wired
- Webhook routes accept payloads and echo receipt for local testing
