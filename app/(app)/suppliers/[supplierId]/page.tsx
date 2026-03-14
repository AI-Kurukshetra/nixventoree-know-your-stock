import { PlaceholderPage } from "@/components/shared/placeholder-page";

type SupplierDetailPageProps = {
  params: Promise<{ supplierId: string }>;
};

export default async function SupplierDetailPage({ params }: SupplierDetailPageProps) {
  const { supplierId } = await params;

  return <PlaceholderPage eyebrow="Purchasing" title={`Supplier ${supplierId}`} description="Use this route for supplier metrics, mapped SKUs, and recent purchase orders." />;
}