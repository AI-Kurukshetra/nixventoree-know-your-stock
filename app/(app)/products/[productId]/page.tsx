import { PlaceholderPage } from "@/components/shared/placeholder-page";

type ProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;

  return <PlaceholderPage eyebrow="Catalog" title={`Product ${productId}`} description="This route is ready for a product detail view with variant stock, movement history, pricing, and supplier data." />;
}