import { Link } from "@tanstack/react-router";
import { Photo } from "@/components/site/photo";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { categoryLabels, type Product } from "@/types/catalog";
import { formatInr } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <article className="group">
      <Link to="/shop/$slug" params={{ slug: product.slug }} className="block">
        <div className="live-frame rounded-lg bg-marigold-soft ring-1 ring-gold/30 transition-shadow duration-300 group-hover:shadow-soft">
          <Photo
            src={product.image}
            alt={product.imageAlt}
            width={1408}
            height={1408}
            className="aspect-square w-full"
          />
        </div>
        <p className="mt-4 text-sm text-muted">{categoryLabels[product.category]}</p>
        <h2 className="mt-1 font-serif text-2xl text-forest">{product.name}</h2>
        <p className="mt-2 text-sm text-muted">{product.summary}</p>
        <p className="mt-3 text-sm text-forest tabular-nums">Sample price {formatInr(product.priceInr)}</p>
      </Link>
      <Button className="mt-4" onClick={() => addItem(product.slug, 1)}>
        Add to cart
      </Button>
    </article>
  );
}