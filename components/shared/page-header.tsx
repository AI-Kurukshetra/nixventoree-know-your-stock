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
        <h1 className="mt-2 mb-2 text-[2.75rem] leading-[0.95] xs:text-[3rem] sm:text-[3.3rem]">{title}</h1>
        <p className="max-w-[760px] text-[0.95rem] leading-7 text-stone-600 sm:text-base">{description}</p>
      </div>
      {actions ? <div className="page-header-actions">{actions}</div> : null}
    </div>
  );
}