import { reportCards } from "@/lib/demo-data";

export default function InventoryReportPage() {
  return (
    <div>
      <div className="eyebrow">Reports</div>
      <h1 style={{ margin: "10px 0 18px", fontSize: 42 }}>Inventory report</h1>
      <div className="grid-cards" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {reportCards.map((card) => (
          <article key={card.title} className="surface" style={{ borderRadius: 24, padding: 22 }}>
            <h2 style={{ margin: 0 }}>{card.title}</h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
