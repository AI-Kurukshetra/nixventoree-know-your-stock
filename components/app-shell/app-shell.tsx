"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  Building2,
  ClipboardList,
  Factory,
  LayoutDashboard,
  Mail,
  Package,
  Receipt,
  RotateCcw,
  Settings,
  ShoppingCart,
  Truck,
  UserRound,
  Users
} from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { navigation } from "@/lib/constants/navigation";
import { cn } from "@/lib/utils/cn";

export type SidebarUser = {
  name: string;
  email: string;
  role: string;
  organization: string;
};

export type SidebarSignals = {
  livePulseValue: string;
  livePulseSubtitle: string;
  buyerPressureValue: string;
  buyerPressureSubtitle: string;
};

const iconMap = {
  "/dashboard": LayoutDashboard,
  "/products": Package,
  "/inventory": Boxes,
  "/orders": ShoppingCart,
  "/customers": Users,
  "/purchase-orders": Receipt,
  "/suppliers": Truck,
  "/warehouses": Factory,
  "/returns": RotateCcw,
  "/reports/inventory": ClipboardList,
  "/settings/organization": Settings
} as const;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "NX";
  }

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

export function AppShell({
  children,
  user,
  signals
}: {
  children: React.ReactNode;
  user: SidebarUser | null;
  signals: SidebarSignals;
}) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-brand">
          <div className="eyebrow text-emerald-200">Nixventoree</div>
          <div className="mt-2 text-[2rem] font-black leading-none">Know your stock. Control your orders.</div>
          <p className="mt-3 mb-0 leading-7 text-stone-100/75">
            A unified operations workspace for inventory, purchasing, fulfillment, and supplier coordination across every location.
          </p>
          <div className="sidebar-meta">
            <div className="sidebar-meta-card">
              <div className="text-[12px] uppercase tracking-[0.12em] text-emerald-100/85">Live pulse</div>
              <strong className="mt-2 block text-2xl">{signals.livePulseValue}</strong>
              <div className="mt-1.5 text-sm text-stone-100/70">{signals.livePulseSubtitle}</div>
            </div>
            <div className="sidebar-meta-card">
              <div className="text-[12px] uppercase tracking-[0.12em] text-orange-100/85">Buyer pressure</div>
              <strong className="mt-2 block text-2xl">{signals.buyerPressureValue}</strong>
              <div className="mt-1.5 text-sm text-stone-100/70">{signals.buyerPressureSubtitle}</div>
            </div>
          </div>
        </div>

        {user ? (
          <div className="sidebar-user-card">
            <div className="sidebar-user-avatar">{getInitials(user.name)}</div>
            <div className="min-w-0 flex-1">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-meta"><UserRound size={14} /> {user.role}</div>
              <div className="sidebar-user-meta"><Building2 size={14} /> {user.organization}</div>
              <div className="sidebar-user-meta truncate"><Mail size={14} /> {user.email}</div>
            </div>
          </div>
        ) : null}

        <nav className="nav-list">
          {navigation.map((item) => {
            const Icon = iconMap[item.href as keyof typeof iconMap];
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href as Route} className={cn("nav-link", active && "nav-link-active")}>
                <Icon size={16} />
                <span>{item.label}</span>
                <span className="nav-dot" />
              </Link>
            );
          })}
        </nav>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </aside>
      <main className="app-content">
        <div className="page-frame">{children}</div>
      </main>
    </div>
  );
}
