import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { DRONE_PHOTOS } from "../data/portfolio";

export const Drone = () => {
  const [active, setActive] = useState(null);

  return (
    <section id="drone" className="relative py-24 sm:py-32 bg-slate-950">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-teal-400" />
            <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">Beyond Engineering</span>
          </div>
          <h2 className="font-display tracking-tight text-3xl sm:text-4xl lg:text-5xl text-slate-50 font-light">
            Drone Photography
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            The same eye for composition and precision, from the air. A small selection of aerial work.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {DRONE_PHOTOS.map((photo, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(photo)}
              data-testid={`drone-photo-${i}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative mb-4 block w-full overflow-hidden rounded-lg border border-slate-800 hover:border-teal-400/40 transition-colors duration-200"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {photo.caption}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="drone-lightbox"
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setActive(null)} />
            <button
              onClick={() => setActive(null)}
              data-testid="drone-lightbox-close"
              className="absolute top-5 right-5 z-10 h-10 w-10 grid place-items-center rounded-full bg-slate-900/80 border border-white/15 text-slate-200 hover:text-teal-400 transition-colors duration-200"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
            >
              <img src={active.url} alt={active.caption} className="w-full max-h-[82vh] object-contain rounded-lg" />
              <figcaption className="mt-3 text-center font-mono text-xs uppercase tracking-[0.15em] text-slate-400">
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
