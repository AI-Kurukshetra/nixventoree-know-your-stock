import { PageHeader } from "@/components/shared/page-header";

export default function SignupPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <PageHeader
          eyebrow="Auth"
          title="Create workspace"
          description="Organization creation should provision the first tenant and attach the signed-in user as owner."
        />
        <div className="auth-form">
          <input className="auth-input" placeholder="Organization name" />
          <input className="auth-input" placeholder="Work email" />
          <input className="auth-input" placeholder="Password" type="password" />
          <button className="button-primary" type="button">Create account</button>
        </div>
      </div>
    </main>
  );
}