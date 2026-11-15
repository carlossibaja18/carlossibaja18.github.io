import { Reveal } from "./Motion";
import { PlaceholderBox } from "./CaseStudyShared";

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
    link: "[TO ADD: GitHub repo link here]",
  },
  {
    id: "ai-assisted-dfm-workflow",
    title: "AI-Assisted DFM Workflow",
    status: "Testing",
    description:
      "A workflow that uses AI to draft DFM feedback on parts faster, so design reviews catch manufacturing issues earlier.",
    bullets: [
      "Stack: AI-assisted drafting, DFM checklists, SolidWorks drawings",
      "Current step: Testing prompts against real parts to see where the feedback is useful and where it misses",
      "Next: Build a repeatable DFM review checklist I can run before sending parts out",
    ],
    link: "[TO ADD: workflow notes or example output link here]",
  },
  {
    id: "cad-automation-macros",
    title: "CAD Automation Macros",
    status: "Building",
    description:
      "Small SolidWorks macros that automate repetitive modeling and drawing tasks I do over and over on real projects.",
    bullets: [
      "Stack: SolidWorks API, VBA/Python, drawing automation",
      "Current step: Automating the most repeated steps from my recent fixture and mount work",
      "Next: Package the macros so they are one click instead of a manual routine",
    ],
    link: "[TO ADD: GitHub repo link here]",
  },
];

export const CurrentlyBuilding = () => {
  return (
    <section id="currently-building" data-testid="currently-building-section" className="relative py-24 sm:py-32">
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
                <div className="mt-6">
                  <PlaceholderBox label={card.link} dark testid={`building-link-${card.id}`} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
