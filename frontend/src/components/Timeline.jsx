import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { TIMELINE, PROJECTS } from "../data/portfolio";
import { Reveal } from "./Motion";

export const Timeline = ({ onOpen }) => {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 60%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cobot = PROJECTS.find((p) => p.custom === "cobot");

  return (
    <section id="timeline" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 bg-[#0a0d11]">
      <div className="absolute inset-0 grid-lines opacity-[0.08] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="mb-16 sm:mb-20 max-w-2xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">04 / Timeline</span>
            <h2 className="mt-5 font-display font-light tracking-tight text-4xl sm:text-6xl text-[#F3F7FA]">
              Engineering Journey
            </h2>
            <p className="mt-6 text-[#9AA8B3] text-base sm:text-lg leading-relaxed">
              From early hands-on curiosity to mechanical design, robotics, manufacturing automation, and product
              development.
            </p>
          </div>
        </Reveal>

        <div ref={railRef} className="relative">
          {/* Rail (base + animated fill) */}
          <div className="absolute top-1 bottom-1 left-[15px] md:left-1/2 md:-translate-x-1/2 w-px bg-white/10" />
          <motion.div
            style={{ scaleY: fill }}
            className="absolute top-1 bottom-1 left-[15px] md:left-1/2 md:-translate-x-1/2 w-px origin-top bg-gradient-to-b from-[#67D7FF] to-[#67D7FF]/40"
          />

          <div className="space-y-12 sm:space-y-16">
            {TIMELINE.map((m, i) => (
              <Milestone
                key={i}
                m={m}
                index={i}
                left={i % 2 === 0}
                onOpenCobot={() => cobot && onOpen?.(cobot)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Milestone = ({ m, index, left, onOpenCobot }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      data-testid={`timeline-item-${index}`}
      className="relative md:grid md:grid-cols-2 md:gap-14"
    >
      {/* Node */}
      <span className={`absolute top-1.5 left-[15px] md:left-1/2 -translate-x-1/2 z-[2] grid place-items-center ${m.featured ? "h-4 w-4" : "h-3 w-3"}`}>
        <span className={`rounded-full border-2 border-[#67D7FF] ${m.planned ? "bg-transparent border-dashed" : "bg-[#080A0D]"} ${m.featured ? "h-4 w-4" : "h-3 w-3"}`} />
        {m.featured && <span className="absolute h-4 w-4 rounded-full bg-[#67D7FF]/25" />}
      </span>

      {/* Content — alternating side on desktop */}
      <div
        className={`pl-11 md:pl-0 ${
          left ? "md:col-start-1 md:text-right md:pr-14" : "md:col-start-2 md:pl-14"
        }`}
      >
        <span className="font-mono text-xs tracking-[0.18em] text-[#67D7FF]">{m.date}</span>
        <h3 className={`mt-2 font-display text-[#F3F7FA] tracking-tight ${m.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
          {m.title}
        </h3>
        <p className="mt-1 text-[#9AA8B3] text-xs sm:text-sm font-medium">{m.context}</p>
        {m.note && <p className="mt-1 font-mono text-[11px] tracking-wide text-[#67D7FF]/80">{m.note}</p>}
        <p className="mt-3 text-[#9AA8B3] text-sm leading-relaxed">{m.desc}</p>

        {m.bullets && (
          <ul className={`mt-4 space-y-2.5 ${left ? "md:flex md:flex-col md:items-end" : ""}`}>
            {m.bullets.map((b) => (
              <li key={b} className={`flex gap-3 text-[#9AA8B3] text-sm leading-relaxed ${left ? "md:flex-row-reverse md:text-right" : ""}`}>
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#67D7FF] shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {m.meta && (
          <div className={`mt-4 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}`}>
            {m.meta.map((t) => (
              <span key={t} className="text-[10px] font-mono tracking-wide uppercase text-[#9AA8B3] border border-white/10 rounded px-2 py-1">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Expandable details (Milestone 6) */}
        {m.details && (
          <div className={`mt-4 ${left ? "md:flex md:flex-col md:items-end" : ""}`}>
            <button
              onClick={() => setOpen((o) => !o)}
              data-testid="timeline-details-toggle"
              className="inline-flex items-center gap-2 text-[#67D7FF] hover:text-[#A4EAFF] text-xs tracking-[0.12em] uppercase transition-colors"
            >
              {open ? <Minus size={14} /> : <Plus size={14} />}
              {open ? "Hide details" : "Role details"}
            </button>
            {open && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`mt-4 space-y-2.5 overflow-hidden ${left ? "md:text-left" : ""}`}
              >
                {m.details.map((d, i) => (
                  <li key={i} className={`flex gap-3 text-[#9AA8B3] text-sm leading-relaxed ${left ? "md:flex-row-reverse md:text-right" : ""}`}>
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#67D7FF] shrink-0" />
                    <span>{d}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </div>
        )}

        {/* Cobot link (Milestone 8) */}
        {m.cobotLink && (
          <button
            onClick={onOpenCobot}
            data-testid="timeline-cobot-link"
            className={`group mt-5 inline-flex items-center gap-2 text-[#67D7FF] hover:text-[#A4EAFF] text-sm font-medium transition-colors ${left ? "md:flex-row-reverse" : ""}`}
          >
            View Cobot Case Study
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        )}
      </div>
    </motion.div>
  );
};
