export type Trend = "up" | "down" | "flat";

export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: Trend;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  warehouse: string;
  available: number;
  reorderPoint: number;
  status: "Healthy" | "Low stock" | "Incoming" | "Not stocked";
};

export type Order = {
  id: string;
  number: string;
  customer: string;
  channel: string;
  status: "Pending" | "Picking" | "Packed" | "Shipped";
  total: string;
};

export type PurchaseOrder = {
  id: string;
  number: string;
  supplier: string;
  warehouse: string;
  status: "Draft" | "Sent" | "Partially received" | "Received";
  expectedAt: string;
};

export type Supplier = {
  id: string;
  name: string;
  leadTimeDays: number;
  activePos: number;
  score: string;
};

export type Customer = {
  id: string;
  name: string;
  company: string;
  email: string;
  orders: number;
  status: "Active" | "Prospect";
};

export type Warehouse = {
  id: string;
  name: string;
  code: string;
  pickAccuracy: string;
  openTasks: number;
};

export type ReturnCase = {
  id: string;
  number: string;
  customer: string;
  reason: string;
  status: "Requested" | "Approved" | "Received" | "Refunded";
};

export type Movement = {
  id: string;
  time: string;
  sku: string;
  action: string;
  quantity: string;
  actor: string;
};



