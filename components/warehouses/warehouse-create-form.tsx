"use client";

import { useActionState } from "react";
import { createWarehouseAction } from "@/app/(app)/warehouses/actions";
import { initialWarehouseState, type WarehouseActionState } from "@/app/(app)/warehouses/action-state";

export function WarehouseCreateForm() {
  const [state, formAction, pending] = useActionState<WarehouseActionState, FormData>(createWarehouseAction, initialWarehouseState);

  return (
    <form action={formAction} className="surface grid gap-4 p-5">
      <div>
        <div className="eyebrow">Real mutation</div>
        <h2 className="mt-2 text-[1.6rem] leading-none">Add warehouse</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Create a real warehouse/location node for the signed-in organization so stock and receiving can be assigned correctly.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Warehouse name
          <input className="auth-input" name="name" required placeholder="Austin Forward Hub" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Code
          <input className="auth-input" name="code" required maxLength={8} placeholder="ATX" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          City
          <input className="auth-input" name="city" placeholder="Austin" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          State / region
          <input className="auth-input" name="state" placeholder="TX" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Country
          <input className="auth-input" name="country" defaultValue="US" maxLength={2} />
        </label>
        <label className="flex items-center gap-3 rounded-[16px] border border-stone-900/10 bg-white px-4 py-3 text-sm font-semibold text-stone-700 md:self-end">
          <input name="isDefault" type="checkbox" />
          Set as default warehouse
        </label>
      </div>

      {state.status !== "idle" ? (
        <div className={state.status === "success" ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create warehouse"}
        </button>
      </div>
    </form>
  );
}
