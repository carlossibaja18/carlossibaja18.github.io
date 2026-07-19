import { motion } from "framer-motion";
import { Linkedin, Mail, FileText, Camera, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { PROFILE, LINKS } from "../data/portfolio";

const ICONS = { linkedin: Linkedin, mail: Mail, file: FileText, camera: Camera };

export const Contact = () => {
  const handle = (link) => {
    if (link.action === "resume") {
      toast("Resume coming soon", { description: "Carlos will upload the downloadable PDF shortly." });
      return false;
    }
    if (link.action === "scroll") {
      document.getElementById("drone")?.scrollIntoView({ behavior: "smooth" });
      return false;
    }
    return true;
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="relative max-w-4xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-10 bg-teal-400" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">Linktree / Contact</span>
            <span className="h-px w-10 bg-teal-400" />
          </div>
          <h2 className="font-display tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-50 font-light">
            Let's build something
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base">
            Open to mechanical design & product development roles. The fastest way to reach me:
          </p>
        </div>

        <div className="flex flex-col gap-3.5 max-w-xl mx-auto">
          {LINKS.map((link, i) => {
            const Icon = ICONS[link.icon];
            const external = !link.action;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!handle(link)) e.preventDefault();
                }}
                data-testid={`link-${link.icon}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4 hover:border-teal-400/50 hover:bg-slate-900 transition-colors duration-200"
              >
                <span className="h-11 w-11 grid place-items-center rounded-lg bg-slate-800/60 border border-slate-700 text-teal-400 group-hover:border-teal-400/40 transition-colors duration-200 shrink-0">
                  <Icon size={18} />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-slate-100 text-sm font-medium">{link.label}</span>
                  <span className="block text-slate-500 text-xs truncate">{link.value}</span>
                </span>
                <ArrowUpRight size={18} className="text-slate-600 group-hover:text-teal-400 transition-colors duration-200 shrink-0" />
              </motion.a>
            );
          })}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-display text-slate-400 text-sm">
            {PROFILE.name}<span className="text-teal-400">.</span>
          </p>
          <p className="text-xs text-slate-600">{PROFILE.location}</p>
        </div>
      </div>
    </section>
  );
};
