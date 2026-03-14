import { cn } from "@/lib/utils/cn";

const badgeMap: Record<string, string> = {
  Healthy: "badge-success",
  Incoming: "badge-warning",
  "Not stocked": "badge-neutral",
  "Low stock": "badge-danger",
  Pending: "badge-warning",
  Picking: "badge-warning",
  Packed: "badge-neutral",
  Shipped: "badge-success",
  Draft: "badge-neutral",
  Sent: "badge-warning",
  "Partially received": "badge-warning",
  Received: "badge-success",
  Active: "badge-success",
  Prospect: "badge-neutral",
  Requested: "badge-warning",
  Approved: "badge-neutral",
  Refunded: "badge-success"
};

export function StatusBadge({ value }: { value: string }) {
  return <span className={cn("badge", badgeMap[value] ?? "badge-neutral")}>{value}</span>;
}

