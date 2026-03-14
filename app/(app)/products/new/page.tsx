export default function NewProductPage() {
  return (
    <div className="surface" style={{ borderRadius: 28, padding: 28 }}>
      <div className="eyebrow">Catalog</div>
      <h1 style={{ margin: "10px 0", fontSize: 42 }}>Create product</h1>
      <p style={{ color: "var(--muted)" }}>
        Add the form and server action for product creation here. The schema already anticipates variants, bundles, barcodes, and preferred suppliers.
      </p>
    </div>
  );
}
