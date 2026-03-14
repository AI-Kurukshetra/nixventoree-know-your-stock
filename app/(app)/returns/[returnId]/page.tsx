type ReturnDetailPageProps = {
  params: Promise<{ returnId: string }>;
};

export default async function ReturnDetailPage({ params }: ReturnDetailPageProps) {
  const { returnId } = await params;

  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">After-sales</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Return {returnId}</h1>
      <p style={{ color: "var(--muted)" }}>
        Add inspection outcomes, line-level resolutions, and refund status here.
      </p>
    </div>
  );
}
