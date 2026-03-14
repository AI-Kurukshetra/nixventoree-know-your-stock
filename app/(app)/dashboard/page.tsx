import Link from "next/link";
import { ArrowUpRight, RadioTower, Sparkles, TriangleAlert } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { SimpleTable } from "@/components/shared/simple-table";
import { StatCard } from "@/components/shared/stat-card";
import { kpis, lowStock, movements, orders, purchaseOrders, reportCards } from "@/lib/demo-data";

export default function DashboardPage() {
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

      <section className="hero-panel">
        <div className="hero-grid">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="eyebrow" style={{ color: "#9bf4e0" }}>Today&apos;s story</div>
            <h2 style={{ fontSize: 62, lineHeight: 0.92, margin: "10px 0 14px", maxWidth: 700 }}>
              Your supply chain is under control, but 6 SKUs need immediate buying action.
            </h2>
            <p style={{ color: "rgba(247, 245, 240, 0.78)", fontSize: 17, lineHeight: 1.7, maxWidth: 700 }}>
              Nixventoree turns inventory, purchasing, and fulfillment into one clean operating surface so judges can immediately see the business value of the workflow.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
              <div className="button-ghost"><RadioTower size={16} /> Realtime inventory visibility</div>
              <div className="button-ghost"><TriangleAlert size={16} /> 18 low-stock alerts active</div>
              <div className="button-ghost"><Sparkles size={16} /> Demo workspace pre-populated</div>
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "grid", gap: 14 }}>
            <div className="metric-strip">
              <div className="metric-chip">
                <span style={{ color: "rgba(247, 245, 240, 0.72)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>Fulfillment</span>
                <strong>94.7%</strong>
                <span style={{ color: "rgba(247, 245, 240, 0.72)" }}>same-day SLA hit rate</span>
              </div>
              <div className="metric-chip">
                <span style={{ color: "rgba(247, 245, 240, 0.72)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>Inbound</span>
                <strong>7</strong>
                <span style={{ color: "rgba(247, 245, 240, 0.72)" }}>POs actively moving</span>
              </div>
              <div className="metric-chip">
                <span style={{ color: "rgba(247, 245, 240, 0.72)", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em" }}>Returns</span>
                <strong>3</strong>
                <span style={{ color: "rgba(247, 245, 240, 0.72)" }}>cases awaiting resolution</span>
              </div>
            </div>
            <div style={{ borderRadius: 24, padding: 18, background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "#bfece2" }}>Judge hook</div>
                  <strong style={{ display: "block", marginTop: 8, fontSize: 28 }}>The app feels busy on first load</strong>
                </div>
                <ArrowUpRight size={24} />
              </div>
              <p style={{ margin: "12px 0 0", color: "rgba(247, 245, 240, 0.76)", lineHeight: 1.6 }}>
                Every key page ships with realistic rows, stock signals, purchase orders, and movement history so the product reads like a live system.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid-cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", marginTop: 18 }}>
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
                <h3 style={{ margin: 0 }}>{card.title}</h3>
                <p style={{ margin: "8px 0 0", color: "var(--muted)", lineHeight: 1.6 }}>{card.body}</p>
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