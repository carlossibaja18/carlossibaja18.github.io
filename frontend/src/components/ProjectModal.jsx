import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CobotCaseStudy } from "./CobotCaseStudy";

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

  const isCobot = project?.custom === "cobot";

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
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" onClick={onClose} data-testid="modal-scrim" />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`relative sm:rounded-2xl w-full sm:w-[94vw] max-w-5xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] ${
              isCobot ? "bg-[#f4f1ec]" : "bg-slate-900 sm:border sm:border-white/10"
            }`}
          >
            {isCobot ? (
              <CobotCaseStudy onClose={onClose} />
            ) : (
              <>
                <button
                  onClick={onClose}
                  data-testid="modal-close-btn"
                  className="fixed sm:absolute top-4 right-4 z-20 h-10 w-10 grid place-items-center rounded-full bg-slate-950/70 backdrop-blur border border-white/15 text-slate-200 hover:text-[#67D7FF] hover:border-[#67D7FF]/50 transition-colors duration-200"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>

                {/* Hero */}
                <div className="relative h-64 sm:h-[420px]">
                  <img src={project.hero} alt={project.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] font-mono tracking-wider uppercase text-[#A4EAFF] border border-[#67D7FF]/25 rounded px-2 py-1 bg-slate-950/40"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="font-display text-3xl sm:text-5xl text-slate-50 font-light tracking-tight max-w-3xl leading-[1.03]">
                      {project.title}
                    </h2>
                    <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl">{project.summary}</p>
                  </div>
                </div>

                {/* Editorial body */}
                <article className="px-6 sm:px-12 py-12 sm:py-16 max-w-3xl mx-auto space-y-14">
                  {project.blocks.map((b, i) =>
                    b.type === "gallery" ? (
                      <GalleryBlock key={i} block={b} index={i} title={project.title} />
                    ) : (
                      <TextBlock key={i} block={b} index={i} />
                    )
                  )}
                </article>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const reveal = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const TextBlock = ({ block }) => (
  <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
    {block.label && (
      <span className="font-mono text-xs tracking-[0.24em] uppercase text-[#67D7FF]">{block.label}</span>
    )}
    {block.highlight ? (
      <div className="mt-4 rounded-xl border-l-2 border-[#67D7FF] bg-slate-800/30 pl-6 pr-6 py-5">
        <p className="text-slate-100 text-base sm:text-lg leading-relaxed">{block.body}</p>
      </div>
    ) : (
      <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">{block.body}</p>
    )}
    {block.list && (
      <ul className="mt-5 space-y-3">
        {block.list.map((li, i) => (
          <li key={i} className="flex gap-3.5">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#67D7FF] shrink-0" />
            <span className="text-slate-300 text-sm sm:text-base leading-relaxed">{li}</span>
          </li>
        ))}
      </ul>
    )}
  </motion.div>
);

const GalleryBlock = ({ block, title }) => {
  const single = block.layout === "single";
  const cols = single ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2";
  return (
    <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
      {block.title && <span className="font-mono text-xs tracking-[0.24em] uppercase text-[#67D7FF]">{block.title}</span>}
      {block.caption && <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">{block.caption}</p>}
      <div className={`mt-6 grid ${cols} gap-4`}>
        {block.images.map((im, i) => (
          <figure key={i} className="group">
            {single ? (
              <div className="relative overflow-hidden rounded-lg border border-slate-800 bg-slate-950/60 flex items-center justify-center">
                <img
                  src={im.url}
                  alt={im.caption || `${title} visual`}
                  className="w-auto max-h-[620px] max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-lg border border-slate-800 aspect-[4/3]">
                <img
                  src={im.url}
                  alt={im.caption || `${title} visual`}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            {im.caption && (
              <figcaption className="mt-2.5 flex items-start gap-2 text-slate-500 text-xs leading-relaxed">
                <span className="mt-1 h-px w-4 bg-[#67D7FF]/60 shrink-0" />
                {im.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </motion.div>
  );
};
