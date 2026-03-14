export default function OrganizationSettingsPage() {
  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Settings</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Organization settings</h1>
      <p style={{ color: "var(--muted)" }}>
        Tenant profile, plan settings, currency, timezone, and branding should live here.
      </p>
    </div>
  );
}
