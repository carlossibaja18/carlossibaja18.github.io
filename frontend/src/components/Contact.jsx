import { motion } from "framer-motion";
import { Download, Mail, Linkedin, MapPin, FileText } from "lucide-react";
import { toast } from "sonner";
import { PROFILE } from "../data/portfolio";

export const Contact = () => {
  const handleResume = () => {
    toast("Resume coming soon", {
      description: "Carlos will upload the downloadable PDF shortly.",
    });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/8 blur-[130px] pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 sm:px-12">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-cyan-400" />
            <span className="text-xs tracking-[0.28em] uppercase text-cyan-400">Let's Connect</span>
          </div>
          <h2 className="font-display tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-50 font-light">
            Resume &amp; Contact
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Resume card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 rounded-2xl border border-cyan-400/20 bg-slate-900 p-8 sm:p-10 flex flex-col"
          >
            <div className="flex items-center gap-3 text-cyan-400 mb-6">
              <FileText size={18} />
              <span className="text-xs tracking-[0.22em] uppercase">Resume</span>
            </div>
            <div className="flex-1 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 grid place-items-center py-14 mb-8">
              <div className="text-center px-6">
                <p className="font-display text-xl text-slate-200">{PROFILE.name}</p>
                <p className="mt-1 font-mono text-xs text-slate-500 tracking-wider">
                  Mechanical Design · Robotics · Manufacturing
                </p>
                <p className="mt-4 text-slate-500 text-xs">Resume preview placeholder</p>
              </div>
            </div>
            <button
              onClick={handleResume}
              data-testid="resume-download-btn"
              className="inline-flex items-center justify-center gap-2 bg-cyan-400 text-slate-950 font-semibold text-sm px-8 py-4 rounded-full hover:bg-cyan-300 transition-colors duration-200"
            >
              <Download size={16} />
              Download Resume
            </button>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <a
              href={`mailto:${PROFILE.email}`}
              data-testid="contact-email"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-400/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 text-cyan-400 mb-3">
                <Mail size={16} />
                <span className="text-xs tracking-[0.2em] uppercase">Email</span>
              </div>
              <p className="text-slate-200 text-sm break-all group-hover:text-cyan-400 transition-colors duration-200">
                {PROFILE.email}
              </p>
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-linkedin"
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-400/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 text-cyan-400 mb-3">
                <Linkedin size={16} />
                <span className="text-xs tracking-[0.2em] uppercase">LinkedIn</span>
              </div>
              <p className="text-slate-200 text-sm group-hover:text-cyan-400 transition-colors duration-200">
                Connect with me
              </p>
            </a>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div className="flex items-center gap-3 text-cyan-400 mb-3">
                <MapPin size={16} />
                <span className="text-xs tracking-[0.2em] uppercase">Location</span>
              </div>
              <p className="text-slate-200 text-sm">San Diego, CA</p>
              <p className="text-slate-500 text-xs mt-1">Relocating to Miami, FL · Dec 2026</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-slate-400 text-sm">
            {PROFILE.name}<span className="text-cyan-400">.</span>
          </p>
          <p className="font-mono text-xs text-slate-600">
            © {new Date().getFullYear()} · Built with precision.
          </p>
        </div>
      </div>
    </section>
  );
};
