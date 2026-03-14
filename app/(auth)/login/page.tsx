import { PageHeader } from "@/components/shared/page-header";

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <div className="auth-card">
        <PageHeader eyebrow="Auth" title="Sign in" description="Wire this form to Supabase Auth email magic links or password auth." />
        <div className="auth-form">
          <input className="auth-input" placeholder="Work email" />
          <input className="auth-input" placeholder="Password" type="password" />
          <button className="button-primary" type="button">Sign in</button>
        </div>
      </div>
    </main>
  );
}