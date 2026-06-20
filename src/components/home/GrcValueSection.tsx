import {
  BarChart3,
  LayoutTemplate,
  Link as LinkIcon,
  Settings,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * "What problem are we solving?" and the five strategies, in one section.
 *
 * Band A pairs a sticky heading with the investment / the gap, shown in full.
 * Band B lays the five strategies out as a hairline-ruled grid of cells (icon,
 * title, description). Card copy in PROBLEM_CARDS is locked and used verbatim.
 * The component brings its own vertical rhythm and expects to sit inside the
 * page's content container.
 */

type ProblemCard = {
  id: string;
  title: string;
  body: string;
};

const PROBLEM_CARDS: ProblemCard[] = [
  {
    id: "investment",
    title: "The investment",
    body: "Due to an increase in regulatory requirements over the last 20 years, almost all large and mid-size companies have invested in GRC applications, the term GRC can refer to general applications which help clients document controls and track evidence and can also refer to specialised applications that cater to very specific risks (e.g. ERP security and controls).",
  },
  {
    id: "gap",
    title: "The gap",
    body: "However, these applications require specialised in-house resources who act as administrators or support staff which adds operational expenditure.",
  },
];

type Strategy = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const STRATEGIES: Strategy[] = [
  {
    id: "automate",
    icon: Settings,
    title: "Automate Controls & Evidence",
    description: "Cut manual work and accelerate audits.",
  },
  {
    id: "integrate",
    icon: LinkIcon,
    title: "Integrate Across Departments",
    description: "Unify security, IT, finance and legal data.",
  },
  {
    id: "predictive",
    icon: TrendingUp,
    title: "Shift to Predictive Risk",
    description: "Move from reactive to forward-looking.",
  },
  {
    id: "frameworks",
    icon: LayoutTemplate,
    title: "Leverage Standard Frameworks",
    description: "Faster time-to-value with pre-built templates.",
  },
  {
    id: "measure",
    icon: BarChart3,
    title: "Measure & Communicate Value",
    description: "Prove impact to executive stakeholders.",
  },
];

function ProblemBlock({ card }: { card: ProblemCard }) {
  return (
    <div className="border-t border-t-hairline py-7 pl-5 transition-shadow duration-200 first:border-t-0 first:pt-0 hover:shadow-[inset_2px_0_0_0_var(--color-accent)] motion-reduce:transition-none">
      <h3 className="font-display text-lg font-bold tracking-tight text-ink">
        {card.title}
      </h3>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-text">{card.body}</p>
    </div>
  );
}

function StrategyCell({ strategy, wide }: { strategy: Strategy; wide: boolean }) {
  const { icon: Icon, title, description } = strategy;
  return (
    <div className={`bg-paper p-6 md:p-8 ${wide ? "sm:col-span-2" : ""}`}>
      <Icon aria-hidden strokeWidth={1.5} className="h-6 w-6 text-accent" />
      <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">
        {title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{description}</p>
    </div>
  );
}

export function GrcValueSection() {
  return (
    <section
      aria-labelledby="grc-problem-heading"
      className="mt-16 border-t border-hairline pt-14 lg:mt-20 lg:pt-16"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2
          id="grc-problem-heading"
          className="text-h2 text-ink lg:sticky lg:top-28 lg:self-start"
        >
          What problem are we solving?
        </h2>
        <div>
          {PROBLEM_CARDS.map((card) => (
            <ProblemBlock key={card.id} card={card} />
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-hairline pt-14 lg:mt-20 lg:pt-16">
        <Eyebrow>Get the most from your GRC</Eyebrow>
        <h2 className="text-h3 mt-4 max-w-2xl text-ink">
          Five strategies to maximise your GRC value
        </h2>
        <p className="mt-3 max-w-2xl text-muted">
          Practical ways to turn your GRC investment into measurable business
          outcomes.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {STRATEGIES.map((strategy, i) => (
            <StrategyCell
              key={strategy.id}
              strategy={strategy}
              wide={i === STRATEGIES.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
