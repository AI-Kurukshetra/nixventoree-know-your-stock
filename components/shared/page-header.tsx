type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        <h1 style={{ margin: "8px 0 10px", fontSize: 52, lineHeight: 0.95 }}>{title}</h1>
        <p style={{ margin: 0, color: "var(--muted)", maxWidth: 760, lineHeight: 1.6 }}>{description}</p>
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </div>
  );
}