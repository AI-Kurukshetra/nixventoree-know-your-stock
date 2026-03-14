const publicVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const;
const serverVars = ["SUPABASE_SERVICE_ROLE_KEY"] as const;

export function getPublicSupabaseEnv() {
  const values = Object.fromEntries(publicVars.map((key) => [key, process.env[key]])) as Record<
    (typeof publicVars)[number],
    string | undefined
  >;

  return {
    url: values.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: values.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  };
}

export function getServerSupabaseEnv() {
  return {
    ...getPublicSupabaseEnv(),
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  };
}

export function hasPublicSupabaseEnv() {
  const { url, anonKey } = getPublicSupabaseEnv();

  return Boolean(url && anonKey);
}

export function hasServiceRoleEnv() {
  const { url, anonKey, serviceRoleKey } = getServerSupabaseEnv();

  return Boolean(url && anonKey && serviceRoleKey);
}