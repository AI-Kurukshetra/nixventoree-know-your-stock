const tiers = [
  { name: "Starter", price: "$79", description: "For small operators consolidating inventory and order workflows." },
  { name: "Growth", price: "$199", description: "Adds multi-warehouse coordination, purchasing flows, and richer reporting." },
  { name: "Scale", price: "Custom", description: "For teams that need integrations, advanced permissions, and larger order volume." }
];

export default function PricingPage() {
  return (
    <main className="page-frame px-4 py-6 xs:px-5 sm:px-6">
      <div className="eyebrow">Pricing</div>
      <h1 className="mt-3 text-[3rem] leading-[0.95] sm:text-[3.5rem]">Simple SaaS packaging for the MVP.</h1>
      <div className="mt-5 grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.name} className="surface p-6">
            <div className="eyebrow">{tier.name}</div>
            <div className="mt-4 text-[2.6rem] font-extrabold leading-none">{tier.price}</div>
            <p className="mt-3 text-sm leading-7 text-stone-600">{tier.description}</p>
          </article>
        ))}
      </div>
    </main>
  );
}