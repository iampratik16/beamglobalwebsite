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
  eyebrow: "The opportunity",
  // Intro paragraph sitting under the serif headline.
  intro:
    "Beam Global Services has the singular goal of helping clients get the most out of their investments in Governance, Risk & Compliance (GRC) applications by taking care of all application support needs and providing expert guidance, where required.",
  problemHeading: "What problem are we solving?",
  problemBody: [
    "Due to an increase in regulatory requirements over the last 20 years, almost all large and mid-size companies have invested in GRC applications, the term GRC can refer to general applications which help clients document controls and track evidence and can also refer to specialised applications that cater to very specific risks (e.g. ERP security and controls). These projects incur large capex investments which provide business benefits via ease of compliance management.",
    "However, these applications require specialised in-house resources who act as administrators or support staff which adds operational expenditure. Also, given the specialised nature of these applications, the audit and control teams rarely have the bandwidth to utilise the functionality available, a lot of times, these applications aren't utilised effectively and there is a degeneration of processes leading to wasted manual effort in using them for compliance purposes.",
  ],
  helpIntro: "We have a specialised team of GRC experts who help clients:",
  helpPoints: [
    "Support specialised GRC products by using technology to drive cost efficiencies.",
    "Provide specialist risk management advice on how to make the most of your existing GRC investments by maximising automation in your control procedures.",
    "Work closely with your Audit, Finance and IT teams to improve implementation of business controls.",
  ],
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
