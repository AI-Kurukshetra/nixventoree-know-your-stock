import { ModulePage } from "@/components/shared/module-page";
import { suppliers } from "@/lib/demo-data";

export default function SuppliersPage() {
  return (
    <ModulePage
      eyebrow="Purchasing"
      title="Suppliers"
      description="Suppliers should track lead times, active purchase orders, and preferred variant relationships."
      primaryAction="Add supplier"
      rows={suppliers}
      columns={[
        { key: "name", label: "Supplier" },
        { key: "leadTimeDays", label: "Lead time" },
        { key: "activePos", label: "Active POs" },
        { key: "score", label: "Score" }
      ]}
      notes={[
        "Supplier score can stay heuristic for the MVP.",
        "Preferred supplier mapping is enough to unlock reorder recommendations.",
        "Use supplier detail pages to show catalog coverage and recent receiving history."
      ]}
    />
  );
}
