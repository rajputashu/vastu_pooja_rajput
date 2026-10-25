import { createFileRoute, Link } from "@tanstack/react-router";
import { PageIntro } from "@/components/site/page-intro";
import { Photo } from "@/components/site/photo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About",
      "The philosophy behind Pooja Rajput Vastu: balanced living, careful spaces, and honest limits. Founder details are a placeholder.",
      "/about",
    ),
  component: AboutPage,
});

const values = [
  {
    title: "Observe before advising",
    text: "A room is read from how it is lived in, not from a rule applied in the abstract.",
  },
  {
    title: "Prefer proportion",
    text: "Light, path, and quiet matter more than ornaments added to correct a fear.",
  },
  {
    title: "Stay with materials",
    text: "Stone, wood, cloth, water, and plants keep the work tangible.",
  },
  {
    title: "Say what is not promised",
    text: "No guarantees of money, health, or relationships. No borrowed credentials.",
  },
];

function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="About the studio"
        title="A practice of balance, held lightly."
        lede="Pooja Rajput Vastu is a studio for homes, offices, and factories. Traditional guidance is a way to make a place more considerate — not more anxious. A biography and certificates stay unpublished until you supply them."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-6">
          <Photo
            src="/images/garden.jpg"
            alt="A misty garden path of stone beside still water and ferns."
            width={1200}
            height={1600}
            className="aspect-[3/4] w-full rounded-lg"
          />
        </div>
        <div className="md:col-span-5 md:col-start-8 md:pt-8">
          <h2 className="font-serif text-3xl text-forest">Why the work exists</h2>
          <p className="mt-4 leading-relaxed">
            Many people meet Vastu at a stressful moment: a new flat, a parent’s house, an office that never quite
            feels right. The useful response is not a list of faults. It is a slower look at the building and the day
            that happens inside it.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            The studio name is Pooja Rajput Vastu. The work itself is about shade, order, and room to breathe: fewer objects, clearer paths, and materials that age well.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
          <div className="rounded-lg border border-dashed border-gold bg-ivory p-6 md:col-span-5 md:p-8">
            <p className="text-sm font-medium text-terracotta-ink">Editable placeholder</p>
            <h2 className="mt-3 font-serif text-3xl text-forest">Founder profile</h2>
            <p className="mt-4 text-muted">
              Name, portrait, and qualifications have not been provided. Do not publish invented biography, years of
              experience, or certificates here. Replace this panel with the real introduction when you have it.
            </p>
            <div className="mt-6 aspect-[4/5] rounded-md bg-sage-soft">
              <Photo
                src="/images/materials.jpg"
                alt="A still life of sandstone, wood, and linen standing in for a founder portrait that has not been added."
                width={1600}
                height={1200}
                className="h-full w-full rounded-md"
              />
            </div>
            <p className="mt-3 text-sm text-muted">Portrait to be added. This photograph is a material study, not a person.</p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h2 className="font-serif text-3xl text-forest">Values and approach</h2>
            <ul className="mt-8 space-y-6">
              {values.map((value) => (
                <li key={value.title} className="border-t border-line pt-5">
                  <h3 className="font-serif text-2xl text-forest">{value.title}</h3>
                  <p className="mt-2 text-muted">{value.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-2 md:px-10 md:py-24">
        <Photo
          src="/images/courtyard.jpg"
          alt="Sandstone courtyard architecture with a pool and a tree."
          width={1728}
          height={1152}
          className="aspect-[3/2] w-full rounded-lg"
        />
        <div>
          <h2 className="font-serif text-4xl text-forest">Nature is part of the brief.</h2>
          <p className="mt-4 text-muted">
            Courtyards, plants, and a bowl of water are not decoration added at the end. They are how a building stays
            in conversation with the day. The same attention can scale down to a single shelf and a single stone.
          </p>
          <Link to="/services" hash="enquire" className={cn(buttonVariants(), "mt-8")}>
            Plan a consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
