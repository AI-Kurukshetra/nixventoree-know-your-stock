"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";
import type { OrderActionState, OrderFormValues } from "./action-state";

function buildValues(formData: FormData): OrderFormValues {
  return {
    customerId: String(formData.get("customerId") ?? "").trim(),
    variantId: String(formData.get("variantId") ?? "").trim(),
    channel: String(formData.get("channel") ?? "manual").trim() || "manual",
    quantity: String(formData.get("quantity") ?? "1").trim(),
    unitPrice: String(formData.get("unitPrice") ?? "").trim()
  };
}

export async function createOrderAction(
  _prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  const values = buildValues(formData);

  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return { status: "error", message: "Configure Supabase public and service-role environment variables before creating orders.", values };
  }

  const quantity = Number(values.quantity || 0);
  const unitPrice = Number(values.unitPrice || 0);

  if (!values.customerId || !values.variantId) {
    return { status: "error", message: "Customer and product variant are required.", values };
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return { status: "error", message: "Quantity must be greater than zero.", values };
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in to create an order.", values };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { status: "error", message: profileError?.message ?? "Could not resolve your organization.", values };
  }

  const countResult = await admin
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", profile.organization_id);

  if (countResult.error) {
    return { status: "error", message: countResult.error.message, values };
  }

  const orderNumber = `SO-${10480 + (countResult.count ?? 0) + 1}`;

  const orderResult = await admin
    .from("orders")
    .insert({
      organization_id: profile.organization_id,
      customer_id: values.customerId,
      order_number: orderNumber,
      channel: values.channel,
      status: "pending",
      fulfillment_status: "unfulfilled",
      total_amount: Number.isFinite(unitPrice * quantity) ? unitPrice * quantity : 0
    })
    .select("id")
    .single();

  if (orderResult.error || !orderResult.data) {
    return { status: "error", message: orderResult.error?.message ?? "Could not create order.", values };
  }

  const orderItemResult = await admin.from("order_items").insert({
    organization_id: profile.organization_id,
    order_id: orderResult.data.id,
    variant_id: values.variantId,
    quantity,
    unit_price: Number.isFinite(unitPrice) ? unitPrice : 0,
    allocated_quantity: 0,
    fulfilled_quantity: 0
  });

  if (orderItemResult.error) {
    await admin.from("orders").delete().eq("id", orderResult.data.id);
    return { status: "error", message: orderItemResult.error.message, values };
  }

  revalidatePath("/orders");
  revalidatePath("/dashboard");
  redirect(`/orders?created=${encodeURIComponent(orderNumber)}`);
}
