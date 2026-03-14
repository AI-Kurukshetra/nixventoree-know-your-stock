export default function UsersSettingsPage() {
  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Settings</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Users and roles</h1>
      <p style={{ color: "var(--muted)" }}>
        Invite users, assign roles, and map permission groups here once auth flows are connected.
      </p>
    </div>
  );
}
