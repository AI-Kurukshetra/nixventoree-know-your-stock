import type { Route } from "next";
import { ModulePage } from "@/components/shared/module-page";
import { getOrdersData } from "@/lib/repositories/ops";

type OrdersPageProps = {
  searchParams?: Promise<{ created?: string }>;
};

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = (await searchParams) ?? {};
  const orders = await getOrdersData();

  return (
    <div className="grid gap-5">
      {params.created ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {params.created} created successfully and added to the live order queue.
        </div>
      ) : null}
      <ModulePage
        eyebrow="Fulfillment"
        title="Orders"
        description="Orders centralize channel demand and drive reservation, picking, packing, and shipping."
        primaryAction="Create order"
        primaryActionHref={"/orders/new" as Route}
        secondaryAction="Add customer"
        secondaryActionHref={"/customers/new" as Route}
        rows={orders}
        columns={[
          { key: "number", label: "Order" },
          { key: "customer", label: "Customer" },
          { key: "channel", label: "Channel" },
          { key: "status", label: "Status", isStatus: true },
          { key: "total", label: "Total" }
        ]}
        notes={[
          "Orders need a real customer record, so the Add customer shortcut feeds straight back into this workflow.",
          "Use order detail for shipment events and customer comms.",
          "Allocation logic should reserve by warehouse and location, not just by global SKU."
        ]}
      />
    </div>
  );
}

