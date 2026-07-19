import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE, HERO_CENTERPIECE, PROJECTS } from "../data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export const Hero = ({ onOpenProject }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacityImg = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const featured = PROJECTS.find((p) => p.featured);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 grid-lines opacity-25" />
      {/* restrained radial light behind centerpiece */}
      <div className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* Left: copy */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6">
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span className="h-px w-10 bg-teal-400" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">
              Mechanical · Design · Robotics
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-light tracking-tighter text-5xl sm:text-6xl lg:text-7xl text-slate-50 leading-[0.92]"
          >
            Carlos Sibaja
          </motion.h1>
          <motion.p
            variants={item}
            className="font-display font-light tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-500 mt-1"
          >
            Engineering
          </motion.p>

          <motion.p variants={item} className="mt-8 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
            {PROFILE.positioning}
          </motion.p>
          <motion.p variants={item} className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xl">
            {PROFILE.intro}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => scrollTo("projects")}
              data-testid="hero-view-work-btn"
              className="group inline-flex items-center gap-2 bg-teal-400 text-slate-950 font-semibold text-sm px-7 py-3 rounded-md hover:bg-teal-300 transition-colors duration-200"
            >
              Explore Projects
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 border border-slate-700 text-slate-200 text-sm px-7 py-3 rounded-md hover:border-slate-500 hover:text-white transition-colors duration-200"
            >
              Get in Touch
            </button>
          </motion.div>
        </motion.div>

        {/* Right: floating centerpiece */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center gap-4">
          <motion.div
            style={{ y: yImg, scale: scaleImg, opacity: opacityImg }}
            className="relative w-full max-w-[520px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)]">
              <motion.img
                src={HERO_CENTERPIECE}
                alt="Robotic end-effector holding an ultrasonic welder — engineered object as art"
                data-testid="hero-centerpiece"
                className="w-full h-auto"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
              <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                End-effector · Ultrasonic welder
              </span>
            </div>
          </motion.div>

          {/* featured project chip */}
          {featured && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              onClick={() => onOpenProject?.(featured)}
              data-testid="hero-featured-chip"
              className="group w-full max-w-[520px] flex items-center gap-3 bg-slate-900/70 backdrop-blur border border-white/10 rounded-lg px-4 py-3 hover:border-teal-400/40 transition-colors duration-200 text-left"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-400 shrink-0">
                Featured
              </span>
              <span className="flex-1 text-slate-200 text-xs leading-snug truncate">{featured.title}</span>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors duration-200 shrink-0" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};
