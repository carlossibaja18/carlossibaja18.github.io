import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Reveal } from "./Motion";

const ACCENT = "#67D7FF";
const P = "/projects/vex";

/* FIU VEX Robotics — CAD Drivetrain & Mounting Design (Carlos Sibaja, 2022–2023)
 * Image order + captions are locked to the uploaded files. */
const HERO = { src: `${P}/IMG_1975.webp`, alt: "FIU VEX competition robot on a workbench in a student robotics lab.", cap: "FIU VEX competition robot built for a student robotics competition environment." };
const MULTI = { src: `${P}/IMG_1979.jpeg`, alt: "Four-view CAD study of a VEX wheel and drivetrain component.", cap: "Multi-view CAD study of a wheel/drivetrain component developed during early robotics design work." };
const CLOSE = { src: `${P}/IMG_1977.jpeg`, alt: "CAD close-up of a VEX wheel assembly showing rollers, gear, and mounting plate.", cap: "CAD close-up used to study wheel geometry, component packaging, and mounting relationships." };
const BUILD = { src: `${P}/IMG_1976.jpeg`, alt: "Physical VEX robot at a competition showing the assembled drivetrain and structure.", cap: "Physical robot build showing the integrated drivetrain, structural members, mechanisms, and competition-ready assembly." };
const ASSEMBLY = { src: `${P}/IMG_1978.jpeg`, alt: "CAD assembly view of the broader VEX robot chassis and drivetrain layout.", cap: "CAD assembly view showing the broader robot chassis and drivetrain layout." };

export const VexCaseStudy = ({ onClose }) => {
  const [zoom, setZoom] = useState(null);

  return (
    <div className="relative bg-[#080A0D] text-[#F3F7FA]" data-testid="vex-case-study">
      <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3 bg-[#080A0D]/85 backdrop-blur border-b border-[#67D7FF]/12">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#9AA8B3] truncate">
            FIU VEX Robotics · 2022–2023
          </span>
        </div>
        <button onClick={onClose} data-testid="modal-close-btn"
          className="h-10 w-10 grid place-items-center rounded-full bg-[#11171D] border border-white/10 text-[#F3F7FA] hover:text-[#67D7FF] hover:border-[#67D7FF]/50 transition-colors duration-200 shrink-0"
          aria-label="Close project">
          <X size={18} />
        </button>
      </div>

      {/* Hero */}
      <header>
        <div className="relative w-full h-[50vh] min-h-[300px] sm:h-[58vh] overflow-hidden bg-[#0d1217]">
          <img src={HERO.src} alt={HERO.alt} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/50 to-[#080A0D]/10" />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-14 pb-8 sm:pb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>
                2022–2023 · Early CAD & Robotics
              </span>
            </div>
            <h1 className="font-display font-light tracking-tight text-3xl sm:text-5xl leading-[1.05] max-w-4xl">
              FIU VEX Robotics — CAD Drivetrain &amp; Mounting Design
            </h1>
          </div>
        </div>
        <div className="px-6 sm:px-14 pt-8">
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#9AA8B3] leading-relaxed border-t border-white/10 pt-6">
            Florida International University
            <span className="block mt-1 text-[#67D7FF]/90">2022–2023 · CAD · Robotics · Mechanical Design · Fixture Support</span>
          </p>
          <Reveal delay={0.05}><Caption>{HERO.cap}</Caption></Reveal>
        </div>
      </header>

      {/* Overview */}
      <Section n="01" label="Overview">
        <Body>This VEX Robotics project was completed during my sophomore year at Florida International University. It gave me early hands-on experience with computer-aided design, mechanical robot packaging, and collaborative build development in a competition environment.</Body>
      </Section>

      <Divider />

      {/* My Contribution */}
      <Section n="02" label="My Contribution">
        <Body>My primary contribution was CAD design work for wheel/drivetrain components and selected mounting points. I also supported team members with smaller coding and fixture-related tasks during the build process.</Body>
        <div className="mt-8"><Figure img={MULTI} onZoom={setZoom} wide /></div>
        <div className="mt-6"><Figure img={CLOSE} onZoom={setZoom} wide /></div>
      </Section>

      <Divider />

      {/* Design Focus */}
      <Section n="03" label="Design Focus">
        <Body>The design work focused on wheel geometry, drivetrain packaging, mounting relationships, and how individual CAD components could fit within the larger robot structure. The project required connecting digital concepts with the constraints of a real competition robot.</Body>
        <div className="mt-8"><Figure img={BUILD} onZoom={setZoom} wide /></div>
      </Section>

      <Divider />

      {/* What I Learned */}
      <Section n="04" label="What I Learned">
        <Body>This was one of my first experiences taking mechanical concepts into CAD and seeing them contribute to a physical robotic system. It became an early foundation for my later interest in mechanical design, fixtures, tooling, automation, and product development.</Body>
        <div className="mt-8"><Figure img={ASSEMBLY} onZoom={setZoom} wide contain /></div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="vex-lightbox">
            <div className="absolute inset-0 bg-[#050607]/94 backdrop-blur-sm" onClick={() => setZoom(null)} />
            <button onClick={() => setZoom(null)} data-testid="vex-lightbox-close"
              className="absolute top-5 right-5 z-10 h-11 w-11 grid place-items-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors" aria-label="Close image">
              <X size={20} />
            </button>
            <motion.figure initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.28 }} className="relative max-w-4xl w-full">
              <img src={zoom.src} alt={zoom.alt} className="w-full max-h-[82vh] object-contain rounded-lg" />
              <figcaption className="mt-3 text-center text-xs text-white/60 font-mono tracking-wide">{zoom.alt}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* primitives */
const Figure = ({ img, onZoom, wide, contain }) => (
  <Reveal>
    <figure>
      <button onClick={() => onZoom(img)}
        className={`group relative block w-full overflow-hidden rounded-lg border border-white/10 ${contain ? "bg-[#0b0f13]" : "bg-[#0d1217]"} cursor-zoom-in`}
        aria-label={`Enlarge image: ${img.alt}`}>
        <img src={img.src} alt={img.alt} loading="lazy"
          className={`w-full group-hover:scale-[1.015] transition-transform duration-500 ${contain ? "object-contain max-h-[72vh]" : wide ? "object-cover max-h-[66vh]" : "object-cover aspect-[4/3]"}`} />
        <span className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-[#080A0D]/70 backdrop-blur border border-white/15 text-[#F3F7FA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn size={16} />
        </span>
      </button>
      {img.cap && <Caption>{img.cap}</Caption>}
    </figure>
  </Reveal>
);

const Caption = ({ children }) => (
  <figcaption className="mt-3 flex items-start gap-2.5 text-[#8794a0] text-xs sm:text-[13px] leading-relaxed max-w-3xl">
    <span className="mt-1.5 h-px w-5 shrink-0" style={{ background: ACCENT }} /><span>{children}</span>
  </figcaption>
);

const Body = ({ children }) => (
  <p className="text-[#9AA8B3] text-base sm:text-lg leading-relaxed max-w-3xl">{children}</p>
);

const Divider = () => <div className="mx-6 sm:mx-14 border-t border-white/8" />;

const Section = ({ n, label, children }) => (
  <section className="px-6 sm:px-14 py-12 sm:py-16">
    <Reveal>
      <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>{n} — {label}</span>
      <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-3xl tracking-tight leading-tight max-w-3xl">{label}</h2>
    </Reveal>
    {children}
  </section>
);
