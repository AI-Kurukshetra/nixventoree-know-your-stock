import type { Kpi } from "@/types/domain";
import { cn } from "@/lib/utils/cn";

export function StatCard({ label, value, delta, trend }: Kpi) {
  return (
    <article className="surface stat-card">
      <div className="relative z-10 text-sm text-stone-600">{label}</div>
      <div className="relative z-10 mt-4 text-[2.4rem] font-extrabold leading-none">{value}</div>
      <div
        className={cn(
          "badge relative z-10 mt-4",
          trend === "up" && "badge-success",
          trend === "down" && "badge-danger",
          trend === "flat" && "badge-neutral"
        )}
      >
        {delta}
      </div>
    </article>
  );
}