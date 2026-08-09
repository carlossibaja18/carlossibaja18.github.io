import { motion } from "framer-motion";
import { TIMELINE } from "../data/portfolio";
import { Reveal } from "./Motion";

export const Timeline = () => {
  return (
    <section id="timeline" className="relative py-24 sm:py-32 bg-[#0a0d11]">
      <div className="absolute inset-0 grid-lines opacity-[0.1] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="mb-16">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">02 / Timeline</span>
            <h2 className="mt-5 font-display font-light tracking-tight text-4xl sm:text-6xl text-[#F3F7FA]">
              Engineering Journey
            </h2>
          </div>
        </Reveal>

        <div className="relative pl-8 sm:pl-12">
          <div className="absolute left-[5px] sm:left-[9px] top-1 bottom-1 w-px bg-gradient-to-b from-[#67D7FF]/50 via-white/10 to-transparent" />
          <div className="space-y-11">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`timeline-item-${i}`}
                className="relative"
              >
                <span className="absolute -left-[33px] sm:-left-[45px] top-1.5 h-3 w-3 rounded-full bg-[#080A0D] border-2 border-[#67D7FF]" />
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#67D7FF]">{t.period}</span>
                <h3 className="mt-1.5 font-display text-xl sm:text-2xl text-[#F3F7FA]">{t.title}</h3>
                {t.org && <p className="mt-1 text-[#9AA8B3] text-sm font-medium">{t.org}</p>}
                <p className="mt-2 text-[#9AA8B3] text-sm leading-relaxed max-w-2xl">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
