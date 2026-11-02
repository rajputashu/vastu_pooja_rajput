import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MediaShelf } from "@/components/site/media-shelf";
import { Reviews } from "@/components/site/reviews";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { useCart } from "@/lib/cart-store";
import { formatInr } from "@/lib/format";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Pooja Rajput Vastu — Balance for homes, offices, and factories",
      "Sacred guidance for a calmer, balanced life. Vastu for home, office, and factory, plus a sample crystal studio.",
      "/",
    ),
  component: HomePage,
});

const slides = [
  {
    src: "/images/pooja-home.png",
    alt: "Pooja Rajput in a black and gold saree",
    kicker: "Healing · Guidance · Harmony",
    title: "Sacred guidance for a calmer, balanced life.",
    text: "Personalized Vastu for homes, workplaces, and the rooms you actually live in.",
  },
  {
    src: "/images/courtyard.jpg",
    alt: "A sandstone courtyard with a still pool",
    kicker: "Home Vastu",
    title: "Let the house agree with the day.",
    text: "Entry, light, and how a family moves — read before anything is rearranged.",
  },
  {
    src: "/images/living.jpg",
    alt: "A sunlit living room with linen seating",
    kicker: "Office & factory",
    title: "Workplaces need a clear path too.",
    text: "Desks, stores, and the front door. Practical notes, not a promise of profit.",
  },
];

const ticker = ["Home Vastu", "Office Vastu", "Factory Vastu", "Crystal studio", "Book a session", "Mindful living"];

function HomePage() {
  const addItem = useCart((state) => state.addItem);
  const [index, setIndex] = useState(0);
  const slide = slides[index] ?? slides[0];
  const featured = products.slice(0, 4);
  const offers = services.slice(0, 3);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="home-lux">
      <div className="home-marquee" aria-hidden="true">
        <div className="home-marquee-track">
          {[...ticker, ...ticker].map((item, itemIndex) => (
            <span key={`${item}-${itemIndex}`}>{item} ·</span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-5 pb-6 md:px-10">
        <div className="home-hero">
          <div>
            <p className="home-kicker">{slide.kicker}</p>
            <h1>{slide.title}</h1>
            <p className="home-lead">{slide.text}</p>
            <div className="home-actions">
              <Link to="/services" className="home-btn">Book a consultation</Link>
              <Link to="/shop" search={{ category: "all" }} className="home-btn alt">Explore the shop</Link>
            </div>
            <div className="home-pills">
              <span>Vastu & architecture</span>
              <span>Home · Office · Factory</span>
              <span>Crystal studio</span>
            </div>
          </div>
          <div className="home-stage">
            <div className="home-glow" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="home-slide">
              <img src={slide.src} alt={slide.alt} />
            </div>
            <div className="home-float a">
              <small>Consultation</small>
              <b>1:1</b>
            </div>
            <div className="home-float b">
              <small>Guidance</small>
              <b>Spaces</b>
            </div>
            <div className="home-arrows">
              <button type="button" aria-label="Previous slide" onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)}>‹</button>
              <button type="button" aria-label="Next slide" onClick={() => setIndex((value) => (value + 1) % slides.length)}>›</button>
            </div>
          </div>
        </div>
        <div className="home-dots" role="tablist" aria-label="Hero slides">
          {slides.map((item, itemIndex) => (
            <button
              key={item.src}
              type="button"
              aria-label={item.kicker}
              aria-current={itemIndex === index}
              onClick={() => setIndex(itemIndex)}
            />
          ))}
        </div>
        <div className="home-stats">
          <div><strong>Home</strong><span>The place you live</span></div>
          <div><strong>Office</strong><span>Desks and reception</span></div>
          <div><strong>Factory</strong><span>Floor and stores</span></div>
        </div>
      </section>

      <section className="home-block mx-auto max-w-6xl px-5 md:px-10">
        <p className="home-kicker">Collections</p>
        <h2>Choose the space.</h2>
        <div className="home-tiles">
          {offers.map((service) => (
            <Link key={service.slug} to="/services" hash={service.slug} className="home-tile">
              <img src={service.image} alt={service.imageAlt} />
              <span>{service.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-block mx-auto max-w-6xl px-5 md:px-10">
        <p className="home-kicker">Services</p>
        <h2>Consultations for life, work, and space.</h2>
        <div className="home-services">
          {offers.map((service) => (
            <article key={service.slug} className="home-card">
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <p className="home-price mt-3">{service.priceLabel}</p>
              <Link to="/services" hash={service.slug} className="home-btn alt mt-4">View</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-block mx-auto max-w-6xl px-5 md:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="home-kicker">Shop</p>
            <h2>Specimens for a considered shelf.</h2>
          </div>
          <Link to="/shop" search={{ category: "all" }} className="home-btn alt">View all</Link>
        </div>
        <div className="home-products">
          {featured.map((product) => (
            <article key={product.slug} className="home-card home-product relative">
              <Link to="/shop/$slug" params={{ slug: product.slug }}>
                <img src={product.image} alt={product.imageAlt} />
              </Link>
              <span className="home-badge">Sample</span>
              <div>
                <h3>{product.name}</h3>
                <p className="home-price">{formatInr(product.priceInr)}</p>
                <button type="button" className="home-btn mt-3 w-full" onClick={() => addItem(product.slug, 1)}>
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-block mx-auto max-w-6xl px-5 md:px-10">
        <div className="home-split">
          <div className="home-look">
            <img src="/images/pooja-about.png" alt="Pooja Rajput with folded hands" />
            <Link to="/shop/$slug" params={{ slug: featured[0].slug }} className="home-hot">
              <i />
              {featured[0].name}
            </Link>
          </div>
          <div>
            <p className="home-kicker">About</p>
            <h2>A gentle, practical reading of a place.</h2>
            <p className="home-lead mt-3">
              Pooja Rajput Vastu looks at how a home, office, or factory is actually used. The note you leave with is
              for your family or your architect. It is not a promise of money, health, or a fixed result.
            </p>
            <Link to="/about" className="home-btn mt-5">Read the approach</Link>
          </div>
        </div>
      </section>

      <Reviews />
      <MediaShelf />
    </main>
  );
}
