import { ModulePage } from "@/components/shared/module-page";
import { products } from "@/lib/demo-data";

export default function InventoryPage() {
  return (
    <ModulePage
      eyebrow="Stock"
      title="Inventory"
      description="Inventory balances are modeled as current state backed by immutable movement logs."
      primaryAction="Adjust inventory"
      secondaryAction="Run cycle count"
      rows={products}
      columns={[
        { key: "sku", label: "SKU" },
        { key: "warehouse", label: "Warehouse" },
        { key: "available", label: "Available" },
        { key: "reorderPoint", label: "Reorder point" },
        { key: "status", label: "Status", isStatus: true }
      ]}
      notes={[
        "Every stock-changing action should append a movement row and update balances transactionally.",
        "Available quantity is a derived operational number. Audit against on-hand and reserved values.",
        "Cycle counts and manual adjustments need actor attribution and reason codes."
      ]}
    />
  );
}
