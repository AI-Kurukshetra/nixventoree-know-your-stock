"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";
import type { CustomerActionState } from "./action-state";

export async function createCustomerAction(
  _prevState: CustomerActionState,
  formData: FormData
): Promise<CustomerActionState> {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return { status: "error", message: "Configure Supabase public and service-role environment variables before creating customers." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();

  if (!name) {
    return { status: "error", message: "Customer name is required." };
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in to create a customer." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { status: "error", message: profileError?.message ?? "Could not resolve your organization." };
  }

  const insertResult = await admin.from("customers").insert({
    organization_id: profile.organization_id,
    name,
    email: email || null,
    phone: phone || null,
    company_name: companyName || null
  });

  if (insertResult.error) {
    return { status: "error", message: insertResult.error.message };
  }

  revalidatePath("/customers");
  revalidatePath("/orders");
  revalidatePath("/orders/new");
  redirect((`/customers?created=${encodeURIComponent(name)}`) as never);
}

