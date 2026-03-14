import { PageHeader } from "@/components/shared/page-header";

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 16,
  border: "1px solid var(--border)",
  padding: "14px 16px",
  background: "#fff"
};

export default function LoginPage() {
  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
        <PageHeader eyebrow="Auth" title="Sign in" description="Wire this form to Supabase Auth email magic links or password auth." />
        <div style={{ display: "grid", gap: 12 }}>
          <input placeholder="Work email" style={inputStyle} />
          <input placeholder="Password" type="password" style={inputStyle} />
          <button className="button-primary" style={{ border: 0 }}>Sign in</button>
        </div>
      </div>
    </main>
  );
}
