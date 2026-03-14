import { PageHeader } from "@/components/shared/page-header";
import { signupAction } from "@/app/(auth)/actions";

type SignupPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <PageHeader
          eyebrow="Auth"
          title="Create workspace"
          description="This provisions a Supabase user, organization, owner role, and owner profile."
        />
        {params.error ? <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{params.error}</p> : null}
        <form className="auth-form" action={signupAction}>
          <input className="auth-input" name="organizationName" placeholder="Organization name" required />
          <input className="auth-input" name="email" placeholder="Work email" type="email" required />
          <input className="auth-input" name="password" placeholder="Password" type="password" minLength={6} required />
          <button className="button-primary" type="submit">Create account</button>
        </form>
      </div>
    </main>
  );
}