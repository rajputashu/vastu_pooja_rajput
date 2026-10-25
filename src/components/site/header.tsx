import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { articles } from "@/data/journal";
import { services } from "@/data/services";
import { useCart, useCartCount } from "@/lib/cart-store";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { categoryLabels, type ProductCategory } from "@/types/catalog";

type Shot = { src: string; alt: string; caption: string };

const shopCats: ProductCategory[] = ["calm", "clarity", "grounding", "warmth"];

const menuShots: Record<string, Shot> = {
  home: {
    src: "/images/courtyard.jpg",
    alt: "A sandstone courtyard with a pool and a flowering tree.",
    caption: "Light, water, and a place to begin.",
  },
  services: {
    src: "/images/living.jpg",
    alt: "A sunlit living room.",
    caption: "Homes, offices, and factories.",
  },
  about: {
    src: "/images/garden.jpg",
    alt: "A garden path beside still water.",
    caption: "A practice held lightly.",
  },
  shop: {
    src: "/images/citrine.jpg",
    alt: "A citrine cluster in warm light.",
    caption: "Sample specimens, not a live shop.",
  },
  journal: {
    src: "/images/materials.jpg",
    alt: "Stone, wood, linen, and brass.",
    caption: "Notes on rooms and materials.",
  },
  contact: {
    src: "/images/studio.jpg",
    alt: "A studio desk with tracing paper.",
    caption: "Write when you are ready.",
  },
};

export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [shot, setShot] = useState<Shot>(menuShots.home);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const count = useCartCount();
  const hydrated = useCart((state) => state.hydrated);
  const openCart = useCart((state) => state.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, menu]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function show(id: string, next = menuShots[id]) {
    setMenu(id);
    if (next) setShot(next);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-150",
        scrolled || menu ? "border-gold/40 bg-paper/95 backdrop-blur-md" : "border-transparent bg-paper/80 backdrop-blur-sm",
      )}
      onMouseLeave={() => setMenu(null)}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link to="/" className="group flex flex-col leading-none" onMouseEnter={() => show("home")}>
          <span className="font-serif text-xl text-forest sm:text-2xl">{site.shortName}</span>
          <span className="mt-1 text-xs tracking-[0.2em] text-lotus uppercase">Vastu</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="text-sm text-muted hover:text-peacock"
            activeProps={{ className: "text-sm text-peacock" }}
            onMouseEnter={() => show("home")}
            onFocus={() => show("home")}
          >
            Home
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-peacock"
            aria-expanded={menu === "services"}
            aria-controls="services-menu"
            onMouseEnter={() => show("services")}
            onFocus={() => show("services")}
            onClick={() => setMenu((value) => (value === "services" ? null : "services"))}
          >
            Vastu Services
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </button>
          <Link
            to="/about"
            className="text-sm text-muted hover:text-peacock"
            activeProps={{ className: "text-sm text-peacock" }}
            onMouseEnter={() => show("about")}
            onFocus={() => show("about")}
          >
            About
          </Link>
          <Link
            to="/shop"
            search={{ category: "all" }}
            className="text-sm text-muted hover:text-peacock"
            activeProps={{ className: "text-sm text-peacock" }}
            onMouseEnter={() => show("shop")}
            onFocus={() => show("shop")}
          >
            Crystal Shop
          </Link>
          <Link
            to="/journal"
            className="text-sm text-muted hover:text-peacock"
            activeProps={{ className: "text-sm text-peacock" }}
            onMouseEnter={() => show("journal")}
            onFocus={() => show("journal")}
          >
            Journal
          </Link>
          <Link
            to="/contact"
            className="text-sm text-muted hover:text-peacock"
            activeProps={{ className: "text-sm text-peacock" }}
            onMouseEnter={() => show("contact")}
            onFocus={() => show("contact")}
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-peacock hover:bg-peacock-soft"
            onClick={openCart}
            aria-label={hydrated && count > 0 ? `Open cart, ${count} items` : "Open cart"}
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {hydrated && count > 0 ? (
              <span className="absolute top-1 right-1 inline-flex min-w-5 items-center justify-center rounded-full bg-lotus px-1 text-xs text-ivory tabular-nums">
                {count}
              </span>
            ) : null}
          </button>
          <Link to="/services" hash="enquire" className={cn(buttonVariants(), "hidden sm:inline-flex")}>
            Book a Consultation
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-peacock hover:bg-marigold-soft lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu ? (
          <motion.div
            id="services-menu"
            className="hidden border-t border-gold/30 bg-paper lg:block"
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mx-auto grid max-w-6xl gap-8 px-10 py-6 md:grid-cols-12">
              <div className="live-frame relative min-h-52 rounded-lg md:col-span-5">
                <img src={shot.src} alt={shot.alt} className="aspect-[3/2] h-full w-full object-cover" />
                <p className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-sm text-forest">
                  {shot.caption}
                </p>
              </div>
              <div className="md:col-span-7">
                {menu === "services" ? (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {services.slice(0, 3).map((service) => (
                      <li key={service.slug}>
                        <Link
                          to="/services"
                          hash={service.slug}
                          className="block rounded-lg px-3 py-3 hover:bg-marigold-soft"
                          onMouseEnter={() =>
                            setShot({ src: service.image, alt: service.imageAlt, caption: service.title })
                          }
                        >
                          <span className="font-serif text-xl text-forest">{service.title}</span>
                          <span className="mt-1 block text-sm text-muted">{service.summary}</span>
                        </Link>
                      </li>
                    ))}
                    <li className="sm:col-span-2">
                      <Link to="/services" className="text-sm text-peacock underline decoration-gold underline-offset-4">
                        All consultations
                      </Link>
                    </li>
                  </ul>
                ) : null}
                {menu === "shop" ? (
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {shopCats.map((category) => (
                      <li key={category}>
                        <Link
                          to="/shop"
                          search={{ category }}
                          className="block rounded-lg px-3 py-3 font-serif text-xl text-forest hover:bg-peacock-soft"
                        >
                          {categoryLabels[category]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {menu === "journal" ? (
                  <ul className="space-y-2">
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <Link
                          to="/journal/$slug"
                          params={{ slug: article.slug }}
                          className="block rounded-lg px-3 py-2 hover:bg-lotus-soft"
                          onMouseEnter={() =>
                            setShot({ src: article.image, alt: article.imageAlt, caption: article.title })
                          }
                        >
                          <span className="font-serif text-lg text-forest">{article.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {menu === "home" || menu === "about" || menu === "contact" ? (
                  <div className="flex h-full flex-col justify-end">
                    <p className="font-serif text-3xl text-forest">{shot.caption}</p>
                    <Link
                      to={menu === "home" ? "/" : menu === "about" ? "/about" : "/contact"}
                      className={cn(buttonVariants({ variant: "secondary" }), "mt-6 w-fit")}
                    >
                      Open {menu}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="max-h-[80vh] overflow-y-auto border-t border-gold/40 bg-paper lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4">
              <Link to="/" className="rounded-md px-3 py-3 text-lg text-forest hover:bg-marigold-soft">
                Home
              </Link>
              <button
                type="button"
                className="flex items-center justify-between rounded-md px-3 py-3 text-left text-lg text-forest hover:bg-marigold-soft"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((value) => !value)}
              >
                Vastu Services
                <ChevronDown className={cn("size-4", servicesOpen && "rotate-180")} aria-hidden="true" />
              </button>
              {servicesOpen ? (
                <div className="grid gap-2 pb-2 pl-3">
                  {services.slice(0, 3).map((service) => (
                    <Link
                      key={service.slug}
                      to="/services"
                      hash={service.slug}
                      className="overflow-hidden rounded-lg"
                    >
                      <span className="live-frame block">
                        <img src={service.image} alt="" className="aspect-[5/2] w-full object-cover" />
                      </span>
                      <span className="block px-1 py-2 font-serif text-lg text-forest">{service.title}</span>
                    </Link>
                  ))}
                </div>
              ) : null}
              <Link to="/about" className="rounded-md px-3 py-3 text-lg text-forest hover:bg-peacock-soft">
                About
              </Link>
              <Link
                to="/shop"
                search={{ category: "all" }}
                className="rounded-md px-3 py-3 text-lg text-forest hover:bg-peacock-soft"
              >
                Crystal Shop
              </Link>
              <Link to="/journal" className="rounded-md px-3 py-3 text-lg text-forest hover:bg-lotus-soft">
                Journal
              </Link>
              <Link to="/contact" className="rounded-md px-3 py-3 text-lg text-forest hover:bg-lotus-soft">
                Contact
              </Link>
              <Button asChild className="mt-3">
                <Link to="/services" hash="enquire">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
