import { motion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { PROFILE } from "../data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image + gradients */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1593062037896-764e9f52029e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwZ2VhcnMlMjBkYXJrfGVufDB8fHx8MTc4Mzk5ODk2OXww&ixlib=rb-4.1.0&q=85"
          alt="Mechanical systems"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
        <div className="absolute inset-0 grid-lines opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full pt-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-teal-400" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">
              Mechanical &amp; Manufacturing Engineer
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-light tracking-tighter text-5xl sm:text-6xl lg:text-7xl text-slate-50 leading-[0.95]"
          >
            {PROFILE.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 font-mono text-teal-400 text-sm sm:text-base tracking-[0.12em]"
          >
            {PROFILE.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            {PROFILE.statement}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
            {PROFILE.focus.map((f, i) => (
              <span key={f} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-slate-600" />}
                {f}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-6 flex items-center gap-2 text-slate-500 text-xs font-mono">
            <MapPin size={14} className="text-teal-400" />
            {PROFILE.location}
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-view-work-btn"
              className="group inline-flex items-center gap-2 bg-teal-400 text-slate-950 font-semibold text-sm px-7 py-3 rounded-md hover:bg-teal-300 transition-colors duration-200"
            >
              View Projects
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-200 text-sm px-7 py-3 rounded-md hover:border-slate-500 hover:text-white transition-colors duration-200"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
