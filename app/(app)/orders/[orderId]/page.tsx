import { PlaceholderPage } from "@/components/shared/placeholder-page";

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;

  return <PlaceholderPage eyebrow="Fulfillment" title={`Order ${orderId}`} description="Extend this route with allocation, packing, label purchase, and shipment timeline components." />;
}