import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "@google/model-viewer";
import { PROJECTS } from "../data/portfolio";
import { scrollToId } from "./SmoothScroll";

const MODEL = "/models/fairino-fr3-wms.glb";

export const Hero = ({ onOpenProject }) => {
  const featured = PROJECTS.find((p) => p.featured);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const open = () => featured && onOpenProject?.(featured);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 grid-lines opacity-[0.18]" />
      <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-[#67D7FF]/[0.07] blur-[150px] pointer-events-none" />

      {/* Top-center identity */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center z-[2] mt-2 sm:mt-4"
      >
        <h1 className="font-display font-light tracking-tight text-4xl sm:text-6xl lg:text-7xl text-[#F3F7FA] leading-none">
          Carlos Sibaja
        </h1>
        <p className="mt-3 font-mono text-[11px] sm:text-xs tracking-[0.5em] uppercase text-[#67D7FF] pl-[0.5em]">
          Engineering
        </p>
      </motion.div>

      {/* Center interactive 3D robot */}
      <div className="relative z-[2] flex-1 w-full flex flex-col items-center justify-center gap-4 mt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[86vw] max-w-[560px] h-[46vh] min-h-[340px] sm:h-[54vh] cursor-pointer"
          onClick={open}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && open()}
          data-testid="hero-featured-card"
          aria-label={`Open case study: ${featured?.title}`}
        >
          <model-viewer
            src={MODEL}
            data-testid="hero-centerpiece"
            alt="Interactive 3D model of the FAIRINO FR3-WMS collaborative robot — Cobot Ultrasonic Welding Automation"
            camera-controls=""
            {...(reduced ? {} : { "auto-rotate": "", "auto-rotate-delay": "0", "rotation-per-second": "16deg" })}
            interaction-prompt="none"
            disable-zoom=""
            orientation="0deg -90deg 0deg"
            camera-orbit="25deg 74deg 112%"
            min-camera-orbit="auto 55deg auto"
            max-camera-orbit="auto 95deg auto"
            field-of-view="32deg"
            shadow-intensity="1.1"
            shadow-softness="1"
            exposure="1.05"
            environment-image="neutral"
            style={{ width: "100%", height: "100%", background: "transparent", "--poster-color": "transparent" }}
          />
          {/* featured tag */}
          <span className="pointer-events-none absolute top-2 left-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67D7FF]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9AA8B3]">Featured · FAIRINO FR3-WMS</span>
          </span>
        </motion.div>

        {/* Featured label */}
        <motion.button
          onClick={open}
          data-testid="hero-featured-chip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="group text-center"
        >
          <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-[#67D7FF]">Featured Project</span>
          <span className="mt-2 flex items-center justify-center gap-2 text-[#F3F7FA] text-lg sm:text-xl font-display tracking-tight">
            {featured?.title}
            <ArrowRight size={18} className="text-[#67D7FF] group-hover:translate-x-1 transition-transform duration-200" />
          </span>
          <span className="mt-1.5 block text-[#9AA8B3] text-xs sm:text-sm">
            2026 · Mechanical Design · Tooling · Automation
          </span>
        </motion.button>
      </div>

      {/* scroll cue */}
      <button
        onClick={() => scrollToId("projects")}
        className="relative z-[2] mt-4 hidden sm:flex flex-col items-center gap-2 text-[#9AA8B3] hover:text-[#67D7FF] transition-colors"
        aria-label="Scroll to projects"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.span
          animate={reduced ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[#67D7FF] to-transparent"
        />
      </button>
    </section>
  );
};
