import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Photo } from "@/components/site/photo";
import { getArticle } from "@/data/journal";
import { pageHead, site } from "@/lib/site";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.title ?? "Journal",
      loaderData?.excerpt ?? site.description,
      `/journal/${loaderData?.slug ?? ""}`,
    ),
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:px-10 md:py-16">
      <p className="text-sm text-muted">
        <Link to="/journal" className="hover:text-forest">
          Journal
        </Link>
        <span aria-hidden="true"> / </span>
        Sample article
      </p>
      <h1 className="mt-4 font-serif text-4xl text-forest md:text-5xl">{article.title}</h1>
      <p className="mt-4 text-sm text-muted">
        {article.date} · {article.readingMinutes} minute read
      </p>
      <Photo
        src={article.image}
        alt={article.imageAlt}
        width={1600}
        height={1000}
        priority
        className="mt-8 aspect-[3/2] w-full rounded-lg"
      />
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {article.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </main>
  );
}
