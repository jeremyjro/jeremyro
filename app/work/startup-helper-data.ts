export interface StartupCaseStudy {
  slug: string;
  name: string;
  raised: string;
  investors: string;
  description: string;
  work: string[];
}

export const STARTUP_CASE_STUDIES: StartupCaseStudy[] = [
  {
    slug: "virio",
    name: "Virio",
    raised: "raised $1M",
    investors: "angel funding",
    description:
      "An AI-native B2B content agency built around turning company context into market motion.",
    work: [
      "Helped shape the founder-led go-to-market story for an AI-native services company.",
      "Created content systems that made the company’s point of view legible to buyers.",
      "Connected content, outbound, and sales follow-up into one direct growth motion.",
    ],
  },
  {
    slug: "ornn",
    name: "Ornn",
    raised: "$33M seed",
    investors: "a16z crypto-led",
    description:
      "Financial infrastructure for making compute capacity a more transparent marketplace.",
    work: [
      "Translated a complex infrastructure market into clear founder-led content themes.",
      "Built a direct social motion around the economic problem the company was solving.",
      "Used content as the bridge between category education, brand, and outbound conversations.",
    ],
  },
];
