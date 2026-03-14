import { PurchaseOrderForm } from "@/components/purchase-orders/purchase-order-form";
import { ModulePage } from "@/components/shared/module-page";
import { receivePurchaseOrderAction, sendPurchaseOrderAction } from "./actions";
import { getPurchaseOrderFormOptions, getPurchaseOrdersData } from "@/lib/repositories/ops";

type PurchaseOrdersPageProps = {
  searchParams?: Promise<{ created?: string; sent?: string; received?: string; error?: string }>;
};

export default async function PurchaseOrdersPage({ searchParams }: PurchaseOrdersPageProps) {
  const params = (await searchParams) ?? {};
  const [purchaseOrders, formOptions] = await Promise.all([
    getPurchaseOrdersData(),
    getPurchaseOrderFormOptions()
  ]);
  const draftPurchaseOrders = purchaseOrders.filter((purchaseOrder) => purchaseOrder.status === "Draft");
  const sentPurchaseOrders = purchaseOrders.filter((purchaseOrder) => purchaseOrder.status === "Sent");

  return (
    <div className="grid gap-5">
      {params.created ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {params.created} created with a real product line item and added to the live purchase order queue.
        </div>
      ) : null}
      {params.sent ? (
        <div className="rounded-[24px] border border-sky-200 bg-sky-50 px-5 py-4 text-sm font-semibold text-sky-900">
          {params.sent} moved from Draft to Sent.
        </div>
      ) : null}
      {params.received ? (
        <div className="rounded-[24px] border border-teal-200 bg-teal-50 px-5 py-4 text-sm font-semibold text-teal-900">
          {params.received} received successfully. Inventory and movement history were updated.
        </div>
      ) : null}
      {params.error ? (
        <div className="rounded-[24px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {params.error}
        </div>
      ) : null}

      <PurchaseOrderForm suppliers={formOptions.suppliers} warehouses={formOptions.warehouses} variants={formOptions.variants} />

      {draftPurchaseOrders.length > 0 ? (
        <section className="surface p-5">
          <div className="surface-header">
            <h2 className="surface-title">Draft purchase orders</h2>
            <p className="surface-subtitle">Promote drafts into a sent state so buyers can move replenishment into execution.</p>
          </div>
          <div className="grid gap-3">
            {draftPurchaseOrders.map((purchaseOrder) => (
              <div key={purchaseOrder.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-stone-900/8 bg-white/65 p-4">
                <div>
                  <div className="text-sm font-bold text-stone-900">{purchaseOrder.number}</div>
                  <div className="mt-1 text-sm text-stone-600">{purchaseOrder.supplier} to {purchaseOrder.warehouse}</div>
                </div>
                <form action={sendPurchaseOrderAction}>
                  <input type="hidden" name="purchaseOrderId" value={purchaseOrder.id} />
                  <button className="button-primary" type="submit">Send PO</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {sentPurchaseOrders.length > 0 ? (
        <section className="surface p-5">
          <div className="surface-header">
            <h2 className="surface-title">Sent purchase orders</h2>
            <p className="surface-subtitle">Receive supplier shipments back into inventory to complete the replenishment loop.</p>
          </div>
          <div className="grid gap-3">
            {sentPurchaseOrders.map((purchaseOrder) => (
              <div key={purchaseOrder.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-stone-900/8 bg-white/65 p-4">
                <div>
                  <div className="text-sm font-bold text-stone-900">{purchaseOrder.number}</div>
                  <div className="mt-1 text-sm text-stone-600">{purchaseOrder.supplier} to {purchaseOrder.warehouse}</div>
                </div>
                <form action={receivePurchaseOrderAction}>
                  <input type="hidden" name="purchaseOrderId" value={purchaseOrder.id} />
                  <button className="button-primary" type="submit">Receive PO</button>
                </form>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <ModulePage
        eyebrow="Purchasing"
        title="Purchase Orders"
        description="Create replenishment orders from low-stock signals and receive them back into inventory."
        primaryAction="New purchase order"
        secondaryAction="Generate from reorder alerts"
        rows={purchaseOrders}
        columns={[
          { key: "number", label: "PO" },
          { key: "supplier", label: "Supplier" },
          { key: "warehouse", label: "Warehouse" },
          { key: "status", label: "Status", isStatus: true },
          { key: "expectedAt", label: "Expected" }
        ]}
        notes={[
          "Purchase orders now start with a real variant line item instead of only header metadata.",
          "Sent purchase orders can now be received into inventory, which updates on-hand stock and movement history.",
          "The next logical step after Receive is partial receiving, discrepancy handling, and PO detail views."
        ]}
      />
    </div>
  );
}

