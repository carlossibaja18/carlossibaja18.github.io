import { motion } from "framer-motion";
import { PROFILE, TIMELINE } from "../data/portfolio";

export const About = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-slate-950">
      <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 sm:px-12">
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-teal-400" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">History / About</span>
          </div>
          <h2 className="font-display tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-50 font-light">
            From tinkering to engineered systems
          </h2>
          <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed">
            {PROFILE.intro}
          </p>
        </div>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[7px] sm:left-[9px] top-1 bottom-1 w-px bg-gradient-to-b from-teal-400/60 via-slate-700 to-transparent" />
          <div className="space-y-10">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                data-testid={`timeline-item-${i}`}
              >
                <span className="absolute -left-[33px] sm:-left-[41px] top-1.5 h-3 w-3 rounded-full bg-slate-950 border-2 border-teal-400" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-teal-400/80">{t.period}</span>
                <h3 className="mt-1.5 font-display text-lg sm:text-xl text-slate-100">{t.title}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-2xl">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
