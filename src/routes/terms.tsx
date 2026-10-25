import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead(
      "Terms",
      "Sample terms for the Pooja Rajput Vastu demonstration website, including the limits of Vastu guidance and the demo shop.",
      "/terms",
    ),
  component: TermsPage,
});

function TermsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Terms"
        title="How to read this starter site."
        lede="Sample terms, not a contract. Have them rewritten before you take bookings or payment."
      />
      <article className="mx-auto max-w-3xl space-y-5 px-5 pb-20 text-lg leading-relaxed md:px-10">
        <p>
          Pooja Rajput Vastu, as shown here, is a demonstration of a studio website. Names, prices, stock, articles, and
          contact details are placeholders unless you replace them.
        </p>
        <p>
          Vastu notes on this site are cultural and design commentary. They are not medical, legal, financial, or
          structural advice, and they do not guarantee any personal or professional outcome. An architect, engineer, or
          doctor remains the right person for those questions.
        </p>
        <p>
          The shop does not sell anything. The checkout page states that no payment is collected. A future payment
          integration must confirm the payment on the server. Reaching a thank-you screen is not, by itself, proof that
          money moved.
        </p>
        <p>Crystal descriptions mention tradition. They are not claims that a stone will change your health or income.</p>
      </article>
    </main>
  );
}
