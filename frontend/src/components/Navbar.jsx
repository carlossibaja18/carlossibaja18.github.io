import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "contact", label: "Resume / Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const offsets = LINKS.map((l) => {
        const el = document.getElementById(l.id);
        if (!el) return { id: l.id, top: Infinity };
        return { id: l.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
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
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-slate-950/70 backdrop-blur-xl border-b border-cyan-400/10" : "border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 h-16 flex items-center justify-between">
        <button
          onClick={() => go("home")}
          data-testid="nav-logo"
          className="font-display text-lg tracking-tight text-slate-50 hover:text-cyan-400 transition-colors duration-200"
        >
          CS<span className="text-cyan-400">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              data-testid={`nav-${l.id}`}
              className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                active === l.id ? "text-cyan-400" : "text-slate-400 hover:text-slate-100"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-4 right-4 -bottom-0.5 h-px bg-cyan-400"
                />
              )}
            </button>
          ))}
        </nav>

        <button
          className="md:hidden text-slate-100 p-2"
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
          className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-cyan-400/10 overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-testid={`nav-mobile-${l.id}`}
                className={`text-left px-2 py-3 text-sm tracking-[0.15em] uppercase border-b border-slate-800/60 ${
                  active === l.id ? "text-cyan-400" : "text-slate-300"
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
