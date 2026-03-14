import { createClient } from "@supabase/supabase-js";
import { getServerSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";

export function createAdminClient() {
  const { url, serviceRoleKey } = getServerSupabaseEnv();

  if (!hasServiceRoleEnv()) {
    throw new Error("Missing Supabase service role environment variables.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}