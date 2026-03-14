import { ModulePage } from "@/components/shared/module-page";
import { warehouses } from "@/lib/demo-data";

export default function WarehousesPage() {
  return (
    <ModulePage
      eyebrow="Network"
      title="Warehouses"
      description="Warehouses and locations provide the physical model behind stock allocation and receiving."
      primaryAction="Add warehouse"
      rows={warehouses}
      columns={[
        { key: "name", label: "Warehouse" },
        { key: "code", label: "Code" },
        { key: "pickAccuracy", label: "Pick accuracy" },
        { key: "openTasks", label: "Open tasks" }
      ]}
      notes={[
        "Location-level granularity matters for picking and cycle counts.",
        "Warehouse detail can show stock heatmaps and transfer recommendations later.",
        "Keep mobile layout in mind for floor operators."
      ]}
    />
  );
}
