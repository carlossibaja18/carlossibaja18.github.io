import { Reveal } from "./Motion";

const CARDS = [
  {
    id: "parametric-cad-generator",
    title: "Parametric CAD Generator",
    status: "Building",
    description:
      "A Python and SolidWorks generator that takes a set of parameters and builds a part family automatically, instead of remodeling each variant by hand.",
    bullets: [
      "Stack: Python, SolidWorks API, parametric modeling",
      "Current step: Getting Python talking to SolidWorks on my home machine, open, create a blank part, save, close",
      "Next: Generate the first real part family for a camera mount base",
    ],
  },
  {
    id: "ai-assisted-dfm-workflow",
    title: "AI-Assisted DFM Workflow",
    status: "Testing",
    description:
      "Using AI to speed up DFM checks and documentation, with SolidWorks and DFM doing the real work. AI is a multiplier, not the design.",
    bullets: [
      "Stack: DFM Checklist Pack, GD&T Cheat Sheet and Tolerance Stack-Up Workbook",
      "Current step: Testing it first on a real part before claiming it works",
      "Next: Catch manufacturability issues earlier and document them faster",
    ],
  },
  {
    id: "systematic-trading-bot",
    title: "Systematic Trading Bot",
    status: "Paper Trading Only",
    description:
      "A systematic trading system built to learn Python, data, and risk controls. Paper trading first, no real money until it is validated for months.",
    bullets: [
      "Stack: Python, Alpaca free API, backtesting",
      "Current step: Paper trading and backtesting only, validating rules before any real money",
      "Next: Keep validating for months, tiny real money only after validated paper trading",
    ],
    note: "Note: Side learning project, not an income plan, never touches Miami move money",
  },
];

export const CurrentlyBuilding = () => {
  return (
    <section id="currently-building" data-testid="currently-building-section" className="relative py-12 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">03 / Currently Building</span>
            <h2 className="mt-5 font-display font-light tracking-tight text-4xl sm:text-6xl text-[#F3F7FA]">
              Currently Building
            </h2>
            <p className="mt-6 text-[#9AA8B3] text-base sm:text-lg leading-relaxed">
              AI in practice. I am using AI to make SolidWorks and DFM faster, not learning AI as a separate skill.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {CARDS.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.06}>
              <div
                data-testid={`building-card-${card.id}`}
                className="h-full rounded-xl border border-[#67D7FF]/15 bg-[#11171D] p-7 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl text-[#F3F7FA] leading-snug">{card.title}</h3>
                  <span
                    data-testid={`building-status-${card.id}`}
                    className="shrink-0 rounded-full border border-[#67D7FF]/30 bg-[#67D7FF]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#67D7FF]"
                  >
                    {card.status}
                  </span>
                </div>
                <p className="mt-4 text-[#9AA8B3] text-sm sm:text-base leading-relaxed">{card.description}</p>
                <ul className="mt-5 mb-5 space-y-3 flex-1">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[#9AA8B3] text-sm sm:text-base leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#67D7FF] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                {card.note && (
                  <p className="mb-4 text-[#9AA8B3]/80 text-xs italic leading-relaxed">{card.note}</p>
                )}
                <p data-testid={`building-note-${card.id}`} className="font-mono text-xs tracking-wide text-[#9AA8B3]">
                  Currently working on this
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
