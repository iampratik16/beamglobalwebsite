/**
 * Blog content. Titles, slugs and publication dates are the REAL values
 * from the live Beam post sitemap (preserving original URLs for SEO parity).
 * Excerpts are neutral, topical standfirsts (no fabricated facts/statistics).
 * Full article bodies are populated from the live posts where available.
 */

export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO date
  category: string;
  excerpt: string;
  /** Optional card/hero image (under /public). Falls back to gradient media. */
  image?: string;
  /** Article body as paragraphs. Empty until migrated from source. */
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-growth-loop-how-customer-success-fuels-sustainable-scale",
    title: "The Growth Loop: How Customer Success Fuels Sustainable Scale",
    date: "2025-04-15",
    category: "Growth",
    excerpt:
      "How sustained investment in customer success compounds into durable, repeatable growth.",
    body: [
      "Attracting new customers is an ongoing challenge, especially in today's crowded market where many products offer similar promises and benefits. Your potential customers may be skeptical and cautious, possibly due to past negative experiences with competing products that failed to meet expectations. With growth slowing down, businesses are often more inclined to stick with what they know rather than invest in a new solution that feels uncertain.",
      "As a result, your sales cycles are likely taking longer, by at least 30 to 40%. The cost to acquire customers has probably risen by 20% because you now need more touchpoints to nurture leads and build trust. And, unfortunately, your conversion rates might be lower than before. Customer acquisition was never easy, but these conditions have made it even more difficult.",
      "However, there's a significant opportunity right in front of you: your existing customers. These are individuals who are already familiar with your brand, trust your product, and have had positive experiences with you. They are the perfect candidates to either purchase additional products or services from you or, better yet, help you acquire new customers through referrals. Their support can be an invaluable driver of growth.",
      "Unfortunately, most satisfied customers don't actively promote your brand. That's where you can step in. By turning your loyal customers into advocates and brand champions, you can create a powerful, organic sales channel. Instead of relying solely on a linear funnel, you can build a flywheel where happy customers contribute to continuous referrals and growth.",
      "So, how can you unlock the power of your current customer base? Here are the top strategies that have proven successful:",
      "### A) Build a Connected Customer Community",
      "Create Engaging Online Communities: Establish spaces where customers can connect, share experiences, and learn from each other. These communities foster a sense of belonging, increase customer loyalty, and give you valuable feedback on their needs and concerns.",
      "Develop Customer Advisory Boards: Involve your customers in shaping your products and strategies. By including them in these conversations, you create a sense of ownership and collaboration. This leads to stronger advocacy, and their feedback can help you improve your offerings.",
      "Host Exclusive Events and Webinars: Provide opportunities for customers to engage with your brand on a deeper level through events or educational sessions. These exclusive experiences make customers feel valued, which in turn increases their loyalty and advocacy.",
      "### B) Reward and Recognize Referrals",
      "Incentivize Referrals with Tiered Rewards: Create a structured referral program that rewards customers based on how many people they refer. This tiered approach encourages customers to refer more often and boosts the overall number of referrals.",
      "Highlight Top Referrers: Publicly recognize the customers who are making the biggest impact with their referrals. This not only rewards those customers but also motivates others to participate, as they'll want the same recognition.",
      "Incorporate Gamification: Add fun, competitive elements to your referral program. By incorporating points, badges, or leaderboards, you can make the referral process more engaging and encourage your customers to actively participate.",
      "### C) Amplify Customer Advocacy",
      "Showcase Customer Testimonials and Case Studies: Share success stories and testimonials from your satisfied customers. These serve as powerful social proof, helping to build trust with potential customers and encouraging them to make a purchase.",
      "Encourage Social Media Sharing: Empower your customers to share their positive experiences on social media. By providing shareable content and making it easy for customers to promote your brand, you can increase your organic reach and build a community of advocates who spread the word for you.",
    ],
  },
  {
    slug: "what-makes-your-customers-say-yes-to-your-product-or-service",
    title: "What Makes Your Customers Say Yes to Your Product or Service?",
    date: "2025-04-15",
    category: "Growth",
    excerpt:
      "The signals, trust and value that move prospects from interest to commitment.",
    body: [
      "As an entrepreneur, it's crucial to remember that customers don't just buy products or services on a whim, something needs to spark that decision. This concept is often underestimated, but understanding what triggers a purchase is one of the most valuable insights you can gather about your audience.",
      "Simply offering your product on multiple platforms isn't enough to attract and retain loyal customers. Building meaningful relationships and delivering relevant messaging is key. Especially in today's digital-first world, understanding this buying journey can help you avoid customer churn and make smarter marketing investments.",
      "The customer buying journey typically unfolds in three main stages: Awareness, Consideration, and Decision.",
      "### Awareness",
      "This is the stage where potential customers first learn about your product or service. At this point, they may not yet feel the need to buy, unless something sparks their interest. As a business owner, your role is to clearly illustrate the problem they might be facing and gently introduce your solution. This stage is about building trust, increasing visibility, and deepening brand familiarity.",
      "### Consideration",
      "Now the customer acknowledges there's a problem that needs solving. Your goal here is to ensure your product or service stays top-of-mind as they explore options. Stand out by highlighting unique value, sharing social proof, and making comparisons easy for them.",
      "### Decision",
      "At this final stage, the customer is ready to make a choice, and ideally, it's your product they go with. The key here is to make the purchase process smooth, reassuring, and compelling. Clear calls-to-action, strong guarantees, and transparent communication play a huge role in converting interest into action.",
      "Start by identifying who your ideal customers are. Once you know their demographics, behaviors, and pain points, you can better understand the journey they take and the triggers that influence their decisions.",
      "Think about what events or interactions cause your customers to buy, or walk away. Are they clicking links in your emails? Responding to a sale? Abandoning carts? Understanding these patterns helps you design better campaigns and preempt objections.",
      "While it's impossible to monitor every move your customers make, you can gather actionable data through tools like email responses, website activity, campaign engagement, and CRM criteria. This information is gold when it comes to designing personalized, timely outreach.",
      "Once you've identified the key triggers, plan out your response strategy. Will you send a follow-up email when a cart is abandoned? Offer a discount after a product is viewed multiple times? Automating these actions ensures you're always engaging at the right moment.",
      "Generic marketing doesn't cut it anymore. People want to feel seen. Use what you know about your customer, from their past purchases to their preferences, to tailor messages that truly resonate.",
      "A well-managed CRM system can be your best ally in keeping your customer data organized and your interactions intentional. Using marketing automation tools helps free up your time and ensures consistent, relationship-building communication.",
      "Every interaction with your audience, whether it's a welcome email, a birthday message, or a reminder about an abandoned cart, is an opportunity to deepen your relationship. Customers want to feel understood, not just sold to.",
      "By learning what drives your audience to buy (or not), you're not only improving your conversion rate, you're laying the foundation for stronger loyalty and longer-lasting engagement. It might seem like a big task at first, but the payoff is well worth it.",
    ],
  },
  {
    slug: "5-cyber-security-startups-to-watch-out-for",
    title: "5 Cyber Security Startups to Watch Out For",
    date: "2025-04-15",
    category: "Cyber Security",
    excerpt:
      "A look at emerging cyber security companies shaping how organisations defend themselves.",
    body: [
      "The rapid advancement of technology, increasing internet penetration, and the global wave of digital transformation have led to significant changes in how businesses operate and how people engage with digital platforms.",
      "Many organizations are expanding their presence online, while a growing number of businesses operate entirely in the digital space. Internally, companies are adopting digital tools and technologies to enhance operations. At the same time, the rise of the gig economy and remote work culture continues to reshape the modern workforce. With more affordable mobile data and greater bandwidth availability, internet consumption has skyrocketed.",
      "Consequently, individuals and organizations generate quintillions of bytes of data each year. In this data-driven world, information has become the new oil, highly valuable and increasingly targeted. Cyber attackers are leveraging advanced technologies to devise new and sophisticated ways to breach networks, compromise systems, and access sensitive information. The consequences of such cyberattacks and data breaches are severe, not only in terms of financial losses but also in the erosion of brand reputation, customer trust, and market goodwill.",
      "High-profile incidents involving global tech giants such as Yahoo, Facebook, Marriott International, Panera Bread, and Exactis underscore the scale of the threat. While large corporations often possess the financial, technical, legal, and infrastructural resources to recover, smaller businesses are far more vulnerable. For many, a major breach can be devastating, sometimes forcing them to shut down due to a lack of resources to rebuild or regain customer confidence.",
      "In response, awareness around the importance of proactive and robust cybersecurity strategies has grown significantly. Organizations are increasingly prioritizing cybersecurity as a core function, leading to a surge in investments in the field. This growing demand has fueled the rise of cybersecurity startups worldwide, over 3,000 and counting, each aiming to reshape how businesses of all sizes perceive and implement cybersecurity.",
      "### 1. Wiz",
      "Founded in 2020 and headquartered in Tel Aviv, Israel and New York, USA, Wiz was founded by Assaf Rappaport, Ami Luttwak, Yinon Costica, and Roy Reznik. The company provides an agentless, cloud-native application protection platform (CNAPP) that scans the entire cloud environment across all layers, VMs, containers, serverless, and more.",
      "Wiz achieved unicorn status in under a year and is valued at over $10 billion as of 2024. It is used by over 40% of Fortune 100 companies and is differentiated by its agentless scanning, ease of deployment, and real-time visibility across AWS, Azure, GCP, and Kubernetes. Key customers include Salesforce, Slack, and The Home Depot. The company recently raised $1 billion in funding to accelerate research and development and global expansion.",
      "### 2. Snyk",
      "Snyk was founded in 2015 with headquarters in London, UK and Boston, USA. The founders are Guy Podjarny, Danny Grander, and Assaf Hefetz. The company focuses on developer security and DevSecOps, integrating into developer workflows to continuously scan for vulnerabilities in code, open source, containers, and infrastructure as code.",
      "Snyk pioneered the \"shift-left\" security model and offers developer-friendly integrations with GitHub, GitLab, Bitbucket, and VS Code, along with automatic fix suggestions. The company has raised over $1.2 billion and is valued around $8.5 billion. Key customers include Salesforce, Google, Atlassian, and New Relic. Recent focus areas include AI-driven vulnerability management and enterprise compliance.",
      "### 3. Talon Cyber Security",
      "Founded in 2021 with headquarters in Tel Aviv, Israel, Talon Cyber Security was founded by Ofer Ben-Noon and Ohad Bobrov. The company provides a secure enterprise-grade browser with built-in controls like DLP, monitoring, and isolation for BYOD environments.",
      "The platform is tailored for hybrid and remote work, eliminating the need for VPNs and complex configurations while supporting zero-trust security and productivity. The company targets remote teams, contractors, and gig workers. Talon has raised over $143 million, backed by Evolution Equity and Lightspeed, and has been recognized as a Gartner Cool Vendor in Endpoint Security.",
      "### 4. Abnormal Security",
      "Abnormal Security was founded in 2018 in San Francisco by Evan Reiser and Sanjay Jeyakumar. The company focuses on email security with behavioral AI, using AI and behavioral profiling to detect and block phishing, BEC, and fraud.",
      "The platform uses behavioral AI instead of static rules to understand normal patterns and detect anomalies. It offers easy API integration with Microsoft 365 and Google Workspace. Key customers include Xerox, Hitachi Vantara, and Fastly. The company has achieved annual recurring revenue over $100 million and has been recognized by Forbes Cloud 100 and Fast Company Most Innovative Companies.",
      "### 5. Cado Security",
      "Cado Security was founded in 2020 with headquarters in London, UK by Chris Doman and James Campbell. The company focuses on cloud forensics and incident response, providing a cloud-native DFIR platform for automated evidence collection and analysis across cloud providers.",
      "The platform is purpose-built for cloud forensics, enables rapid root cause analysis, and significantly reduces incident response time.",
    ],
  },
  {
    slug: "venture-debt-the-rising-star-in-startup-financing-amid-indias-liquidity-crunch",
    title: "Venture Debt: The Rising Star in Startup Financing Amid India's Liquidity Crunch",
    date: "2025-04-15",
    category: "Startup Finance",
    excerpt:
      "Why venture debt is gaining ground as a financing option for startups navigating a tighter liquidity environment.",
    body: [
      "In the face of a mounting liquidity crisis in the Indian economy, many banks, financial institutions, and corporates are struggling to secure capital. Surprisingly, one segment that appears resilient amidst this financial tightness is venture debt, a funding model that is rapidly gaining popularity among startups seeking flexible, non-dilutive financing options.",
      "Venture debt operates much like a conventional loan but is tailor-made for startups that often lack the collateral required by traditional banks. This form of funding typically involves a fixed loan term, predetermined interest rates, and scheduled repayments following a short grace period. The standout benefit? It allows startups to raise funds without parting with equity, making it an attractive middle ground between equity financing and traditional debt.",
      "Although venture debt has existed in India since the early 2000s, it has only recently begun to attract widespread attention. The evolving startup ecosystem now sees it as a less cumbersome and more strategic financial tool, especially in turbulent economic times.",
      "The past few years have witnessed a surge in the number of venture debt players entering the Indian market. This uptick coincides with the broader liquidity crisis, which has further accelerated the adoption of this funding model. Prominent names in the space include InnoVen Capital (backed by Temasek, Singapore's sovereign wealth fund), Alteria Capital, and Trifecta Capital.",
      "The presence of high-profile investors, such as the Azim Premji Foundation, Flipkart's Sachin and Binny Bansal, Kiran Reddy, as well as institutional investors like SIDBI, RBL Bank, and IndusInd Bank has significantly strengthened the sector. These stakeholders are drawn to venture debt by its comparatively low risk: loss rates hover around 2-4%, significantly lower than the 30% typical in venture capital. With fixed interest returns and the ability to recycle capital, venture debt firms are in a stronger position to back a wide range of startups.",
      "India's growing startup ecosystem has created fertile ground for venture debt. The number and value of deals have steadily climbed: in 2017, there were 47 deals worth USD 1.2 billion; in 2018, 62 deals totaling USD 1.4 billion; and in the first half of 2019, around 35-40 deals amounting to USD 547 million.",
      "Notable venture debt recipients include BigBasket, Swiggy, Byju's, LendingKart, Dunzo, Little Black Book, Urban Ladder, OYO, UrbanClap, Paper Boat, Ninjacart, Rivigo, and Vogo.",
      "There are several reasons startups are increasingly leaning on venture debt. First, startups that may not qualify for traditional loans, especially early-stage, asset-light ventures, can still secure venture debt. Lenders often assess the business idea, intellectual property, and revenue potential instead of focusing solely on credit scores or tangible collateral. Second, unlike equity financing, venture debt allows founders to retain control of their company. For growth-stage or mature startups, this is particularly valuable when they want to avoid further equity dilution. Third, with early-stage equity funding drying up over the past couple of years in India, venture debt has emerged as a practical alternative for startups in need of capital. Finally, due to the structured nature of repayments and fixed returns, venture debt firms can redeploy capital more effectively, increasing the availability of funds in the ecosystem.",
      "While venture debt is not a substitute for equity funding, it plays a vital complementary role. It offers startups a strategic financing option that blends the benefits of traditional loans and equity capital, without the complexities of either. As India's startup environment continues to evolve, venture debt is poised to become an even more integral part of the funding landscape.",
    ],
  },
  {
    slug: "towards-a-climate-resilient-future-strategies-for-the-andaman-and-nicobar-islands",
    title: "Towards a Climate-Resilient Future: Strategies for the Andaman and Nicobar Islands",
    date: "2025-03-29",
    category: "Sustainability",
    excerpt:
      "Strategies for building climate resilience across the Andaman and Nicobar Islands.",
    body: [],
  },
  {
    slug: "intergenerational-trust-the-key-to-succession-in-family-business",
    title: "Intergenerational Trust: The Key to Succession in Family Business",
    date: "2025-03-29",
    category: "Family Business",
    excerpt:
      "Why trust between generations is the decisive factor in successful family-business succession.",
    body: [],
  },
  {
    slug: "the-sb-digital-issue-be-a-better-decider",
    title: "The SB Digital Issue: Be a Better Decider",
    date: "2025-03-29",
    category: "Leadership",
    excerpt:
      "On decision-making, making clearer, better-judged calls in a complex world.",
    body: [],
  },
  {
    slug: "indian-family-offices-the-new-investors-for-indias-startup-ecosystem",
    title: "Indian Family Offices: The New Investors for India's Startup Ecosystem",
    date: "2025-03-29",
    category: "Investment",
    excerpt:
      "How family offices are emerging as a significant new source of capital for India's startup ecosystem.",
    body: [],
  },
];

// Every post has a matching slug-named image under /public/images/blog/.
blogPosts.forEach((p) => {
  p.image = `/images/blog/${p.slug}.png`;
});

export const blogSlugs = blogPosts.map((p) => p.slug);

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** Posts sorted newest-first for listings. */
export const blogPostsByDate = [...blogPosts].sort((a, b) =>
  a.date < b.date ? 1 : -1,
);
