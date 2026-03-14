"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server";
import { hasPublicSupabaseEnv, hasServiceRoleEnv } from "@/lib/db/env";
import type { ProductActionState } from "./action-state";

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "product";
}

export async function createProductAction(
  _prevState: ProductActionState,
  formData: FormData
): Promise<ProductActionState> {
  if (!hasPublicSupabaseEnv() || !hasServiceRoleEnv()) {
    return { status: "error", message: "Configure Supabase public and service-role environment variables before creating products." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim().toUpperCase();
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  const supplierId = String(formData.get("supplierId") ?? "").trim();
  const warehouseId = String(formData.get("warehouseId") ?? "").trim();
  const salePrice = Number(formData.get("salePrice") ?? 0);
  const costPrice = Number(formData.get("costPrice") ?? 0);
  const reorderPoint = Number(formData.get("reorderPoint") ?? 0);
  const reorderQuantity = Number(formData.get("reorderQuantity") ?? 0);
  const initialStock = Number(formData.get("initialStock") ?? 0);
  const brand = String(formData.get("brand") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name || !sku || !categoryId) {
    return { status: "error", message: "Name, SKU, and category are required." };
  }

  if (initialStock > 0 && !warehouseId) {
    return { status: "error", message: "Choose a warehouse when assigning initial stock." };
  }

  const supabase = await createServerSupabaseClient();
  const admin = createAdminClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "error", message: "You must be signed in to create a product." };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return { status: "error", message: profileError?.message ?? "Could not resolve your organization." };
  }

  const slug = slugify(name);

  const { data: product, error: productError } = await admin
    .from("products")
    .insert({
      organization_id: profile.organization_id,
      category_id: categoryId,
      sku,
      name,
      slug,
      description: description || null,
      brand: brand || null,
      status: "active",
      track_inventory: true,
      is_bundle: false
    })
    .select("id")
    .single();

  if (productError || !product) {
    return { status: "error", message: productError?.message ?? "Could not create product." };
  }

  const { data: variant, error: variantError } = await admin
    .from("product_variants")
    .insert({
      organization_id: profile.organization_id,
      product_id: product.id,
      preferred_supplier_id: supplierId || null,
      sku,
      cost_price: Number.isFinite(costPrice) ? costPrice : 0,
      sale_price: Number.isFinite(salePrice) ? salePrice : 0,
      reorder_point: Number.isFinite(reorderPoint) ? reorderPoint : 0,
      reorder_quantity: Number.isFinite(reorderQuantity) ? reorderQuantity : 0
    })
    .select("id")
    .single();

  if (variantError || !variant) {
    return { status: "error", message: variantError?.message ?? "Could not create product variant." };
  }

  if (initialStock > 0 && warehouseId) {
    const { error: inventoryError } = await admin.from("inventory_balances").insert({
      organization_id: profile.organization_id,
      variant_id: variant.id,
      warehouse_id: warehouseId,
      on_hand: Number.isFinite(initialStock) ? initialStock : 0,
      reserved: 0,
      incoming: 0
    });

    if (inventoryError) {
      return { status: "error", message: inventoryError.message };
    }
  }

  revalidatePath("/products");
  revalidatePath("/dashboard");
  revalidatePath("/inventory");
  redirect(`/products?created=${encodeURIComponent(name)}`);
}
