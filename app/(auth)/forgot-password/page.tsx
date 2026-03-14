export default function ForgotPasswordPage() {
  return (
    <main style={{ padding: 24, maxWidth: 560, margin: "0 auto" }}>
      <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
        <div className="eyebrow">Auth</div>
        <h1 style={{ margin: "12px 0", fontSize: 40 }}>Reset password</h1>
        <p style={{ color: "var(--muted)" }}>
          Send a Supabase password reset link from here once auth flows are connected.
        </p>
      </div>
    </main>
  );
}
