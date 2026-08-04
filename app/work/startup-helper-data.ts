export interface StartupCaseStudy {
  slug: string;
  name: string;
  raised: string;
  investors: string;
  logo: string;
  logoClass: string;
  description: string;
  work: string[];
}

export const STARTUP_CASE_STUDIES: StartupCaseStudy[] = [
  {
    slug: "mintlify",
    name: "Mintlify",
    raised: "$45M Series B",
    investors: "a16z + Salesforce Ventures",
    logo: "/startup-helper/mintlify.png",
    logoClass: "mintlifyLogo",
    description:
      "Documentation infrastructure for the teams building the next generation of software.",
    work: [
      "Built founder-led LinkedIn content around the shift from documentation to AI-native knowledge infrastructure.",
      "Connected organic distribution to a direct outbound motion for high-intent accounts.",
      "Turned product insight into a repeatable brand and pipeline-generation system.",
    ],
  },
  {
    slug: "reactor",
    name: "Reactor",
    raised: "$59M",
    investors: "Lightspeed Venture Partners",
    logo: "/startup-helper/reactor.webp",
    logoClass: "reactorLogo",
    description:
      "A developer platform for real-time generative video and interactive AI worlds.",
    work: [
      "Clarified the founder-led narrative for a new category emerging from stealth.",
      "Developed LinkedIn content that translated technical ambition into a market-level point of view.",
      "Paired the organic motion with direct outreach to create early category awareness and pipeline.",
    ],
  },
  {
    slug: "virio",
    name: "Virio",
    raised: "raised $1M",
    investors: "angel funding",
    logo: "/startup-helper/virio.svg",
    logoClass: "virioLogo",
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
    logo: "/startup-helper/ornn.png",
    logoClass: "ornnLogo",
    description:
      "Financial infrastructure for making compute capacity a more transparent marketplace.",
    work: [
      "Translated a complex infrastructure market into clear founder-led content themes.",
      "Built a direct social motion around the economic problem the company was solving.",
      "Used content as the bridge between category education, brand, and outbound conversations.",
    ],
  },
];
