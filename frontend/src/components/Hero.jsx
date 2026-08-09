import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECTS } from "../data/portfolio";
import { scrollToId } from "./SmoothScroll";

const HERO_IMG = "/projects/cobot/IMG_6125.jpg";

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

  const wrapRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 15 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 15 });

  const onMove = (e) => {
    if (reduced) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const open = () => featured && onOpenProject?.(featured);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 grid-lines opacity-[0.18]" />
      <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] rounded-full bg-[#67D7FF]/[0.06] blur-[150px] pointer-events-none" />

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

      {/* Center floating featured project */}
      <div className="relative z-[2] flex-1 w-full flex flex-col items-center justify-center gap-8 mt-8 sm:mt-4">
        <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className="[perspective:1400px]">
          <motion.button
            onClick={open}
            data-testid="hero-featured-card"
            aria-label={`Open case study: ${featured?.title}`}
            style={reduced ? {} : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="group relative block"
          >
            <motion.div
              animate={reduced ? {} : { y: [0, -12, 0], rotateY: [-5, 5, -5] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[74vw] max-w-[400px] sm:max-w-[440px]"
            >
              <div className="relative overflow-hidden rounded-xl border border-[#67D7FF]/25 bg-[#11171D] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(103,215,255,0.06)]">
                <img
                  src={HERO_IMG}
                  alt="Carlos Sibaja's cobot ultrasonic welding end-effector — featured project"
                  data-testid="hero-centerpiece"
                  className="w-full h-[420px] sm:h-[480px] object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080A0D]/70 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[#67D7FF]/10" />
                <span className="pointer-events-none absolute top-4 left-4 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#67D7FF]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9AA8B3]">Featured</span>
                </span>
              </div>
              {/* soft floor shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-black/60 blur-2xl rounded-full" />
            </motion.div>
          </motion.button>
        </div>

        {/* Featured label */}
        <motion.button
          onClick={open}
          data-testid="hero-featured-chip"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
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
