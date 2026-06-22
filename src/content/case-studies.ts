/**
 * Client case studies. Each record drives the dynamic route
 * /case-studies/[slug] and the /case-studies index. The structure mirrors a
 * PwC-style success story: hero, bold standfirst, a facts bar, a "Situation"
 * and "Solution" narrative, structured delivery milestones, a highlight quote
 * and an "engagement at a glance" panel.
 *
 * Copy is grounded in the facts supplied by the project lead, no metrics or
 * claims are invented. Each study links to the Beam service it evidences via
 * `serviceSlug`, so the case study and the service page cross-reference.
 */

export type CaseStudyFacts = {
  client: string;
  industry: string;
  /** Beam's role on the engagement. */
  role: string;
  /** Headline product / platform featured. */
  featuring: string;
};

export type CaseStudySection = {
  eyebrow: string;
  heading: string;
  body: string[];
  image?: string;
  imageAlt?: string;
};

export type CaseStudyMilestone = {
  title: string;
  points: string[];
};

export type CaseStudy = {
  slug: string;
  /** Concise title for cards and listings. */
  cardTitle: string;
  /** Outcome-led hero H1. */
  title: string;
  eyebrow: string;
  date: string; // ISO YYYY-MM-DD
  readMinutes: number;
  heroImage: string;
  heroImageAlt: string;
  /** Listing-card thumbnail. */
  cardImage: string;
  /** Standfirst / card description / meta description. */
  excerpt: string;
  /** Bold intro sentence on the detail page. */
  intro: string;
  facts: CaseStudyFacts;
  /** Filter facets for the listing page. */
  topic: string;
  region: string;
  /** The Beam service this case study evidences (-> /services/<slug>). */
  serviceSlug: string;
  /** Overview paragraphs beneath the facts bar. */
  overview: string[];
  situation: CaseStudySection;
  solution: CaseStudySection;
  /** Structured delivery milestones. */
  milestones: { eyebrow: string; heading: string; items: CaseStudyMilestone[] };
  quote?: { text: string; attribution?: string };
  /** "Engagement at a glance" summary rows. */
  atAGlance: { label: string; value: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "oracle-rmc-implementation-ocado-group",
    cardTitle: "Oracle RMC implementation for Ocado Group",
    title:
      "Redesigning Oracle Cloud roles and automating controls for Ocado Group",
    eyebrow: "Beam Global Services and Ocado",
    date: "2026-05-30",
    readMinutes: 5,
    heroImage: "/images/case-studies/ocado-rmc-hero.jpg",
    heroImageAlt:
      "Two consultants reviewing Oracle Cloud access and controls together",
    cardImage: "/images/case-studies/ocado-rmc-card.jpg",
    excerpt:
      "How Beam Global Services redesigned Oracle Cloud job roles and implemented Oracle Risk Management Cloud (RMC) to establish least-privilege access and automated Segregation of Duties controls for Ocado Group.",
    intro:
      "Beam Global Services led the custom redesign of Oracle Cloud job roles and the end-to-end implementation of Oracle Risk Management Cloud (RMC) for Ocado Group, embedding clean, least-privilege access and automated Segregation of Duties (SoD) controls across Finance and Supply Chain.",
    facts: {
      client: "Ocado Group",
      industry: "Retail & online grocery technology",
      role: "Oracle Role Design & RMC Implementation",
      featuring: "Oracle Risk Management Cloud",
    },
    topic: "Governance, Risk & Compliance",
    region: "United Kingdom",
    serviceSlug: "oracle-rmc-implementation",
    overview: [
      "Ocado Group runs core finance and supply-chain operations on Oracle Cloud (Fusion). As the business scaled, its job roles and access privileges needed to be re-examined against audit expectations and Segregation of Duties (SoD) requirements, making sure no single user could perform conflicting tasks, such as creating and approving the same transaction.",
      "Beam Global Services led the engagement end to end with a specialist team of five, working alongside Ocado's Finance, Supply Chain and IT teams. The objective was twofold: redesign the Oracle Cloud roles around what the business actually does day to day, and stand up Oracle Risk Management Cloud (RMC) to detect, report and remediate SoD conflicts on an ongoing basis.",
    ],
    situation: {
      eyebrow: "Situation",
      heading: "Access that had to stand up to audit and SoD scrutiny.",
      image: "/images/case-studies/ocado-rmc-situation.jpg",
      imageAlt: "Enterprise systems and infrastructure",
      body: [
        "Over time, access in a growing Oracle Cloud estate tends to accumulate. Privileges are granted to keep the business moving, roles broaden, and conflicting combinations of access creep in, the classic Segregation of Duties problem, where the same person can both raise and approve a payment.",
        "Ocado needed two things in step with each other. First, a clean set of Oracle Cloud roles, redesigned around real business needs in Finance and Supply Chain and aligned to audit and SoD rules. Second, a way to enforce and monitor those rules continuously, detecting violations automatically rather than discovering them at audit time.",
      ],
    },
    solution: {
      eyebrow: "Solution",
      heading: "Redesign. Build. Automate. Remediate.",
      image: "/images/case-studies/ocado-rmc-solution.jpg",
      imageAlt: "Risk and controls monitoring dashboard",
      body: [
        "Beam delivered the work in five clear stages, redesigning the roles, building and testing them in Oracle Cloud, defining the SoD rulebook, implementing Oracle RMC, and remediating the conflicts it surfaced. Accelerators were used throughout to move quickly without cutting corners, and every stage was run hand in hand with the client's business and IT teams.",
      ],
    },
    milestones: {
      eyebrow: "How we delivered",
      heading: "Project milestones",
      items: [
        {
          title: "Oracle Fusion Role Redesign",
          points: [
            "Led the Oracle Fusion role redesign exercise by reviewing business needs along with audit and SoD requirements.",
            "Used accelerators to design the roles, working with business leads from Finance and Supply Chain.",
          ],
        },
        {
          title: "Oracle Cloud Role Build",
          points: [
            "Implemented the role redesign by creating new custom roles in Oracle Cloud, working closely with the IT team.",
            "Led the build and test of the new custom roles in Oracle Fusion.",
          ],
        },
        {
          title: "Segregation of Duties (SoD) Requirements",
          points: [
            "Led the SoD requirement exercise, using accelerators to help the client finalise SoD rules efficiently.",
            "Mapped the SoD rules in Oracle RMC to Oracle Cloud privileges to produce a detailed SoD Matrix.",
          ],
        },
        {
          title: "Implementation of Oracle RMC",
          points: [
            "Led the build and unit test of SoD rules in Oracle RMC.",
            "Organised User Acceptance Testing (UAT) sessions for client stakeholders.",
          ],
        },
        {
          title: "Segregation of Duties (SoD) Remediation",
          points: [
            "Planned the remediation of intra-role and inter-role SoD violations reported by Oracle RMC.",
            "Led the exercise to consolidate access based on the 'Principle of Least Privilege', resolving SoD violations.",
          ],
        },
      ],
    },
    quote: {
      text: "We consolidated access around the Principle of Least Privilege, resolving Segregation of Duties violations at the source, not just monitoring them.",
      attribution: "Beam Global Services, Oracle RMC delivery team",
    },
    atAGlance: [
      { label: "Client", value: "Ocado Group" },
      { label: "Our role", value: "Role design & Oracle RMC implementation" },
      { label: "Platform", value: "Oracle Cloud (Fusion) ERP" },
      { label: "Product", value: "Oracle Risk Management Cloud" },
      { label: "Scope", value: "Finance & Supply Chain" },
      { label: "Team", value: "A specialist team of five, led by Beam" },
    ],
  },
  {
    slug: "oracle-sod-access-review-sgs",
    cardTitle: "Segregation of Duties & access review for SGS",
    title:
      "Remediating Segregation of Duties and access reviews for SGS across 50+ countries",
    eyebrow: "Beam Global Services and SGS",
    date: "2026-04-25",
    readMinutes: 5,
    heroImage: "/images/case-studies/sgs-hero.jpg",
    heroImageAlt: "A large global finance and operations team at work",
    cardImage: "/images/case-studies/sgs-card.jpg",
    excerpt:
      "How Beam Global Services remediated material-weakness audit findings at SGS, redesigning Segregation of Duties and rebuilding the user access review across the P2P, O2C and GL modules of a global Oracle E-Business Suite, in 50+ countries.",
    intro:
      "Beam Global Services led the transformation of Segregation of Duties and user access review controls at SGS for the Procure-to-Pay, Order-to-Cash and General Ledger modules, remediating material-weakness audit findings across their global Oracle E-Business Suite ERP, in more than 50 countries.",
    facts: {
      client: "SGS S.A.",
      industry: "Testing, inspection & certification",
      role: "SoD remediation & user access review transformation",
      featuring: "Oracle E-Business Suite",
    },
    topic: "Governance, Risk & Compliance",
    region: "Global (50+ countries)",
    serviceSlug: "oracle-sod-remediation",
    overview: [
      "SGS had received material-weakness audit findings against their global Oracle E-Business Suite (EBS) ERP system, spanning the Procure-to-Pay (P2P), Order-to-Cash (O2C) and General Ledger (GL) modules. Both the underlying Segregation of Duties (SoD) principles and the quarterly user access review control needed to be rebuilt to a standard auditors could rely on.",
      "Beam led the re-implementation end to end, working with a cross-functional team across IT, Accenture Managed Services and Finance for every country in scope, more than 50 in total.",
    ],
    situation: {
      eyebrow: "Situation",
      heading: "Material-weakness findings across a 50-country Oracle estate.",
      image: "/images/case-studies/sgs-situation.jpg",
      imageAlt: "Reviewing financial controls and audit findings",
      body: [
        "A material weakness is the most serious category of audit finding. For SGS it pointed to Segregation of Duties gaps and a quarterly access review process that external auditors could not rely on for completeness and accuracy, across P2P, O2C and GL on a global Oracle E-Business Suite footprint.",
        "Two controls had to be rebuilt in step with each other: the SoD principles that govern who can do what, and the user access review that proves access stays appropriate over time, and both had to hold up consistently across more than 50 countries.",
      ],
    },
    solution: {
      eyebrow: "Solution",
      heading: "Redesign the rules. Rebuild the review.",
      image: "/images/case-studies/sgs-solution.jpg",
      imageAlt: "A Segregation of Duties control dashboard",
      body: [
        "Beam re-designed the Segregation of Duties principles for every major process area and embedded them as preventative controls in user provisioning, then rebuilt the access review control. The new model was rolled out globally with a cross-functional team spanning IT, Accenture Managed Services and Finance.",
      ],
    },
    milestones: {
      eyebrow: "How we delivered",
      heading: "Project milestones",
      items: [
        {
          title: "Segregation of Duties",
          points: [
            "Completely re-designed the Segregation of Duties principles for all major process areas: Procure-to-Pay, Record-to-Report, Order-to-Bill and Bill-to-Cash.",
            "Implemented a new Segregation of Duties Matrix for Oracle Roles to embed preventative SoD controls in the user provisioning process.",
            "Worked with the Finance Transformation team to implement the new SoD principles globally (50+ countries).",
          ],
        },
        {
          title: "User Access Review",
          points: [
            "Revamped the user access review control after PwC (external auditor) raised red flags about the completeness and accuracy of the existing quarterly access review process.",
            "Led the re-implementation with a cross-functional team across IT, Accenture Managed Services and Finance for all countries in scope (50+).",
          ],
        },
      ],
    },
    quote: {
      text: "We rebuilt Segregation of Duties as a preventative control, stopping conflicts at the point of user provisioning, not catching them after the fact.",
      attribution: "Beam Global Services, SoD remediation team",
    },
    atAGlance: [
      { label: "Client", value: "SGS S.A." },
      { label: "Our role", value: "SoD remediation & access review transformation" },
      { label: "Platform", value: "Oracle E-Business Suite" },
      { label: "Modules", value: "P2P, O2C and GL" },
      { label: "Scope", value: "More than 50 countries" },
      { label: "Trigger", value: "Material-weakness audit findings" },
    ],
  },
  {
    slug: "sarbanes-oxley-access-controls-millicom",
    cardTitle: "Sarbanes-Oxley access controls for Millicom",
    title:
      "Transforming access controls for Sarbanes-Oxley compliance at Millicom",
    eyebrow: "Beam Global Services and Millicom",
    date: "2026-03-28",
    readMinutes: 7,
    heroImage: "/images/case-studies/millicom-hero.jpg",
    heroImageAlt: "Business leaders in an international working session",
    cardImage: "/images/case-studies/millicom-card.jpg",
    excerpt:
      "How Beam Global Services led the access control, RBAC, Segregation of Duties and GRC programmes behind Millicom's successful Sarbanes-Oxley (SOX) compliance across Europe, the USA and South America.",
    intro:
      "As part of Millicom's Global Business Controls team, Beam Global Services led a series of access control projects across Europe, the USA and South America, transforming the processes and systems behind a successful Sarbanes-Oxley (SOX) compliance programme.",
    facts: {
      client: "Millicom",
      industry: "Telecommunications",
      role: "SOX access controls, RBAC, SoD & GRC transformation",
      featuring: "SafePaaS · Oracle & SAP ERP",
    },
    topic: "Governance, Risk & Compliance",
    region: "Europe, USA & South America",
    serviceSlug: "safepaas-grc-implementation",
    overview: [
      "Millicom needed to achieve and sustain Sarbanes-Oxley (SOX) compliance across entities in Europe, the USA and South America. That meant overhauling IT access controls for key headquarters applications, including the Oracle and SAP ERP systems, and standing up the governance to keep those controls effective.",
      "Beam led the engagement across the full lifecycle: a multi-year access controls strategy, a global Role Based Access Control (RBAC) model, the implementation of a SaaS GRC platform, and a new operating model that centralised the ERP access request process.",
    ],
    situation: {
      eyebrow: "Situation",
      heading: "SOX compliance across three continents.",
      image: "/images/case-studies/millicom-situation.jpg",
      imageAlt: "Corporate headquarters towers",
      body: [
        "SOX sets strict expectations for IT access controls, Segregation of Duties, user provisioning, privileged access and recurring certification all have to be demonstrably effective. Millicom needed this across a complex estate of HQ and country entities running Oracle and SAP, spanning Europe, the USA and South America.",
        "Achieving it demanded more than technical controls. It required global stakeholder buy-in and a new operating model for how access is requested, granted and governed across many countries at once.",
      ],
    },
    solution: {
      eyebrow: "Solution",
      heading: "Strategy, RBAC, SoD and GRC, end to end.",
      image: "/images/case-studies/millicom-solution.jpg",
      imageAlt: "A governance, risk and compliance dashboard",
      body: [
        "Beam led the programme from strategy through to go-live: drafting the Segregation of Duties policy with Internal Audit, building a Role Based Access Control model across HQ, shared-service and country entities, agreeing the SoD matrix with the external auditors, implementing the SafePaaS GRC platform, and transforming the ERP access request operating model.",
      ],
    },
    milestones: {
      eyebrow: "How we delivered",
      heading: "Project milestones",
      items: [
        {
          title: "Access Controls & Segregation of Duties Strategy",
          points: [
            "Developed a multi-year strategy with the Director of Business Controls to ensure the effectiveness of critical SOX IT access controls for key HQ applications such as the Oracle and SAP ERP systems.",
            "Drafted the Segregation of Duties Policy for global enterprise systems, working closely with the Internal Audit team.",
          ],
        },
        {
          title: "Role Based Access Control (RBAC)",
          points: [
            "Developed an RBAC model for the Oracle ERP system across a 100-member Shared Service Centre in El Salvador, HQ entities (USA, UK, Luxembourg) and country entities (Bolivia, Paraguay, Honduras, El Salvador, Guatemala, Costa Rica).",
            "Implemented the new RBAC model by working closely with Finance and IT leadership in each entity.",
            "Led a team of multi-lingual outsourced subject-matter experts and in-house technology staff to build, test and deploy the new access controls model globally, using a mix of Agile and traditional delivery.",
          ],
        },
        {
          title: "Segregation of Duties (SoD)",
          points: [
            "Developed a SoD Matrix for the Oracle and SAP ERP systems, defining the SoD principles that govern segregation of access and the separation of roles.",
            "Agreed the SoD Matrix with the external auditors, Ernst & Young, and the PwC SOX Advisory team.",
            "Cleaned all SoD conflicts in the Oracle ERP system to ensure data and access segregation.",
          ],
        },
        {
          title: "SOX Compliance",
          points: [
            "Despite tight timelines, implemented the access controls needed to achieve successful SOX compliance, including quarterly review of Segregation of Duties conflicts, a defined process for requesting user access, an access control security policy, and quarterly re-certification of privileged access.",
          ],
        },
        {
          title: "Global Stakeholder Management",
          points: [
            "Led engagement with C-level stakeholders across multiple geographies (Luxembourg, USA, Colombia, Bolivia, Paraguay, Guatemala, Honduras, El Salvador) to generate buy-in for radically new access management processes.",
            "Influenced country Finance and IT teams to collaborate with the HQ Business Controls team to roll out new applications for key risk management processes such as user access administration.",
          ],
        },
        {
          title: "Governance, Risk & Compliance (GRC)",
          points: [
            "Led the implementation of a new SaaS-based GRC tool, from business case, to vendor selection, to solution design, to operating model transformation, to go-live.",
            "Led the definition of the Statement of Work and tracked supplier delivery against budget.",
            "The GRC tool, SafePaaS, transformed access controls delivery for back-office processes in eight countries.",
          ],
        },
        {
          title: "Business Transformation",
          points: [
            "Led a business transformation programme to centralise the ERP access request process by changing the operating model of the local IT function in seven different countries.",
            "Overcame significant resistance from mid-level IT managers in local and regional teams with a well-defined approach to business change management.",
          ],
        },
      ],
    },
    quote: {
      text: "We took SOX access controls all the way from a multi-year strategy to go-live, agreeing the SoD matrix with Ernst & Young and PwC, and centralising access management across eight countries.",
      attribution: "Beam Global Services, Global Business Controls team",
    },
    atAGlance: [
      { label: "Client", value: "Millicom" },
      { label: "Our role", value: "SOX access controls & GRC transformation" },
      { label: "Platforms", value: "Oracle & SAP ERP" },
      { label: "GRC tool", value: "SafePaaS" },
      { label: "Regions", value: "Europe, USA & South America" },
      { label: "Auditors", value: "Ernst & Young; PwC SOX Advisory" },
    ],
  },
  {
    slug: "oracle-role-design-remediation-greenergy",
    cardTitle: "Oracle role design & remediation for Greenergy",
    title:
      "Redesigning Oracle Fusion roles to remediate SoD violations for Greenergy",
    eyebrow: "Beam Global Services and Greenergy",
    date: "2026-02-20",
    readMinutes: 4,
    heroImage: "/images/case-studies/greenergy-hero.jpg",
    heroImageAlt: "Consultants reworking Oracle role design at a screen",
    cardImage: "/images/case-studies/greenergy-card.jpg",
    excerpt:
      "How Beam Global Services reviewed and redesigned Greenergy's Oracle Fusion Cloud custom roles to remediate intra-role Segregation of Duties violations, building, testing and migrating cleaner roles, and upskilling the client's own administrators.",
    intro:
      "Beam Global Services reviewed and redesigned Greenergy International's Oracle Fusion Cloud custom roles to remediate intra-role Segregation of Duties violations, building, testing and migrating cleaner roles, and training the client's own administrators to keep them that way.",
    facts: {
      client: "Greenergy International Ltd",
      industry: "Energy & fuel supply",
      role: "Oracle role design & SoD remediation",
      featuring: "Oracle Fusion Cloud ERP",
    },
    topic: "Governance, Risk & Compliance",
    region: "United Kingdom",
    serviceSlug: "oracle-role-design",
    overview: [
      "Greenergy implemented Oracle Fusion Cloud ERP (Financials and Supply Chain) three years ago, but the custom roles created at the time were not designed around good-practice Segregation of Duties (SoD). When Greenergy later implemented a new GRC tool, it surfaced multiple intra-role SoD violations caused by that incorrect role design.",
      "Beam was engaged to review the roles, redesign them correctly and remediate the violations, while leaving Greenergy's own administrators able to maintain good role design going forward.",
    ],
    situation: {
      eyebrow: "Situation",
      heading: "Custom roles that breached Segregation of Duties.",
      image: "/images/case-studies/greenergy-situation.jpg",
      imageAlt: "Reviewing Oracle role design",
      body: [
        "Three years after going live on Oracle Fusion Cloud ERP, Greenergy's custom roles had not been built to good-practice SoD design. The problem only became visible when a new GRC tool was switched on and reported multiple 'intra-role' SoD violations, conflicts contained within single roles, rather than across them.",
        "Left unaddressed, these violations meant a user could hold conflicting access through a single role assignment, weakening control and creating audit exposure.",
      ],
    },
    solution: {
      eyebrow: "Solution",
      heading: "Review, redesign, test, migrate, and hand over.",
      image: "/images/case-studies/greenergy-solution.jpg",
      imageAlt: "Building and testing redesigned Oracle roles",
      body: [
        "Beam reviewed every Greenergy custom role and made multiple recommendations to update the role design. Our team built and tested the modified Oracle roles in a test environment; once client users completed User Acceptance Testing (UAT), the roles were migrated to Production. We also trained Greenergy's Oracle system administrators to modify role design in the application themselves.",
        "The result: a significant reduction in SoD conflicts from an audit perspective, cleaner and easier-to-manage custom Oracle roles, and a more knowledgeable internal administration team when it comes to Oracle security.",
      ],
    },
    milestones: {
      eyebrow: "How we delivered",
      heading: "Project milestones",
      items: [
        {
          title: "Role Review & Redesign",
          points: [
            "Reviewed the Greenergy custom roles and made multiple recommendations to update role design around good-practice Segregation of Duties.",
          ],
        },
        {
          title: "Build & Test",
          points: [
            "Built and tested the modified custom Oracle roles in a dedicated test environment.",
            "Supported client users through User Acceptance Testing (UAT) before any change reached Production.",
          ],
        },
        {
          title: "Migration to Production",
          points: [
            "Migrated the redesigned roles to Production once UAT was signed off.",
          ],
        },
        {
          title: "Knowledge Transfer",
          points: [
            "Trained Greenergy's Oracle system administrators on how to modify Oracle role design within the application, leaving the team able to maintain clean roles themselves.",
          ],
        },
      ],
    },
    quote: {
      text: "We didn't just fix the roles, we left Greenergy's own administrators able to keep their Oracle role design clean.",
      attribution: "Beam Global Services, Oracle role design team",
    },
    atAGlance: [
      { label: "Client", value: "Greenergy International Ltd" },
      { label: "Our role", value: "Oracle role design & SoD remediation" },
      { label: "Platform", value: "Oracle Fusion Cloud ERP" },
      { label: "Scope", value: "Financials & Supply Chain" },
      { label: "Outcome", value: "Significant reduction in SoD conflicts" },
      { label: "Plus", value: "Cleaner roles; upskilled administrators" },
    ],
  },
];

export const caseStudySlugs = caseStudies.map((c) => c.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Case studies newest-first for listings. */
export const caseStudiesByDate = [...caseStudies].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);

/** Case studies that evidence a given service (for the service page cross-link). */
export function caseStudiesForService(serviceSlug: string): CaseStudy[] {
  return caseStudies.filter((c) => c.serviceSlug === serviceSlug);
}

/** Distinct, sorted facet values for the listing filter bar. */
function distinct(values: string[]): string[] {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}
export const caseStudyTopics = distinct(caseStudies.map((c) => c.topic));
export const caseStudyIndustries = distinct(
  caseStudies.map((c) => c.facts.industry),
);
export const caseStudyRegions = distinct(caseStudies.map((c) => c.region));
