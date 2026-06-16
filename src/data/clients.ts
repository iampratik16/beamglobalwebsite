/**
 * Client / track-record data for the homepage "Where our team has delivered"
 * section. Sector-grouped to double as a breadth-of-experience story.
 *
 * Adding a logo = one entry below; no JSX changes. Logos live in
 * /public/images/clients/ (see that folder's README).
 */

// TODO: confirm client relationship before launch.
// "track-record" = organisations our consultants have advised (team experience);
// "direct"        = organisations that are Beam Global Services clients.
export const RELATIONSHIP: "track-record" | "direct" = "track-record";

export const clientsHeader = {
  "track-record": {
    eyebrow: "Track record",
    heading: "Where our team has delivered",
    sub: "Our consultants have advised some of the world's most demanding organisations on governance, risk and compliance.",
  },
  "direct": {
    eyebrow: "Clients",
    heading: "Trusted by leading organisations",
    sub: "Organisations that rely on us to get the most from their GRC investments.",
  },
} as const;

export type Client = {
  name: string;
  logoSrc: string;
  alt: string;
};

export type ClientSector = {
  sector: string;
  clients: Client[];
};

export const clientSectors: ClientSector[] = [
  {
    sector: "Financial Services",
    clients: [
      { name: "Barclays", logoSrc: "/images/clients/barclays.png", alt: "Barclays" },
      { name: "Lloyds Banking Group", logoSrc: "/images/clients/lloyds.png", alt: "Lloyds Banking Group" },
      { name: "Deutsche Bank", logoSrc: "/images/clients/deutsche-bank.png", alt: "Deutsche Bank" },
      { name: "Bank of America", logoSrc: "/images/clients/bank-of-america-v2.png", alt: "Bank of America" },
      { name: "ANZ", logoSrc: "/images/clients/anz-v3.png", alt: "ANZ" },
      { name: "Aviva", logoSrc: "/images/clients/aviva.webp", alt: "Aviva" },
    ],
  },
  {
    sector: "Public Sector",
    clients: [
      { name: "Department for Work & Pensions", logoSrc: "/images/clients/dwp.png", alt: "Department for Work & Pensions" },
      { name: "Defra", logoSrc: "/images/clients/defra-v2.png", alt: "Defra" },
      { name: "Royal Botanic Gardens Kew", logoSrc: "/images/clients/kew-v2.png", alt: "Royal Botanic Gardens, Kew" },
    ],
  },
  {
    sector: "Industry & Energy",
    clients: [
      { name: "BP", logoSrc: "/images/clients/bp-v2.png", alt: "BP" },
      { name: "JLL", logoSrc: "/images/clients/jll.png", alt: "JLL" },
      { name: "Tigo", logoSrc: "/images/clients/tigo.png", alt: "Tigo" },
      { name: "Virgin Media", logoSrc: "/images/clients/virgin-media.png", alt: "Virgin Media" },
    ],
  },
  {
    sector: "Professional Services",
    clients: [
      { name: "Deloitte", logoSrc: "/images/clients/deloitte.png", alt: "Deloitte" },
      { name: "EY", logoSrc: "/images/clients/ey.webp", alt: "EY" },
    ],
  },
];
