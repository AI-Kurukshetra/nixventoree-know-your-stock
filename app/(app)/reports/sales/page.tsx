export default function SalesReportPage() {
  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Reports</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Sales report</h1>
      <p style={{ color: "var(--muted)" }}>
        Add order throughput, channel mix, and fill-rate reporting on this route.
      </p>
    </div>
  );
}
