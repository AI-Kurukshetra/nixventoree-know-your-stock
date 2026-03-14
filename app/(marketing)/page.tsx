const highlights = [
  "Multi-location inventory visibility",
  "Reorder recommendations that close the buying loop",
  "Fulfillment, purchasing, and returns in one operational shell",
  "Seeded demo workspace so the first impression feels alive"
];

export default function MarketingHomePage() {
  return (
    <main className="marketing-shell">
      <section className="marketing-hero">
        <div className="marketing-grid">
          <div>
            <div className="eyebrow" style={{ color: "#95f4e0" }}>Smart inventory and order management</div>
            <h1 style={{ fontSize: 76, lineHeight: 0.9, margin: "14px 0 18px", maxWidth: 760 }}>
              A logistics control room designed to impress in a five-minute demo.
            </h1>
            <p style={{ color: "rgba(247, 245, 240, 0.78)", maxWidth: 720, fontSize: 18, lineHeight: 1.7 }}>
              Northstar combines inventory, purchasing, fulfillment, and reporting into a visually rich, mobile-responsive product that feels populated on the first click.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <a className="button-primary" href="/dashboard">Open demo workspace</a>
              <a className="button-secondary" href="/pricing">View pricing</a>
            </div>
          </div>
          <div className="showcase-grid">
            {highlights.map((item, index) => (
              <div key={item} className="showcase-card">
                <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: index % 2 === 0 ? "#a6f7e4" : "#ffd2b1" }}>Capability</div>
                <strong style={{ display: "block", marginTop: 12, fontSize: 24 }}>{item}</strong>
                <p style={{ color: "rgba(247, 245, 240, 0.72)", lineHeight: 1.6, marginBottom: 0 }}>
                  Built for a convincing hackathon walkthrough instead of a blank admin shell.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}