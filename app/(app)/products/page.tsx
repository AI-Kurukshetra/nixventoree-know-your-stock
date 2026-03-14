import { ModulePage } from "@/components/shared/module-page";
import { products } from "@/lib/demo-data";

export default function ProductsPage() {
  return (
    <ModulePage
      eyebrow="Catalog"
      title="Products"
      description="Products, variants, barcodes, and supplier mappings should live here. The scaffold is already populated with demo SKUs."
      primaryAction="Add product"
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
  );
}
