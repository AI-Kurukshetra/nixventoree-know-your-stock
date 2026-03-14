import Link from "next/link";

const highlights = [
  "Multi-location inventory visibility",
  "Reorder recommendations that close the buying loop",
  "Fulfillment, purchasing, and returns in one operational shell",
  "A populated control layer that is useful from the first sign-in"
];

export default function MarketingHomePage() {
  return (
    <main className="marketing-shell">
      <section className="marketing-hero">
        <div className="marketing-grid">
          <div>
            <div className="eyebrow text-emerald-200">Nixventoree</div>
            <h1 className="mt-3 max-w-[760px] text-[3.9rem] leading-[0.9] xs:text-[4.4rem] sm:text-[4.8rem] md:text-[5.2rem]">
              Know your stock. Control your orders.
            </h1>
            <p className="mt-4 max-w-[720px] text-[1rem] leading-8 text-stone-50/80 sm:text-[1.1rem]">
              Nixventoree combines inventory, purchasing, fulfillment, and reporting into a visually rich, responsive product that feels operational from the first click.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="button-primary" href="/dashboard">Open workspace</Link>
              <Link className="button-secondary" href="/pricing">View pricing</Link>
            </div>
          </div>
          <div className="showcase-grid">
            {highlights.map((item, index) => (
              <div key={item} className="showcase-card">
                <div className={index % 2 === 0 ? "text-[12px] uppercase tracking-[0.12em] text-emerald-100" : "text-[12px] uppercase tracking-[0.12em] text-orange-100"}>Capability</div>
                <strong className="mt-3 block text-2xl">{item}</strong>
                <p className="mt-2 text-sm leading-6 text-stone-50/75">
                  Designed for fast-moving operators who need clear stock, purchasing, and fulfillment signals.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
