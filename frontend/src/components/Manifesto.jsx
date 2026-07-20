import { motion } from "framer-motion";
import { Eyebrow, MaskText, Reveal } from "./Motion";

const CHAPTERS = [
  {
    n: "01",
    title: "Observe",
    body:
      "Every build starts on the floor. I study the manual process, measure the variation, and find where consistency actually breaks down — before touching a single design.",
  },
  {
    n: "02",
    title: "Design",
    body:
      "I model tooling, fixtures, and end-effectors in CAD with manufacturability first. The part is designed for the method that will make it, not the other way around.",
  },
  {
    n: "03",
    title: "Prototype",
    body:
      "Rough is good. Wood mockups, printed jaws, bench integrations — early builds prove the system works together before it's committed to finished materials.",
  },
  {
    n: "04",
    title: "Refine",
    body:
      "Then I test, measure, and iterate. Repeatability is earned through fixturing and part presentation — not brute robot speed.",
  },
];

export const Manifesto = () => {
  return (
    <section id="manifesto" className="relative py-24 sm:py-36 bg-slate-950">
      <div className="absolute inset-0 grid-lines opacity-[0.12] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-12">
        <div className="mb-16 sm:mb-24">
          <Eyebrow>How I Work</Eyebrow>
          <MaskText
            as="h2"
            lines={["A method,", "not a template."]}
            className="mt-6 display-hero text-4xl sm:text-6xl text-slate-50"
          />
        </div>

        <div className="divide-y divide-white/5 border-t border-white/5">
          {CHAPTERS.map((c, i) => (
            <div key={c.n} className="grid grid-cols-12 gap-6 sm:gap-10 py-10 sm:py-14 group">
              <div className="col-span-12 sm:col-span-4 lg:col-span-5">
                <div className="flex items-start gap-5">
                  <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display font-light text-6xl sm:text-8xl leading-none text-stroke group-hover:[-webkit-text-stroke-color:rgba(45,212,191,0.6)] transition-all duration-500"
                  >
                    {c.n}
                  </motion.span>
                  <MaskText
                    as="h3"
                    lines={[c.title]}
                    className="font-display text-2xl sm:text-3xl text-slate-100 pt-2 sm:pt-4"
                  />
                </div>
              </div>
              <div className="col-span-12 sm:col-span-8 lg:col-span-7 flex items-center">
                <Reveal>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">{c.body}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
