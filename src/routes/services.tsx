import { createFileRoute, Link } from "@tanstack/react-router";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageIntro } from "@/components/site/page-intro";
import { Photo } from "@/components/site/photo";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/data/services";
import { cn } from "@/lib/cn";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () =>
    pageHead(
      "Vastu services",
      "Home, office, and factory Vastu consultations, floor-plan reviews, and guidance before you commit to a property. Prices on request.",
      "/services",
    ),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Vastu services"
        title="Guidance for the place you have, or the one you are about to choose."
        lede="Each consultation is a conversation about light, entry, and use. Nothing here promises wealth, health, or a fixed result. Fees are shared when the scope is clear."
      />
      <div className="mx-auto max-w-6xl px-5 pb-8 md:px-10">
        {services.map((service, index) => (
          <article
            id={service.slug}
            key={service.slug}
            className="scroll-mt-28 grid items-center gap-8 border-t border-line py-14 md:grid-cols-12 md:gap-12"
          >
            <div className={index % 2 === 1 ? "live-frame rounded-lg md:order-2 md:col-span-6" : "live-frame rounded-lg md:col-span-6"}>
              <Photo
                src={service.image}
                alt={service.imageAlt}
                width={1600}
                height={1100}
                className="aspect-[4/3] w-full"
              />
            </div>
            <div className={index % 2 === 1 ? "md:order-1 md:col-span-6" : "md:col-span-6"}>
              <h2 className="font-serif text-3xl text-forest md:text-4xl">{service.title}</h2>
              <p className="mt-4 text-lg text-ink">{service.summary}</p>
              <p className="mt-3 text-muted">{service.description}</p>
              <h3 className="mt-6 text-sm font-medium text-forest">Example inclusions</h3>
              <ul className="mt-3 space-y-2 text-muted">
                {service.includes.map((item) => (
                  <li key={item} className="border-l border-gold pl-3">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-forest">{service.priceLabel}</p>
              <Link to="/services" hash="enquire" className={cn(buttonVariants(), "mt-6")}>
                Enquire about this
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section id="enquire" className="scroll-mt-28 border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <div className="md:col-span-5">
            <h2 className="font-serif text-4xl text-forest">Ask about a consultation.</h2>
            <p className="mt-4 text-muted">
              Share the kind of place and what you would like to look at. This form does not book a time and does not
              send your note anywhere.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
