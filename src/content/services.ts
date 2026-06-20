/**
 * Service taxonomy + content for all 13 service detail pages.
 * Copy is preserved verbatim from the live Beam Global Services site.
 * One typed array drives the dynamic route /services/[slug] and the
 * services index, no per-page duplication.
 */

export type PillarId = "digital" | "managed-services";

export type Capability = {
  title: string;
  description: string;
};

/** Tiered support packages, rendered as a feature-comparison table. */
export type ServicePackages = {
  tiers: string[];
  rows: { label: string; included: boolean[] }[];
};

export type Service = {
  slug: string;
  pillar: PillarId;
  /** Short navigation/card title. */
  title: string;
  /** Hero H1 headline from the live page. */
  headline: string;
  /** Intro/lead paragraph. */
  lead: string;
  capabilities: Capability[];
  cta: { heading: string; button: string };
  /** Short SEO/summary line for cards and metadata descriptions. */
  summary: string;
  /** Optional hero image override; defaults to /images/services/hero/<slug>.png. */
  heroImage?: string;
  /** Optional tiered package comparison table. */
  packages?: ServicePackages;
};

export type Pillar = {
  id: PillarId;
  label: string;
  eyebrow: string;
  intro: string;
};

export const pillars: Pillar[] = [
  {
    id: "digital",
    label: "Consulting · Digital Service",
    eyebrow: "Digital Service",
    intro:
      "Custom software, GRC platform selection and end-to-end implementation, built to integrate cleanly and strengthen control across your enterprise systems.",
  },
  {
    id: "managed-services",
    label: "Managed Services",
    eyebrow: "Managed Services",
    intro:
      "We run, support and strengthen your GRC programme day to day — from application support and controls execution to GRC strategy — so your teams stay focused on the business.",
  },
];

export const services: Service[] = [
  // ── Consulting · Digital Service ───────────────
  {
    slug: "grc-product-selection",
    pillar: "digital",
    title: "GRC Product Selection",
    headline: "Smarter GRC Starts with the Right Choice.",
    lead: "Choosing the right GRC solution is critical to building a secure, compliant, and resilient organization. We help you evaluate, compare, and select the best-fit product for your unique governance, risk, and compliance needs, ensuring seamless alignment with your business goals, regulatory requirements, and technology environment.",
    summary:
      "Independent evaluation and selection of the best-fit GRC platform for your risk, compliance and technology needs.",
    capabilities: [
      { title: "Compliance & Regulatory Affairs", description: "Regulatory mapping, policy management, control testing, and automated compliance monitoring aligned with regulations including SEC, FINRA, MiFID II, SOX, AML, Basel III, and GDPR." },
      { title: "Risk Management", description: "Real-time risk assessments, KRIs, risk scoring methodologies, and integrated risk dashboards covering credit, market, liquidity, reputational, and vendor risk." },
      { title: "Internal Audit", description: "Selection that emphasises audit planning, fieldwork, findings tracking, issue remediation, and reporting capabilities." },
      { title: "Information Technology & Cybersecurity", description: "Evaluation of incident tracking, IT risk assessments and vulnerability management integration with NIST, ISO 27001, and CIS framework alignment." },
      { title: "Legal & Regulatory Reporting", description: "Features supporting case management, policy attestation, e-signatures, and disclosure tracking." },
      { title: "Operations & Business Units", description: "Platform requirements including intuitive interfaces and automated workflows for onboarding and incident management." },
      { title: "Executive Management & Board", description: "Platforms that deliver executive-level dashboards, scenario modeling, risk heatmaps, and regulatory exposure summaries." },
      { title: "Data & Integration Considerations", description: "Integration with core banking software, investment management platforms, CRM, ERP, or data lakes." },
    ],
    cta: { heading: "Find the Right GRC Solution for Your Organization", button: "Contact us" },
  },
  {
    slug: "oracle-sod-remediation",
    pillar: "digital",
    title: "SOD Remediation",
    headline: "Clean, Conflict-Free Access Across Your Oracle ERP.",
    lead: "Remediation services for organisations running Oracle E-Business Suite or Oracle Fusion Cloud ERP. We identify, analyse and resolve conflicting access rights so that no single person can both execute and conceal a fraudulent transaction. By redesigning roles, enforcing the four-eyes principle and putting compensating controls in place, we keep your financial and IT environment secure and audit-ready.",
    summary:
      "Advisory and technical remediation that finds and fixes Segregation of Duties conflicts across Oracle E-Business Suite and Oracle Fusion Cloud ERP.",
    capabilities: [
      { title: "Conflict Analysis", description: "We use automated access governance tools to map every user's permissions against proven SoD rulebooks, surfacing conflicts such as the same person creating an invoice and approving its payment." },
      { title: "Role Redesign", description: "We restructure your Oracle authorisation model, stripping out excessive privileges and rebuilding clean, role-based access aligned to the principle of least privilege." },
      { title: "Compensating Controls", description: "Where full role separation is not practical, we put procedural checks and balances in place, including mandatory secondary approvals, automated log monitoring and exception reporting." },
      { title: "Compliance Reporting", description: "We provide audit-ready documentation that evidences adherence to frameworks such as SOX and GDPR, ready for your internal and external auditors." },
      { title: "Oracle EBS & Fusion Cloud Expertise", description: "Hands-on experience across both Oracle E-Business Suite and Oracle Fusion Cloud ERP, so the remediation fits the way your platform actually works." },
      { title: "Sustainable, Monitored Controls", description: "We leave you with a clean access model and the monitoring to keep it that way, rather than a one-off clean-up that quietly drifts back into conflict." },
    ],
    cta: { heading: "Lock Down Your Oracle Access, the Right Way", button: "Contact us" },
  },
  {
    slug: "oracle-rmc-implementation",
    pillar: "digital",
    title: "ROC Implementation",
    headline: "We implement Oracle RMC to help you manage risk, enforce controls, and simplify compliance.",
    lead: "We provide end-to-end implementation of Oracle Risk Management Cloud (RMC), enabling your organization to strengthen internal controls, monitor risk, and meet compliance goals. Our approach helps automate audit processes, reduce manual work, and give you real-time visibility into risk and control performance across your business systems.",
    summary:
      "End-to-end Oracle Risk Management Cloud implementation, automated controls, monitoring and audit readiness.",
    capabilities: [
      { title: "Business Requirement Analysis", description: "Understanding your current control environment and compliance needs to configure Oracle RMC appropriately." },
      { title: "Module Implementation & Configuration", description: "Implementing Advanced Access Controls (AAC), Advanced Financial Controls (AFC), and Financial Reporting Compliance (FRC) modules." },
      { title: "Risk and Control Framework Setup", description: "Defining key risks, linking them to controls, and building testable frameworks." },
      { title: "SoD and Access Control Enforcement", description: "Configuring policies to detect unauthorized access and reduce fraud exposure." },
      { title: "Automated Monitoring & Alerts", description: "Continuous monitoring with real-time alerts and dashboards." },
      { title: "Reporting & Audit Readiness", description: "Standardized reporting tools meeting internal and external audit requirements." },
      { title: "Integration with Oracle ERP", description: "Seamless integration with finance, procurement, and HR modules." },
      { title: "Knowledge Transfer & Support", description: "Training, documentation, and ongoing team support." },
    ],
    cta: { heading: "Oracle RMC, Deployed for Results, Let's Get Started", button: "Contact us" },
  },
  {
    slug: "safepaas-grc-implementation",
    pillar: "digital",
    title: "Safepass Implementation",
    headline: "Automate Control. Simplify Compliance. Empower Governance.",
    lead: "Our SafePaaS GRC implementation delivers a unified, cloud-based solution to help organizations manage risk, enforce controls, and streamline compliance across enterprise systems. From access governance to real-time monitoring and audit automation, we configure SafePaaS to align with your processes, reduce risk exposure, and strengthen internal controls, empowering smarter, safer business decisions.",
    summary:
      "Unified, cloud-based SafePaaS GRC, access governance, risk, compliance and process controls configured to your processes.",
    capabilities: [
      { title: "Access Governance", description: "Automate user provisioning, enforce SoD, and manage privileged access across enterprise systems like Oracle, SAP, and Microsoft." },
      { title: "Risk Management", description: "Map enterprise risks to controls, streamline assessments, and drive remediation with full audit traceability." },
      { title: "Compliance & Audit Management", description: "Automate compliance workflows, track exceptions, and generate documentation to meet global standards like SOX, GDPR, HIPAA, and ISO." },
      { title: "Process Controls", description: "Detect, prevent, and respond to policy violations across finance, HR, procurement, and IT operations." },
      { title: "Analytics & Reporting", description: "Gain actionable insights with dynamic dashboards, trend analysis, and real-time KPIs for executives, compliance officers, and auditors." },
    ],
    cta: { heading: "Start Your SafePaaS GRC Integration Today", button: "Contact us" },
  },
  {
    slug: "oracle-role-design",
    pillar: "digital",
    title: "Oracle Role Design",
    headline: "Security Roles Built Clean, From the Ground Up.",
    lead: "We design clean, least-privilege security roles for Oracle E-Business Suite and Oracle Fusion Cloud ERP. By modelling duties carefully and building Segregation of Duties into the design from the start, we give every user exactly the access they need and nothing more, so your environment stays secure, compliant and straightforward to audit.",
    summary:
      "Clean, least-privilege Oracle security role models for E-Business Suite and Fusion Cloud, with Segregation of Duties built in by design.",
    capabilities: [
      { title: "Role Modelling & Definition", description: "We define a clear, business-aligned role model that maps each job function to the precise privileges its role should hold." },
      { title: "Least-Privilege Design", description: "Every role is built to the principle of least privilege, giving users only the access their job requires and shrinking your attack surface." },
      { title: "SoD-Aware From the Start", description: "We build Segregation of Duties into the role model up front, so conflicts are prevented by design rather than fixed later." },
      { title: "Duty & Privilege Mapping", description: "We map duties, privileges and data access across Oracle modules so finance, procurement and HR access stays clean and well understood." },
      { title: "Role Rationalisation", description: "We consolidate sprawling, overlapping or excessive roles into a lean, maintainable set that is far easier to govern." },
      { title: "Documentation & Governance", description: "We hand over clear role documentation and a simple governance approach so the model stays clean as the business changes." },
    ],
    cta: { heading: "Design Your Oracle Roles the Right Way", button: "Contact us" },
  },
  {
    slug: "software-development-and-integration",
    pillar: "digital",
    title: "Software Development and Integration",
    headline: "Integrating Innovation. Delivering Excellence.",
    lead: "At the core of our work lies a simple philosophy: innovation should drive integration, and integration should deliver results. We specialize in developing custom software solutions that not only meet the evolving demands of modern businesses but also connect seamlessly with your existing systems, platforms, and workflows.",
    summary:
      "Custom software, system integration and modern engineering that connects cleanly with your existing platforms.",
    capabilities: [
      { title: "Custom Software Development", description: "We design and develop software tailored to your business needs, whether it's enterprise platforms, internal tools, mobile apps, or customer-facing solutions." },
      { title: "System Integration Services", description: "We enable smooth data and functionality exchange between different systems, ERP, CRM, cloud platforms, or legacy databases." },
      { title: "API Development & Management", description: "We build secure, well-documented APIs that enable software components and external systems to interact effortlessly." },
      { title: "Cloud-Native & SaaS Development", description: "We help you build or migrate to cloud-based architectures, leveraging platforms like Azure, AWS, and GCP." },
      { title: "Legacy System Modernization", description: "We upgrade or reengineer legacy applications using modern technologies while preserving core business logic." },
      { title: "Database Design & Integration", description: "Our team designs robust database architectures and implements integrations that ensure data integrity, scalability, and security." },
      { title: "DevOps & CI/CD Implementation", description: "We implement modern DevOps practices, including Continuous Integration and Continuous Delivery pipelines." },
      { title: "Enterprise Application Integration (EAI)", description: "We connect multiple enterprise systems into one cohesive environment." },
      { title: "Middleware & Message Queuing Solutions", description: "We implement middleware platforms (like Kafka, RabbitMQ, MuleSoft, etc.)." },
      { title: "Microservices Architecture", description: "We design and deploy scalable applications using microservices." },
      { title: "Mobile Application Development", description: "From Android and iOS to cross-platform development, we create intuitive, high-performance mobile apps." },
      { title: "Web Portals & Dashboards", description: "We develop interactive web portals, dashboards, and admin interfaces for real-time insights." },
      { title: "Security & Compliance Integration", description: "We incorporate enterprise-grade security protocols, data protection standards, and regulatory compliance." },
      { title: "Support & Maintenance", description: "We offer post-deployment support, performance monitoring, bug fixes, and feature enhancements." },
      { title: "Technology Consulting & Architecture Design", description: "We help you choose the right tech stack, architectural patterns, and integration approaches." },
    ],
    cta: { heading: "Bring Your Software Vision to Life", button: "Contact us" },
  },
  // ── Managed Services ─────────────────────
  {
    slug: "application-managed-services",
    pillar: "managed-services",
    heroImage: "/images/services/hero/application-managed-services-datacenter.png",
    title: "Application Managed Services",
    headline: "Day-to-Day Support That Keeps Your GRC Running.",
    lead: "We run and support your GRC applications day to day, acting as your administrators, resolving issues, and liaising with vendors so your systems stay healthy and your team stays focused on the business. You choose the level of cover that suits you, from essential support to fully proactive management.",
    summary:
      "Hands-on, day-to-day support and administration for your GRC applications, with tiered Bronze, Silver and Gold cover.",
    capabilities: [
      { title: "Day-to-Day Application Support", description: "Ongoing support and administration of your GRC applications so they stay healthy, available and well configured." },
      { title: "Vendor Liaison & Ticketing", description: "We raise and track support tickets with your software vendors and manage bugs and incidents through to resolution on your behalf." },
      { title: "Issue Escalation & Management", description: "We escalate and manage critical issues quickly, keeping the right people informed until the problem is fully resolved." },
      { title: "Product & Release Monitoring", description: "We track product enhancements, review monthly vendor updates, and analyse weekly release notes so nothing important slips past you." },
      { title: "Patch & Control Reviews", description: "Regular reviews of quarterly application patches, segregation-of-duties rules, and IT general controls to keep your environment secure and compliant." },
      { title: "Tiered Support Packages", description: "Bronze, Silver and Gold packages that scale from essential day-to-day support up to fully proactive, fully managed cover." },
    ],
    cta: { heading: "Let Us Take Care of Your GRC Applications", button: "Contact us" },
    packages: {
      tiers: ["Bronze", "Silver", "Gold"],
      rows: [
        { label: "Day-to-day application support", included: [true, true, true] },
        { label: "Administrator services", included: [true, true, true] },
        { label: "Raise vendor support tickets", included: [true, true, true] },
        { label: "Escalate and manage 'fatal' issues", included: [true, true, true] },
        { label: "Track product enhancements", included: [true, true, true] },
        { label: "Monthly vendor support review", included: [false, true, true] },
        { label: "Analyse weekly product release notes", included: [false, true, true] },
        { label: "Track Oracle Cloud ERP quarterly patches", included: [false, false, true] },
        { label: "Quarterly review of Oracle Cloud SoD rules", included: [false, false, true] },
        { label: "Quarterly review of IT general controls", included: [false, false, true] },
      ],
    },
  },
  {
    slug: "controls-execution-services",
    pillar: "managed-services",
    title: "Controls Execution Services",
    headline: "We Run Your Controls, So They Never Slip.",
    lead: "We take the day-to-day running of your controls off your plate, agreeing a schedule, carrying out each control, capturing the evidence, and standing alongside you through audits. The result is controls that are consistently performed, properly documented, and always audit-ready.",
    summary:
      "End-to-end execution and documentation of your controls, from agreeing a timetable through to audit support.",
    capabilities: [
      { title: "Agree a Controls Timetable", description: "We work with you to set a clear schedule for when each control needs to be performed, so nothing is missed." },
      { title: "Execute Control Activities", description: "Our team carries out the agreed control activities on time and to a consistent standard, every period." },
      { title: "Provide Evidence to Control Owners", description: "We gather and hand over clear, complete evidence that each control has been performed, ready for sign-off." },
      { title: "Document Controls & Evidence", description: "We keep thorough, well-organised documentation of controls and supporting evidence so your records are always in order." },
      { title: "Support Auditor Interactions", description: "We support you through internal and external audits, answering questions and providing evidence so reviews run smoothly." },
    ],
    cta: { heading: "Keep Your Controls Running and Audit-Ready", button: "Contact us" },
  },
  {
    slug: "grc-strategy-services",
    pillar: "managed-services",
    heroImage: "/images/services/hero/grc-strategy-services-roadmap.png",
    title: "GRC Strategy Services",
    headline: "A Clear Roadmap for Risk and Compliance.",
    lead: "We help you step back and shape the bigger picture: setting a practical GRC strategy, planning how to close the gaps, and finding the places where automation can save time and reduce risk. You get a prioritised roadmap that turns compliance from a burden into an advantage.",
    summary:
      "Practical GRC strategy, remediation planning and automation opportunities for your risk and compliance programme.",
    capabilities: [
      { title: "GRC Strategy & Roadmap", description: "We define a clear, practical strategy for your governance, risk and compliance programme, with a roadmap to get there." },
      { title: "Remediation Strategy", description: "Where gaps or weaknesses exist, we plan how to fix them in a sensible, prioritised order." },
      { title: "Automation Opportunities", description: "We identify where manual controls and processes can be automated to cut effort, reduce cost and lower the risk of error." },
      { title: "Prioritisation & Advisory", description: "We help you focus on what matters most first, with clear advice you can act on." },
    ],
    cta: { heading: "Shape a Smarter GRC Strategy", button: "Contact us" },
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByPillar(pillar: PillarId): Service[] {
  return services.filter((s) => s.pillar === pillar);
}
