"use client";

import { useActionState, useState } from "react";
import { createPurchaseOrderAction } from "@/app/(app)/purchase-orders/actions";
import {
  initialPurchaseOrderState,
  type PurchaseOrderActionState
} from "@/app/(app)/purchase-orders/action-state";

type Option = { id: string; label: string };
type VariantOption = {
  id: string;
  label: string;
  defaultCost: number;
  supplierId: string | null;
};

type PurchaseOrderFormProps = {
  suppliers: Option[];
  warehouses: Option[];
  variants: VariantOption[];
};

export function PurchaseOrderForm({ suppliers, warehouses, variants }: PurchaseOrderFormProps) {
  const [state, formAction, pending] = useActionState<PurchaseOrderActionState, FormData>(
    createPurchaseOrderAction,
    initialPurchaseOrderState
  );
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id ?? "");
  const [selectedSupplierId, setSelectedSupplierId] = useState(variants[0]?.supplierId ?? "");
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(variants[0]?.defaultCost ?? 0);

  const computedTotal = Number.isFinite(quantity * unitCost) ? quantity * unitCost : 0;

  function handleVariantChange(variantId: string) {
    setSelectedVariantId(variantId);
    const selectedVariant = variants.find((variant) => variant.id === variantId);

    if (!selectedVariant) {
      return;
    }

    setUnitCost(selectedVariant.defaultCost || 0);

    if (!selectedSupplierId && selectedVariant.supplierId) {
      setSelectedSupplierId(selectedVariant.supplierId);
    }
  }

  return (
    <form action={formAction} className="surface grid gap-4 p-5">
      <div>
        <div className="eyebrow">Real mutation</div>
        <h2 className="mt-2 text-[1.6rem] leading-none">Create purchase order</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This writes a real draft purchase order and one line item into Supabase for the signed-in organization.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700 sm:col-span-2">
          Product / variant
          <select
            className="auth-input"
            name="variantId"
            required
            value={selectedVariantId}
            onChange={(event) => handleVariantChange(event.target.value)}
          >
            <option value="" disabled>Select product variant</option>
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id}>{variant.label}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Supplier
          <select
            className="auth-input"
            name="supplierId"
            required
            value={selectedSupplierId}
            onChange={(event) => setSelectedSupplierId(event.target.value)}
          >
            <option value="" disabled>Select supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>{supplier.label}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Warehouse
          <select className="auth-input" name="warehouseId" required defaultValue="">
            <option value="" disabled>Select warehouse</option>
            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>{warehouse.label}</option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Quantity
          <input
            className="auth-input"
            name="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value || 1))}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Unit cost
          <input
            className="auth-input"
            name="unitCost"
            type="number"
            min="0"
            step="0.01"
            value={unitCost}
            onChange={(event) => setUnitCost(Number(event.target.value || 0))}
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Expected date
          <input className="auth-input" name="expectedAt" type="date" />
        </label>

        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Estimated total
          <input className="auth-input" name="totalAmount" type="number" value={computedTotal.toFixed(2)} readOnly />
        </label>
      </div>

      {state.status !== "idle" ? (
        <div className={state.status === "success" ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create draft PO"}
        </button>
      </div>
    </form>
  );
}
