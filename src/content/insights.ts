/**
 * Insights Hub, a curated, editorial view over the same real Beam articles.
 * References blog posts by slug so there is one source of truth for content.
 */

import { blogPosts, type BlogPost } from "./blog";

export const insightsIntro = {
  eyebrow: "Insights Hub",
  heading: "Perspectives on governance, growth and the road ahead",
  lead: "Ideas and analysis from Beam Global Services, on Governance, Risk & Compliance, the entrepreneurial journey, and building organisations that endure.",
};

// Featured, more strategic pieces surfaced on the Insights Hub.
const featuredSlugs = [
  "the-growth-loop-how-customer-success-fuels-sustainable-scale",
  "indian-family-offices-the-new-investors-for-indias-startup-ecosystem",
  "intergenerational-trust-the-key-to-succession-in-family-business",
  "towards-a-climate-resilient-future-strategies-for-the-andaman-and-nicobar-islands",
  "venture-debt-the-rising-star-in-startup-financing-amid-indias-liquidity-crunch",
  "what-makes-your-customers-say-yes-to-your-product-or-service",
];

export const insights: BlogPost[] = featuredSlugs
  .map((slug) => blogPosts.find((p) => p.slug === slug))
  .filter((p): p is BlogPost => Boolean(p));
