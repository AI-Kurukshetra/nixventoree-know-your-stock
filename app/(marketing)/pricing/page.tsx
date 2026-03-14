const tiers = [
  { name: "Starter", price: "$79", description: "For small operators consolidating inventory and order workflows." },
  { name: "Growth", price: "$199", description: "Adds multi-warehouse coordination, purchasing flows, and richer reporting." },
  { name: "Scale", price: "Custom", description: "For teams that need integrations, advanced permissions, and larger order volume." }
];

export default function PricingPage() {
  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <div className="eyebrow">Pricing</div>
      <h1 style={{ fontSize: 56, margin: "12px 0" }}>Simple SaaS packaging for the MVP.</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {tiers.map((tier) => (
          <article key={tier.name} className="surface" style={{ borderRadius: 28, padding: 24 }}>
            <div className="eyebrow">{tier.name}</div>
            <div style={{ fontSize: 42, fontWeight: 800, marginTop: 16 }}>{tier.price}</div>
            <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>{tier.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
