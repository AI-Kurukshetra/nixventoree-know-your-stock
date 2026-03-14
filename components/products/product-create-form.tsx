"use client";

import { useActionState } from "react";
import { createProductAction } from "@/app/(app)/products/actions";
import { initialProductState, type ProductActionState } from "@/app/(app)/products/action-state";

type Option = { id: string; label: string };

type ProductCreateFormProps = {
  categories: Option[];
  suppliers: Option[];
  warehouses: Option[];
};

export function ProductCreateForm({ categories, suppliers, warehouses }: ProductCreateFormProps) {
  const [state, formAction, pending] = useActionState<ProductActionState, FormData>(createProductAction, initialProductState);

  return (
    <form action={formAction} className="surface grid gap-4 p-5">
      <div>
        <div className="eyebrow">Real mutation</div>
        <h2 className="mt-2 text-[1.6rem] leading-none">Create product</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This creates a real product and base variant in Supabase for the signed-in organization.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Product name
          <input className="auth-input" name="name" required placeholder="Trail Bottle 32oz" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          SKU
          <input className="auth-input" name="sku" required placeholder="NX-BTL-32-SGE" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Category
          <select className="auth-input" name="categoryId" required defaultValue="">
            <option value="" disabled>Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Preferred supplier
          <select className="auth-input" name="supplierId" defaultValue="">
            <option value="">None</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>{supplier.label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Sale price
          <input className="auth-input" name="salePrice" type="number" min="0" step="0.01" placeholder="39.00" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Cost price
          <input className="auth-input" name="costPrice" type="number" min="0" step="0.01" placeholder="12.50" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Reorder point
          <input className="auth-input" name="reorderPoint" type="number" min="0" step="1" placeholder="45" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Reorder quantity
          <input className="auth-input" name="reorderQuantity" type="number" min="0" step="1" placeholder="140" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Initial stock
          <input className="auth-input" name="initialStock" type="number" min="0" step="1" placeholder="0" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Stock warehouse
          <select className="auth-input" name="warehouseId" defaultValue="">
            <option value="">Leave unstocked</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>{warehouse.label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700 md:col-span-2">
          Brand
          <input className="auth-input" name="brand" placeholder="Nixventoree Goods" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700 md:col-span-2">
          Description
          <textarea className="auth-input min-h-[110px]" name="description" placeholder="A premium insulated bottle for all-day carry." />
        </label>
      </div>

      {state.status !== "idle" ? (
        <div className={state.status === "success" ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create product"}
        </button>
      </div>
    </form>
  );
}
