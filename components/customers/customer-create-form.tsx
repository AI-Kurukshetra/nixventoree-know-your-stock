"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createCustomerAction } from "@/app/(app)/customers/actions";
import { initialCustomerState, type CustomerActionState } from "@/app/(app)/customers/action-state";

export function CustomerCreateForm() {
  const [state, formAction, pending] = useActionState<CustomerActionState, FormData>(createCustomerAction, initialCustomerState);

  return (
    <form action={formAction} className="surface grid gap-4 p-5">
      <div>
        <div className="eyebrow">Revenue side</div>
        <h2 className="mt-2 text-[1.6rem] leading-none">Add customer</h2>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          Create a customer record so sales orders can be captured without leaving the operations workspace.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Customer name
          <input className="auth-input" name="name" required placeholder="Harbor Goods" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Company
          <input className="auth-input" name="companyName" placeholder="Harbor Goods LLC" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Email
          <input className="auth-input" name="email" type="email" placeholder="buying@harborgoods.demo" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-stone-700">
          Phone
          <input className="auth-input" name="phone" placeholder="+1 555 014 7788" />
        </label>
      </div>

      <div className="rounded-[24px] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-600">
        Customers created here will appear immediately in the Orders form for the current organization.
      </div>

      {state.status !== "idle" ? (
        <div className={state.status === "success" ? "rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" : "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"}>
          {state.message}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button className="button-primary" type="submit" disabled={pending}>
          {pending ? "Creating..." : "Create customer"}
        </button>
        <Link className="button-secondary" href="/orders/new">
          Back to order entry
        </Link>
      </div>
    </form>
  );
}

