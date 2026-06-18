/**
 * Single source of truth for global site data: company facts, contact
 * details, navigation taxonomy and footer columns. All copy preserved from
 * the live Beam Global Services site; new microcopy is British English.
 */

export const site = {
  name: "Beam Global Services",
  shortName: "Beam Global",
  // Production/canonical domain, drives metadataBase, sitemap and OG URLs.
  url: "https://beamglobalservices.com",
  description:
    "Beam Global Services has the singular goal of helping clients get the most out of their investments in Governance, Risk & Compliance (GRC) products by taking care of all application support needs and providing expert guidance on maximising ROI.",
  email: "support@beamglobalservices.com",
  // NOTE: live site shows a demo phone/postal address (template placeholders).
  // We surface the verified email and office cities; swap in real details here.
  phone: "", // TODO: add verified phone number
  offices: ["London", "Delhi", "Bengaluru"],
  regions: ["Global", "India"],
  founded: 2019,
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export type MegaMenuGroup = {
  label: string;
  href: string;
  items: NavLink[];
};

/**
 * Primary top-level navigation. Contact is intentionally omitted here — the
 * "Get in touch" button (which links to /contact) serves that purpose.
 */
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Insights Hub", href: "/insights" },
  { label: "Case Studies", href: "/blog" },
  { label: "About Us", href: "/about" },
];

/**
 * Mega-menu structure for "Services", mirroring the live taxonomy:
 * Consulting / Digital Service · IT Governance.
 */
export const servicesMenu: MegaMenuGroup[] = [
  {
    label: "Consulting · Digital Service",
    href: "/services#digital",
    items: [
      { label: "Software Development and Integration", href: "/services/software-development-and-integration" },
      { label: "GRC Product Selection", href: "/services/grc-product-selection" },
      { label: "SafePaaS GRC Implementation", href: "/services/safepaas-grc-implementation" },
      { label: "SoD Implementation & Remediation", href: "/services/sod-implementation-remediation" },
      { label: "Oracle RMC Implementation", href: "/services/oracle-rmc-implementation" },
    ],
  },
  {
    label: "IT Governance",
    href: "/services#it-governance",
    items: [
      { label: "Strategic Consulting", href: "/services/strategic-consulting" },
      { label: "Government & Public Sector", href: "/services/government-public-sector" },
      { label: "Transformation Sector", href: "/services/transformation-sector" },
    ],
  },
  {
    label: "Managed Services",
    href: "/services/managed-services",
    items: [
      { label: "Application Managed Services", href: "/services/managed-services" },
      { label: "Controls Execution Services", href: "/services/managed-services" },
      { label: "GRC Strategy Services", href: "/services/managed-services" },
    ],
  },
];

/** Featured services shown with thumbnails in the mega-menu (PwC pattern). */
export const servicesFeatured: { label: string; href: string; image: string }[] = [
  {
    label: "Transformation Sector",
    href: "/services/transformation-sector",
    image: "/images/pillars/transformation.png",
  },
  {
    label: "SafePaaS GRC Implementation",
    href: "/services/safepaas-grc-implementation",
    image: "/images/subhero.png",
  },
  {
    label: "Strategic Consulting",
    href: "/services/strategic-consulting",
    image: "/images/services/strategic-consulting.png",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "GRC Product Selection", href: "/services/grc-product-selection" },
      { label: "SafePaaS GRC Implementation", href: "/services/safepaas-grc-implementation" },
      { label: "Oracle RMC Implementation", href: "/services/oracle-rmc-implementation" },
      { label: "Strategic Consulting", href: "/services/strategic-consulting" },
      { label: "Transformation Sector", href: "/services/transformation-sector" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Insights Hub", href: "/insights" },
      { label: "Case Studies", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms of Use", href: "/terms" },
];
