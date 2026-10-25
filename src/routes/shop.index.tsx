import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/shop/product-card";
import { PageIntro } from "@/components/site/page-intro";
import { categoryOrder, filterProducts } from "@/data/products";
import { cn } from "@/lib/cn";
import { pageHead } from "@/lib/site";
import { categoryLabels, type ProductCategory } from "@/types/catalog";

const filters = categoryOrder;

function isCategory(value: unknown): value is ProductCategory | "all" {
  return typeof value === "string" && (filters as readonly string[]).includes(value);
}

export const Route = createFileRoute("/shop/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: isCategory(search.category) ? search.category : "all",
  }),
  head: () =>
    pageHead(
      "Crystal shop",
      "Sample crystal specimens — amethyst, rose quartz, clear quartz, black tourmaline, and citrine. Not live inventory.",
      "/shop",
    ),
  component: ShopPage,
});

function ShopPage() {
  const { category } = Route.useSearch();
  const list = filterProducts(category);

  return (
    <main>
      <PageIntro
        eyebrow="Crystal shop"
        title="Specimens for a considered shelf."
        lede="Every price, description, and stock count on this page is sample data. Nothing is a live product, and nothing is sold through this demonstration."
      />
      <div className="mx-auto max-w-6xl px-5 pb-20 md:px-10">
        <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by tradition of use">
          {filters.map((item) => {
            const active = item === category;
            return (
              <Link
                key={item}
                to="/shop"
                search={{ category: item }}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm",
                  active ? "bg-forest text-ivory" : "bg-paper text-forest ring-1 ring-line hover:bg-sage-soft",
                )}
              >
                {categoryLabels[item]}
              </Link>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-muted">
          {list.length} sample {list.length === 1 ? "piece" : "pieces"}
          {category !== "all" ? ` in ${categoryLabels[category].toLowerCase()}` : ""}. These groupings describe a mood,
          not a medical effect.
        </p>
        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
