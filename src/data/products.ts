import type { Product, ProductCategory } from "@/types/catalog";

/**
 * Sample catalogue only. Prices, stock, and descriptions are placeholders
 * until the studio replaces them with verified product information.
 */
export const products: Product[] = [
  {
    slug: "amethyst-cluster",
    name: "Amethyst Cluster",
    category: "calm",
    priceInr: 2800,
    stock: 4,
    image: "/images/amethyst.jpg",
    imageAlt: "A natural amethyst cluster resting on pale limestone.",
    summary: "A violet cluster, shown here as a sample piece for a quiet corner.",
    description:
      "This sample listing is an amethyst cluster of the kind often kept on a desk or bedside ledge. In many households it is chosen for its colour and for a sense of calm. It is a mineral specimen, not a medical treatment, and it does not guarantee a change in sleep, mood, or fortune.",
    care: [
      "Keep it out of prolonged harsh sun so the colour stays rich.",
      "Dust with a soft dry cloth. Avoid soaking.",
      "Sample stock only — this quantity is not a live inventory count.",
    ],
  },
  {
    slug: "rose-quartz",
    name: "Rose Quartz",
    category: "calm",
    priceInr: 1600,
    stock: 6,
    image: "/images/rose-quartz.jpg",
    imageAlt: "A raw rose quartz stone on pale linen.",
    summary: "A soft pink quartz, traditionally associated with gentleness.",
    description:
      "Rose quartz is a common mineral with a pale pink cast. People often place it where they want a room to feel softer. That is a matter of taste and tradition, not a promise about relationships or health. The price and stone shown here are sample data.",
    care: [
      "Wipe with a dry cloth.",
      "Keep it away from knocks — raw quartz can chip.",
      "Replace this description with the actual stone’s size and origin.",
    ],
  },
  {
    slug: "clear-quartz",
    name: "Clear Quartz",
    category: "clarity",
    priceInr: 1400,
    stock: 8,
    image: "/images/clear-quartz.jpg",
    imageAlt: "A clear quartz point standing on pale stone.",
    summary: "A transparent point, often chosen where a surface should feel light.",
    description:
      "Clear quartz is valued for its transparency. In a home it can sit near a window so light passes through it. Nothing about the stone itself clears a mind or a problem. Treat this page as a catalogue sample until real pieces are photographed and priced.",
    care: [
      "A barely damp cloth is enough, then dry it at once.",
      "Do not use chemical cleaners.",
      "Sample price — confirm before offering it for sale.",
    ],
  },
  {
    slug: "black-tourmaline",
    name: "Black Tourmaline",
    category: "grounding",
    priceInr: 2200,
    stock: 3,
    image: "/images/black-tourmaline.jpg",
    imageAlt: "A black tourmaline crystal beside ivory linen.",
    summary: "A dark, striated crystal often kept near an entrance.",
    description:
      "Black tourmaline is a dense, matte mineral. Some Vastu and crystal traditions place a dark stone near a threshold as a visual anchor. It does not block harm, illness, or bad luck. This listing uses a sample photograph and a sample price.",
    care: [
      "Dust gently. The surface marks if scrubbed.",
      "Keep it dry.",
      "Edit the weight and dimensions when you have the real piece.",
    ],
  },
  {
    slug: "citrine",
    name: "Citrine",
    category: "warmth",
    priceInr: 2400,
    stock: 5,
    image: "/images/citrine.jpg",
    imageAlt: "A honey-coloured citrine cluster on sandstone.",
    summary: "A warm golden cluster for a sunlit shelf.",
    description:
      "Citrine ranges from pale honey to deep gold. It is often placed where afternoon light can reach it. Traditions that link it with prosperity are cultural stories, not a financial result you can count on. Prices and stock on this page are examples.",
    care: [
      "Strong sun can fade some citrine. Bright indirect light is kinder.",
      "Dust only.",
      "Mark the piece as natural or heat-treated once you know.",
    ],
  },
];

export const categoryOrder = ["all", "calm", "clarity", "grounding", "warmth"] as const;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function filterProducts(category: ProductCategory | "all") {
  if (category === "all") return products;
  return products.filter((product) => product.category === category);
}
