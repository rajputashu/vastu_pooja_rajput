export function PageIntro({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-12 pb-8 md:px-10 md:pt-20 md:pb-12">
      <p className="text-sm font-medium text-muted">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl font-serif text-4xl text-forest md:text-6xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
    </header>
  );
}
