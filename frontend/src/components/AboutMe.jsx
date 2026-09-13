import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Mail, Award, X, FileText, ArrowRight } from "lucide-react";
import { Reveal } from "./Motion";

const FOCUS = [
  "Mechanical Design",
  "Product Development",
  "Robot / Cobot Integration",
  "Fixture & Tooling Design",
  "Pneumatic / Vacuum Systems",
  "Manufacturing Automation",
  "CAD & Prototype Development",
];

// Add real certificate images here later: { image: "/credentials/xxx.jpg" }
const CREDENTIALS = [
  { title: "FANUC Certification", org: "FANUC", date: "", note: "Industrial robotics training & certification.", image: null },
  { title: "Technical Training", org: "To be added", date: "", note: "Robotics, automation & manufacturing coursework.", image: null },
  { title: "Coursework & Awards", org: "To be added", date: "", note: "Relevant engineering coursework and recognitions.", image: null },
];

export const AboutMe = ({ onOpenCredential }) => {
  const [zoom, setZoom] = useState(null);

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">03 / About Me</span>
            <h2 className="mt-5 font-display font-light tracking-tight text-4xl sm:text-6xl text-[#F3F7FA]">
              The Engineer Behind the Work
            </h2>
            <p className="mt-6 text-[#9AA8B3] text-base sm:text-lg leading-relaxed">
              Carlos Sibaja is a mechanical engineering student and manufacturing engineer focused on robotics,
              automation, mechanical tooling, fixture design, and product development. His work combines hands-on
              prototype development with practical manufacturing implementation.
            </p>
          </div>
        </Reveal>

        {/* Core focus areas */}
        <Reveal>
          <div className="mt-16">
            <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#9AA8B3]">Core Focus Areas</span>
            <div className="mt-6 grid sm:grid-cols-2 border-t border-white/8">
              {FOCUS.map((f, i) => (
                <div
                  key={f}
                  className="flex items-center gap-4 py-4 border-b border-white/8 sm:odd:pr-8 sm:even:pl-8 sm:even:border-l"
                >
                  <span className="font-mono text-xs text-[#67D7FF]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[#F3F7FA] text-base sm:text-lg">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Credentials / Engineering Archive */}
        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <Award size={18} className="text-[#67D7FF]" />
              <h3 className="font-display font-light text-2xl sm:text-3xl text-[#F3F7FA] tracking-tight">
                Credentials &amp; Engineering Archive
              </h3>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* FANUC Academy — real credential experience (opens floating modal) */}
            <motion.button
              type="button"
              onClick={onOpenCredential}
              data-testid="credential-fanuc-academy-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="group text-left rounded-xl border border-[#67D7FF]/25 bg-[#151C22] overflow-hidden hover:border-[#67D7FF]/50 transition-colors duration-300 flex flex-col sm:col-span-2 lg:col-span-1"
            >
              <div className="relative w-full aspect-[4/3] grid place-items-center bg-[#f4f1ec] p-3">
                <img
                  src="/credentials/fanuc-academy/certificate.webp"
                  alt="FANUC Certificate of Completion — HandlingTool Operation & Programming, Carlos Sibaja"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-5 border-t border-white/5 flex flex-col flex-1">
                <h4 className="font-display text-[#F3F7FA] text-sm sm:text-base leading-snug">
                  FANUC HandlingTool Operation &amp; Programming
                </h4>
                <p className="mt-1.5 text-[#9AA8B3] text-xs">FANUC Academy</p>
                <p className="text-[#9AA8B3] text-xs">Rochester Hills, Michigan · May 2026</p>
                <p className="mt-2 text-[#9AA8B3] text-xs leading-relaxed">4-Day Industrial Robot Programming Course</p>
                <span className="mt-auto pt-4 inline-flex items-center gap-2 text-[#67D7FF] text-sm">
                  View Academy Experience
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </div>
            </motion.button>

            {CREDENTIALS.map((c, i) => {
              const hasImg = Boolean(c.image);
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  data-testid={`credential-${i}`}
                  className="rounded-xl border border-[#67D7FF]/15 bg-[#151C22] overflow-hidden"
                >
                  <button
                    onClick={() => hasImg && setZoom(c)}
                    className={`relative w-full aspect-[4/3] grid place-items-center bg-[#11171D] ${hasImg ? "cursor-zoom-in" : "cursor-default"}`}
                    aria-label={hasImg ? `Enlarge ${c.title}` : `${c.title} credential image coming soon`}
                  >
                    {hasImg ? (
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#9AA8B3]">
                        <FileText size={22} className="text-[#67D7FF]/60" />
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase">Credential image coming soon</span>
                      </div>
                    )}
                  </button>
                  <div className="p-5 border-t border-white/5">
                    <h4 className="text-[#F3F7FA] text-sm font-medium">{c.title}</h4>
                    <p className="mt-1 text-[#9AA8B3] text-xs">{c.org}{c.date ? ` · ${c.date}` : ""}</p>
                    {c.note && <p className="mt-2 text-[#9AA8B3] text-xs leading-relaxed">{c.note}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contact area */}
        <Reveal>
          <div className="mt-20 grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-white/8 bg-[#11171D] p-7">
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#9AA8B3]">Focused On</span>
              <p className="mt-3 text-[#F3F7FA] text-base leading-relaxed">
                Targeting mechanical design, product development, robotics, and automation roles where hands-on
                engineering and practical manufacturing meet.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#11171D] p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-[#9AA8B3] text-sm">
                <MapPin size={16} className="text-[#67D7FF] shrink-0" />
                San Diego, CA — Relocating to Miami, FL · Dec 2026
              </div>
              <a
                href="mailto:Carlossibaja18@gmail.com"
                data-testid="about-email"
                className="flex items-center gap-3 text-[#F3F7FA] text-sm hover:text-[#67D7FF] transition-colors"
              >
                <Mail size={16} className="text-[#67D7FF] shrink-0" />
                Carlossibaja18@gmail.com
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            data-testid="about-credential-lightbox"
          >
            <div className="absolute inset-0 bg-[#080A0D]/92 backdrop-blur-sm" onClick={() => setZoom(null)} />
            <button onClick={() => setZoom(null)} className="absolute top-5 right-5 h-11 w-11 grid place-items-center rounded-full bg-white/10 border border-white/20 text-white" aria-label="Close">
              <X size={20} />
            </button>
            <img src={zoom.image} alt={zoom.title} className="relative max-w-3xl w-full max-h-[82vh] object-contain rounded-lg" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
