"use client";

import { useActionState } from "react";
import { createSupplierAction } from "@/app/(app)/suppliers/actions";
import { initialSupplierState, type SupplierActionState } from "@/app/(app)/suppliers/action-state";

export function SupplierCreateForm() {
  const [state, formAction, pending] = useActionState<SupplierActionState, FormData>(createSupplierAction, initialSupplierState);

  return (
    <form action={formAction} className="surface grid gap-4 p-5">
      <div>
        <div className="eyebrow">Real mutation</div>
        <h2 className="mt-2 text-[1.6rem] leading-none">Add supplier</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Create a real supplier record for the signed-in organization so it can be used in purchasing flows.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Supplier name
          <input className="auth-input" name="name" required placeholder="Summit Supply Co" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Email
          <input className="auth-input" name="email" type="email" placeholder="ops@supplier.demo" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Phone
          <input className="auth-input" name="phone" placeholder="+1 555 012 4321" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Lead time (days)
          <input className="auth-input" name="leadTimeDays" type="number" min="0" step="1" defaultValue="7" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Minimum order value
          <input className="auth-input" name="minimumOrderValue" type="number" min="0" step="0.01" defaultValue="0" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Currency
          <input className="auth-input" name="currency" maxLength={3} defaultValue="USD" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700 md:col-span-2">
          Status
          <select className="auth-input" name="status" defaultValue="active">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>

      {state.status !== "idle" ? (
        <div className={state.status === "success" ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create supplier"}
        </button>
      </div>
    </form>
  );
}
