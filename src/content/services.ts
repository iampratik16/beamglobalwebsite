/**
 * Service taxonomy + content for all 13 service detail pages.
 * Copy is preserved verbatim from the live Beam Global Services site.
 * One typed array drives the dynamic route /services/[slug] and the
 * services index, no per-page duplication.
 */

export type PillarId = "digital" | "it-governance" | "managed-services";

export type Capability = {
  title: string;
  description: string;
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
    id: "it-governance",
    label: "IT Governance",
    eyebrow: "IT Governance",
    intro:
      "Strategy, governance and transformation advisory that turns vision into measurable, future-focused results across private and public institutions.",
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
  // ── Consulting · Digital Service ───────────────────────────────
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
    slug: "safepaas-grc-implementation",
    pillar: "digital",
    title: "SafePaaS GRC Implementation",
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
    slug: "sod-implementation-remediation",
    pillar: "digital",
    title: "SoD Implementation & Remediation",
    headline: "Strengthen Security. Eliminate Conflicts. Ensure Compliance.",
    lead: "Our SoD Implementation and Remediation service helps organizations identify, resolve, and prevent access conflicts across critical business systems. By enforcing role-based access and automating control workflows, we reduce the risk of fraud, improve audit readiness, and support sustainable compliance with regulatory standards like SOX, GDPR, and more.",
    summary:
      "Identify, resolve and prevent segregation-of-duties conflicts across your critical business systems.",
    capabilities: [
      { title: "SoD Risk Identification & Assessment", description: "We provide in-depth SoD analysis using advanced tools to identify access conflicts across ERP, CRM, HR, and financial systems." },
      { title: "SoD Rule Set Development", description: "We provide customizable rule sets tailored to your industry, applications, and business processes." },
      { title: "Conflict Remediation Solutions", description: "We provide remediation strategies that resolve access risks without disrupting operations." },
      { title: "SoD Automation & Monitoring", description: "We provide automation solutions to continuously monitor SoD risks with real-time alerts and dashboards." },
      { title: "Access Governance Integration", description: "We provide seamless integration of SoD controls with your Identity and Access Management (IAM) systems." },
      { title: "Reporting & Audit Support", description: "We provide complete, audit-ready reports that simplify external and internal audits." },
      { title: "Enablement & Knowledge Transfer", description: "We provide training and operational handoff to equip your internal teams." },
    ],
    cta: { heading: "Secure Your Enterprise with Effective SoD Controls", button: "Contact us" },
  },
  {
    slug: "oracle-rmc-implementation",
    pillar: "digital",
    title: "Oracle RMC Implementation",
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

  // ── IT Governance ──────────────────────────────────────────────
  {
    slug: "strategic-consulting",
    pillar: "it-governance",
    title: "Strategic Consulting",
    headline: "We turn vision into strategy, and strategy into results.",
    lead: "Our strategic consulting services help organizations make confident, future-focused decisions. We work closely with your leadership to define clear goals, evaluate challenges, and build actionable strategies that drive growth, improve performance, and prepare your business for what's next.",
    summary:
      "Future-focused strategy, digital transformation planning and leadership advisory that drives measurable growth.",
    capabilities: [
      { title: "Business Strategy Development", description: "We help you define or refine your organization's long-term strategy and align your business model with changing market demands and customer expectations." },
      { title: "Digital Transformation Planning", description: "We guide you through digital initiatives that align with your strategic goals, modernizing legacy systems, adopting cloud solutions, or introducing new digital services." },
      { title: "Operational Improvement Strategy", description: "We assess your current operations, pinpoint inefficiencies, and provide a roadmap for process improvement, increasing productivity, lowering costs, and building scalability." },
      { title: "Technology Alignment & Road mapping", description: "We ensure that your technology investments support your business goals and help you choose the right tools, and use them the right way." },
      { title: "Risk & Compliance Strategy", description: "We help you build a proactive approach to governance, risk management, and compliance to position your business to stay compliant and resilient." },
      { title: "Change Management Strategy", description: "We provide strategies for managing organizational change, engaging stakeholders, and ensuring successful adoption of new processes, technologies, and ways of working." },
      { title: "Growth & Expansion Strategy", description: "We develop growth strategies that are data-driven, financially sound, and tailored to your competitive landscape." },
      { title: "Leadership Advisory & Enablement", description: "We support senior leaders with strategic planning sessions, executive alignment workshops, and ongoing advisory services." },
    ],
    cta: { heading: "Start Building a Smarter Strategy Today!", button: "Contact us" },
  },
  {
    slug: "government-public-sector",
    pillar: "it-governance",
    title: "Government & Public Sector",
    headline: "Building Public Institutions That Deliver, With Trust and Accountability.",
    lead: "We help government agencies and public institutions modernise services, strengthen governance, and deliver better outcomes for citizens. From digital transformation to compliance and cybersecurity, we bring strategy, structure, and support to the public sector's most important priorities.",
    summary:
      "Strategy, digital modernisation and governance for government agencies and public institutions.",
    capabilities: [
      { title: "Strategic Planning & Policy Support", description: "We work with public sector leaders to define clear priorities, set achievable goals, and build policies that are citizen-focused and results-driven. Our strategies align with long-term vision while staying grounded in current realities." },
      { title: "Digital Government & IT Modernization", description: "We help agencies move from legacy systems to modern platforms, enabling better data use, faster service delivery, and enhanced user experience for both staff and the public. This includes cloud migration, platform integration, and system redesign." },
      { title: "Governance, Risk & Compliance (GRC)", description: "Public institutions must meet growing demands for accountability. We implement frameworks that improve internal controls, manage risk, and ensure compliance with government standards and regulatory requirements." },
      { title: "Financial Management & Budget Optimization", description: "We provide tools and strategies to improve public financial planning, streamline reporting, and enhance transparency. Our work supports better decision-making around budgeting, resource allocation, and long-term sustainability." },
      { title: "Performance Monitoring & Reporting", description: "We help agencies establish KPIs, track outcomes, and report on impact. From operational dashboards to public accountability reports, we ensure leadership has the data they need to make informed decisions and build public trust." },
      { title: "Cybersecurity & Data Privacy", description: "We design and implement security strategies that protect sensitive government data, reduce cyber threats, and align with national and regional data privacy laws." },
      { title: "Public Engagement & Service Experience", description: "Modern public service means meeting people where they are. We improve the citizen experience with user-friendly digital services, better communication channels, and accessible platforms that increase public satisfaction and trust." },
      { title: "Capacity Building & Training", description: "We strengthen internal capabilities with tailored training, change management, and process improvement initiatives, ensuring agencies can sustain results and adapt to future needs independently." },
    ],
    cta: { heading: "Deliver Better Public Outcomes, Start Your Journey Today!", button: "Contact us" },
  },
  {
    slug: "transformation-sector",
    pillar: "it-governance",
    title: "Transformation Sector",
    headline: "We Drive Change That Lasts, Across People, Processes, and Technology.",
    lead: "Our transformation services help organizations reimagine how they work, deliver, and grow. Whether it's digital, operational, or cultural transformation, we bring strategy, structure, and support to help you lead change with confidence and clarity.",
    summary:
      "Digital, operational and cultural transformation delivered with strategy, structure and lasting support.",
    capabilities: [
      { title: "Enterprise Transformation Strategy", description: "We help define your transformation vision and build a clear roadmap to achieve it." },
      { title: "Digital Transformation Enablement", description: "We guide you through the adoption of digital tools and technologies that improve agility, performance, and customer experience." },
      { title: "Operational Improvement Strategy", description: "We help reimagine your business structure, processes, and roles to improve efficiency and reduce complexity." },
      { title: "People & Culture Transformation", description: "True transformation starts with people. We support cultural alignment, leadership development, and change management." },
      { title: "Process Optimization & Automation", description: "We analyze your existing workflows to identify inefficiencies, reduce manual tasks, and implement automation." },
      { title: "Technology Integration & Modernization", description: "We lead the implementation of modern platforms and systems, ensuring your technology stack supports your growth." },
      { title: "Risk & Compliance in Transformation", description: "We integrate governance and compliance into every step of the transformation process." },
      { title: "Change Management & Communication", description: "We design structured change programs that guide stakeholders through transitions." },
      { title: "Innovation Strategy & Future Readiness", description: "We help you identify opportunities to innovate and prepare for future disruption." },
      { title: "Customer Experience (CX) Transformation", description: "We assess and redesign customer journeys and digital interactions." },
      { title: "Data-Driven Transformation", description: "We enable intelligent decision-making by unlocking the power of data." },
      { title: "ESG & Sustainability Integration", description: "We embed sustainability and ESG principles into your transformation journey." },
      { title: "Agile Operating Models", description: "We help implement agile frameworks that foster speed, flexibility, and continuous improvement." },
      { title: "Mergers, Acquisitions & Integration Support", description: "We provide strategic and operational support to integrate cultures, systems, and structures post-M&A." },
      { title: "Cloud Transformation Services", description: "We plan and manage cloud migrations and hybrid solutions that reduce costs and enhance scalability." },
      { title: "Organizational Resilience & Crisis Readiness", description: "We help you prepare for uncertainty through risk planning and crisis simulation." },
      { title: "Performance Transformation", description: "We use metrics, dashboards, and continuous improvement models to enhance operational performance." },
      { title: "Talent Strategy & Workforce Transformation", description: "We align your talent capabilities with your future goals through reskilling and workforce planning." },
      { title: "Digital Twin & Process Simulation", description: "We use modeling and simulation to test process changes before implementation." },
      { title: "Cross-Industry Benchmarking", description: "We bring best practices from across sectors to spark innovation and measure progress." },
    ],
    cta: { heading: "Empower Transformation That Drives Real Results", button: "Contact us" },
  },
  {
    slug: "managed-services",
    pillar: "managed-services",
    heroImage: "/images/services/hero/managed-services-team.png",
    title: "Managed Services",
    headline: "GRC, Run and Strengthened, Every Day.",
    lead: "Our Managed Services take care of the day-to-day running of your Governance, Risk & Compliance programme \u2014 supporting your applications, executing your controls, and shaping your GRC strategy. We act as an extension of your team, keeping operations moving so you can stay focused on the business.",
    summary:
      "End-to-end managed services for your GRC programme \u2014 application support, controls execution and GRC strategy.",
    capabilities: [
      { title: "Application Managed Services", description: "Day-to-day support and administration of your GRC applications, including vendor liaison for bugs and incidents, raising and tracking support tickets, and managing critical issues through to resolution." },
      { title: "Tiered Support Packages", description: "Bronze, Silver and Gold packages that scale from day-to-day application support and administrator services up to monthly vendor reviews, release-note analysis, and quarterly patch and control reviews." },
      { title: "Controls Execution Services", description: "We execute and document your controls end to end: agree a controls timetable, run control activities, provide evidence to control owners, document IPE and control documentation, and support internal and external auditor interactions." },
      { title: "Evidence & Audit Support", description: "Clear, well-documented control evidence and hands-on support during internal and external audits, so reviews run smoothly and findings are easier to close." },
      { title: "GRC Strategy Services", description: "Practical GRC and remediation strategy that turns your risk and compliance goals into a clear, prioritised roadmap." },
      { title: "Automation Opportunities", description: "We identify where manual controls and processes can be automated to reduce effort, cost and the risk of error across your GRC programme." },
    ],
    cta: { heading: "Let Us Run Your GRC, So You Can Run the Business", button: "Contact us" },
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function servicesByPillar(pillar: PillarId): Service[] {
  return services.filter((s) => s.pillar === pillar);
}
