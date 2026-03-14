"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";
import type { SupplierActionState } from "./action-state";

export async function createSupplierAction(
  _prevState: SupplierActionState,
  formData: FormData
): Promise<SupplierActionState> {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return { status: "error", message: "Configure Supabase public and service-role environment variables before creating suppliers." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const leadTimeDays = Number(formData.get("leadTimeDays") ?? 7);
  const minimumOrderValue = Number(formData.get("minimumOrderValue") ?? 0);
  const currency = String(formData.get("currency") ?? "USD").trim().toUpperCase() || "USD";
  const status = String(formData.get("status") ?? "active").trim() || "active";

  if (!name) {
    return { status: "error", message: "Supplier name is required." };
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in to create a supplier." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { status: "error", message: profileError?.message ?? "Could not resolve your organization." };
  }

  const insertResult = await admin.from("suppliers").insert({
    organization_id: profile.organization_id,
    name,
    email: email || null,
    phone: phone || null,
    lead_time_days: Number.isFinite(leadTimeDays) ? leadTimeDays : 7,
    minimum_order_value: Number.isFinite(minimumOrderValue) ? minimumOrderValue : 0,
    currency,
    status
  });

  if (insertResult.error) {
    return { status: "error", message: insertResult.error.message };
  }

  revalidatePath("/suppliers");
  revalidatePath("/purchase-orders");
  redirect(`/suppliers?created=${encodeURIComponent(name)}`);
}
