import { createFileRoute } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Privacy",
      "Sample privacy note for the Pooja Rajput Vastu demonstration. It explains that forms are not stored.",
      "/privacy",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Privacy"
        title="What this demonstration keeps."
        lede="Sample policy for a starter website. Replace it with text reviewed for your real business before you collect anyone’s information."
      />
      <article className="mx-auto max-w-3xl space-y-5 px-5 pb-20 text-lg leading-relaxed md:px-10">
        <p>
          Consultation and contact forms run in your browser. They check that a name, email, and message look complete,
          then they stop. They do not email the studio and they do not write to a database.
        </p>
        <p>
          The crystal cart is saved in local storage on your device so a refresh does not empty it. That data stays on
          the device. Clearing the site data in your browser removes it. Do not type payment details anywhere on this
          site — there is nowhere legitimate for them to go.
        </p>
        <p>
          If a later version stores enquiries, it should say so on the form, collect only what the booking needs, and
          give people a way to ask for deletion. This page would then need a real review, not this sample.
        </p>
      </article>
    </main>
  );
}
