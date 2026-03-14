import { ModulePage } from "@/components/shared/module-page";
import { getSuppliersData } from "@/lib/repositories/ops";

type SuppliersPageProps = {
  searchParams?: Promise<{ created?: string }>;
};

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const params = (await searchParams) ?? {};
  const suppliers = await getSuppliersData();

  return (
    <div className="grid gap-5">
      {params.created ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {params.created} created successfully and is now available in purchasing flows.
        </div>
      ) : null}
      <ModulePage
        eyebrow="Purchasing"
        title="Suppliers"
        description="Suppliers should track lead times, active purchase orders, and preferred variant relationships."
        primaryAction="Add supplier"
        primaryActionHref="/suppliers/new"
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
    </div>
  );
}
