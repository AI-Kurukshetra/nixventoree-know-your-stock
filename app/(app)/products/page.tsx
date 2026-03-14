import { ModulePage } from "@/components/shared/module-page";
import { getProductsData } from "@/lib/repositories/ops";

type ProductsPageProps = {
  searchParams?: Promise<{ created?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = (await searchParams) ?? {};
  const products = await getProductsData();

  return (
    <div className="grid gap-5">
      {params.created ? (
        <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-900">
          {params.created} created successfully. You can now seed stock for it or leave it as Not stocked.
        </div>
      ) : null}
      <ModulePage
        eyebrow="Catalog"
        title="Products"
        description="Products, variants, barcodes, and supplier mappings should live here. The workspace now reads from Supabase when it is configured."
        primaryAction="Add product"
        primaryActionHref="/products/new"
        secondaryAction="Import catalog"
        rows={products}
        columns={[
          { key: "sku", label: "SKU" },
          { key: "name", label: "Product" },
          { key: "category", label: "Category" },
          { key: "available", label: "Available" },
          { key: "status", label: "Status", isStatus: true }
        ]}
        notes={[
          "Keep variants first-class. Color and size data should not be flattened into product names.",
          "Barcode scanning should target variants and locations, not generic products.",
          "Preferred supplier and reorder settings belong close to the purchasable variant."
        ]}
      />
    </div>
  );
}
