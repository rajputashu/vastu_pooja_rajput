export type ProductCategory = "calm" | "clarity" | "grounding" | "warmth";

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  priceInr: number;
  stock: number;
  image: string;
  imageAlt: string;
  summary: string;
  description: string;
  care: string[];
};

export type Service = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  description: string;
  includes: string[];
  priceLabel: string;
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  readingMinutes: number;
  excerpt: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const categoryLabels: Record<ProductCategory | "all", string> = {
  all: "All specimens",
  calm: "Calm",
  clarity: "Clarity",
  grounding: "Grounding",
  warmth: "Warmth",
};
