import { getDashboardData } from "@/lib/repositories/ops";

export default async function InventoryReportPage() {
  const { reportCards } = await getDashboardData();

  return (
    <div>
      <div className="eyebrow">Reports</div>
      <h1 className="mt-2 mb-5 text-[2.4rem] leading-none sm:text-[2.8rem]">Inventory report</h1>
      <div className="grid gap-4 xs:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((card) => (
          <article key={card.title} className="surface p-5">
            <h2 className="m-0 text-[1.25rem]">{card.title}</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}