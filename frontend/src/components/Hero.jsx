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
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </div>

      {/* Cyan glow orb */}
      <div className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full pt-24">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div variants={item} className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-cyan-400" />
            <span className="text-xs tracking-[0.28em] uppercase text-cyan-400">
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
            className="mt-5 font-mono text-cyan-400 text-sm sm:text-base tracking-[0.12em]"
          >
            {PROFILE.title}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl"
          >
            {PROFILE.statement}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2">
            {PROFILE.focus.map((f) => (
              <span
                key={f}
                className="text-xs font-mono tracking-wider text-slate-300 border border-cyan-400/20 rounded-full px-3 py-1.5 bg-slate-900/40"
              >
                {f}
              </span>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-2 text-slate-400 text-xs font-mono">
            <MapPin size={14} className="text-cyan-400" />
            {PROFILE.location}
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-view-work-btn"
              className="group inline-flex items-center gap-2 bg-cyan-400 text-slate-950 font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-cyan-300 transition-colors duration-200"
            >
              View Projects
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 border border-slate-600 text-slate-200 text-sm px-7 py-3.5 rounded-full hover:border-cyan-400/60 hover:text-cyan-400 transition-colors duration-200"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 noise-overlay" />
    </section>
  );
};
