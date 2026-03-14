import { ModulePage } from "@/components/shared/module-page";
import { purchaseOrders } from "@/lib/demo-data";

export default function PurchaseOrdersPage() {
  return (
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
        "Receiving must write movements and increment incoming to on-hand cleanly.",
        "Lead time and reorder quantity belong on the variant and supplier mapping.",
        "This is one of the most demo-friendly workflows because it closes the stock loop."
      ]}
    />
  );
}
