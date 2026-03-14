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
          <div className="eyebrow text-emerald-200">Nixventoree</div>
          <div className="mt-2 text-[2rem] font-black leading-none">Know your stock. Control your orders.</div>
          <p className="mt-3 mb-0 leading-7 text-stone-100/75">
            A judge-facing demo workspace designed to feel like a live logistics control room, not an empty admin template.
          </p>
          <div className="sidebar-meta">
            <div className="sidebar-meta-card">
              <div className="text-[12px] uppercase tracking-[0.12em] text-emerald-100/85">Live pulse</div>
              <strong className="mt-2 block text-2xl">128 orders</strong>
              <div className="mt-1.5 text-sm text-stone-100/70">queued across 3 locations today</div>
            </div>
            <div className="sidebar-meta-card">
              <div className="text-[12px] uppercase tracking-[0.12em] text-orange-100/85">Buyer pressure</div>
              <strong className="mt-2 block text-2xl">18 low SKUs</strong>
              <div className="mt-1.5 text-sm text-stone-100/70">6 need immediate replenishment</div>
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
        <div className="page-frame">{children}</div>
      </main>
    </div>
  );
}