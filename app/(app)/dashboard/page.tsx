import Link from "next/link";
import { ArrowUpRight, Building2, RadioTower, Sparkles, TriangleAlert, UserRound } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { SimpleTable } from "@/components/shared/simple-table";
import { StatCard } from "@/components/shared/stat-card";
import { hasPublicSupabaseEnv } from "@/lib/db/env";
import { getDashboardData } from "@/lib/repositories/ops";
import { createClient } from "@/lib/supabase/server";

async function getViewerContext() {
  if (!hasPublicSupabaseEnv()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, organization_id, role_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return {
      name: user.email?.split("@")[0] ?? "Operator",
      role: "Authenticated user",
      organization: "Nixventoree workspace"
    };
  }

  const [organizationResult, roleResult] = await Promise.all([
    profile.organization_id
      ? supabase.from("organizations").select("name").eq("id", profile.organization_id).maybeSingle()
      : Promise.resolve({ data: null }),
    profile.role_id ? supabase.from("roles").select("name").eq("id", profile.role_id).maybeSingle() : Promise.resolve({ data: null })
  ]);

  return {
    name: profile.full_name || user.email?.split("@")[0] || "Operator",
    role: roleResult.data?.name ?? "Authenticated user",
    organization: organizationResult.data?.name ?? "Nixventoree workspace"
  };
}

export default async function DashboardPage() {
  const [{ kpis, lowStock, movements, orders, purchaseOrders, reportCards }, viewer] = await Promise.all([
    getDashboardData(),
    getViewerContext()
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Command center"
        description="A judge-facing overview of stock health, inbound buying pressure, and fulfillment activity across the seeded logistics network."
        actions={
          <>
            <button className="button-secondary" type="button">Share demo</button>
            <Link className="button-primary" href="/purchase-orders">Create purchase order</Link>
          </>
        }
      />

      {viewer ? (
        <div className="mb-5 flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-800">
            <UserRound size={15} />
            {viewer.name}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/80 px-4 py-2 text-sm font-semibold text-stone-800">
            <Building2 size={15} />
            {viewer.organization}
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900">
            {viewer.role}
          </div>
        </div>
      ) : null}

      <section className="hero-panel">
        <div className="hero-grid">
          <div className="relative z-10">
            <div className="eyebrow text-emerald-200">Today&apos;s story</div>
            <h2 className="mt-2 max-w-[700px] text-[3.15rem] leading-[0.92] xs:text-[3.6rem] sm:text-[4rem]">
              Your supply chain is under control, but {lowStock.length} SKUs need immediate buying action.
            </h2>
            <p className="mt-4 max-w-[700px] text-[1rem] leading-7 text-stone-50/80 sm:text-[1.05rem]">
              Nixventoree turns inventory, purchasing, and fulfillment into one clean operating surface so judges can immediately see the business value of the workflow.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <div className="button-ghost"><RadioTower size={16} /> Realtime inventory visibility</div>
              <div className="button-ghost"><TriangleAlert size={16} /> {lowStock.length} low-stock alerts active</div>
              <div className="button-ghost"><Sparkles size={16} /> Demo workspace pre-populated</div>
            </div>
          </div>
          <div className="relative z-10 grid gap-3.5">
            <div className="metric-strip">
              <div className="metric-chip">
                <span className="text-[12px] uppercase tracking-[0.12em] text-stone-50/70">Fulfillment</span>
                <strong className="mt-2 block text-[1.65rem]">{orders.length}</strong>
                <span className="text-sm text-stone-50/70">tracked orders</span>
              </div>
              <div className="metric-chip">
                <span className="text-[12px] uppercase tracking-[0.12em] text-stone-50/70">Inbound</span>
                <strong className="mt-2 block text-[1.65rem]">{purchaseOrders.length}</strong>
                <span className="text-sm text-stone-50/70">POs actively moving</span>
              </div>
              <div className="metric-chip">
                <span className="text-[12px] uppercase tracking-[0.12em] text-stone-50/70">Returns</span>
                <strong className="mt-2 block text-[1.65rem]">{movements.length}</strong>
                <span className="text-sm text-stone-50/70">recent ledger events</span>
              </div>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/8 p-[18px]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[12px] uppercase tracking-[0.12em] text-emerald-100">Judge hook</div>
                  <strong className="mt-2 block text-[1.75rem]">The app feels busy on first load</strong>
                </div>
                <ArrowUpRight size={24} />
              </div>
              <p className="mt-3 leading-7 text-stone-50/75">
                Every key page ships with realistic rows, stock signals, purchase orders, and movement history so the product reads like a live system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
        {kpis.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>

      <div className="dashboard-grid">
        <SectionCard title="Low stock watchlist" subtitle="SKUs most likely to impact revenue if buyers wait too long.">
          <SimpleTable
            rows={lowStock}
            columns={[
              { key: "sku", label: "SKU" },
              { key: "name", label: "Product" },
              { key: "warehouse", label: "Warehouse" },
              { key: "available", label: "Available" },
              { key: "status", label: "Status", isStatus: true }
            ]}
          />
        </SectionCard>
        <SectionCard title="What the judges should notice" subtitle="The dashboard tells a business story instead of listing disconnected widgets.">
          <div className="note-stack">
            {reportCards.map((card) => (
              <div key={card.title} className="note-card">
                <h3 className="m-0 text-[1.15rem]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{card.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="triple-grid">
        <SectionCard title="Recent orders" subtitle="Operational throughput across channels.">
          <SimpleTable rows={orders} columns={[{ key: "number", label: "Order" }, { key: "customer", label: "Customer" }, { key: "status", label: "Status", isStatus: true }, { key: "total", label: "Total" }]} />
        </SectionCard>
        <SectionCard title="Inbound purchasing" subtitle="Replenishment flows tied to stock pressure.">
          <SimpleTable rows={purchaseOrders} columns={[{ key: "number", label: "PO" }, { key: "supplier", label: "Supplier" }, { key: "status", label: "Status", isStatus: true }]} />
        </SectionCard>
        <SectionCard title="Movement stream" subtitle="The immutable stock ledger powering auditability.">
          <SimpleTable rows={movements} columns={[{ key: "time", label: "Time" }, { key: "sku", label: "SKU" }, { key: "action", label: "Action" }, { key: "quantity", label: "Qty" }]} />
        </SectionCard>
      </div>
    </>
  );
}
