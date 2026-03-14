type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderId } = await params;

  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Fulfillment</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Order {orderId}</h1>
      <p style={{ color: "var(--muted)" }}>
        Extend this route with allocation, packing, label purchase, and shipment timeline components.
      </p>
    </div>
  );
}
