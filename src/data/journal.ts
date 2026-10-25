import type { Article } from "@/types/catalog";

export const articles: Article[] = [
  {
    slug: "what-a-visit-looks-at",
    title: "What a Vastu visit actually looks at",
    date: "12 March 2026",
    readingMinutes: 4,
    excerpt:
      "A consultation is a reading of light, entry, and daily use — not a verdict on a family’s future.",
    image: "/images/courtyard.jpg",
    imageAlt: "A sandstone courtyard with a still pool and a flowering tree.",
    paragraphs: [
      "Sample article. Replace this with the studio’s own writing before you publish it as advice.",
      "Vastu Shastra is a traditional Indian approach to buildings. At Pooja Rajput Vastu it is treated as a design conversation. The useful questions are simple: where does morning light land, where do people pause when they enter, and which rooms are asked to do too many jobs?",
      "A visit does not rank a home as lucky or unlucky. It also does not diagnose illness, predict money, or override an engineer. If a wall is unsafe, that is a matter for a structural professional, not a compass.",
      "What you should leave with is a short list: keep, move, or discuss with your architect. The list should be specific to your plan and your routine. Generic rules, copied without looking at the rooms, are not a consultation.",
      "If a practitioner promises a fixed result — a marriage, a promotion, a cure — treat that as a reason to pause. Thoughtful guidance can make a house easier to live in. It cannot sign an outcome.",
    ],
  },
  {
    slug: "light-and-thresholds",
    title: "Light, thresholds, and everyday rooms",
    date: "2 February 2026",
    readingMinutes: 5,
    excerpt:
      "Peaceful rooms are usually the ones where light, path, and purpose are not fighting each other.",
    image: "/images/living.jpg",
    imageAlt: "Ivory linen seating in a bright, uncluttered living room.",
    paragraphs: [
      "Sample article about spatial balance. Edit or replace it with your own notes.",
      "Start at the door. A threshold that is cluttered, dark, or aimed straight at a toilet door tends to feel unsettled, even before anyone names a rule. Clearing a path and giving the eye a calm place to land is often the first improvement.",
      "Light is the next teacher. A room that is only bright at noon and gloomy at breakfast will be hard to use well. Mirrors, pale limewash, and a lighter curtain can help, but they are experiments, not rituals with guaranteed effects.",
      "Then ask what the room is for. A bedroom that is also an office and a storeroom will feel tired. Vastu language sometimes describes this as a conflict of activity. In plain words, the room needs fewer jobs.",
      "None of this requires a new house. It asks for attention: one door, one window, one piece of furniture moved so the day can pass more quietly.",
    ],
  },
  {
    slug: "caring-for-crystals",
    title: "Caring for crystal specimens",
    date: "18 January 2026",
    readingMinutes: 3,
    excerpt:
      "How to keep a mineral looking like itself — without folklore presented as a fact.",
    image: "/images/materials.jpg",
    imageAlt: "Close view of sandstone, wood, linen, and brass.",
    paragraphs: [
      "Sample product note. Confirm care advice with the supplier of each real stone.",
      "Most quartz and tourmaline in a home collection need very little: a dry soft cloth, a stable shelf, and protection from knocks. Soaking a specimen because a trend said to “cleanse” it can damage the matrix or the base it is glued to.",
      "Sunlight is pleasant and, for some stones, slowly fading. If a piece is valued for a delicate colour, give it bright indirect light instead of a west-facing sill all afternoon.",
      "Labels matter more than rituals. Note whether a citrine is natural or heat-treated, and where it came from, if the seller told you. Do not invent an origin.",
      "Crystals can be beautiful objects in a considered room. They are not medicine, and they are not a financial plan.",
    ],
  },
  {
    slug: "before-the-walls",
    title: "Before the walls go up",
    date: "5 December 2025",
    readingMinutes: 4,
    excerpt:
      "A floor plan is easier to change on paper than after the plaster.",
    image: "/images/studio.jpg",
    imageAlt: "An architecture desk in north light, with paper and a small plant.",
    paragraphs: [
      "Sample article for people planning a build. It is not a substitute for an architect.",
      "The cheapest time to move a kitchen is before it exists. A plan review looks at the drawing you already have: the north point, the road, the staircase, and the rooms that share walls with noise.",
      "Bring the way you live, not only the plot size. A family that cooks late needs a different kitchen relationship to the bedrooms than a family that is out all day. The drawing cannot know that unless you say it.",
      "Ask your architect which comments are easy and which fight the structure. A Vastu note that ignores columns and drains is not helpful. Good guidance leaves room for the people who must build the house.",
      "When the plan feels settled, stop adding rules. A home needs to be buildable, pleasant, and honest about its site.",
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
