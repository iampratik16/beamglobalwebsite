# Beam Global Services — Rebuild Notes

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-first `@theme`).

## Brand & design decisions
- **Accent colour extracted from the logo**: the Beam wordmark is a deep **crimson** (`#9B1C1C`, ~8:1 contrast on white → WCAG AAA for body text), with the shield emblem in **gold** (`#C2872B`). The brief defaulted to gold; we overrode to crimson as the single confident accent (per the brief's "override from logo if extractable"), using gold sparingly for eyebrows on dark sections.
- Editorial system: ink-on-paper, squared geometry (radius 0–4px), 1px hairline dividers, alternating `paper`/`paper-alt` sections, dark `ink` hero + CTA bands.
- Fonts via `next/font/google`: Inter Tight (display), Inter (body), Source Serif 4 (editorial accent). No runtime font requests.

## Content fidelity
- All page copy and the 13-service taxonomy preserved verbatim from the live site, stored as typed modules in `src/content/`.
- **Government & Public Sector**: the live page has a CMS copy-paste error (it shows Strategic Consulting's H1/intro). We kept the page's correct, government-specific capability blocks and wrote a fitting British-English headline/lead. Flagged for client confirmation.
- **Careers**: the live page borrowed PwC phrases ("community of solvers", "The New Equation"). Per the brief (do not copy PwC copy), we used Beam's own "Elevate Your Career, Embrace Your Future." line and original British-English microcopy aligned to Beam's real core values.
- **Blog**: titles, slugs and publication dates are the REAL values from the live `post-sitemap.xml` (original URLs preserved for SEO). Article **bodies** were not retrievable during the build (the live post pages render content via JS); excerpts are neutral topical standfirsts (no fabricated facts). See TODO below.

## SEO (parity or better)
- Per-route `generateMetadata` (title template, description, canonical, Open Graph, Twitter).
- `app/sitemap.ts` and `app/robots.ts` generated dynamically from content.
- JSON-LD structured data: `Service` on service pages, `BlogPosting` on blog posts.
- Semantic landmarks, skip-link, `lang="en-GB"`, British-English microcopy.

## Performance / robustness
- All imagery is either local (logo, static import → optimised by `next/image`) or CSS-only deterministic placeholder media (no hotlinking, no layout shift, no external requests).
- Reveal-on-scroll via a lean `IntersectionObserver` hook + CSS transitions; respects `prefers-reduced-motion`.
- No `localStorage`/`window`/`Date.now()`/`Math.random()` during render (cookie consent reads storage in `useEffect`; dates formatted deterministically from ISO strings).

## Design uplift (PwC-inspired, round 2)
Brought the editorial polish of the PwC homepage into Beam's brand — **no PwC orange, no copied imagery, no fabricated statistics**:
- **Glassmorphism**: `.glass` / `.glass-dark` utilities (backdrop-blur), used on the hero pillar panel, floating chips and the "Insight" card.
- **Layered hero**: rotating headline on the left; a dark-glass "What we stand for" pillar panel + floating "Expert GRC support" chip on the right.
- **EditorialFeature** (home): a big-serif statement ("Are you getting the full return?"), an overlapping "Featured thinking" card (latest real article), and a floating glass "Insight / ROI" card — echoing PwC's big-figure card with an honest typographic motif (no invented stat).
- **Big editorial serif** (`.text-display-serif`) on home and every service page ("How we approach …").
- **Elevated cards** (`.shadow-soft` + `.lift` + rounded-2xl) for insight/blog cards; refined capability cards with a growing gold rule on hover.
- Richer CTA bands (grid texture + colour glow).
- Blog posts now render the **real article bodies** (4 of 8; the other 4 are empty placeholders on the live site, kept as honest stubs).
- **Note on geometry**: this intentionally relaxes the brief's strict "squared, 0–4px radius" rule on select premium cards (rounded-2xl + soft shadow), at the client's request for a cooler, glassmorphic feel. Structural/editorial elements stay crisp.

## QA
- `scripts/qa.mjs` (puppeteer-core, uses system Chrome) measures horizontal overflow and captures full-page screenshots at 390 / 768 / 1440.
- Verified: **0px horizontal overflow on every route at all three widths**; clean production build (zero errors/warnings); reveal-on-scroll has a `<noscript>` fallback so content is visible without JS.

## Outstanding TODOs (clearly marked in code)
- [ ] Populate real blog article bodies (`src/content/blog.ts` — `body: []`).
- [ ] Swap CSS placeholder media for real brand photography (`PlaceholderMedia` usages).
- [ ] Add verified phone number / postal address (`src/content/site.ts`); live site shows demo placeholders.
- [ ] Replace placeholder legal copy after legal review (`src/content/legal.ts`).
- [ ] Wire a real email provider in the contact server action (`src/lib/contact-action.ts` integration point).
- [ ] Generate a brand favicon from the logo emblem.
