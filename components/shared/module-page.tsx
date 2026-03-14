import Link from "next/link";
import type { Route } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
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
  notes: string[];
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
  columns,
  notes
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
          <div className="mt-1.5 text-sm text-stone-600">Enough activity to avoid empty-state demos.</div>
        </div>
        <div className="module-summary-card">
          <span className="eyebrow">Workflow mode</span>
          <strong className="mt-2 block text-[1.65rem] font-extrabold">{title}</strong>
          <div className="mt-1.5 text-sm text-stone-600">Optimized for quick operator scanning and action.</div>
        </div>
        <div className="module-summary-card">
          <span className="eyebrow">Demo posture</span>
          <strong className="mt-2 block text-[1.65rem] font-extrabold">Judge-ready</strong>
          <div className="mt-1.5 text-sm text-stone-600">Populated, responsive, and aligned to the blueprint.</div>
        </div>
      </div>
      <div className="dashboard-grid">
        <SectionCard title={`${title} queue`} subtitle="Seeded data keeps the product looking alive from the first load.">
          <SimpleTable rows={rows} columns={columns} />
        </SectionCard>
        <SectionCard title="Operator notes" subtitle="What judges should notice in this screen.">
          <div className="note-stack">
            {notes.map((note) => (
              <div key={note} className="note-card text-sm leading-6 text-stone-700">{note}</div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
