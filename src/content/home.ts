/** Homepage content, hero rotation, positioning, culture pillars. */

export const homeHero = {
  eyebrow: "Governance · Risk · Compliance",
  // Rotating headline messages from the live homepage slider.
  headlines: [
    "Empowering Your GRC Investments",
    "Developing People, Delivering Results",
    "Revolutionising Your Financial Journey with Beam Global Services",
  ],
  lead: "We help organisations get the most out of their investments in Governance, Risk & Compliance, taking care of every application support need and providing expert guidance on maximising ROI.",
  primaryCta: { label: "Explore our services", href: "/services" },
  secondaryCta: { label: "Talk to us", href: "/contact" },
};

export const positioning = {
  eyebrow: "Who we are",
  heading: "Singular focus. Measurable return on your GRC investment.",
  body: "Beam Global Services has the singular goal of helping clients get the most out of their investments in Governance, Risk & Compliance (GRC) products by taking care of all application support needs and providing expert guidance on maximising ROI.",
};

export type CulturePillar = {
  name: string;
  tagline: string;
  image?: string;
};

/** The three culture pillars on the live homepage. */
export const culturePillars: CulturePillar[] = [
  {
    name: "Transformation",
    tagline: "Leading tomorrow's sustainability promise.",
    image: "/images/pillars/transformation.png",
  },
  {
    name: "Sustainability",
    tagline: "Transforming the now to build the new.",
    image: "/images/pillars/sustainability.png",
  },
  {
    name: "Integrity & Trust",
    tagline: "Safeguarding the future with trust-based offerings.",
    image: "/images/pillars/integrity.png",
  },
];
