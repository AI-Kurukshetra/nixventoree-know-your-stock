type SectionCardProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function SectionCard({ title, subtitle, children }: SectionCardProps) {
  return (
    <section className="surface p-5">
      <div className="surface-header">
        <h2 className="surface-title">{title}</h2>
        {subtitle ? <p className="surface-subtitle">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}