const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"] as const;

export function getPublicSupabaseEnv() {
  const values = Object.fromEntries(requiredVars.map((key) => [key, process.env[key]])) as Record<
    (typeof requiredVars)[number],
    string | undefined
  >;

  return {
    url: values.NEXT_PUBLIC_SUPABASE_URL ?? "",
    anonKey: values.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  };
}
