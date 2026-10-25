import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { Photo } from "@/components/site/photo";
import { articles } from "@/data/journal";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/journal/")({
  head: () =>
    pageHead(
      "Journal",
      "Sample notes on Vastu visits, light and thresholds, crystal care, and reading a plan before the walls go up.",
      "/journal",
    ),
  component: JournalPage,
});

function JournalPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Journal"
        title="Notes on rooms, light, and specimens."
        lede="These essays are samples, written so the studio has a shape to replace. They are not personalised advice."
      />
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <ul className="divide-y divide-line border-y border-line">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                to="/journal/$slug"
                params={{ slug: article.slug }}
                className="grid gap-6 py-8 md:grid-cols-12 md:items-center"
              >
                <Photo
                  src={article.image}
                  alt={article.imageAlt}
                  width={1200}
                  height={800}
                  className="aspect-[3/2] w-full rounded-lg md:col-span-4"
                />
                <div className="md:col-span-7 md:col-start-6">
                  <p className="text-sm text-muted">
                    {article.date} · {article.readingMinutes} min · Sample
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-forest">{article.title}</h2>
                  <p className="mt-3 text-muted">{article.excerpt}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
