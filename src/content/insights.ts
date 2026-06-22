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

/**
 * Plain-English "What is GRC?" explainer for readers new to the subject.
 * Drafted and editorially verified for accuracy and clarity.
 */
export const grcExplainer = {
  hero: {
    eyebrow: "Insights Hub",
    heading: "What is GRC?",
    lead: "A plain-English guide to Governance, Risk & Compliance, what the three letters mean, why organisations invest in it, and where it tends to get stuck.",
  },
  intro: [
    "GRC stands for Governance, Risk and Compliance. It describes three connected jobs that every organisation has to do: decide how it will be run, work out what could go wrong, and follow the rules that apply to it. None of these is new on its own. GRC simply means handling them as one coordinated effort rather than as three separate ones run by teams that rarely speak to each other.",
    "Organisations adopt GRC because the alternative is costly and slow. When the same risk is tracked in five different spreadsheets, when a rule changes and nobody tells the team it affects, or when an auditor asks a question and the answer takes three weeks to find, the cost mounts up. A clear GRC approach gives everyone the same picture, so decisions are made deliberately rather than by accident and problems are caught early rather than after the damage is done.",
  ],
  pillars: [
    {
      name: "Governance",
      tagline: "Deciding how the organisation is run",
      body: "Governance covers the rules, roles and decisions that set out who is in charge of what and how choices get made. For example, a policy stating that any purchase over £10,000 needs sign-off from two managers is governance in practice: it makes authority clear and stops one person spending money unchecked.",
    },
    {
      name: "Risk",
      tagline: "Spotting what could go wrong",
      body: "Risk management means identifying what could harm the organisation, judging how likely and how serious each threat is, and deciding what to do about it. A shop owner who notices that one supplier provides 80 per cent of their stock, and signs up a second supplier as backup, is managing risk so that a single failed delivery cannot shut the business down.",
    },
    {
      name: "Compliance",
      tagline: "Following the rules that apply",
      body: "Compliance is the work of meeting the laws, regulations and standards an organisation must follow, and being able to prove it. A company that stores customer data securely, deletes it on request and keeps a record of having done so is meeting data protection law and can show an auditor the evidence.",
    },
  ],
  why: {
    heading: "What good GRC does for a business",
    body: "When governance, risk and compliance work together, the people running an organisation can see what they are accountable for, what might trip them up, and which rules they must meet. That shared view means fewer surprises, quicker decisions, and far less time lost to chasing scattered information.",
    points: [
      "Fewer surprises: problems are spotted and dealt with before they grow into crises or fines",
      "Clear accountability: everyone knows who owns each decision, control and risk, so nothing slips through unnoticed",
      "Calmer audits: evidence is gathered as you go, so answering a regulator takes hours rather than weeks",
      "Better decisions: leaders can weigh opportunities against the real risks using one trusted set of facts",
    ],
  },
};

/** The recurring GRC challenges, from both the client and vendor side. */
export const grcChallenges = {
  eyebrow: "Client & vendor perspective",
  heading: "Where GRC gets stuck",
  lead: "GRC products promise a lot, but the organisations that buy them and the vendors that build them keep running into the same problems.",
  groups: [
    {
      title: "Client challenges",
      image: "/images/insights/client-challenges-v3.png",
      imageAlt: "A business leader weighing the cost and value of a GRC investment",
      points: [
        "ROI on GRC product investment, is the product actually providing business benefits?",
        "Operational expenditure on dedicated GRC support staff, resource costs and training costs",
        "Ownership of GRC administration: IT vs Finance vs Audit",
      ],
    },
    {
      title: "Vendor challenges",
      image: "/images/insights/vendor-challenges-v3.png",
      imageAlt: "A software specialist reviewing how a GRC product is being used",
      points: [
        "Customers not using the product effectively, leading to low usage",
        "Customer retention is hard because of the specialised nature of the product",
        "Unskilled client staff supporting the application, which increases the cost of support and issue resolution",
      ],
    },
  ],
};
