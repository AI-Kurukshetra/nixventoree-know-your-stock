import { PlaceholderPage } from "@/components/shared/placeholder-page";

type PurchaseOrderDetailPageProps = {
  params: Promise<{ purchaseOrderId: string }>;
};

export default async function PurchaseOrderDetailPage({ params }: PurchaseOrderDetailPageProps) {
  const { purchaseOrderId } = await params;

  return <PlaceholderPage eyebrow="Purchasing" title={`Purchase Order ${purchaseOrderId}`} description="Build the receive workflow here with partial receiving, discrepancy notes, and movement reconciliation." />;
}