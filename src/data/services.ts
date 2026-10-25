import type { Service } from "@/types/catalog";

export const services: Service[] = [
  {
    slug: "home",
    title: "Home Vastu",
    image: "/images/living.jpg",
    imageAlt: "A sunlit living room with linen seating, stone, and a large window.",
    summary: "A calm look at the home you already live in.",
    description:
      "We walk through how the household actually uses each room — morning light, the main door, cooking, work, and rest. Suggestions stay practical: furniture, colour, and which rooms suit which activities. This is guidance, not a guarantee of health, wealth, or family outcomes.",
    includes: [
      "A conversation about how you live in the home",
      "Observations on entry, light, and room placement",
      "A written note you can share with family",
      "One follow-up conversation",
    ],
    priceLabel: "Price on request",
  },
  {
    slug: "office",
    title: "Office Vastu",
    image: "/images/studio.jpg",
    imageAlt: "A quiet studio desk with tracing paper, a brass ruler, and a small plant.",
    summary: "For a clinic, studio, shop, or small office.",
    description:
      "Workplaces have a different rhythm from homes: arrivals, waiting, focus, and storage. The visit looks at the entrance, the desks, and how clients or staff move. It will not promise sales or success. It can help the plan feel clearer and more comfortable to use.",
    includes: [
      "Review of the working layout",
      "Notes on reception, work zones, and storage",
      "Practical changes that do not require a rebuild",
      "A short written summary",
    ],
    priceLabel: "Price on request",
  },
  {
    slug: "factory",
    title: "Factory Vastu",
    image: "/images/factory.jpg",
    imageAlt: "A bright workshop with marigold walls, teal beams, and morning light.",
    summary: "For a workshop, unit, or small plant.",
    description:
      "A factory is read for arrival, how people and materials move, light on the floor, and where rest sits relative to work. Suggestions stay practical. This is not a safety audit, a labour review, or a promise of output.",
    includes: [
      "A walk-through of entry, floor, and stores",
      "Notes on movement, light, and rest areas",
      "Changes that do not override an engineer",
      "A short written summary",
    ],
    priceLabel: "Price on request",
  },
  {
    slug: "floor-plan",
    title: "Floor Plan Review",
    image: "/images/materials.jpg",
    imageAlt: "Sandstone, warm wood, linen, and a small brass bowl in soft light.",
    summary: "Drawings read before the walls are finished.",
    description:
      "Send a plan, or sit with printed drawings. The review looks at the plot’s orientation, the main door, the kitchen, and bedrooms as they are drawn. Comments are design observations. They are not a structural or legal approval, and your architect remains responsible for the building.",
    includes: [
      "Markup on the plan you provide",
      "Notes on door, kitchen, and bedroom placement",
      "Questions to take back to your architect",
      "One revision of the same plan",
    ],
    priceLabel: "Price on request",
  },
  {
    slug: "new-property",
    title: "New Property Guidance",
    image: "/images/garden.jpg",
    imageAlt: "A stone garden path beside still water, ferns, and trees.",
    summary: "A second opinion before you commit to a site or a shell.",
    description:
      "Choosing a plot or an unfinished home is easier with a patient reading of light, access, and the shape of the land. This session helps you notice what the place is like to inhabit. It is not a valuation, a legal title check, or a promise that the purchase will go well.",
    includes: [
      "Review of site photos, a visit, or both",
      "Notes on approach, light, and likely room positions",
      "A comparison if you are deciding between two options",
      "A written note for your own records",
    ],
    priceLabel: "Price on request",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
