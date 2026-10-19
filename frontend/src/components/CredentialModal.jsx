import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import { Reveal } from "./Motion";

const ACCENT = "#67D7FF";

/*
 * FANUC Academy credential experience — Carlos Sibaja
 * Asset map (do not mix):
 *   Certificate.pdf                -> /credentials/fanuc-academy/certificate.webp (+ certificate.png full-res)
 *   photo-568_singular_...jpeg     -> /credentials/fanuc-academy/photo-568.webp   (Academy facility / sign)
 *   IMG_5421.jpeg                  -> /credentials/fanuc-academy/IMG_5421.webp     (hands-on teach-pendant training)
 *   od_photo-630_singular_...jpeg  -> /credentials/fanuc-academy/od_photo-630.webp (robot + pendant workstation)
 *   photo-614_singular_...jpeg     -> /credentials/fanuc-academy/photo-614.webp    (HandlingTool classroom session)
 */
const CERT = { src: "/credentials/fanuc-academy/certificate.webp", full: "/credentials/fanuc-academy/certificate.png", alt: "Official FANUC Certificate of Completion for Carlos Sibaja — HandlingTool Operation & Programming (4 Days), Course ID J2P0310, completed 29-MAY-2026, instructor Keith Johnson." };
const ACADEMY = { src: "/credentials/fanuc-academy/photo-568.webp", alt: "FANUC Academy training facility in Rochester Hills, Michigan, with guarded automation cells and industrial robots." };
const HANDSON = { src: "/credentials/fanuc-academy/IMG_5421.webp", alt: "Hands-on FANUC training exercise using a teach pendant and industrial robot workstation with training workbook." };
const WORKSTATION = { src: "/credentials/fanuc-academy/od_photo-630.webp", alt: "FANUC industrial robot and teach pendant training workstation used during HandlingTool instruction." };
const CLASSROOM = { src: "/credentials/fanuc-academy/photo-614.webp", alt: "HandlingTool Operations and Programming classroom session at FANUC Academy." };

const FOCUS = [
  "Industrial robot handling and operation",
  "Teach-pendant navigation and programming workflows",
  "Point-to-point robot motion and position management",
  "Robot setup, recovery, and troubleshooting",
  "Automation-system integration concepts",
  "Safe, repeatable manufacturing robotics practices",
];

export const CredentialModal = ({ open, onClose, onOpenProject }) => {
  const [zoom, setZoom] = useState(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && (zoom ? setZoom(null) : onClose());
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, zoom]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="credential-modal"
        >
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} data-testid="credential-modal-scrim" />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative sm:rounded-2xl w-full sm:w-[94vw] max-w-5xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-[#080A0D] sm:border sm:border-[#67D7FF]/12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] text-[#F3F7FA]"
            data-lenis-prevent=""
          >
            {/* Sticky label + close */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3 bg-[#080A0D]/85 backdrop-blur border-b border-[#67D7FF]/12">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#9AA8B3] truncate">
                  FANUC Academy · Credential
                </span>
              </div>
              <button
                onClick={onClose}
                data-testid="credential-modal-close"
                className="h-10 w-10 grid place-items-center rounded-full bg-[#11171D] border border-white/10 text-[#F3F7FA] hover:text-[#67D7FF] hover:border-[#67D7FF]/50 transition-colors duration-200 shrink-0"
                aria-label="Close credential"
              >
                <X size={18} />
              </button>
            </div>

            {/* Header */}
            <header className="px-6 sm:px-14 pt-10 sm:pt-14 pb-2">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8" style={{ background: ACCENT }} />
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>
                  Credential Experience
                </span>
              </div>
              <h1 className="font-display font-light tracking-tight text-3xl sm:text-5xl leading-[1.05] max-w-3xl">
                FANUC HandlingTool Operation &amp; Programming
              </h1>
              <p className="mt-5 font-mono text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#9AA8B3] leading-relaxed">
                FANUC Academy · Rochester Hills, Michigan
                <span className="block mt-1 text-[#67D7FF]/90">May 2026 · 4-Day Course · Course ID J2P0310</span>
              </p>
              <div className="mt-7 space-y-4 max-w-3xl">
                <Body>
                  I completed FANUC HandlingTool Operation &amp; Programming, a four-day hands-on industrial robot
                  training course at FANUC Academy in Rochester Hills, Michigan.
                </Body>
                <Body>
                  The training focused on FANUC robot operation, teach-pendant workflows, robot motion, programming
                  fundamentals, setup, safety, and practical automation-system concepts. The experience strengthened the
                  robotics knowledge I apply in manufacturing engineering work at Watkins Wellness.
                </Body>
              </div>
            </header>

            {/* 1 — Certificate of Completion */}
            <Section n="01" label="Certificate of Completion">
              <Reveal>
                <figure>
                  <button
                    onClick={() => setZoom({ src: CERT.full, alt: CERT.alt })}
                    className="group relative block w-full overflow-hidden rounded-lg border border-white/10 bg-white cursor-zoom-in"
                    aria-label={`Enlarge certificate: ${CERT.alt}`}
                    data-testid="credential-certificate"
                  >
                    <img src={CERT.src} alt={CERT.alt} className="w-full h-auto object-contain" />
                    <span className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-[#080A0D]/70 backdrop-blur border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <ZoomIn size={16} />
                    </span>
                  </button>
                  <Caption>
                    Official FANUC Certificate of Completion for HandlingTool Operation &amp; Programming, a four-day
                    industrial robot training course completed on May 29, 2026.
                  </Caption>
                </figure>
              </Reveal>
            </Section>

            <Divider />

            {/* 2 — Training at FANUC Academy */}
            <Section n="02" label="Training at FANUC Academy">
              <Figure img={ACADEMY} onZoom={setZoom} wide
                caption="FANUC Academy training facility in Rochester Hills, Michigan. The Academy environment provided direct exposure to industrial robots, guarded automation cells, and practical manufacturing-focused training systems." />
            </Section>

            <Divider />

            {/* 3 — Hands-On Robot Programming (primary image) */}
            <Section n="03" label="Hands-On Robot Programming">
              <Figure img={HANDSON} onZoom={setZoom} wide
                caption="Hands-on FANUC training exercise using a teach pendant and industrial robot workstation. The course combined classroom instruction with practical robot operation, jogging, motion setup, and programming workflows." />
            </Section>

            <Divider />

            {/* 4 & 5 — Workstation + Classroom */}
            <Section n="04" label="Training Workstation & Classroom">
              <div className="grid sm:grid-cols-2 gap-6">
                <Figure img={WORKSTATION} onZoom={setZoom}
                  caption="FANUC industrial robot and teach pendant training station used during HandlingTool instruction. The workstation supported practical exercises in robot handling, setup, safety, and point-to-point movement." />
                <Figure img={CLASSROOM} onZoom={setZoom}
                  caption="HandlingTool Operations and Programming classroom session at FANUC Academy. The course focused on industrial robot operation, programming concepts, and automation-system fundamentals." />
              </div>
            </Section>

            <Divider />

            {/* Training Focus */}
            <Section n="05" label="Training Focus">
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3.5">
                {FOCUS.map((f, i) => (
                  <li key={i} className="flex gap-3.5 text-[#9AA8B3] text-sm sm:text-base leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                    {f}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Applying the Training */}
            <section className="px-6 sm:px-14 py-14 sm:py-20 pt-0 sm:pt-0">
              <Reveal>
                <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>06 — Applying the Training</span>
                <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-4xl tracking-tight leading-tight max-w-3xl">
                  Applying the Training
                </h2>
                <Body>
                  The FANUC Academy experience strengthened the robotics skills I apply in manufacturing engineering at
                  Watkins Wellness. The training supports my work with FANUC trim-and-drill automation, point-to-point
                  robot programming, robot-position refinement, process troubleshooting, vision and lighting
                  improvements, drilling accuracy, and manufacturing-system improvement.
                </Body>
                <button
                  onClick={onOpenProject}
                  data-testid="credential-project-link"
                  className="group mt-7 inline-flex items-center gap-2 text-[#67D7FF] hover:text-[#A4EAFF] text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  Explore FANUC Automation Project
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </Reveal>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
              {zoom && (
                <motion.div
                  className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-testid="credential-lightbox"
                >
                  <div className="absolute inset-0 bg-[#050607]/94 backdrop-blur-sm" onClick={() => setZoom(null)} />
                  <button
                    onClick={() => setZoom(null)}
                    data-testid="credential-lightbox-close"
                    className="absolute top-5 right-5 z-10 h-11 w-11 grid place-items-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                    aria-label="Close image"
                  >
                    <X size={20} />
                  </button>
                  <motion.figure
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="relative max-w-5xl w-full"
                  >
                    <img src={zoom.src} alt={zoom.alt} className="w-full max-h-[85vh] object-contain rounded-lg" />
                    <figcaption className="mt-3 text-center text-xs text-white/60 font-mono tracking-wide">{zoom.alt}</figcaption>
                  </motion.figure>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ---------- primitives ---------- */

const Figure = ({ img, onZoom, caption, wide }) => (
  <Reveal>
    <figure>
      <button
        onClick={() => onZoom(img)}
        className="group relative block w-full overflow-hidden rounded-lg border border-white/10 bg-[#0d1217] cursor-zoom-in"
        aria-label={`Enlarge image: ${img.alt}`}
      >
        <img
          src={img.src}
          alt={img.alt}
          loading="lazy"
          className={`w-full object-cover group-hover:scale-[1.015] transition-transform duration-500 ${wide ? "max-h-[70vh]" : "aspect-[4/3]"}`}
        />
        <span className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-[#080A0D]/70 backdrop-blur border border-white/15 text-[#F3F7FA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn size={16} />
        </span>
      </button>
      {caption && <Caption>{caption}</Caption>}
    </figure>
  </Reveal>
);

const Caption = ({ children }) => (
  <figcaption className="mt-3 flex items-start gap-2.5 text-[#8794a0] text-xs sm:text-[13px] leading-relaxed max-w-3xl">
    <span className="mt-1.5 h-px w-5 shrink-0" style={{ background: ACCENT }} />
    <span>{children}</span>
  </figcaption>
);

const Body = ({ children }) => (
  <p className="text-[#9AA8B3] text-base sm:text-lg leading-relaxed max-w-3xl">{children}</p>
);

const Divider = () => <div className="mx-6 sm:mx-14 border-t border-white/8" />;

const Section = ({ n, label, children }) => (
  <section className="px-6 sm:px-14 py-14 sm:py-16">
    <Reveal>
      <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>{n} — {label}</span>
      <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-3xl tracking-tight leading-tight max-w-3xl">
        {label}
      </h2>
    </Reveal>
    {children}
  </section>
);
