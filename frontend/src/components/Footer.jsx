import { toast } from "sonner";
import { scrollToId } from "./SmoothScroll";
import { RESUME_URL } from "./ResumeModule";

const LINKS = [
  { label: "Home", id: "home" },
  { label: "Projects", id: "projects" },
  { label: "Timeline", id: "timeline" },
  { label: "About Me", id: "about" },
];

export const Footer = () => {
  const onResume = (e) => {
    if (!RESUME_URL) {
      e.preventDefault();
      toast("Resume coming soon", { description: "The downloadable PDF will be available shortly." });
    }
  };

  return (
    <footer className="relative border-t border-white/8 bg-[#080A0D] py-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg text-[#F3F7FA] tracking-tight">
            Carlos Sibaja<span className="text-[#67D7FF]">.</span>
          </p>
          <p className="mt-1 text-[#9AA8B3] text-xs tracking-wide">Mechanical Engineering / Automation</p>
          <p className="mt-1 text-[#9AA8B3]/70 text-xs">© 2026</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              className="text-[#9AA8B3] hover:text-[#67D7FF] text-xs tracking-[0.15em] uppercase transition-colors"
            >
              {l.label}
            </button>
          ))}
          <a
            href={RESUME_URL || "#"}
            target={RESUME_URL ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={onResume}
            data-testid="footer-resume"
            className="text-[#67D7FF] hover:text-[#A4EAFF] text-xs tracking-[0.15em] uppercase transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>
    </footer>
  );
};
