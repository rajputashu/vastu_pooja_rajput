import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { getProduct } from "@/data/products";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { subtotalInr } from "@/lib/cart-math";
import { cn } from "@/lib/cn";
import { formatInr } from "@/lib/format";

export function CartDrawer() {
  const reduce = useReducedMotion();
  const isOpen = useCart((state) => state.isOpen);
  const closeCart = useCart((state) => state.closeCart);
  const items = useCart((state) => state.items);
  const setQty = useCart((state) => state.setQty);
  const removeItem = useCart((state) => state.removeItem);

  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ item, product }] : [];
  });
  const subtotal = subtotalInr(lines.map(({ item, product }) => ({ priceInr: product.priceInr, qty: item.qty })));

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-forest/40"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-soft"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: "100%" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 id="cart-title" className="font-serif text-2xl text-forest">
                Your selection
              </h2>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-sage-soft"
                onClick={closeCart}
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <p className="px-5 pt-4 text-sm text-muted">
              Sample cart. Nothing here is reserved, paid for, or saved on a server.
            </p>
            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col justify-between px-5 py-8">
                <p className="text-forest">Your cart is empty.</p>
                <Link to="/shop" search={{ category: "all" }} className={buttonVariants()} onClick={closeCart}>
                  Browse crystals
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 space-y-5 overflow-y-auto px-5 py-6">
                  {lines.map(({ item, product }) => (
                    <li key={item.slug} className="grid grid-cols-[5.5rem_1fr] gap-4">
                      <img
                        src={product.image}
                        alt=""
                        className="aspect-square w-full rounded-md object-cover"
                      />
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <Link
                            to="/shop/$slug"
                            params={{ slug: product.slug }}
                            className="font-medium text-forest hover:underline"
                            onClick={closeCart}
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            className="text-sm text-muted underline-offset-2 hover:text-forest hover:underline"
                            onClick={() => removeItem(item.slug)}
                          >
                            Remove
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-muted tabular-nums">{formatInr(product.priceInr)} sample</p>
                        <div className="mt-3 inline-flex items-center rounded-full ring-1 ring-line">
                          <button
                            type="button"
                            className="inline-flex size-11 items-center justify-center"
                            aria-label={`Decrease ${product.name}`}
                            onClick={() => setQty(item.slug, item.qty - 1)}
                          >
                            <Minus className="size-4" aria-hidden="true" />
                          </button>
                          <span className="w-6 text-center tabular-nums" aria-live="polite">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            className="inline-flex size-11 items-center justify-center disabled:opacity-40"
                            aria-label={`Increase ${product.name}`}
                            disabled={item.qty >= product.stock}
                            onClick={() => setQty(item.slug, item.qty + 1)}
                          >
                            <Plus className="size-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line px-5 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">Sample subtotal</span>
                    <span className="font-serif text-2xl text-forest tabular-nums">{formatInr(subtotal)}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">Next is a demo payment screen. Nothing is charged.</p>
                  <Link to="/checkout" className={cn(buttonVariants(), "mt-5 w-full")} onClick={closeCart}>
                    Review demo checkout
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
