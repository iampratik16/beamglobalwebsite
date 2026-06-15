# Claude Code Build Brief — Beam Global Services Website Rebuild

> Paste this entire document into Claude Code as your initial prompt. It is written to be executed in phases with build/typecheck gates so the project compiles cleanly at every step.

---

## 0. Role & operating rules

You are a senior frontend engineer building a production-grade corporate website. Work autonomously and methodically. Follow these rules for the entire session:

1. **Build in the phases defined in Section 9. Do not skip ahead.** After each phase, run `npm run build` and `npx tsc --noEmit`. Fix every error and warning before moving to the next phase. Never leave the project in a non-compiling state.
2. **Single source of truth for content.** All page copy and the service taxonomy live in typed TypeScript content modules under `src/content/`. Pages render from that data. Do not hardcode copy inside components.
3. **DRY the service pages.** There are 13 service detail pages. Build **one** reusable template plus a typed data array and generate them with a dynamic route. Do not write 13 near-identical files.
4. Mark every component that uses hooks, event handlers, browser APIs, or animation as `"use client"`. Keep content/data modules and page shells as server components.
5. Never use `localStorage`, `sessionStorage`, `window`, `Date.now()`, or `Math.random()` during render — these cause hydration mismatches. Guard any browser-only code in `useEffect`.
6. Write **British English** for any new microcopy (optimise, organisation, programme, centre). Preserve Beam's existing copy verbatim — do not pad it with AI filler.
7. Do **not** fabricate testimonials, client names, statistics, certifications, awards, or case studies. If a section needs proof and no real data is supplied, use clearly neutral placeholder content or omit the section.
8. After each phase, print a short summary of what changed and the build/typecheck result.

---

## 1. Objective

Rebuild the website for **Beam Global Services** (a Governance, Risk & Compliance — "GRC" — consultancy, client base mostly in the UK). 

- **Content**: keep the same content as the current live site `https://beamglobalservices.com/`.
- **Design language / aesthetics / user flow**: emulate the editorial polish, structure, and professionalism of `https://www.pwc.com/gx/en.html`.
- **Brand**: keep Beam's own identity. Do **not** copy PwC's logo, brand colours (their orange), imagery, or copy — emulate the *quality and structure* only.
- Outcome: a fast, multi-page, SEO-strong, accessible, visibly premium corporate site that would not look out of place next to a Big-4 firm.

---

## 2. Source material

**Content to preserve (fetch these live pages and reuse their real copy):**

- Home: `https://beamglobalservices.com/`
- About Us: `https://beamglobalservices.com/about-us/`
- Contact: `https://beamglobalservices.com/contact-us/`
- Services index: `https://beamglobalservices.com/services/`
- Insights Hub: `https://beamglobalservices.com/insights-hub/`
- Blogs: `https://beamglobalservices.com/blogs/`
- Careers: `https://beamglobalservices.com/careers/`
- Service detail pages (fetch each — preserve headline, intro/lead, capability blocks, and CTA):
  - `/service/software-development-and-integration/`
  - `/service/grc-product-selection/`
  - `/service/safepaas-grc-implementation/`
  - `/service/sod-implementation-remediation/`
  - `/service/oracle-rmc-implementation/`
  - `/service/strategic-consulting/`
  - `/service/government-public-sector/`
  - `/service/transformation-sector/`
  - `/service/startup/`
  - `/service/scaleup-advisory/`
  - `/service/incubator-accelerators-advisory/`
  - `/service/ipo-readiness/`
  - `/service/finance-transformation/`

**Design reference (structure & polish only):** `https://www.pwc.com/gx/en.html`

**Known company facts to anchor copy:**
- Positioning: "Beam Global Services has the singular goal of helping clients get the most out of their investments in Governance, Risk & Compliance (GRC) products by taking care of all application support needs and providing expert guidance on maximising ROI."
- Hero lines in current use: "Empowering Your GRC Investments", "Developing people, Delivering result", "Revolutionizing Your Financial Journey with Beam Global Services".
- Three culture pillars on the homepage: **Transformation**, **Sustainability**, **Integrity & Trust**.
- About content blocks: Who Are We, Vision, Mission, Core Values (preserve the existing paragraphs).

---

## 3. Service taxonomy (the navigation backbone — reproduce exactly)

**Services → Consulting → Digital Service**
- Software Development and Integration
- GRC Product Selection
- SafePaaS GRC Implementation
- SoD Implementation & Remediation
- Oracle RMC Implementation

**Services → IT Governance**
- Strategic Consulting
- Government & Public Sector
- Transformation Sector

**Services → Entrepreneurship**
- Startup
- Scaleup Advisory
- Incubator & Accelerators Advisory
- IPO Readiness
- Finance Transformation

Top-level nav: **Services · Insights Hub · Blogs · About Us · Contact** (plus a "Careers" entry in the footer/utility area).

---

## 4. Tech stack (pinned for reliability)

- **Next.js 15** (App Router) + **React 19** + **TypeScript (strict)**
- **Tailwind CSS v4** — CSS-first config. Define design tokens with `@theme` in `globals.css`. **Do not** create a v3-style `tailwind.config.js` with a `content[]` array, and do not mix v3 and v4 patterns.
- **next/font/google** for fonts (no runtime font requests)
- **next/image** for all imagery
- Content as **typed TypeScript modules** in `src/content/` (no CMS/database in v1 — keeps the first build dependency-free and error-free). Note Payload v3 as an optional later upgrade for blogs/insights.
- Contact form via a **Next.js server action** with **zod** validation; stub the email send with a clearly marked integration point (e.g. Resend/SMTP) — do not wire real credentials.
- **Reveal-on-scroll** via a small `IntersectionObserver` hook + CSS transitions. Keep animation lean. (Framer Motion / GSAP + Lenis are optional enhancements only if the build stays green.)
- SEO: Next.js **Metadata API** (`generateMetadata` per route), `app/sitemap.ts`, `app/robots.ts`, Open Graph tags.
- Tooling: ESLint + Prettier, TypeScript strict, path alias `@/*`.

Scaffold with:
```bash
npx create-next-app@latest beam-global --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm
```
Target Node 20+. Deploy target: Vercel.

---

## 5. Design system (Beam, translated through PwC's discipline)

### Colour — editorial restraint: mostly ink on paper, ONE confident accent
First, attempt to extract Beam's existing brand accent from its logo (the current logo file suggests a warm/gold tone). If you cannot reliably extract it, use this default palette. Define as CSS variables in `@theme`:

```css
--color-ink:        #0E1116;  /* near-black: dark sections, headings */
--color-paper:      #FFFFFF;
--color-paper-alt:  #F5F4F2;  /* warm off-white alternating section bg */
--color-text:       #1A1A1A;
--color-muted:      #5A5F66;  /* secondary text */
--color-hairline:   #E3E1DD;  /* 1px dividers / borders */
--color-accent:     #C2872B;  /* refined amber/gold — Beam brand; override from logo if extractable */
--color-accent-ink: #8A5A12;  /* darker accent for text/hover on light bg (AA-safe) */
```

**Colour usage rules (this is the PwC move):**
- Body text and most links are **ink**, not the accent. Use the accent for: eyebrow labels, icons, small fills, underline reveals, and key highlights only — never for large blocks of body text.
- Dark sections (hero, CTA bands, footer) use **ink** background with paper text.
- Verify all text meets **WCAG AA** contrast. For accent-coloured text on white, use `--color-accent-ink`.

### Typography (via next/font/google)
- **Headings / display:** `Inter Tight` — weights 600–800, tight letter-spacing on large sizes.
- **Body:** `Inter` — 400/500, line-height 1.6.
- **Editorial accent (pull-quotes, large stat captions):** `Source Serif 4`.

Fluid type scale (use `clamp`):
- Hero H1: `clamp(2.75rem, 6vw, 5.5rem)`, weight 800, tracking -0.02em
- Section H2: `clamp(2rem, 4vw, 3.25rem)`, weight 700
- H3: `clamp(1.5rem, 2.5vw, 2rem)`
- Eyebrow: `0.8125rem`, uppercase, letter-spacing 0.08em, accent or muted
- Lead paragraph: `clamp(1.15rem, 1.6vw, 1.4rem)`, muted
- Body: `1.0625rem`–`1.125rem`

### Layout & feel
- Max container **1320px** with generous gutters (`px-6 md:px-10`). 12-column mental model.
- Vertical section rhythm: `clamp(4rem, 10vh, 9rem)` top/bottom.
- **Squared geometry** — border-radius 0–4px max. No pill shapes, no heavy shadows. Use 1px hairline dividers, not boxes.
- Alternate `paper` / `paper-alt` section backgrounds for rhythm; punctuate with one or two full-bleed `ink` sections.
- Hover/motion: understated. Link = animated underline reveal. Card = subtle image zoom + arrow nudge. Reveal-on-scroll = fade + 12px rise, ~500ms, once.

---

## 6. Component inventory (build these as reusable primitives)

- **Header** — sticky; transparent over the hero, solid (paper + hairline bottom) on scroll. Desktop: **mega-menu** dropdown for "Services" showing the three pillars as columns (mirrors PwC's multi-column menu). Mobile: full-screen drawer with accordion sections. Keyboard accessible (Esc closes, focus trap, arrow nav), logo links home.
- **Footer** — dark (`ink`). Top **utility band** with three cards: *Careers*, *Contact us*, *Offices/Get in touch* (PwC's Careers/Press/Offices pattern). Then link columns (Services, Insights Hub, Blogs, About Us, Careers), the company description, and a legal row with copyright + Privacy / Cookie / Terms links. Include a GDPR-style cookie notice bar (dismissible, no tracking wired).
- **Eyebrow** — small uppercase label.
- **SectionHeader** — eyebrow + H2 + optional lead.
- **Hero** — full-bleed image (or muted video) with ink overlay, eyebrow, H1, lead, primary CTA. Homepage hero may rotate 2–3 headline messages (the existing slider lines).
- **StatCallout** — oversized number/figure (Source Serif 4) + supporting label, for any real metrics only.
- **PullQuote** — large serif quote + attribution.
- **Card** — image, eyebrow/category, title, excerpt, arrow link. Variants: service, insight, blog, utility. Used in responsive grids.
- **CardGrid** — responsive 1/2/3-up.
- **PillarFeature** — the three culture pillars (Transformation / Sustainability / Integrity & Trust) as a clean three-up with image + label + one-line.
- **CTABand** — full-width ink or accent band with heading + button (the "Looking for a First-Class Business Plan Consultant?" / "Elevate Your Career" CTAs).
- **Breadcrumbs** — for interior pages.
- **ServiceTemplate** — interior service page: hero (eyebrow=pillar, H1=service headline), intro lead, capability grid (the per-service capability blocks), and a closing CTA band. Driven entirely by the service data array.
- **ContactForm** — name, email, company, message; zod validation; inline errors; success state; server action stub.
- **Reveal** — `IntersectionObserver` wrapper for scroll-in animation.

---

## 7. Routes / site map

```
/                                  Home
/about                             About Us  (Who Are We, Vision, Mission, Core Values)
/contact                           Contact (form + details)
/services                          Services index (3 pillars overview + grid of all 13)
/services/[slug]                   Service detail (13 entries via ServiceTemplate)
/insights                          Insights Hub (card grid)
/blog                              Blog index (card grid)
/blog/[slug]                       Blog post
/careers                           Careers
```

Generate the 13 service pages and blog posts via dynamic routes + `generateStaticParams`. Use the slugs from Section 2.

---

## 8. Page composition

**Home** (mirror the existing content, elevated):
1. Hero — rotating headline (existing lines), lead, CTA.
2. Intro strip — the GRC positioning statement.
3. Culture pillars — Transformation / Sustainability / Integrity & Trust (PillarFeature).
4. Services overview — the three pillars with a "See all services" link.
5. "What's new" / Insights — card grid of latest posts (pull real titles/links from the live home page).
6. Careers CTA band + Contact CTA band.

**Services index** — eyebrow + H2 intro, then three labelled pillar sections, each with its services as cards.

**Service detail** — ServiceTemplate, content from the fetched live page (e.g. SafePaaS: headline "Automate Control. Simplify Compliance. Empower Governance.", intro lead, and the capability blocks: Access Governance, Risk Management, Compliance & Audit Management, Process Controls, Analytics & Reporting, then the closing CTA).

**About** — hero, "Who Are We?", Vision, Mission, Core Values (preserve existing paragraphs), each with supporting imagery.

**Insights Hub / Blog** — card grids; pull the real post titles, images, and links from the live pages. Blog post template renders title, meta, and body.

**Careers** — "Elevate Your Career, Embrace Your Future." hero + CTA to contact.

**Contact** — heading, working validated form, and contact details. Note region selector currently shows Global / India — keep a simple region indicator if desired.

---

## 9. Build phases (run `npm run build` + `npx tsc --noEmit` after each)

**Phase 1 — Scaffold & config.** create-next-app, set strict TS, Prettier, path alias. Confirm clean build.

**Phase 2 — Design system.** Define `@theme` tokens, fonts via next/font, base layout, container, typography utilities, colour usage. Build a temporary `/styleguide` page rendering type scale, colours, and buttons; verify visually; then it can be removed before launch.

**Phase 3 — Layout shell.** Header (with working mega-menu + mobile drawer + scroll state) and Footer (utility band + columns + legal + cookie bar). Wire into `app/layout.tsx`. Build the primitive components (Eyebrow, SectionHeader, Card, CardGrid, CTABand, Reveal, Breadcrumbs).

**Phase 4 — Content modules.** Fetch the live Beam pages and populate typed content modules: `services.ts` (array of 13 with slug, pillar, title, headline, lead, capabilities[], cta), `insights.ts`, `blog.ts`, plus `about.ts` and home content. Preserve existing copy verbatim.

**Phase 5 — Pages.** Build all routes in Section 7 from the content modules, including dynamic service and blog routes with `generateStaticParams`.

**Phase 6 — Forms & SEO.** Contact form server action + zod + states. `generateMetadata` per route, `sitemap.ts`, `robots.ts`, OG tags, favicon (recreate from existing).

**Phase 7 — Polish & QA.** Reveal animations, hover states, responsive pass (360 / 768 / 1024 / 1440), accessibility pass (semantic landmarks, alt text, focus states, keyboard nav, AA contrast), Lighthouse mental check (perf/SEO/a11y), remove styleguide. Final `npm run build` must pass with **zero errors and zero warnings**.

---

## 10. Assets

- Download Beam's **logo** and reused imagery from the live site into `public/brand/` and `public/images/` (prefer local files over hotlinking for performance and reliability). If you must reference remote images, configure `images.remotePatterns` for `beamglobalservices.com` in `next.config`.
- Where source images are low quality or missing, use tasteful neutral placeholders (tonal solid/gradient blocks sized to the layout) — **do not** hotlink random third-party images. Mark each placeholder with a clear `TODO` so they can be swapped.
- Recreate the favicon from the existing site favicon.

---

## 11. Do NOT

- Do not copy PwC's logo, their orange brand palette, their imagery, or their proprietary copy. Emulate structure and quality only.
- Do not invent testimonials, client logos, statistics, certifications, or case studies.
- Do not use `localStorage` / `sessionStorage` for core content, or any browser API during render.
- Do not write 13 separate service files — use one template + data.
- Do not leave the project non-compiling between phases.

---

## 12. Definition of done

- [ ] `npm run build` and `npx tsc --noEmit` pass with zero errors/warnings.
- [ ] All routes in Section 7 exist and render real Beam content.
- [ ] Mega-menu reproduces the full service taxonomy; works on desktop and mobile; fully keyboard accessible.
- [ ] Looks visibly premium and editorial — confident typography, generous whitespace, restrained single accent, squared geometry.
- [ ] Beam's brand is used throughout; no PwC identity copied.
- [ ] Responsive at 360 / 768 / 1024 / 1440; WCAG AA contrast; alt text on all images; semantic landmarks.
- [ ] SEO: per-page metadata, sitemap, robots, OG tags, favicon.
- [ ] Contact form validates and shows success/error states (email send stubbed with a clear integration TODO).
- [ ] British English in all new microcopy; existing copy preserved verbatim.

Begin with Phase 1. After each phase, report the build/typecheck result and a one-paragraph summary before continuing.
