export default function IntegrationsSettingsPage() {
  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Settings</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Integrations</h1>
      <p style={{ color: "var(--muted)" }}>
        Shopify, QuickBooks, and shipping carrier connectors can be configured from this route.
      </p>
    </div>
  );
}
