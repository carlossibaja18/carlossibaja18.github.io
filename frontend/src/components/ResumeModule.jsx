import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QrCode, ExternalLink, X, FileText } from "lucide-react";

// Set to the hosted resume PDF URL when available. Leave null to show "Coming Soon".
export const RESUME_URL = null;

const Panel = () => (
  <div className="w-[210px] rounded-xl border border-[#67D7FF]/22 bg-[#11171D]/95 backdrop-blur p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]">
    <div className="aspect-square rounded-lg bg-[#080A0D] border border-white/8 grid place-items-center overflow-hidden">
      {RESUME_URL ? (
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&bgcolor=080A0D&color=F3F7FA&data=${encodeURIComponent(RESUME_URL)}`}
          alt="Scan to open Carlos Sibaja's resume PDF"
          className="w-full h-full object-contain"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 text-[#9AA8B3] px-3 text-center">
          <QrCode size={26} className="text-[#67D7FF]/50" />
          <span className="font-mono text-[9px] tracking-[0.14em] uppercase leading-relaxed">Resume PDF<br />Coming Soon</span>
        </div>
      )}
    </div>
    <p className="mt-3 font-mono text-[10px] tracking-[0.22em] uppercase text-[#67D7FF]">Resume</p>
    {RESUME_URL ? (
      <a
        href={RESUME_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="resume-view-link"
        className="mt-1 flex items-center gap-1.5 text-[#F3F7FA] text-xs hover:text-[#67D7FF] transition-colors"
      >
        Scan or View PDF <ExternalLink size={12} className="text-[#67D7FF]" />
      </a>
    ) : (
      <p className="mt-1 text-[#9AA8B3] text-xs">Scan or View PDF ↗</p>
    )}
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
