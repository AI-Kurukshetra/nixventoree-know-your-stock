"use client";

import { useActionState, useState } from "react";
import { createOrderAction } from "@/app/(app)/orders/actions";
import { initialOrderState, type OrderActionState } from "@/app/(app)/orders/action-state";

type Option = { id: string; label: string };
type VariantOption = { id: string; label: string; defaultPrice: number };

type OrderCreateFormProps = {
  customers: Option[];
  variants: VariantOption[];
};

export function OrderCreateForm({ customers, variants }: OrderCreateFormProps) {
  const [state, formAction, pending] = useActionState<OrderActionState, FormData>(createOrderAction, initialOrderState);
  const initialVariantId = state.values.variantId || variants[0]?.id || "";
  const [selectedVariantId, setSelectedVariantId] = useState(initialVariantId);
  const [unitPrice, setUnitPrice] = useState(state.values.unitPrice || String(variants.find((variant) => variant.id === initialVariantId)?.defaultPrice ?? ""));
  const [quantity, setQuantity] = useState(state.values.quantity || "1");

  function handleVariantChange(variantId: string) {
    setSelectedVariantId(variantId);
    const selectedVariant = variants.find((variant) => variant.id === variantId);
    setUnitPrice(String(selectedVariant?.defaultPrice ?? ""));
  }

  const total = (Number(quantity || 0) * Number(unitPrice || 0)).toFixed(2);

  return (
    <form action={formAction} className="surface grid gap-4 p-5">
      <div>
        <div className="eyebrow">Real mutation</div>
        <h2 className="mt-2 text-[1.6rem] leading-none">Create order</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          This creates a real sales order and one line item for the signed-in organization.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Customer
          <select className="auth-input" name="customerId" required defaultValue={state.values.customerId}>
            <option value="" disabled>Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>{customer.label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Channel
          <select className="auth-input" name="channel" defaultValue={state.values.channel || "manual"}>
            <option value="manual">Manual</option>
            <option value="shopify">Shopify</option>
            <option value="amazon">Amazon</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700 md:col-span-2">
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
          Quantity
          <input
            className="auth-input"
            name="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Unit price
          <input
            className="auth-input"
            name="unitPrice"
            type="number"
            min="0"
            step="0.01"
            value={unitPrice}
            onChange={(event) => setUnitPrice(event.target.value)}
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700 md:col-span-2">
          Order total
          <input className="auth-input" type="number" value={total} readOnly />
        </label>
      </div>

      {state.status !== "idle" ? (
        <div className={state.status === "success" ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create order"}
        </button>
      </div>
    </form>
  );
}
