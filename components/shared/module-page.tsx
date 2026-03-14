import Link from "next/link";
import type { Route } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SimpleTable } from "@/components/shared/simple-table";

type ModulePageProps<T extends Record<string, string | number>> = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  primaryActionHref?: Route;
  secondaryAction?: string;
  secondaryActionHref?: Route;
  rows: T[];
  columns: Array<{ key: keyof T; label: string; isStatus?: boolean }>;
  notes?: string[];
};

export function ModulePage<T extends Record<string, string | number>>({
  eyebrow,
  title,
  description,
  primaryAction,
  primaryActionHref,
  secondaryAction,
  secondaryActionHref,
  rows,
  columns
}: ModulePageProps<T>) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={
          <>
            {secondaryAction
              ? secondaryActionHref
                ? <Link className="button-secondary" href={secondaryActionHref}>{secondaryAction}</Link>
                : <button className="button-secondary" type="button">{secondaryAction}</button>
              : null}
            {primaryActionHref
              ? <Link className="button-primary" href={primaryActionHref}>{primaryAction}</Link>
              : <button className="button-primary" type="button">{primaryAction}</button>}
          </>
        }
      />
      <div className="module-summary">
        <div className="module-summary-card">
          <span className="eyebrow">Visible rows</span>
          <strong className="mt-2 block text-[1.65rem] font-extrabold">{rows.length}</strong>
          <div className="mt-1.5 text-sm text-stone-600">Recent operational activity ready for review and action.</div>
        </div>
        <div className="module-summary-card">
          <span className="eyebrow">Workflow mode</span>
          <strong className="mt-2 block text-[1.65rem] font-extrabold">{title}</strong>
          <div className="mt-1.5 text-sm text-stone-600">Optimized for quick operator scanning and action.</div>
        </div>
        <div className="module-summary-card">
          <span className="eyebrow">Operational posture</span>
          <strong className="mt-2 block text-[1.65rem] font-extrabold">Live workspace</strong>
          <div className="mt-1.5 text-sm text-stone-600">Built to keep operators informed, coordinated, and moving quickly.</div>
        </div>
      </div>
      <div className="surface p-5">
        <div className="surface-header">
          <h2 className="surface-title">{title} queue</h2>
          <p className="surface-subtitle">Current records, queues, and alerts surfaced for quick operational scanning.</p>
        </div>
        <SimpleTable rows={rows} columns={columns} />
      </div>
    </>
  );
}
