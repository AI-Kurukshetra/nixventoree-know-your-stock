import { ModulePage } from "@/components/shared/module-page";
import { orders } from "@/lib/demo-data";

export default function OrdersPage() {
  return (
    <ModulePage
      eyebrow="Fulfillment"
      title="Orders"
      description="Orders centralize channel demand and drive reservation, picking, packing, and shipping."
      primaryAction="Create order"
      secondaryAction="Bulk allocate"
      rows={orders}
      columns={[
        { key: "number", label: "Order" },
        { key: "customer", label: "Customer" },
        { key: "channel", label: "Channel" },
        { key: "status", label: "Status", isStatus: true },
        { key: "total", label: "Total" }
      ]}
      notes={[
        "Status transitions should stay explicit: pending, allocated, picking, packed, shipped, cancelled.",
        "Use order detail for shipment events and customer comms.",
        "Allocation logic should reserve by warehouse and location, not just by global SKU."
      ]}
    />
  );
}
