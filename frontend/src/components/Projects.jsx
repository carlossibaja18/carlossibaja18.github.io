import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { ProjectModal } from "./ProjectModal";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const Projects = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-teal-400" />
              <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">Selected Work</span>
            </div>
            <h2 className="font-display tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-50 font-light">
              Projects
            </h2>
          </div>
          <p className="hidden sm:block text-slate-400 text-sm font-mono max-w-xs text-right">
            Click any card to open the full case study.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              onClick={() => setSelected(p)}
              data-testid={`project-card-${p.id}`}
              className="group text-left relative bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden hover:border-teal-400/40 hover:-translate-y-1.5 transition-[transform,border-color] duration-300 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.8)]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-[transform,opacity] duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                <span className="absolute top-4 right-4 h-9 w-9 grid place-items-center rounded-md bg-slate-950/60 backdrop-blur border border-slate-700 text-slate-300 group-hover:text-teal-400 group-hover:border-teal-400/40 transition-colors duration-300">
                  <ArrowUpRight size={16} />
                </span>
              </div>

              <div className="p-6 sm:p-7 border-t border-slate-800">
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-teal-400/80">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px w-4 bg-slate-700" />
                  <span className="text-slate-500">{p.tags[0]}</span>
                </div>
                <h3 className="mt-3 font-display text-xl text-slate-100 leading-snug">{p.title}</h3>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">{p.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono tracking-wider uppercase text-slate-400 border border-slate-800 rounded px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};
