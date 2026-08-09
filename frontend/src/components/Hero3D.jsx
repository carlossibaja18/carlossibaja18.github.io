import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "@google/model-viewer";

// Set this to a .glb URL once Carlos's robot model is converted, e.g. "/models/robot.glb"
export const MODEL_URL = null;
const FALLBACK_PHOTO = "/projects/cobot/IMG_6125.jpg";

export const Hero3D = () => {
  const wrapRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full max-w-[540px] [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div className="spotlight relative overflow-hidden rounded-2xl clip-frame border border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-950 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.95)]">
          {MODEL_URL ? (
            <model-viewer
              src={MODEL_URL}
              camera-controls=""
              auto-rotate=""
              auto-rotate-delay="0"
              rotation-per-second="18deg"
              interaction-prompt="none"
              shadow-intensity="1"
              exposure="1.05"
              environment-image="neutral"
              data-testid="hero-3d-model"
              style={{ width: "100%", height: "520px", background: "transparent" }}
            />
          ) : (
            <div className="relative z-[1]" data-testid="hero-centerpiece">
              <motion.img
                src={FALLBACK_PHOTO}
                alt="Carlos Sibaja's cobot ultrasonic welder end-effector"
                className="w-full h-[520px] object-cover object-center"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-[2] ring-1 ring-inset ring-white/5 rounded-2xl" />
          <div className="absolute bottom-4 left-5 z-[3] flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67D7FF] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
              {MODEL_URL ? "Drag to rotate · Live 3D" : "End-effector · Ultrasonic welder"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
