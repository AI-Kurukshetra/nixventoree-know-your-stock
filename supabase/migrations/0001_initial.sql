create extension if not exists "pgcrypto";

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan text not null default 'growth',
  default_currency text not null default 'USD',
  timezone text not null default 'UTC',
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role_id uuid references public.roles(id) on delete set null,
  full_name text,
  email text not null,
  is_active boolean not null default true,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  parent_category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.suppliers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  lead_time_days integer not null default 7,
  minimum_order_value numeric(12,2) not null default 0,
  currency text not null default 'USD',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  sku text not null,
  name text not null,
  slug text not null,
  description text,
  brand text,
  status text not null default 'active',
  track_inventory boolean not null default true,
  is_bundle boolean not null default false,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.product_variants (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  preferred_supplier_id uuid references public.suppliers(id) on delete set null,
  sku text not null,
  barcode text,
  option_values jsonb not null default '{}'::jsonb,
  cost_price numeric(12,2) not null default 0,
  sale_price numeric(12,2) not null default 0,
  weight numeric(12,2),
  dimensions jsonb not null default '{}'::jsonb,
  reorder_point integer not null default 0,
  reorder_quantity integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.warehouses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  code text not null,
  city text,
  state text,
  country text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_balances (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete cascade,
  warehouse_id uuid not null references public.warehouses(id) on delete cascade,
  on_hand integer not null default 0,
  reserved integer not null default 0,
  available integer generated always as (on_hand - reserved) stored,
  incoming integer not null default 0,
  created_at timestamptz not null default now(),
  unique (organization_id, variant_id, warehouse_id)
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  email text,
  phone text,
  company_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  order_number text not null,
  channel text not null default 'manual',
  status text not null default 'pending',
  fulfillment_status text not null default 'unfulfilled',
  placed_at timestamptz not null default now(),
  total_amount numeric(12,2) not null default 0
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  order_id uuid not null references public.orders(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  quantity integer not null,
  unit_price numeric(12,2) not null default 0,
  allocated_quantity integer not null default 0,
  fulfilled_quantity integer not null default 0
);

create table if not exists public.purchase_orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  supplier_id uuid references public.suppliers(id) on delete set null,
  warehouse_id uuid references public.warehouses(id) on delete set null,
  po_number text not null,
  status text not null default 'draft',
  ordered_at timestamptz not null default now(),
  expected_at timestamptz,
  received_at timestamptz,
  total_amount numeric(12,2) not null default 0
);

create table if not exists public.returns (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  return_number text not null,
  status text not null default 'requested',
  reason text,
  requested_at timestamptz not null default now()
);

create table if not exists public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  warehouse_id uuid references public.warehouses(id) on delete set null,
  movement_type text not null,
  quantity_delta integer not null,
  reference_type text,
  reference_id uuid,
  notes text,
  performed_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.suppliers enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.warehouses enable row level security;
alter table public.inventory_balances enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.purchase_orders enable row level security;
alter table public.returns enable row level security;
alter table public.inventory_movements enable row level security;
