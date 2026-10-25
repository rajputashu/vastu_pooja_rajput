import type { ReactNode } from "react";
import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { useCart, useCartCount } from "@/lib/cart-store";

export function SiteShell({ children }: { children: ReactNode }) {
  const setHydrated = useCart((state) => state.setHydrated);
  const count = useCartCount();
  const hydrated = useCart((state) => state.hydrated);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const finish = () => setHydrated(true);
    const unsub = useCart.persist.onFinishHydration(finish);
    void useCart.persist.rehydrate();
    return () => {
      unsub();
    };
  }, [setHydrated]);

  const showBar = hydrated && count > 0 && pathname !== "/checkout";

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-forest focus:px-4 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Header />
      <div id="content" className="flex-1">
        {children}
      </div>
      <Footer />
      {showBar ? (
        <div className="sticky bottom-0 z-30 border-t border-gold/40 bg-paper px-5 py-3">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <p className="text-sm text-forest">{count} in the sample cart</p>
            <Link to="/checkout" className="rounded-full bg-peacock px-4 py-2 text-sm text-ivory">
              Open demo payment
            </Link>
          </div>
        </div>
      ) : null}
      <CartDrawer />
    </div>
  );
}
