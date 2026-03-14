insert into public.organizations (id, name, slug, plan, default_currency, timezone)
values ('00000000-0000-0000-0000-000000000001', 'Nixventoree Demo Co', 'nixventoree-demo', 'growth', 'USD', 'America/New_York')
on conflict (id) do nothing;

insert into public.roles (id, organization_id, name, description)
values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Owner', 'Full access'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Warehouse Manager', 'Inventory and fulfillment'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Support Agent', 'Orders and returns')
on conflict (id) do nothing;

insert into public.categories (id, organization_id, name, slug)
values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Drinkware', 'drinkware'),
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Bags', 'bags'),
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Electronics', 'electronics'),
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 'Bundles', 'bundles')
on conflict (id) do nothing;

insert into public.suppliers (id, organization_id, name, email, lead_time_days, minimum_order_value, currency, status)
values
  ('30000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Aster Manufacturing', 'ops@aster.example', 9, 500, 'USD', 'active'),
  ('30000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Signal Components', 'sales@signal.example', 14, 1200, 'USD', 'active'),
  ('30000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Northbend Plastics', 'team@northbend.example', 6, 300, 'USD', 'active')
on conflict (id) do nothing;

insert into public.warehouses (id, organization_id, name, code, city, state, country, is_default)
values
  ('40000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'East Coast DC', 'ECD', 'Newark', 'NJ', 'US', true),
  ('40000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'West Coast Hub', 'WCH', 'Reno', 'NV', 'US', false),
  ('40000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Overflow Annex', 'OVA', 'Allentown', 'PA', 'US', false)
on conflict (id) do nothing;

insert into public.products (id, organization_id, category_id, sku, name, slug, status, track_inventory, is_bundle)
values
  ('50000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'NS-BTL-20-BLK', 'Trail Bottle 20oz', 'trail-bottle-20oz', 'active', true, false),
  ('50000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'NS-BAG-24-SND', 'Transit Duffel 24L', 'transit-duffel-24l', 'active', true, false),
  ('50000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000003', 'NS-CHG-65-WHT', 'Fast Charger 65W', 'fast-charger-65w', 'active', true, false),
  ('50000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000004', 'NS-DSK-SET-01', 'Desk Setup Bundle', 'desk-setup-bundle', 'active', true, true)
on conflict (id) do nothing;

insert into public.product_variants (id, organization_id, product_id, preferred_supplier_id, sku, barcode, cost_price, sale_price, reorder_point, reorder_quantity)
values
  ('60000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'NS-BTL-20-BLK', '123456789001', 6.40, 24.00, 80, 240),
  ('60000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000003', 'NS-BAG-24-SND', '123456789002', 18.00, 68.00, 50, 120),
  ('60000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000002', 'NS-CHG-65-WHT', '123456789003', 12.50, 39.00, 45, 140),
  ('60000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001', 'NS-DSK-SET-01', '123456789004', 34.00, 129.00, 20, 60)
on conflict (id) do nothing;

insert into public.inventory_balances (organization_id, variant_id, warehouse_id, on_hand, reserved, incoming)
values
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 260, 12, 120),
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 43, 6, 80),
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 94, 2, 0),
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000003', 15, 0, 24);

insert into public.customers (id, organization_id, name, email, company_name)
values
  ('70000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Harbor Goods', 'buyer@harborgoods.example', 'Harbor Goods'),
  ('70000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Mason Lee', 'mason@example.com', null),
  ('70000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'Juniper Home', 'ops@juniperhome.example', 'Juniper Home')
on conflict (id) do nothing;

insert into public.orders (id, organization_id, customer_id, order_number, channel, status, fulfillment_status, total_amount)
values
  ('80000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', 'SO-10482', 'shopify', 'picking', 'partial', 1840),
  ('80000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000002', 'SO-10483', 'manual', 'packed', 'ready_to_ship', 220),
  ('80000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000003', 'SO-10484', 'amazon', 'pending', 'unfulfilled', 640)
on conflict (id) do nothing;

insert into public.purchase_orders (id, organization_id, supplier_id, warehouse_id, po_number, status, expected_at, total_amount)
values
  ('90000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000002', 'PO-2031', 'sent', now() + interval '4 days', 3200),
  ('90000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'PO-2032', 'partially_received', now() + interval '1 day', 4100)
on conflict (id) do nothing;

insert into public.returns (id, organization_id, order_id, customer_id, return_number, status, reason)
values
  ('91000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', 'RMA-908', 'approved', 'Damaged carton'),
  ('91000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000002', '70000000-0000-0000-0000-000000000002', 'RMA-909', 'requested', 'Wrong color')
on conflict (id) do nothing;

insert into public.inventory_movements (organization_id, variant_id, warehouse_id, movement_type, quantity_delta, notes, performed_at)
values
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'receipt', 120, 'Receipt from PO-2032', now() - interval '2 hours'),
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'sale', -6, 'Allocated to SO-10482', now() - interval '95 minutes'),
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 'cycle_count', -2, 'Variance after cycle count', now() - interval '76 minutes'),
  ('00000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000003', 'adjustment', 4, 'Bundle assembly', now() - interval '58 minutes');