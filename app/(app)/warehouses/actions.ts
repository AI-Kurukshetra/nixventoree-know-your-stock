"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";
import type { WarehouseActionState } from "./action-state";

export async function createWarehouseAction(
  _prevState: WarehouseActionState,
  formData: FormData
): Promise<WarehouseActionState> {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return { status: "error", message: "Configure Supabase public and service-role environment variables before creating warehouses." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const country = String(formData.get("country") ?? "US").trim().toUpperCase() || "US";
  const isDefault = String(formData.get("isDefault") ?? "") === "on";

  if (!name || !code) {
    return { status: "error", message: "Warehouse name and code are required." };
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in to create a warehouse." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { status: "error", message: profileError?.message ?? "Could not resolve your organization." };
  }

  if (isDefault) {
    const resetDefaultResult = await admin
      .from("warehouses")
      .update({ is_default: false })
      .eq("organization_id", profile.organization_id);

    if (resetDefaultResult.error) {
      return { status: "error", message: resetDefaultResult.error.message };
    }
  }

  const insertResult = await admin.from("warehouses").insert({
    organization_id: profile.organization_id,
    name,
    code,
    city: city || null,
    state: state || null,
    country,
    is_default: isDefault
  });

  if (insertResult.error) {
    return { status: "error", message: insertResult.error.message };
  }

  revalidatePath("/warehouses");
  revalidatePath("/products/new");
  revalidatePath("/purchase-orders");
  redirect(`/warehouses?created=${encodeURIComponent(name)}`);
}
