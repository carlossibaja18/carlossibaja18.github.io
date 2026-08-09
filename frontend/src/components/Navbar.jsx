import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId } from "./SmoothScroll";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "timeline", label: "Timeline" },
  { id: "about", label: "About Me" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = LINKS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        return { id: l.id, top: Math.abs(el.getBoundingClientRect().top - 140) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-[#080A0D]/80 backdrop-blur-xl border-b border-[#67D7FF]/12" : "border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          data-testid="nav-logo"
          className={`flex items-center gap-2 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <span className="font-display text-sm tracking-[0.2em] uppercase text-[#F3F7FA]">Carlos Sibaja</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#67D7FF]" />
        </button>

        <nav className="hidden md:flex items-center gap-2 ml-auto">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              data-testid={`nav-${l.id}`}
              className={`relative px-4 py-2 text-xs tracking-[0.16em] uppercase transition-colors duration-200 ${
                active === l.id ? "text-[#67D7FF]" : "text-[#9AA8B3] hover:text-[#A4EAFF]"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span layoutId="nav-underline" className="absolute left-4 right-4 -bottom-0.5 h-px bg-[#67D7FF]" />
              )}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden text-[#F3F7FA] p-2 ml-auto"
          onClick={() => setOpen((o) => !o)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[#080A0D]/97 backdrop-blur-xl border-b border-[#67D7FF]/12 overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-testid={`nav-mobile-${l.id}`}
                className={`text-left px-2 py-3.5 text-sm tracking-[0.16em] uppercase border-b border-white/5 ${
                  active === l.id ? "text-[#67D7FF]" : "text-[#9AA8B3]"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
};
