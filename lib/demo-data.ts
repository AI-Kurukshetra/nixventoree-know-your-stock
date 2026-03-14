import type {
  Kpi,
  Movement,
  Order,
  Product,
  PurchaseOrder,
  ReturnCase,
  Supplier,
  Warehouse
} from "@/types/domain";

export const kpis: Kpi[] = [
  { label: "Orders today", value: "128", delta: "+14.2%", trend: "up" },
  { label: "Low stock SKUs", value: "18", delta: "-3 vs yesterday", trend: "up" },
  { label: "Inventory value", value: "$482,900", delta: "+2.1%", trend: "up" },
  { label: "Pending POs", value: "7", delta: "2 due today", trend: "flat" }
];

export const products: Product[] = [
  { id: "prod_1", sku: "NS-BTL-20-BLK", name: "Trail Bottle 20oz", category: "Drinkware", warehouse: "East Coast DC", available: 248, reorderPoint: 80, status: "Healthy" },
  { id: "prod_2", sku: "NS-BAG-24-SND", name: "Transit Duffel 24L", category: "Bags", warehouse: "West Coast Hub", available: 37, reorderPoint: 50, status: "Low stock" },
  { id: "prod_3", sku: "NS-CHG-65-WHT", name: "Fast Charger 65W", category: "Electronics", warehouse: "East Coast DC", available: 92, reorderPoint: 45, status: "Healthy" },
  { id: "prod_4", sku: "NS-DSK-SET-01", name: "Desk Setup Bundle", category: "Bundles", warehouse: "Overflow Annex", available: 15, reorderPoint: 20, status: "Incoming" }
];

export const lowStock = products.filter((product) => product.available <= product.reorderPoint);

export const orders: Order[] = [
  { id: "ord_1", number: "SO-10482", customer: "Harbor Goods", channel: "Shopify", status: "Picking", total: "$1,840" },
  { id: "ord_2", number: "SO-10483", customer: "Mason Lee", channel: "Manual", status: "Packed", total: "$220" },
  { id: "ord_3", number: "SO-10484", customer: "Juniper Home", channel: "Amazon", status: "Pending", total: "$640" },
  { id: "ord_4", number: "SO-10485", customer: "Ridge Retail", channel: "Shopify", status: "Shipped", total: "$2,430" }
];

export const purchaseOrders: PurchaseOrder[] = [
  { id: "po_1", number: "PO-2031", supplier: "Aster Manufacturing", warehouse: "West Coast Hub", status: "Sent", expectedAt: "Mar 18" },
  { id: "po_2", number: "PO-2032", supplier: "Signal Components", warehouse: "East Coast DC", status: "Partially received", expectedAt: "Mar 15" },
  { id: "po_3", number: "PO-2033", supplier: "Northbend Plastics", warehouse: "Overflow Annex", status: "Draft", expectedAt: "Mar 21" }
];

export const suppliers: Supplier[] = [
  { id: "sup_1", name: "Aster Manufacturing", leadTimeDays: 9, activePos: 3, score: "A" },
  { id: "sup_2", name: "Signal Components", leadTimeDays: 14, activePos: 2, score: "B+" },
  { id: "sup_3", name: "Northbend Plastics", leadTimeDays: 6, activePos: 1, score: "A-" }
];

export const warehouses: Warehouse[] = [
  { id: "wh_1", name: "East Coast DC", code: "ECD", pickAccuracy: "99.2%", openTasks: 22 },
  { id: "wh_2", name: "West Coast Hub", code: "WCH", pickAccuracy: "98.6%", openTasks: 18 },
  { id: "wh_3", name: "Overflow Annex", code: "OVA", pickAccuracy: "97.9%", openTasks: 7 }
];

export const returns: ReturnCase[] = [
  { id: "ret_1", number: "RMA-908", customer: "Harbor Goods", reason: "Damaged carton", status: "Approved" },
  { id: "ret_2", number: "RMA-909", customer: "Mason Lee", reason: "Wrong color", status: "Requested" },
  { id: "ret_3", number: "RMA-910", customer: "Juniper Home", reason: "Arrived late", status: "Received" }
];

export const movements: Movement[] = [
  { id: "mov_1", time: "08:12", sku: "NS-BTL-20-BLK", action: "Receipt from PO-2032", quantity: "+120", actor: "Priya" },
  { id: "mov_2", time: "08:47", sku: "NS-BAG-24-SND", action: "Allocated to SO-10482", quantity: "-6", actor: "Marco" },
  { id: "mov_3", time: "09:06", sku: "NS-CHG-65-WHT", action: "Cycle count adjustment", quantity: "-2", actor: "Dana" },
  { id: "mov_4", time: "09:24", sku: "NS-DSK-SET-01", action: "Bundle assembly", quantity: "+4", actor: "System" }
];

export const reportCards = [
  {
    title: "Inventory health",
    body: "18 SKUs are below reorder point. 6 of them are tied to active marketplace listings and should move to immediate purchasing."
  },
  {
    title: "Fulfillment bottleneck",
    body: "West Coast Hub has the highest pick queue. Labor is concentrated on 14 same-day orders that can be cleared before 3 PM."
  },
  {
    title: "Purchasing alert",
    body: "Signal Components is 2 days behind expected receiving. Recommend partial receiving follow-up and alternate supplier check."
  }
];
