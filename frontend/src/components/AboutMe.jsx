import { motion } from "framer-motion";
import { MapPin, Mail, Linkedin, Award, ArrowRight } from "lucide-react";
import { Reveal } from "./Motion";
import { PROFILE } from "../data/portfolio";

const FOCUS = [
  "Mechanical Design",
  "Product Development",
  "Robot / Cobot Integration",
  "Fixture & Tooling Design",
  "Pneumatic / Vacuum Systems",
  "Manufacturing Automation",
  "CAD & Prototype Development",
];

export const AboutMe = ({ onOpenCredential }) => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <Reveal>
          <div className="max-w-3xl">
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#67D7FF]">05 / About Me</span>
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
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="about-linkedin"
                className="flex items-center gap-3 text-[#F3F7FA] text-sm hover:text-[#67D7FF] transition-colors"
              >
                <Linkedin size={16} className="text-[#67D7FF] shrink-0" />
                linkedin.com/in/carlos-sibaja-enginnering
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
