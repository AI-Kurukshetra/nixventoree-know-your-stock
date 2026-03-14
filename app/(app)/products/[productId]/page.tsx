type ProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { productId } = await params;

  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Catalog</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Product {productId}</h1>
      <p style={{ color: "var(--muted)" }}>
        This route is ready for a product detail view with variant stock, movement history, pricing, and supplier data.
      </p>
    </div>
  );
}
