import { createFileRoute, Link } from "@tanstack/react-router";
import { articles } from "@/data/journal";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { Photo } from "@/components/site/photo";
import { HeroEnter, Reveal } from "@/components/site/reveal";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart-store";
import { formatInr } from "@/lib/format";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Pooja Rajput Vastu — Balance for homes, offices, and factories",
      "Thoughtful Vastu guidance for homes and workspaces, inspired by the harmony between architecture, nature and everyday living.",
      "/",
    ),
  component: HomePage,
});

const steps = [
  {
    n: "01",
    title: "Listen",
    text: "How the rooms are used, what feels unsettled, and what you hope might change. No result is promised.",
  },
  {
    n: "02",
    title: "Read the plan",
    text: "Entry, light, the centre of the home, and how one room meets the next. Notes stay practical.",
  },
  {
    n: "03",
    title: "Leave a record",
    text: "You keep a written note to discuss with family, or with the architect who will actually build.",
  },
];

function HomePage() {
  const featured = products.slice(0, 3);
  const stories = articles.slice(0, 3);
  const addItem = useCart((state) => state.addItem);

  return (
    <main>
      <section className="mx-auto max-w-6xl px-5 pt-6 pb-12 md:px-10 md:pt-10 md:pb-16">
        <HeroEnter>
          <p className="text-sm font-medium text-muted">A studio for balanced rooms</p>
        </HeroEnter>
        <HeroEnter delay={0.08}>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl text-forest sm:text-5xl md:text-6xl">
            Bring Your Space Back Into Balance.
          </h1>
        </HeroEnter>
        <div className="mt-8 grid items-end gap-6 md:grid-cols-12 md:gap-8">
          <HeroEnter delay={0.16} className="md:col-span-7">
            <figure>
              <div className="live-frame rounded-lg">
                <Photo
                  src="/images/courtyard.jpg"
                  alt="A quiet sandstone courtyard with a reflecting pool, a flowering tree, and linen curtains."
                  width={1728}
                  height={1152}
                  priority
                  className="aspect-[3/2] w-full"
                />
              </div>
              <figcaption className="mt-2 text-sm text-muted">
                Light, water, and shade — the kind of proportion the studio looks for.
              </figcaption>
            </figure>
          </HeroEnter>
          <HeroEnter delay={0.24} className="md:col-span-5 md:pb-6">
            <div className="border-l border-gold pl-4">
              <p className="max-w-md leading-relaxed text-ink">
                Thoughtful Vastu guidance for homes and workspaces, inspired by the harmony between architecture,
                nature and everyday living.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link to="/services" className={buttonVariants()}>
                  Explore Consultations
                </Link>
                <Link to="/shop" search={{ category: "all" }} className={buttonVariants({ variant: "secondary" })}>
                  Discover Crystals
                </Link>
              </div>
            </div>
          </HeroEnter>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
          <Reveal className="md:col-span-5">
            <p className="text-sm font-medium text-muted">Philosophy</p>
            <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">Rooms settle when use and light agree.</h2>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.08}>
            <p className="leading-relaxed">
              Pooja Rajput Vastu reads a building the way a careful designer would: where you enter, where the day begins, and
              which rooms are asked to do too much. Vastu Shastra gives that reading a traditional language. It is not
              used here as a promise of money, health, or a particular future.
            </p>
            <p className="mt-4 leading-relaxed text-muted">
              Materials matter as much as rules. Stone, wood, linen, water, and plants keep the work grounded in a real
              place, not a template of fear.
            </p>
            <Link to="/about" className="mt-6 inline-flex text-forest underline decoration-gold underline-offset-4">
              Read the approach
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage-soft">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
          <Reveal className="md:col-span-5">
            <Photo
              src="/images/living.jpg"
              alt="Sunlit living room with an ivory linen sofa and a stone table."
              width={1728}
              height={1152}
              className="aspect-[4/3] w-full rounded-lg"
            />
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal>
              <p className="text-sm font-medium text-muted">Consultations</p>
              <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">Ways to begin.</h2>
            </Reveal>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {services.map((service, index) => (
                <li key={service.slug}>
                  <Reveal delay={index * 0.05}>
                    <Link
                      to="/services"
                      hash={service.slug}
                      className="grid grid-cols-[auto_1fr] gap-3 py-3.5 hover:text-forest"
                    >
                      <span className="pt-1 text-sm text-muted tabular-nums">0{index + 1}</span>
                      <span>
                        <span className="block font-serif text-xl text-forest">{service.title}</span>
                        <span className="mt-1 block text-muted">{service.summary}</span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Link to="/services" className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}>
              View services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-16">
        <Reveal>
          <p className="text-sm font-medium text-muted">The process</p>
          <h2 className="mt-2 max-w-xl font-serif text-3xl text-forest md:text-4xl">Three unhurried steps.</h2>
        </Reveal>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.n} delay={index * 0.06}>
              <li className="border-t border-gold pt-4">
                <p className="font-serif text-3xl text-forest">{step.n}</p>
                <h3 className="mt-3 font-serif text-xl text-forest">{step.title}</h3>
                <p className="mt-3 text-muted">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <p className="text-sm font-medium text-muted">Crystal studio</p>
              <h2 className="mt-2 max-w-xl font-serif text-3xl text-forest md:text-4xl">A few specimens, clearly labelled as samples.</h2>
            </Reveal>
            <Link to="/shop" search={{ category: "all" }} className={buttonVariants({ variant: "secondary" })}>
              Open the shop
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <article key={product.slug}>
                <Link to="/shop/$slug" params={{ slug: product.slug }} className="group block">
                  <div className="overflow-hidden rounded-lg">
                    <Photo
                      src={product.image}
                      alt={product.imageAlt}
                      width={1408}
                      height={1408}
                      className="aspect-square w-full transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-forest">{product.name}</h3>
                  <p className="mt-1 text-sm text-muted tabular-nums">Sample price {formatInr(product.priceInr)}</p>
                </Link>
                <Button className="mt-3" onClick={() => addItem(product.slug, 1)}>
                  Add to cart
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-12 md:px-10 md:py-16">
        <Reveal className="md:col-span-5">
          <p className="text-sm font-medium text-muted">How to trust this work</p>
          <h2 className="mt-2 font-serif text-3xl text-forest md:text-4xl">No invented credentials. No guaranteed outcomes.</h2>
          <p className="mt-5 text-muted">
            The founder profile is a placeholder until a real biography is added. Client counts, years of practice, and
            qualifications are not shown because they have not been provided. What you can rely on here is the method:
            observe the place, speak plainly, and write it down.
          </p>
        </Reveal>
        <ul className="space-y-4 md:col-span-6 md:col-start-7">
          {[
            ["Observation first", "Suggestions follow the actual plan and the way people live, not a fear-based checklist."],
            ["Architecture stays in charge", "Notes are for you and your designer. They are not a structural sign-off."],
            ["Crystals are objects", "They are offered as specimens for a room, never as medicine or a financial remedy."],
          ].map(([title, text]) => (
            <li key={title} className="border-t border-line pt-4">
              <h3 className="font-serif text-xl text-forest">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-10 md:py-16">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl text-forest md:text-4xl">From the journal</h2>
            <Link to="/journal" className="text-sm text-forest underline decoration-gold underline-offset-4">
              All notes
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {stories.map((article) => (
              <article key={article.slug}>
                <Link to="/journal/$slug" params={{ slug: article.slug }} className="group block">
                  <Photo
                    src={article.image}
                    alt={article.imageAlt}
                    width={1200}
                    height={900}
                    className="aspect-[4/3] w-full rounded-lg"
                  />
                  <p className="mt-3 text-sm text-muted">{article.date}</p>
                  <h3 className="mt-1 font-serif text-xl text-forest group-hover:underline">{article.title}</h3>
                  <p className="mt-2 text-muted">{article.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest text-ivory">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10 md:py-16">
          <div className="max-w-xl">
            <p className="text-sm text-gold">Begin when you are ready</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">A consultation is a conversation, not a verdict.</h2>
          </div>
          <Link to="/services" hash="enquire" className={buttonVariants({ variant: "inverse" })}>
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
