type SupplierDetailPageProps = {
  params: Promise<{ supplierId: string }>;
};

export default async function SupplierDetailPage({ params }: SupplierDetailPageProps) {
  const { supplierId } = await params;

  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Purchasing</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Supplier {supplierId}</h1>
      <p style={{ color: "var(--muted)" }}>
        Use this route for supplier metrics, mapped SKUs, and recent purchase orders.
      </p>
    </div>
  );
}
