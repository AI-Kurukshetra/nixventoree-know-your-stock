import { PageHeader } from "@/components/shared/page-header";
import { loginAction } from "@/app/(auth)/actions";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <main className="auth-shell">
      <div className="auth-card">
        <PageHeader eyebrow="Auth" title="Sign in" description="Use Supabase Auth credentials to access the Nixventoree workspace." />
        {params.error ? <p className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{params.error}</p> : null}
        <form className="auth-form" action={loginAction}>
          <input type="hidden" name="next" value={params.next ?? "/dashboard"} />
          <input className="auth-input" name="email" placeholder="Work email" type="email" required />
          <input className="auth-input" name="password" placeholder="Password" type="password" required />
          <button className="button-primary" type="submit">Sign in</button>
        </form>
      </div>
    </main>
  );
}