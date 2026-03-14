type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <div className="placeholder-card">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="mt-2 text-[2.5rem] leading-none">{title}</h1>
      <p className="mt-3 max-w-[760px] text-base leading-7 text-stone-600">{description}</p>
    </div>
  );
}