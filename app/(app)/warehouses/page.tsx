import { ModulePage } from "@/components/shared/module-page";
import { getWarehousesData } from "@/lib/repositories/ops";

type WarehousesPageProps = {
  searchParams?: Promise<{ created?: string }>;
};

export default async function WarehousesPage({ searchParams }: WarehousesPageProps) {
  const params = (await searchParams) ?? {};
  const warehouses = await getWarehousesData();

  return (
    <div className="grid gap-5">
      {params.created ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {params.created} created successfully and is now available for stock and receiving workflows.
        </div>
      ) : null}
      <ModulePage
        eyebrow="Network"
        title="Warehouses"
        description="Warehouses and locations provide the physical model behind stock allocation and receiving."
        primaryAction="Add warehouse"
        primaryActionHref="/warehouses/new"
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
    </div>
  );
}
