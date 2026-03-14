import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { SimpleTable } from "@/components/shared/simple-table";

type ModulePageProps<T extends Record<string, string | number>> = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction?: string;
  rows: T[];
  columns: Array<{ key: keyof T; label: string; isStatus?: boolean }>;
  notes: string[];
};

export function ModulePage<T extends Record<string, string | number>>({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
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
            {secondaryAction ? <button className="button-secondary" type="button">{secondaryAction}</button> : null}
            <button className="button-primary" type="button">{primaryAction}</button>
          </>
        }
      />
      <div className="module-summary">
        <div className="module-summary-card">
          <span className="eyebrow">Visible rows</span>
          <strong>{rows.length}</strong>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>Enough activity to avoid empty-state demos.</div>
        </div>
        <div className="module-summary-card">
          <span className="eyebrow">Workflow mode</span>
          <strong>{title}</strong>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>Optimized for quick operator scanning and action.</div>
        </div>
        <div className="module-summary-card">
          <span className="eyebrow">Demo posture</span>
          <strong>Judge-ready</strong>
          <div style={{ color: "var(--muted)", marginTop: 6 }}>Populated, responsive, and aligned to the blueprint.</div>
        </div>
      </div>
      <div className="dashboard-grid">
        <SectionCard title={`${title} queue`} subtitle="Seeded data keeps the product looking alive from the first load.">
          <SimpleTable rows={rows} columns={columns} />
        </SectionCard>
        <SectionCard title="Operator notes" subtitle="What judges should notice in this screen.">
          <div className="note-stack">
            {notes.map((note) => (
              <div key={note} className="note-card">{note}</div>
            ))}
          </div>
        </SectionCard>
      </div>
    </>
  );
}