"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";
import type { PurchaseOrderActionState } from "./action-state";

export async function createPurchaseOrderAction(
  _prevState: PurchaseOrderActionState,
  formData: FormData
): Promise<PurchaseOrderActionState> {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return {
      status: "error",
      message: "Configure Supabase public and service-role environment variables before creating purchase orders."
    };
  }

  const supplierId = String(formData.get("supplierId") ?? "").trim();
  const warehouseId = String(formData.get("warehouseId") ?? "").trim();
  const variantId = String(formData.get("variantId") ?? "").trim();
  const expectedAt = String(formData.get("expectedAt") ?? "").trim();
  const quantity = Number(formData.get("quantity") ?? 0);
  const unitCost = Number(formData.get("unitCost") ?? 0);
  const totalAmount = Number(formData.get("totalAmount") ?? 0);

  if (!supplierId || !warehouseId || !variantId) {
    return {
      status: "error",
      message: "Supplier, warehouse, and product variant are required."
    };
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return {
      status: "error",
      message: "Quantity must be greater than zero."
    };
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      message: "You must be signed in to create a purchase order."
    };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return {
      status: "error",
      message: profileError?.message ?? "Could not resolve your organization."
    };
  }

  const { count, error: countError } = await admin
    .from("purchase_orders")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", profile.organization_id);

  if (countError) {
    return {
      status: "error",
      message: countError.message
    };
  }

  const poNumber = `PO-${2000 + (count ?? 0) + 1}`;

  const { data: purchaseOrder, error: purchaseOrderError } = await admin
    .from("purchase_orders")
    .insert({
      organization_id: profile.organization_id,
      supplier_id: supplierId,
      warehouse_id: warehouseId,
      po_number: poNumber,
      status: "draft",
      expected_at: expectedAt || null,
      total_amount: Number.isFinite(totalAmount) ? totalAmount : Number(quantity) * Number(unitCost)
    })
    .select("id")
    .single();

  if (purchaseOrderError || !purchaseOrder) {
    return {
      status: "error",
      message: purchaseOrderError?.message ?? "Could not create purchase order."
    };
  }

  const { error: itemError } = await admin.from("purchase_order_items").insert({
    organization_id: profile.organization_id,
    purchase_order_id: purchaseOrder.id,
    variant_id: variantId,
    quantity,
    unit_cost: Number.isFinite(unitCost) ? unitCost : 0,
    received_quantity: 0
  });

  if (itemError) {
    await admin.from("purchase_orders").delete().eq("id", purchaseOrder.id);
    return {
      status: "error",
      message: itemError.message.includes("purchase_order_items")
        ? "Run TEMP_PURCHASE_ORDER_ITEMS.sql in Supabase SQL Editor, then try again."
        : itemError.message
    };
  }

  revalidatePath("/purchase-orders");
  revalidatePath("/dashboard");
  redirect(`/purchase-orders?created=${encodeURIComponent(poNumber)}`);
}

export async function sendPurchaseOrderAction(formData: FormData) {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    redirect("/purchase-orders?error=Supabase%20environment%20variables%20are%20missing");
  }

  const purchaseOrderId = String(formData.get("purchaseOrderId") ?? "").trim();

  if (!purchaseOrderId) {
    redirect("/purchase-orders?error=Missing%20purchase%20order%20id");
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/purchase-orders?error=Could%20not%20resolve%20your%20organization");
  }

  const { data: purchaseOrder, error: purchaseOrderError } = await admin
    .from("purchase_orders")
    .select("id, po_number, status")
    .eq("id", purchaseOrderId)
    .eq("organization_id", profile.organization_id)
    .single();

  if (purchaseOrderError || !purchaseOrder) {
    redirect("/purchase-orders?error=Could%20not%20find%20that%20purchase%20order");
  }

  const { error } = await admin
    .from("purchase_orders")
    .update({ status: "sent" })
    .eq("id", purchaseOrder.id)
    .eq("organization_id", profile.organization_id);

  if (error) {
    redirect(`/purchase-orders?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/purchase-orders");
  revalidatePath("/dashboard");
  redirect(`/purchase-orders?sent=${encodeURIComponent(purchaseOrder.po_number)}`);
}
