import type { Route } from "next";
import { ModulePage } from "@/components/shared/module-page";
import { getCustomersData } from "@/lib/repositories/ops";

type CustomersPageProps = {
  searchParams?: Promise<{ created?: string }>;
};

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const params = (await searchParams) ?? {};
  const customers = await getCustomersData();

  return (
    <div className="grid gap-5">
      {params.created ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {params.created} created successfully and is now available in order entry.
        </div>
      ) : null}
      <ModulePage
        eyebrow="Revenue"
        title="Customers"
        description="Customers anchor the sales side of Nixventoree so teams can create orders against real buyers and track repeat demand."
        primaryAction="Add customer"
        primaryActionHref={"/customers/new" as Route}
        secondaryAction="Create order"
        secondaryActionHref={"/orders/new" as Route}
        rows={customers}
        columns={[
          { key: "name", label: "Customer" },
          { key: "company", label: "Company" },
          { key: "email", label: "Email" },
          { key: "orders", label: "Orders" },
          { key: "status", label: "Status", isStatus: true }
        ]}
        notes={[
          "Customers should be tenant-scoped just like products, orders, and suppliers.",
          "A lightweight CRM view is enough as long as order entry stays frictionless.",
          "The strongest demo move is creating a customer here and immediately using them in a new order."
        ]}
      />
    </div>
  );
}


