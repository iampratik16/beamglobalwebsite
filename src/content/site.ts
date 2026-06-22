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
  // NOTE: live site shows a demo phone/postal address (template placeholders).
  // We surface office cities only; swap in real contact details here.
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
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
];

/**
 * Mega-menu structure for "Services", mirroring the live taxonomy:
 * Consulting / Digital Service · Managed Services.
 */
export const servicesMenu: MegaMenuGroup[] = [
  {
    label: "Consulting · Digital Service",
    href: "/services#digital",
    items: [
      { label: "GRC Product Selection", href: "/services/grc-product-selection" },
      { label: "Oracle Segregation of Duties Remediation", href: "/services/oracle-sod-remediation" },
      { label: "Oracle RMC Implementation", href: "/services/oracle-rmc-implementation" },
      { label: "Safepass Implementation", href: "/services/safepaas-grc-implementation" },
      { label: "Oracle Role Design", href: "/services/oracle-role-design" },
      { label: "Software Development and Integration", href: "/services/software-development-and-integration" },
    ],
  },
  {
    label: "Managed Services",
    href: "/services#managed-services",
    items: [
      { label: "Application Managed Services", href: "/services/application-managed-services" },
      { label: "Controls Execution Services", href: "/services/controls-execution-services" },
      { label: "GRC Strategy Services", href: "/services/grc-strategy-services" },
    ],
  },
];

/** Featured services shown with thumbnails in the mega-menu (PwC pattern). */
export const servicesFeatured: { label: string; href: string; image: string }[] = [
  {
    label: "Oracle Segregation of Duties Remediation",
    href: "/services/oracle-sod-remediation",
    image: "/images/services/hero/oracle-sod-remediation.png",
  },
  {
    label: "Safepass Implementation",
    href: "/services/safepaas-grc-implementation",
    image: "/images/subhero.png",
  },
  {
    label: "GRC Product Selection",
    href: "/services/grc-product-selection",
    image: "/images/services/grc-product-selection.png",
  },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    // Derived from servicesMenu so the footer order and completeness always
    // match the header mega-menu — no service is ever omitted or out of order.
    links: [
      { label: "All Services", href: "/services" },
      ...servicesMenu.flatMap((group) => group.items),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Insights Hub", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" },
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
