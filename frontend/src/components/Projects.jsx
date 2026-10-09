import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { Reveal } from "./Motion";

const SPAN = {
  featured: "md:col-span-6",
  large: "md:col-span-6",
  medium: "md:col-span-3",
  standard: "md:col-span-2",
};

export const Projects = ({ onOpen }) => {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">01 / Projects</span>
            <h2 className="mt-5 font-display font-light tracking-tight text-4xl sm:text-6xl text-[#F3F7FA]">
              Selected Engineering Work
            </h2>
            <p className="mt-6 text-[#9AA8B3] text-base sm:text-lg leading-relaxed">
              A selection of mechanical design, automation, tooling, and product-development work focused on turning
              practical engineering problems into tested physical systems.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-5 lg:gap-6">
          {PROJECTS.map((p, i) => {
            const featured = p.emphasis === "featured";
            const large = p.emphasis === "large";
            return (
              <motion.button
                key={p.id}
                onClick={() => onOpen(p)}
                data-testid={`project-card-${p.id}`}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group text-left relative overflow-hidden rounded-xl border border-[#67D7FF]/15 bg-[#11171D] hover:border-[#67D7FF]/40 transition-colors duration-300 ${SPAN[p.emphasis] || SPAN.standard}`}
              >
                {featured ? (
                  <div className="grid sm:grid-cols-2">
                    <div className="relative h-64 sm:h-[420px] overflow-hidden">
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11171D]/30 sm:to-[#11171D]" />
                      <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#080A0D] bg-[#67D7FF] rounded px-2.5 py-1">
                        Flagship
                      </span>
                    </div>
                    <div className="p-7 sm:p-10 flex flex-col justify-center">
                      <span className="font-mono text-xs tracking-[0.2em] text-[#67D7FF]">{p.date || "—"}</span>
                      <h3 className="mt-3 font-display font-light text-2xl sm:text-4xl text-[#F3F7FA] leading-tight tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[#9AA8B3] text-sm leading-relaxed max-w-md">{p.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="text-[11px] font-mono tracking-wide uppercase text-[#9AA8B3] border border-white/10 rounded px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-2 text-[#67D7FF] text-sm font-medium">
                        View Case Study
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                ) : large ? (
                  <div className="grid sm:grid-cols-2">
                    <div className="relative h-64 sm:h-[380px] overflow-hidden">
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[600ms]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11171D]/30 sm:to-[#11171D]" />
                    </div>
                    <div className="p-7 sm:p-10 flex flex-col justify-center">
                      <span className="font-mono text-xs tracking-[0.2em] text-[#67D7FF]">{p.date || "—"}</span>
                      <h3 className="mt-3 font-display font-light text-2xl sm:text-3xl text-[#F3F7FA] leading-tight tracking-tight">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[#9AA8B3] text-sm leading-relaxed max-w-md">{p.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {p.tags.slice(0, 4).map((t) => (
                          <span key={t} className="text-[11px] font-mono tracking-wide uppercase text-[#9AA8B3] border border-white/10 rounded px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-7 inline-flex items-center gap-2 text-[#67D7FF] text-sm font-medium">
                        View Case Study
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={p.cover}
                        alt={p.title}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.04] transition-[transform,opacity] duration-[600ms]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#11171D] via-transparent to-transparent" />
                    </div>
                    <div className="p-6 flex flex-col flex-1 border-t border-white/5">
                      <span className="font-mono text-[11px] tracking-[0.18em] text-[#67D7FF]">{p.date || p.year}</span>
                      <h3 className="mt-2.5 font-display text-xl text-[#F3F7FA] leading-snug">{p.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((t) => (
                          <span key={t} className="text-[10px] font-mono tracking-wide uppercase text-[#9AA8B3] border border-white/10 rounded px-2 py-1">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[#67D7FF] text-sm">
                        View Case Study
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
