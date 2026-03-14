type PurchaseOrderDetailPageProps = {
  params: Promise<{ purchaseOrderId: string }>;
};

export default async function PurchaseOrderDetailPage({ params }: PurchaseOrderDetailPageProps) {
  const { purchaseOrderId } = await params;

  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Purchasing</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Purchase Order {purchaseOrderId}</h1>
      <p style={{ color: "var(--muted)" }}>
        Build the receive workflow here with partial receiving, discrepancy notes, and movement reconciliation.
      </p>
    </div>
  );
}
