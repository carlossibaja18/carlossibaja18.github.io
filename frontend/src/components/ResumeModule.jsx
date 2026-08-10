import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X, FileText } from "lucide-react";

// Public resume file (hosted in /public). Relative path works for links;
// the QR encodes the absolute URL so phone cameras can open it.
export const RESUME_URL = "/resume/carlos-sibaja-resume.jpg";

const absoluteResume = () =>
  typeof window !== "undefined" ? window.location.origin + RESUME_URL : RESUME_URL;

const qrSrc = () =>
  `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&qzone=2&ecc=M&bgcolor=ffffff&color=0b1220&data=${encodeURIComponent(
    absoluteResume()
  )}`;

const Panel = () => (
  <div className="w-[210px] rounded-xl border border-[#67D7FF]/22 bg-[#11171D]/95 backdrop-blur p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open Carlos Sibaja resume"
      className="block rounded-lg bg-white p-2.5"
    >
      <img
        src={qrSrc()}
        alt="Scan to open Carlos Sibaja's resume"
        data-testid="resume-qr"
        className="w-full h-full object-contain"
        width="260"
        height="260"
      />
    </a>
    <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#F3F7FA]">Resume</p>
    <a
      href={RESUME_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="resume-view-link"
      className="mt-1 inline-flex items-center gap-1.5 text-[#67D7FF] hover:text-[#A4EAFF] text-xs transition-colors"
    >
      Scan or View PDF <ExternalLink size={12} />
    </a>
  </div>
);

export const ResumeModule = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop fixed module */}
      <div className="hidden lg:block fixed bottom-5 left-5 z-40" data-testid="resume-module">
        <Panel />
      </div>

      {/* Mobile expandable button + drawer */}
      <div className="lg:hidden fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setOpen((o) => !o)}
          data-testid="resume-mobile-toggle"
          className="flex items-center gap-2 rounded-full border border-[#67D7FF]/25 bg-[#11171D]/95 backdrop-blur px-4 py-2.5 text-[#F3F7FA] text-xs tracking-[0.15em] uppercase shadow-lg"
        >
          <FileText size={15} className="text-[#67D7FF]" /> Resume
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="absolute bottom-14 left-0"
            >
              <div className="relative">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-2 -right-2 z-10 h-7 w-7 grid place-items-center rounded-full bg-[#080A0D] border border-white/15 text-[#9AA8B3]"
                  aria-label="Close resume"
                >
                  <X size={14} />
                </button>
                <Panel />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
