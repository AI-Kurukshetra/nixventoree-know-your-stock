import { ModulePage } from "@/components/shared/module-page";
import { getReturnsData } from "@/lib/repositories/ops";

export default async function ReturnsPage() {
  const returns = await getReturnsData();

  return (
    <ModulePage
      eyebrow="After-sales"
      title="Returns"
      description="Handle RMA intake, inspection, restocking, and refund workflows from one queue."
      primaryAction="Create return"
      rows={returns}
      columns={[
        { key: "number", label: "RMA" },
        { key: "customer", label: "Customer" },
        { key: "reason", label: "Reason" },
        { key: "status", label: "Status", isStatus: true }
      ]}
      notes={[
        "Returns should not mutate stock until physical receipt and inspection are confirmed.",
        "Resolution state belongs at the line-item level for mixed outcomes.",
        "This is a good place to demo restock vs discard logic."
      ]}
    />
  );
}