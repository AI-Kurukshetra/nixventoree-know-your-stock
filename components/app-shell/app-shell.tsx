"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  ClipboardList,
  Factory,
  LayoutDashboard,
  Package,
  Receipt,
  RotateCcw,
  Settings,
  ShoppingCart,
  Truck
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { navigation } from "@/lib/constants/navigation";

const iconMap = {
  "/dashboard": LayoutDashboard,
  "/products": Package,
  "/inventory": Boxes,
  "/orders": ShoppingCart,
  "/purchase-orders": Receipt,
  "/suppliers": Truck,
  "/warehouses": Factory,
  "/returns": RotateCcw,
  "/reports/inventory": ClipboardList,
  "/settings/organization": Settings
} as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div className="eyebrow" style={{ color: "#95f4e0" }}>Northstar Supply Co</div>
          <div style={{ fontSize: 34, fontWeight: 800, marginTop: 8, lineHeight: 1 }}>Ops Console</div>
          <p style={{ color: "rgba(248, 250, 248, 0.76)", lineHeight: 1.6, marginBottom: 0 }}>
            A demo tenant designed to feel like a live logistics control room, not an empty admin template.
          </p>
          <div className="sidebar-meta">
            <div className="sidebar-meta-card">
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "#b4ddd6" }}>Live pulse</div>
              <strong style={{ display: "block", marginTop: 8, fontSize: 24 }}>128 orders</strong>
              <div style={{ color: "rgba(248, 250, 248, 0.7)", marginTop: 6 }}>queued across 3 locations today</div>
            </div>
            <div className="sidebar-meta-card">
              <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "#ffd6b8" }}>Buyer pressure</div>
              <strong style={{ display: "block", marginTop: 8, fontSize: 24 }}>18 low SKUs</strong>
              <div style={{ color: "rgba(248, 250, 248, 0.7)", marginTop: 6 }}>6 need immediate replenishment</div>
            </div>
          </div>
        </div>
        <nav className="nav-list">
          {navigation.map((item) => {
            const Icon = iconMap[item.href as keyof typeof iconMap];
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href} className={cn("nav-link", active && "nav-link-active")}>
                <Icon size={16} />
                <span>{item.label}</span>
                <span className="nav-dot" />
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="app-content">
        <div className="app-content-inner">{children}</div>
      </main>
    </div>
  );
}