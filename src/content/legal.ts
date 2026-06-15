/**
 * Placeholder legal copy. These are NEUTRAL templates, clearly marked for
 * legal review — not fabricated policy. Replace before launch with reviewed
 * Privacy, Cookie and Terms content.
 */

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const reviewNote =
  "This is placeholder content provided as a starting template and must be reviewed and approved by Beam Global Services before publication.";

export const legalDocs: Record<string, LegalDoc> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    intro:
      "This Privacy Policy explains how Beam Global Services handles personal information collected through this website.",
    sections: [
      { heading: "Information we collect", body: "We collect the information you provide through our contact form — such as your name, email address, company and message — solely to respond to your enquiry." },
      { heading: "How we use information", body: "We use the information you provide to respond to enquiries and to provide the services you request. We do not sell your personal information." },
      { heading: "Data retention", body: "We retain enquiry information only for as long as necessary to respond and to meet our legal and operational obligations." },
      { heading: "Your rights", body: "You may request access to, correction of, or deletion of your personal information by contacting us. We will respond in line with applicable data-protection law." },
      { heading: "Review", body: reviewNote },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    intro:
      "This Cookie Policy describes how this website uses cookies and similar technologies.",
    sections: [
      { heading: "Essential cookies", body: "We use a small number of essential cookies required for the site to function, including remembering your cookie-consent choice." },
      { heading: "Analytics", body: "No third-party tracking or analytics cookies are currently wired into this site. Should that change, this policy will be updated and consent obtained." },
      { heading: "Managing cookies", body: "You can control and delete cookies through your browser settings at any time." },
      { heading: "Review", body: reviewNote },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Use",
    intro:
      "These Terms of Use govern your access to and use of the Beam Global Services website.",
    sections: [
      { heading: "Use of the site", body: "You may use this website for lawful purposes only. The content is provided for general information and does not constitute professional advice." },
      { heading: "Intellectual property", body: "All content on this site, including text, graphics and logos, is the property of Beam Global Services unless otherwise stated." },
      { heading: "Limitation of liability", body: "The website is provided on an \"as is\" basis. Beam Global Services accepts no liability for any loss arising from reliance on its content." },
      { heading: "Review", body: reviewNote },
    ],
  },
};
