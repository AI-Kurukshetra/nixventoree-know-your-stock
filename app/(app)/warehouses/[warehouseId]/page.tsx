import { PlaceholderPage } from "@/components/shared/placeholder-page";

type WarehouseDetailPageProps = {
  params: Promise<{ warehouseId: string }>;
};

export default async function WarehouseDetailPage({ params }: WarehouseDetailPageProps) {
  const { warehouseId } = await params;

  return <PlaceholderPage eyebrow="Network" title={`Warehouse ${warehouseId}`} description="Extend with bin locations, active tasks, transfer demand, and fulfillment capacity." />;
}