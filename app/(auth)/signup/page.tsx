import { PageHeader } from "@/components/shared/page-header";

const inputStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 16,
  border: "1px solid var(--border)",
  padding: "14px 16px",
  background: "#fff"
};

export default function SignupPage() {
  return (
    <main style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
        <PageHeader
          eyebrow="Auth"
          title="Create workspace"
          description="Organization creation should provision the first tenant and attach the signed-in user as owner."
        />
        <div style={{ display: "grid", gap: 12 }}>
          <input placeholder="Organization name" style={inputStyle} />
          <input placeholder="Work email" style={inputStyle} />
          <input placeholder="Password" type="password" style={inputStyle} />
          <button className="button-primary" style={{ border: 0 }}>Create account</button>
        </div>
      </div>
    </main>
  );
}
