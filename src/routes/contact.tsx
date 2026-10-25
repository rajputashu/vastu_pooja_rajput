import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { PageIntro } from "@/components/site/page-intro";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { apiUrl, pageHead, site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact",
      "Placeholder contact details for Pooja Rajput Vastu, a demonstration message form, and a link to book a consultation.",
      "/contact",
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Contact"
        title="Write when a room needs a slower look."
        lede="The address, phone, and email below are placeholders. The form will tell you honestly that it does not send anything yet."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="text-sm font-medium text-terracotta-ink">{site.contactNote}</p>
          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-sm text-muted">Email</dt>
              <dd>
                <a className="text-forest underline decoration-gold underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Phone</dt>
              <dd>
                <a className="text-forest" href={`tel:${site.phone.replace(/\s/g, "")}`}>
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Location</dt>
              <dd className="text-forest">{site.location}</dd>
            </div>
          </dl>
          <Link to="/services" hash="enquire" className={cn(buttonVariants({ variant: "secondary" }), "mt-8")}>
            Book a consultation
          </Link>
          <ApiStatus />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

function ApiStatus() {
  const [state, setState] = useState<"loading" | "ok" | "down">("loading");

  useEffect(() => {
    let cancel = false;
    fetch(apiUrl("/api/v1/health"))
      .then((response) => {
        if (!response.ok) throw new Error("unhealthy");
        return response.json();
      })
      .then(() => {
        if (!cancel) setState("ok");
      })
      .catch(() => {
        if (!cancel) setState("down");
      });
    return () => {
      cancel = true;
    };
  }, []);

  const message =
    state === "loading"
      ? "Checking the studio API…"
      : state === "ok"
        ? "The health check responded. Forms on this site are still demonstrations and are not stored."
        : "The studio API is not responding. The pages and sample shop still work. This check does not send your message.";

  return (
    <p className="mt-8 text-sm text-muted" role="status">
      {message}
    </p>
  );
}
