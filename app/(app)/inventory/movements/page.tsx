import { ModulePage } from "@/components/shared/module-page";
import { movements } from "@/lib/demo-data";

export default function InventoryMovementsPage() {
  return (
    <ModulePage
      eyebrow="Stock"
      title="Inventory movements"
      description="Movement logs are the audit trail for receiving, allocation, returns, transfers, and adjustments."
      primaryAction="Export log"
      rows={movements}
      columns={[
        { key: "time", label: "Time" },
        { key: "sku", label: "SKU" },
        { key: "action", label: "Action" },
        { key: "quantity", label: "Quantity" },
        { key: "actor", label: "Actor" }
      ]}
      notes={[
        "Use this screen to investigate discrepancies quickly across receiving, fulfillment, and adjustments.",
        "Keep reference links from movement rows back to orders, POs, returns, and counts.",
        "Realtime subscriptions fit naturally here."
      ]}
    />
  );
}

