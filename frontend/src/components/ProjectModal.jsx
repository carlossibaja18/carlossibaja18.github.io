import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Target, User, ListChecks, Trophy } from "lucide-react";

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="project-modal"
        >
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={onClose}
            data-testid="modal-scrim"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-slate-900 sm:border sm:border-teal-400/25 sm:rounded-2xl w-full sm:w-[92vw] max-w-4xl h-full sm:h-auto sm:max-h-[88vh] overflow-y-auto shadow-[0_0_60px_-10px_rgba(0,229,255,0.15)]"
          >
            <button
              onClick={onClose}
              data-testid="modal-close-btn"
              className="fixed sm:absolute top-4 right-4 z-20 h-10 w-10 grid place-items-center rounded-full bg-slate-950/70 backdrop-blur border border-teal-400/30 text-slate-200 hover:text-teal-400 hover:border-teal-400/60 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Hero / result image */}
            <div className="relative h-64 sm:h-80">
              <img src={project.result} alt={project.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-mono tracking-wider uppercase text-teal-300 border border-teal-400/25 rounded px-2 py-1 bg-slate-950/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-2xl sm:text-4xl text-slate-50 font-light tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-2 text-slate-300 text-sm sm:text-base">{project.summary}</p>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-12">
              <Block icon={Target} label="The Problem / Goal" text={project.goal} />
              <Block icon={User} label="What I Did" text={project.role} />

              {/* Steps */}
              <div>
                <SectionHeader icon={ListChecks} label="Steps Taken" />
                <ol className="mt-5 space-y-3">
                  {project.steps.map((s, i) => (
                    <li key={i} className="flex gap-4 group">
                      <span className="shrink-0 mt-0.5 h-7 w-7 grid place-items-center rounded-full border border-teal-400/30 text-teal-400 text-xs font-mono">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed pt-1">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Process images */}
              {project.process?.length > 0 && (
                <div>
                  <SectionHeader label="Prototype / Process" />
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.process.map((img, i) => (
                      <div key={i} className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[4/3]">
                        <img src={img} alt={`${project.title} process ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outcome */}
              <div className="rounded-lg border border-slate-800 bg-slate-800/25 p-6 sm:p-8">
                <SectionHeader icon={Trophy} label="Result / Lesson Learned" />
                <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed">{project.outcome}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const SectionHeader = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3">
    {Icon && <Icon size={16} className="text-teal-400" />}
    <span className="font-mono text-xs tracking-[0.22em] uppercase text-teal-400">{label}</span>
  </div>
);

const Block = ({ icon, label, text }) => (
  <div>
    <SectionHeader icon={icon} label={label} />
    <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">{text}</p>
  </div>
);
