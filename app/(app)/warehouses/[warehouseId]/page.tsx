type WarehouseDetailPageProps = {
  params: Promise<{ warehouseId: string }>;
};

export default async function WarehouseDetailPage({ params }: WarehouseDetailPageProps) {
  const { warehouseId } = await params;

  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Network</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Warehouse {warehouseId}</h1>
      <p style={{ color: "var(--muted)" }}>
        Extend with bin locations, active tasks, transfer demand, and fulfillment capacity.
      </p>
    </div>
  );
}
