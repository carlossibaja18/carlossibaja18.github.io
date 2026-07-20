import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE, PROJECTS } from "../data/portfolio";
import { MaskText, Reveal } from "./Motion";
import { Hero3D } from "./Hero3D";
import { scrollToId } from "./SmoothScroll";

export const Hero = ({ onOpenProject }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacityImg = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const featured = PROJECTS.find((p) => p.featured);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 grid-lines opacity-25" />
      <div className="absolute top-1/2 right-[6%] -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-teal-500/10 blur-[140px] pointer-events-none hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full grid lg:grid-cols-12 gap-12 items-center">
        {/* Left: kinetic copy */}
        <motion.div style={{ y: yCopy }} className="lg:col-span-6">
          <MaskText
            trigger="load"
            lines={["Mechanical · Design · Robotics"]}
            className="mb-7"
            lineClassName="font-mono text-xs tracking-[0.28em] uppercase text-teal-400"
          />

          <MaskText
            trigger="load"
            as="h1"
            lines={["Carlos", "Sibaja"]}
            className="display-hero text-6xl sm:text-7xl lg:text-8xl text-slate-50"
          />
          <MaskText
            trigger="load"
            lines={["Engineering"]}
            className="mt-2"
            lineClassName="display-hero text-4xl sm:text-5xl lg:text-6xl text-stroke"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="mt-8 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              {PROFILE.positioning}
            </p>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xl">{PROFILE.intro}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToId("projects")}
                data-testid="hero-view-work-btn"
                className="group inline-flex items-center gap-2 bg-teal-400 text-slate-950 font-semibold text-sm px-7 py-3.5 rounded-md hover:bg-teal-300 transition-colors duration-200"
              >
                Explore Projects
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
              </button>
              <button
                onClick={() => scrollToId("contact")}
                data-testid="hero-contact-btn"
                className="inline-flex items-center gap-2 border border-slate-700 text-slate-200 text-sm px-7 py-3.5 rounded-md hover:border-slate-500 hover:text-white transition-colors duration-200"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: interactive 3D / treated photo */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center gap-4">
          <motion.div style={{ y: yImg, opacity: opacityImg }} className="w-full flex justify-center">
            <Hero3D />
          </motion.div>

          {featured && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={() => onOpenProject?.(featured)}
              data-testid="hero-featured-chip"
              className="group w-full max-w-[540px] flex items-center gap-3 bg-slate-900/70 backdrop-blur border border-white/10 rounded-lg px-4 py-3 hover:border-teal-400/40 transition-colors duration-200 text-left"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal-400 shrink-0">Featured</span>
              <span className="flex-1 text-slate-200 text-xs leading-snug truncate">{featured.title}</span>
              <ArrowUpRight size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors duration-200 shrink-0" />
            </motion.button>
          )}
        </div>
      </div>

      {/* scroll cue */}
      <Reveal className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block" delay={1.2}>
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-8 w-px bg-gradient-to-b from-teal-400 to-transparent"
          />
        </div>
      </Reveal>
    </section>
  );
};
