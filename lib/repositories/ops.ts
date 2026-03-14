import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv } from "@/lib/db/env";
import {
  kpis as demoKpis,
  movements as demoMovements,
  orders as demoOrders,
  products as demoProducts,
  purchaseOrders as demoPurchaseOrders,
  reportCards,
  returns as demoReturns,
  suppliers as demoSuppliers,
  warehouses as demoWarehouses
} from "@/lib/demo-data";
import type { Customer, Kpi, Movement, Order, Product, PurchaseOrder, ReturnCase, Supplier, Warehouse } from "@/types/domain";

type PurchaseOrderOption = {
  id: string;
  label: string;
};

type PurchaseOrderVariantOption = {
  id: string;
  label: string;
  defaultCost: number;
  supplierId: string | null;
};

type OrderVariantOption = {
  id: string;
  label: string;
  defaultPrice: number;
};

type DashboardData = {
  kpis: Kpi[];
  lowStock: Product[];
  movements: Movement[];
  orders: Order[];
  purchaseOrders: PurchaseOrder[];
  reportCards: typeof reportCards;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

function formatStatus(status: string) {
  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatShortDate(value: string | null) {
  if (!value) {
    return "TBD";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

export async function getProductsData(): Promise<Product[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoProducts;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: variants, error: variantsError }, { data: products, error: productsError }, { data: categories }, { data: balances }, { data: warehouses }] = await Promise.all([
      supabase.from("product_variants").select("id, sku, reorder_point, product_id"),
      supabase.from("products").select("id, name, category_id"),
      supabase.from("categories").select("id, name"),
      supabase.from("inventory_balances").select("variant_id, available, warehouse_id"),
      supabase.from("warehouses").select("id, name")
    ]);

    if (variantsError || productsError || !variants) {
      return [];
    }

    const productMap = new Map((products ?? []).map((product) => [product.id, product]));
    const categoryMap = new Map((categories ?? []).map((category) => [category.id, category.name]));
    const warehouseMap = new Map((warehouses ?? []).map((warehouse) => [warehouse.id, warehouse.name]));

    return variants.map((variant) => {
      const product = productMap.get(variant.product_id);
      const balance = (balances ?? []).find((item) => item.variant_id === variant.id);
      const available = balance?.available ?? 0;
      const reorderPoint = variant.reorder_point ?? 0;

      const hasInventoryRow = Boolean(balance);
      const status = !hasInventoryRow
        ? "Not stocked"
        : available <= reorderPoint
          ? available === 0
            ? "Incoming"
            : "Low stock"
          : "Healthy";

      return {
        id: variant.id,
        sku: variant.sku,
        name: product?.name ?? variant.sku,
        category: categoryMap.get(product?.category_id ?? "") ?? "Uncategorized",
        warehouse: warehouseMap.get(balance?.warehouse_id ?? "") ?? "Unassigned",
        available,
        reorderPoint,
        status
      } satisfies Product;
    });
  } catch {
    return [];
  }
}

export async function getOrdersData(): Promise<Order[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoOrders;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: orders, error }, { data: customers }] = await Promise.all([
      supabase.from("orders").select("id, order_number, channel, status, total_amount, customer_id").order("placed_at", { ascending: false }).limit(12),
      supabase.from("customers").select("id, name")
    ]);

    if (error || !orders) {
      return [];
    }

    const customerMap = new Map((customers ?? []).map((customer) => [customer.id, customer.name]));

    return orders.map((order) => ({
      id: order.id,
      number: order.order_number,
      customer: customerMap.get(order.customer_id ?? "") ?? "Unknown customer",
      channel: formatStatus(order.channel),
      status: formatStatus(order.status) as Order["status"],
      total: formatCurrency(Number(order.total_amount ?? 0))
    }));
  } catch {
    return [];
  }
}

export async function getCustomersData(): Promise<Customer[]> {
  if (!hasPublicSupabaseEnv()) {
    return [
      { id: "70000000-0000-0000-0000-000000000001", name: "Harbor Goods", company: "Harbor Goods", email: "buying@harborgoods.demo", orders: 1, status: "Active" },
      { id: "70000000-0000-0000-0000-000000000002", name: "Mason Lee", company: "Direct customer", email: "mason.lee@example.com", orders: 1, status: "Active" },
      { id: "70000000-0000-0000-0000-000000000003", name: "Juniper Home", company: "Juniper Home", email: "ops@juniperhome.demo", orders: 1, status: "Active" }
    ];
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: customers, error }, { data: orders }] = await Promise.all([
      supabase.from("customers").select("id, name, email, company_name").order("created_at", { ascending: false }).limit(20),
      supabase.from("orders").select("customer_id")
    ]);

    if (error || !customers) {
      return [];
    }

    const orderCounts = new Map<string, number>();
    (orders ?? []).forEach((order) => {
      const key = order.customer_id ?? "";
      orderCounts.set(key, (orderCounts.get(key) ?? 0) + 1);
    });

    return customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      company: customer.company_name ?? "Direct customer",
      email: customer.email ?? "No email",
      orders: orderCounts.get(customer.id) ?? 0,
      status: (orderCounts.get(customer.id) ?? 0) > 0 ? "Active" : "Prospect"
    }));
  } catch {
    return [];
  }
}

export async function getOrderFormOptions(): Promise<{
  customers: PurchaseOrderOption[];
  variants: OrderVariantOption[];
}> {
  if (!hasPublicSupabaseEnv()) {
    return {
      customers: [
        { id: "70000000-0000-0000-0000-000000000001", label: "Harbor Goods" },
        { id: "70000000-0000-0000-0000-000000000002", label: "Mason Lee" },
        { id: "70000000-0000-0000-0000-000000000003", label: "Juniper Home" }
      ],
      variants: demoProducts.map((product) => ({ id: product.id, label: `${product.name} (${product.sku})`, defaultPrice: 0 }))
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: customers }, { data: variants }, { data: products }] = await Promise.all([
      supabase.from("customers").select("id, name").order("name", { ascending: true }),
      supabase.from("product_variants").select("id, sku, sale_price, product_id").order("sku", { ascending: true }),
      supabase.from("products").select("id, name")
    ]);

    const productMap = new Map((products ?? []).map((product) => [product.id, product.name]));

    return {
      customers: (customers ?? []).map((customer) => ({ id: customer.id, label: customer.name })),
      variants: (variants ?? []).map((variant) => ({
        id: variant.id,
        label: `${productMap.get(variant.product_id) ?? variant.sku} (${variant.sku})`,
        defaultPrice: Number(variant.sale_price ?? 0)
      }))
    };
  } catch {
    return {
      customers: [],
      variants: []
    };
  }
}

export async function getPurchaseOrdersData(): Promise<PurchaseOrder[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoPurchaseOrders;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: purchaseOrders, error }, { data: suppliers }, { data: warehouses }] = await Promise.all([
      supabase.from("purchase_orders").select("id, po_number, supplier_id, warehouse_id, status, expected_at").order("ordered_at", { ascending: false }).limit(12),
      supabase.from("suppliers").select("id, name"),
      supabase.from("warehouses").select("id, name")
    ]);

    if (error || !purchaseOrders) {
      return [];
    }

    const supplierMap = new Map((suppliers ?? []).map((supplier) => [supplier.id, supplier.name]));
    const warehouseMap = new Map((warehouses ?? []).map((warehouse) => [warehouse.id, warehouse.name]));

    return purchaseOrders.map((purchaseOrder) => ({
      id: purchaseOrder.id,
      number: purchaseOrder.po_number,
      supplier: supplierMap.get(purchaseOrder.supplier_id ?? "") ?? "Unknown supplier",
      warehouse: warehouseMap.get(purchaseOrder.warehouse_id ?? "") ?? "Unassigned",
      status: formatStatus(purchaseOrder.status) as PurchaseOrder["status"],
      expectedAt: formatShortDate(purchaseOrder.expected_at)
    }));
  } catch {
    return [];
  }
}

export async function getPurchaseOrderFormOptions(): Promise<{
  suppliers: PurchaseOrderOption[];
  warehouses: PurchaseOrderOption[];
  variants: PurchaseOrderVariantOption[];
}> {
  if (!hasPublicSupabaseEnv()) {
    return {
      suppliers: demoSuppliers.map((supplier) => ({ id: supplier.id, label: supplier.name })),
      warehouses: demoWarehouses.map((warehouse) => ({ id: warehouse.id, label: warehouse.name })),
      variants: demoProducts.map((product) => ({ id: product.id, label: `${product.name} (${product.sku})`, defaultCost: 0, supplierId: null }))
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: suppliers }, { data: warehouses }, { data: variants }, { data: products }] = await Promise.all([
      supabase.from("suppliers").select("id, name").order("name", { ascending: true }),
      supabase.from("warehouses").select("id, name").order("name", { ascending: true }),
      supabase.from("product_variants").select("id, sku, cost_price, preferred_supplier_id, product_id").order("sku", { ascending: true }),
      supabase.from("products").select("id, name")
    ]);

    const productMap = new Map((products ?? []).map((product) => [product.id, product.name]));

    return {
      suppliers: (suppliers ?? []).map((supplier) => ({ id: supplier.id, label: supplier.name })),
      warehouses: (warehouses ?? []).map((warehouse) => ({ id: warehouse.id, label: warehouse.name })),
      variants: (variants ?? []).map((variant) => ({
        id: variant.id,
        label: `${productMap.get(variant.product_id) ?? variant.sku} (${variant.sku})`,
        defaultCost: Number(variant.cost_price ?? 0),
        supplierId: variant.preferred_supplier_id ?? null
      }))
    };
  } catch {
    return {
      suppliers: [],
      warehouses: [],
      variants: []
    };
  }
}

export async function getMovementsData(): Promise<Movement[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoMovements;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: movements, error }, { data: variants }] = await Promise.all([
      supabase.from("inventory_movements").select("id, movement_type, quantity_delta, notes, performed_at, variant_id").order("performed_at", { ascending: false }).limit(12),
      supabase.from("product_variants").select("id, sku")
    ]);

    if (error || !movements) {
      return [];
    }

    const variantMap = new Map((variants ?? []).map((variant) => [variant.id, variant.sku]));

    return movements.map((movement) => ({
      id: movement.id,
      time: new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" }).format(new Date(movement.performed_at)),
      sku: variantMap.get(movement.variant_id) ?? "Unknown SKU",
      action: movement.notes || formatStatus(movement.movement_type),
      quantity: movement.quantity_delta > 0 ? `+${movement.quantity_delta}` : `${movement.quantity_delta}`,
      actor: "System"
    }));
  } catch {
    return [];
  }
}

export async function getSuppliersData(): Promise<Supplier[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoSuppliers;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: suppliers, error }, { data: purchaseOrders }] = await Promise.all([
      supabase.from("suppliers").select("id, name, lead_time_days").order("name", { ascending: true }),
      supabase.from("purchase_orders").select("supplier_id")
    ]);

    if (error || !suppliers) {
      return [];
    }

    const poCounts = new Map<string, number>();
    (purchaseOrders ?? []).forEach((po) => {
      const key = po.supplier_id ?? "";
      poCounts.set(key, (poCounts.get(key) ?? 0) + 1);
    });

    return suppliers.map((supplier) => ({
      id: supplier.id,
      name: supplier.name,
      leadTimeDays: supplier.lead_time_days ?? 0,
      activePos: poCounts.get(supplier.id) ?? 0,
      score: supplier.lead_time_days <= 7 ? "A" : supplier.lead_time_days <= 14 ? "B+" : "B"
    }));
  } catch {
    return [];
  }
}

export async function getWarehousesData(): Promise<Warehouse[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoWarehouses;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: warehouses, error }, { data: balances }] = await Promise.all([
      supabase.from("warehouses").select("id, name, code").order("name", { ascending: true }),
      supabase.from("inventory_balances").select("warehouse_id")
    ]);

    if (error || !warehouses) {
      return [];
    }

    const inventoryLoads = new Map<string, number>();
    (balances ?? []).forEach((balance) => {
      const key = balance.warehouse_id ?? "";
      inventoryLoads.set(key, (inventoryLoads.get(key) ?? 0) + 1);
    });

    return warehouses.map((warehouse) => ({
      id: warehouse.id,
      name: warehouse.name,
      code: warehouse.code,
      pickAccuracy: `${Math.max(96, 100 - (inventoryLoads.get(warehouse.id) ?? 0) / 10).toFixed(1)}%`,
      openTasks: inventoryLoads.get(warehouse.id) ?? 0
    }));
  } catch {
    return [];
  }
}

export async function getReturnsData(): Promise<ReturnCase[]> {
  if (!hasPublicSupabaseEnv()) {
    return demoReturns;
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: returns, error }, { data: customers }] = await Promise.all([
      supabase.from("returns").select("id, return_number, status, reason, customer_id").order("requested_at", { ascending: false }).limit(12),
      supabase.from("customers").select("id, name")
    ]);

    if (error || !returns) {
      return [];
    }

    const customerMap = new Map((customers ?? []).map((customer) => [customer.id, customer.name]));

    return returns.map((item) => ({
      id: item.id,
      number: item.return_number,
      customer: customerMap.get(item.customer_id ?? "") ?? "Unknown customer",
      reason: item.reason ?? "Unspecified",
      status: formatStatus(item.status) as ReturnCase["status"]
    }));
  } catch {
    return [];
  }
}

export async function getDashboardData(): Promise<DashboardData> {
  const [products, orders, purchaseOrders, movements] = await Promise.all([
    getProductsData(),
    getOrdersData(),
    getPurchaseOrdersData(),
    getMovementsData()
  ]);

  const lowStock = products.filter((product) => product.available <= product.reorderPoint);
  const inventoryValue = products.reduce((total, product) => total + product.available * 42, 0);

  const kpis: Kpi[] = hasPublicSupabaseEnv()
    ? [
        { label: "Orders tracked", value: String(orders.length), delta: `${orders.filter((order) => order.status === "Picking").length} active picks`, trend: "up" },
        { label: "Low stock SKUs", value: String(lowStock.length), delta: `${Math.max(lowStock.length - 2, 0)} urgent`, trend: lowStock.length > 0 ? "up" : "flat" },
        { label: "Inventory value", value: formatCurrency(inventoryValue), delta: "Live from Supabase", trend: "up" },
        { label: "Pending POs", value: String(purchaseOrders.filter((po) => po.status !== "Received").length), delta: `${purchaseOrders.length} tracked`, trend: "flat" }
      ]
    : demoKpis;

  return {
    kpis,
    lowStock: hasPublicSupabaseEnv() ? lowStock : demoProducts.filter((product) => product.available <= product.reorderPoint),
    movements,
    orders,
    purchaseOrders,
    reportCards
  };
}

export async function getProductFormOptions(): Promise<{
  categories: PurchaseOrderOption[];
  suppliers: PurchaseOrderOption[];
  warehouses: PurchaseOrderOption[];
}> {
  if (!hasPublicSupabaseEnv()) {
    return {
      categories: [
        { id: "20000000-0000-0000-0000-000000000001", label: "Drinkware" },
        { id: "20000000-0000-0000-0000-000000000002", label: "Bags" },
        { id: "20000000-0000-0000-0000-000000000003", label: "Electronics" },
        { id: "20000000-0000-0000-0000-000000000004", label: "Bundles" }
      ],
      suppliers: demoSuppliers.map((supplier) => ({ id: supplier.id, label: supplier.name })),
      warehouses: demoWarehouses.map((warehouse) => ({ id: warehouse.id, label: warehouse.name }))
    };
  }

  try {
    const supabase = await createServerSupabaseClient();
    const [{ data: categories }, { data: suppliers }, { data: warehouses }] = await Promise.all([
      supabase.from("categories").select("id, name").order("name", { ascending: true }),
      supabase.from("suppliers").select("id, name").order("name", { ascending: true }),
      supabase.from("warehouses").select("id, name").order("name", { ascending: true })
    ]);

    return {
      categories: (categories ?? []).map((category) => ({ id: category.id, label: category.name })),
      suppliers: (suppliers ?? []).map((supplier) => ({ id: supplier.id, label: supplier.name })),
      warehouses: (warehouses ?? []).map((warehouse) => ({ id: warehouse.id, label: warehouse.name }))
    };
  } catch {
    return {
      categories: [],
      suppliers: [],
      warehouses: []
    };
  }
}


