import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { Photo } from "@/components/site/photo";
import { Button } from "@/components/ui/button";
import { getProduct, products } from "@/data/products";
import { useCart } from "@/lib/cart-store";
import { formatInr } from "@/lib/format";
import { pageHead, site } from "@/lib/site";
import { categoryLabels } from "@/types/catalog";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) =>
    pageHead(
      loaderData?.name ?? "Crystal",
      loaderData
        ? `${loaderData.summary} Sample price ${formatInr(loaderData.priceInr)}. Not live inventory.`
        : site.description,
      `/shop/${loaderData?.slug ?? ""}`,
    ),
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const addItem = useCart((state) => state.addItem);
  const [qty, setQty] = useState(1);
  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-16">
      <p className="text-sm text-muted">
        <Link to="/shop" search={{ category: "all" }} className="hover:text-forest">
          Crystal shop
        </Link>
        <span aria-hidden="true"> / </span>
        {product.name}
      </p>
      <div className="mt-6 grid gap-10 md:grid-cols-12">
        <Photo
          src={product.image}
          alt={product.imageAlt}
          width={1408}
          height={1408}
          priority
          className="aspect-square w-full rounded-lg md:col-span-7"
        />
        <div className="md:col-span-5">
          <p className="text-sm text-muted">{categoryLabels[product.category]}</p>
          <h1 className="mt-2 font-serif text-4xl text-forest md:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-ink">{product.summary}</p>
          <p className="mt-6 font-serif text-3xl text-forest tabular-nums">{formatInr(product.priceInr)}</p>
          <p className="mt-1 text-sm text-terracotta-ink">Sample price. Not a live offer.</p>
          <p className="mt-4 text-sm text-muted">Sample stock: {product.stock} in this demonstration catalogue.</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center rounded-full ring-1 ring-line">
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center"
                aria-label="Decrease quantity"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <span className="w-8 text-center tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center disabled:opacity-40"
                aria-label="Increase quantity"
                disabled={qty >= product.stock}
                onClick={() => setQty((value) => Math.min(product.stock, value + 1))}
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
            <Button onClick={() => addItem(product.slug, qty)}>Add to cart</Button>
          </div>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>
          <h2 className="mt-8 font-serif text-2xl text-forest">Care</h2>
          <ul className="mt-3 space-y-2 text-muted">
            {product.care.map((note) => (
              <li key={note} className="border-l border-gold pl-3">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <section className="mt-20 border-t border-line pt-12">
        <h2 className="font-serif text-3xl text-forest">Other sample pieces</h2>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
