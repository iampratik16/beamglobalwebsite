/**
 * Leadership team. Drives the home-page "Leadership" section and the
 * dedicated profile pages at /team/[slug]. Order is intentional:
 * Navinder, then Preethi, then Shreyas.
 */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  location: string;
  country: string;
  photo: string;
  /**
   * Focal point for the photo inside the fixed profile frame, as a CSS
   * `object-position` value (e.g. "50% 22%"). The frame uses `object-cover`,
   * so this keeps the face nicely framed without cropping the head.
   */
  focal: string;
  /** One-line summary for cards and the profile intro. */
  summary: string;
  /** Full biography as paragraphs. */
  bio: string[];
  /** "At a glance", areas of focus and education. */
  areasOfFocus: string[];
  education: string[];
  /** Optional LinkedIn profile URL. */
  linkedin?: string;
};

export const team: TeamMember[] = [
  {
    slug: "navinder-kaplish",
    name: "Navinder Kaplish",
    role: "Founder",
    location: "London",
    country: "United Kingdom",
    photo: "/images/team/navinder-kaplish.jpg",
    // Tall 2:3 portrait, head sits high, pull the crop up so there is clear
    // headroom above the hair and the top of the head is never cut.
    focal: "50% 10%",
    linkedin: "https://www.linkedin.com/in/navkaplish/",
    summary:
      "Has led global Governance, Risk & Compliance programmes for clients for over 18 years, with a Big Four audit background.",
    bio: [
      "Navinder has led multiple global Governance, Risk & Compliance (GRC) programmes for clients over the last 18 years. He comes from a Big Four audit background, having worked at Deloitte and Ernst & Young.",
      "Navinder specialises in working with client audit, finance and IT teams to find solutions to risk and compliance challenges, especially when implementing and using complex ERP systems like Oracle, PeopleSoft and SAP.",
      "Navinder is passionate about helping clients find solutions to their GRC challenges and has spoken at multiple webinars on a variety of risk management topics.",
      "Navinder has an MBA from London Business School.",
    ],
    areasOfFocus: [
      "Governance, Risk & Compliance",
      "Risk & Compliance Programmes",
      "ERP Controls",
      "Audit",
    ],
    education: ["MBA, London Business School"],
  },
  {
    slug: "preethi-hari",
    name: "Preethi Hari",
    role: "Founder",
    location: "London",
    country: "United Kingdom",
    photo: "/images/team/preethi-hari-hd.jpg",
    // AI-upscaled from a 300px original, with added headroom, centre framing.
    focal: "50% 28%",
    linkedin: "https://www.linkedin.com/in/preethihari/",
    summary:
      "An experienced Governance, Risk & Compliance professional with 18+ years across risk management, IT governance, audit and compliance.",
    bio: [
      "Preethi is an experienced Governance, Risk & Compliance professional with 18+ years of experience in Risk Management, IT Governance, IT Security, Business Continuity, Audits, Compliance and Regulatory. She specialises in the COBIT / COSO framework, ITSM (ITIL), 6-Sigma and SOX across Banking, Insurance, Oil & Gas, Shipping, Mining, Logistics, Telecom and Commercial Real Estate.",
      "She has led large, complex risk and compliance programmes for Deloitte, Ernst & Young and KPMG. She has worked with leading financial sector companies such as Deutsche Bank, ING, Bank of America, Barclays and Lloyds.",
      "Preethi has an MBA from London Business School.",
    ],
    areasOfFocus: [
      "Risk Management",
      "IT Governance",
      "IT Security",
      "Audit & Compliance",
      "Business Continuity",
    ],
    education: ["MBA, London Business School"],
  },
  {
    slug: "shreyas-ananth",
    name: "Shreyas Ananth",
    role: "COO",
    location: "Bengaluru",
    country: "India",
    photo: "/images/team/shreyas-ananth.jpg",
    // Near-square headshot, keep eyes in the upper third.
    focal: "50% 25%",
    linkedin: "https://www.linkedin.com/in/shreyas-ananth-23b0b62b/",
    summary:
      "A technologist with over 12 years leading complex technology development and support for risk-management applications.",
    bio: [
      "Shreyas is a technologist at heart and has over 12 years of experience in leading complex technology development and support projects for Risk Management software applications.",
      "He has established IT support models and processes at global businesses while ensuring minimum downtime for mission-critical applications.",
      "He is ITIL-certified and is a SCRUM Master.",
      "Shreyas has a Masters in Distributed Systems & Networks from the University of Kent.",
    ],
    areasOfFocus: [
      "Technology Development",
      "IT Support & Operations",
      "Risk Management Systems",
      "ITIL",
      "Agile / SCRUM",
    ],
    education: ["MSc Distributed Systems & Networks, University of Kent"],
  },
];

export const teamSlugs = team.map((m) => m.slug);

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((m) => m.slug === slug);
}
