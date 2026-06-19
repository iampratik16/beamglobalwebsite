import type { NextConfig } from "next";

/**
 * 301-style redirects for the WordPress → Next.js migration on
 * beamglobalservices.com. `permanent: true` emits HTTP 308, which Google
 * treats the same as a 301 (full ranking transfer). Source paths are written
 * WITHOUT trailing slashes (Next.js normalises them).
 */

// Old /service/<slug> → new /services/<slug> (exact slug matches only).
const serviceSlugs = [
  "software-development-and-integration",
  "grc-product-selection",
  "safepaas-grc-implementation",
  "sod-implementation-remediation",
  "oracle-rmc-implementation",
  "strategic-consulting",
  "government-public-sector",
  "transformation-sector",
  "application-managed-services",
  "grc-strategy-services",
];

// Renamed/merged services → the closest live /services/<slug>.
const renamedServices: { from: string; to: string }[] = [
  { from: "control-execution-services", to: "controls-execution-services" },
  { from: "control-testing-services", to: "controls-execution-services" },
  { from: "sod-remediation", to: "sod-implementation-remediation" },
];

// Services that no longer exist as standalone pages → /services index.
const droppedServiceSlugs = [
  "startup",
  "scaleup-advisory",
  "incubator-accelerators-advisory",
  "ipo-readiness",
  "finance-transformation",
  "business-strategy",
  "growth",
  "it-governance",
  "enterprise-risk-management",
  "erp-control-assurance",
  "sox-implementation",
  "fund-rising-strategy",
];

// Old top-level landing pages → /services index.
const landingToServices = [
  "/managed-services",
  "/grc",
  "/it-governance",
  "/risk-management",
  "/strategy",
  "/it-solutions",
];

// Old root /<slug> → new /blog/<slug> (all WordPress posts).
const blogSlugs = [
  "the-growth-loop-how-customer-success-fuels-sustainable-scale",
  "what-makes-your-customers-say-yes-to-your-product-or-service",
  "5-cyber-security-startups-to-watch-out-for",
  "venture-debt-the-rising-star-in-startup-financing-amid-indias-liquidity-crunch",
  "towards-a-climate-resilient-future-strategies-for-the-andaman-and-nicobar-islands",
  "intergenerational-trust-the-key-to-succession-in-family-business",
  "the-sb-digital-issue-be-a-better-decider",
  "indian-family-offices-the-new-investors-for-indias-startup-ecosystem",
];

// Old WordPress post categories → /blog.
const categorySlugs = ["customer-insights", "startups", "uncategorized"];

// Old /staff/<slug> → new /team/<slug> (slugs that match a live team route).
const staffSlugs = ["navinder-kaplish", "preethi-hari", "shreyas-ananth"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Services: exact slug matches ──────────────────────────────
      ...serviceSlugs.map((slug) => ({
        source: `/service/${slug}`,
        destination: `/services/${slug}`,
        permanent: true,
      })),
      // ── Services: renamed / merged ────────────────────────────────
      ...renamedServices.map(({ from, to }) => ({
        source: `/service/${from}`,
        destination: `/services/${to}`,
        permanent: true,
      })),
      // ── Services: dropped → /services index ───────────────────────
      ...droppedServiceSlugs.map((slug) => ({
        source: `/service/${slug}`,
        destination: "/services",
        permanent: true,
      })),
      // ── Old top-level landing pages → /services ───────────────────
      ...landingToServices.map((source) => ({
        source,
        destination: "/services",
        permanent: true,
      })),
      // ── Blog posts: old root /<slug> → /blog/<slug> ───────────────
      ...blogSlugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/blog/${slug}`,
        permanent: true,
      })),
      // ── Categories → /blog ────────────────────────────────────────
      ...categorySlugs.map((slug) => ({
        source: `/category/${slug}`,
        destination: "/blog",
        permanent: true,
      })),
      // ── Staff → team (live profiles) ──────────────────────────────
      ...staffSlugs.map((slug) => ({
        source: `/staff/${slug}`,
        destination: `/team/${slug}`,
        permanent: true,
      })),

      // ── Renamed index / content pages ─────────────────────────────
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/insights-hub", destination: "/insights", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },

      // ── Company / team → /about ───────────────────────────────────
      { source: "/our-team", destination: "/about", permanent: true },
      { source: "/company-overview", destination: "/about", permanent: true },
      { source: "/company-overview/:path*", destination: "/about", permanent: true },
      { source: "/staff/scott-elequin", destination: "/about", permanent: true },

      // ── Legal / misc ──────────────────────────────────────────────
      { source: "/disclaimer", destination: "/terms", permanent: true },
      { source: "/faq", destination: "/contact", permanent: true },
      { source: "/careers-old", destination: "/careers", permanent: true },
      { source: "/careers-2-2", destination: "/careers", permanent: true },

      // ── Bare index pages ──────────────────────────────────────────
      { source: "/service", destination: "/services", permanent: true },
      { source: "/staff", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
