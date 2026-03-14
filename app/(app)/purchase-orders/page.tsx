import { PurchaseOrderForm } from "@/components/purchase-orders/purchase-order-form";
import { ModulePage } from "@/components/shared/module-page";
import { sendPurchaseOrderAction } from "./actions";
import { getPurchaseOrderFormOptions, getPurchaseOrdersData } from "@/lib/repositories/ops";

type PurchaseOrdersPageProps = {
  searchParams?: Promise<{ created?: string; sent?: string; error?: string }>;
};

export default async function PurchaseOrdersPage({ searchParams }: PurchaseOrdersPageProps) {
  const params = (await searchParams) ?? {};
  const [purchaseOrders, formOptions] = await Promise.all([
    getPurchaseOrdersData(),
    getPurchaseOrderFormOptions()
  ]);
  const draftPurchaseOrders = purchaseOrders.filter((purchaseOrder) => purchaseOrder.status === "Draft");

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
            <p className="surface-subtitle">Promote drafts into a sent state so the purchasing workflow feels real during the demo.</p>
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
          "Lead time and reorder quantity belong on the variant and supplier mapping.",
          "The next logical step after Send is Receive, which should write inventory movements and on-hand stock."
        ]}
      />
    </div>
  );
}
