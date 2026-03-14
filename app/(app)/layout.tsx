import { AppShell, type SidebarUser } from "@/components/app-shell/app-shell";
import { hasPublicSupabaseEnv } from "@/lib/db/env";
import { createClient } from "@/lib/supabase/server";

async function getSidebarUser(): Promise<SidebarUser | null> {
  if (!hasPublicSupabaseEnv()) {
    return null;
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, organization_id, role_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return {
      name: user.email?.split("@")[0] ?? "Operator",
      email: user.email ?? "",
      role: "Authenticated user",
      organization: "Nixventoree workspace"
    };
  }

  const [organizationResult, roleResult] = await Promise.all([
    profile.organization_id
      ? supabase.from("organizations").select("name").eq("id", profile.organization_id).maybeSingle()
      : Promise.resolve({ data: null }),
    profile.role_id ? supabase.from("roles").select("name").eq("id", profile.role_id).maybeSingle() : Promise.resolve({ data: null })
  ]);

  return {
    name: profile.full_name || user.email?.split("@")[0] || "Operator",
    email: profile.email || user.email || "",
    role: roleResult.data?.name ?? "Authenticated user",
    organization: organizationResult.data?.name ?? "Nixventoree workspace"
  };
}

export default async function AuthenticatedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarUser = await getSidebarUser();

  return <AppShell user={sidebarUser}>{children}</AppShell>;
}
