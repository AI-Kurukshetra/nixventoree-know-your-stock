import type { Kpi } from "@/types/domain";
import { cn } from "@/lib/utils/cn";

export function StatCard({ label, value, delta, trend }: Kpi) {
  return (
    <article className="surface stat-card">
      <div style={{ color: "var(--muted)", fontSize: 14, position: "relative", zIndex: 1 }}>{label}</div>
      <div style={{ fontSize: 38, fontWeight: 800, marginTop: 16, position: "relative", zIndex: 1 }}>{value}</div>
      <div
        className={cn(
          "badge",
          trend === "up" && "badge-success",
          trend === "down" && "badge-danger",
          trend === "flat" && "badge-neutral"
        )}
        style={{ marginTop: 16, position: "relative", zIndex: 1 }}
      >
        {delta}
      </div>
    </article>
  );
}