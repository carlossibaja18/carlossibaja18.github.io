import { Reveal } from "./Motion";

const COLUMNS = [
  {
    id: "design",
    heading: "Design",
    items: ["SolidWorks", "DFM", "GD&T", "Parametric modeling", "Prototyping"],
  },
  {
    id: "analysis-manufacturing",
    heading: "Analysis and Manufacturing",
    items: ["SolidWorks Simulation FEA", "Tolerance stack-up", "BOMs"],
  },
  {
    id: "automation-robotics",
    heading: "Automation and Robotics",
    items: ["FANUC HandlingTool", "Cobot programming", "Pneumatics and vacuum systems", "Python for CAD automation"],
  },
];

export const Skills = () => {
  return (
    <section id="skills" data-testid="skills-section" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">01 / Skills</span>
            <h2 className="mt-5 font-display font-light tracking-tight text-4xl sm:text-6xl text-[#F3F7FA]">
              Skills
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {COLUMNS.map((col, i) => (
            <Reveal key={col.id} delay={i * 0.06}>
              <div
                data-testid={`skills-card-${col.id}`}
                className="h-full rounded-xl border border-[#67D7FF]/15 bg-[#11171D] p-7"
              >
                <h3 className="font-display text-xl text-[#F3F7FA] leading-snug">{col.heading}</h3>
                <ul className="mt-5 space-y-3">
                  {col.items.map((s) => (
                    <li key={s} className="flex gap-3 text-[#9AA8B3] text-sm sm:text-base leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#67D7FF] shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p data-testid="skills-additional-line" className="mt-8 font-mono text-xs tracking-wide text-[#9AA8B3]">
            Also experienced with: <span className="text-[#67D7FF]">CNC, Mastercam</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
};
