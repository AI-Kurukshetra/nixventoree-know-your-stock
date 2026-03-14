import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function ForgotPasswordPage() {
  return (
    <main className="auth-shell">
      <PlaceholderPage
        eyebrow="Auth"
        title="Reset password"
        description="Send a Supabase password reset link from here once auth flows are connected."
      />
    </main>
  );
}