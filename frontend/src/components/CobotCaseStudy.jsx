import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Reveal } from "./Motion";

const ACCENT = "#15628f"; // restrained industrial blue, inspired by the pneumatic tubing

// SOURCE OF TRUTH — exact filename → asset mapping (do not reorder / remix)
const IMG = {
  hero: { src: "/projects/cobot/IMG_6125.jpg", file: "IMG_6125.JPG", alt: "Late-stage integrated cobot ultrasonic welding setup with custom fixture, robot-mounted welder, pneumatic tubing and vacuum handling hardware." },
  fixture: { src: "/projects/cobot/IMG_0832.jpg", file: "IMG_0832.jpeg", alt: "Wooden table fixture with the ultrasonic welder positioned above a spa component reference outline." },
  holder: { src: "/projects/cobot/IMG_5981.jpg", file: "IMG_5981.JPG", alt: "3D-printed welder holder fixture developed for the ultrasonic welder." },
  holderFit: { src: "/projects/cobot/IMG_5984.jpg", file: "IMG_5984.JPG", alt: "Ultrasonic welder positioned within the 3D-printed holder fixture during fit-up." },
  vacParts: { src: "/projects/cobot/IMG_0842.jpg", file: "IMG_0842.jpeg", alt: "Pneumatic and vacuum hardware laid out on the bench during subsystem planning." },
  vacAssembly: { src: "/projects/cobot/IMG_6085.jpg", file: "IMG_6085.JPG", alt: "Vacuum tubing and pneumatic connections being assembled and routed." },
  endEffector: { src: "/projects/cobot/IMG_0846.jpg", file: "IMG_0846.jpeg", alt: "Complete assembled end-effector prototype integrating welder, holder, support rods, tubing and suction hardware on the cobot." },
  fabrication: { src: "/projects/cobot/IMG_0848.jpg", file: "IMG_0848.jpeg", alt: "Cart of fabricated hardware and development components used throughout prototype iteration." },
};

const CONTRIB = [
  {
    heading: "Mechanical & Product Development",
    items: [
      "Designed the 3D-printed ultrasonic welder holder fixture",
      "Developed the fixture / table concept for consistent component presentation",
      "Validated the physical welder-to-holder interface through fit-up testing",
      "Designed and integrated support structure for the vacuum / suction setup",
      "Built and iterated physical prototype elements during development",
    ],
  },
  {
    heading: "Automation & System Integration",
    items: [
      "Programmed and refined cobot movement for efficient positioning",
      "Developed the vacuum / pneumatic integration approach using compressed air",
      "Assembled tubing and vacuum components for suction-assisted handling",
      "Tested process settings and system behavior during development",
      "Evaluated the complete fixture, tool, robot and handling system as one process",
    ],
  },
];

export const CobotCaseStudy = ({ onClose }) => {
  const [zoom, setZoom] = useState(null);

  return (
    <div className="relative bg-[#f4f1ec] text-[#1d2126]" data-testid="cobot-case-study">
      {/* Close */}
      <button
        onClick={onClose}
        data-testid="modal-close-btn"
        className="fixed sm:absolute top-4 right-4 z-30 h-11 w-11 grid place-items-center rounded-full bg-white/90 backdrop-blur border border-black/10 text-[#1d2126] hover:text-[#15628f] shadow-sm transition-colors duration-200"
        aria-label="Close case study"
      >
        <X size={20} />
      </button>

      {/* 1 — HERO */}
      <header className="px-6 sm:px-14 pt-14 sm:pt-16 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal>
            <Figure img={IMG.hero} onZoom={setZoom} priority />
          </Reveal>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>
                Flagship Project · Late-Stage Prototype
              </span>
            </div>
            <h1 className="font-display font-light tracking-tight text-3xl sm:text-4xl lg:text-5xl leading-[1.05]">
              Automating Ultrasonic Welding Through Fixture, Tooling, and Process Design
            </h1>
            <p className="mt-6 text-[#4a515c] text-base sm:text-lg leading-relaxed max-w-xl">
              Developed a cobot-assisted ultrasonic welding concept for spa components to reduce manual handling
              variation and improve repeatability through fixture design, custom tooling, vacuum integration, and
              robot programming.
            </p>
            <dl className="mt-8 grid sm:grid-cols-3 gap-5 border-t border-black/10 pt-6">
              {[
                ["Role", "Mechanical Design + Automation Integration"],
                ["Focus", "Fixture · End-Effector · Vacuum · Cobot Programming"],
                ["Status", "Late-Stage Prototype Development"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#8a909b]">{k}</dt>
                  <dd className="mt-1.5 text-sm text-[#2b313a] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <Reveal delay={0.1}>
          <Caption>
            Late-stage integrated cobot welding setup combining the custom fixture, robot-mounted ultrasonic welder,
            pneumatic tubing, vacuum-assisted handling hardware, and active work area. This setup brought the major
            mechanical and automation subsystems together for system-level testing and refinement.
          </Caption>
        </Reveal>
      </header>

      <div className="mx-6 sm:mx-14 border-t border-black/10" />

      {/* 2 — THE PROBLEM */}
      <Section n="01" label="The Problem" heading="Designing Repeatability Into the Process">
        <Body>
          The original welding process relied heavily on manual handling and setup, making consistent part presentation
          more difficult to maintain. I approached the project as a complete mechanical and process-design problem
          rather than only a robot-programming task — focusing on fixture repeatability, controlled tool positioning,
          practical part handling, and an integrated robot workflow.
        </Body>
      </Section>

      {/* 3 — FIXTURE DEVELOPMENT */}
      <SplitSection
        n="02"
        label="Fixture Development"
        heading="Establishing the Part Location and Tool Approach"
        img={IMG.fixture}
        onZoom={setZoom}
        caption="Early wooden fixture and cobot layout used to validate the relationship between the welding tool, robot motion, and the component's reference position. This stage demonstrated that repeatable part presentation was a critical requirement for reliable automation."
      >
        The first step was creating a physical fixture and table layout that could consistently present the component
        to the welding tool. The wooden fixture was used to define part boundaries, test access, validate cobot reach,
        and establish how the ultrasonic welder should approach the work area before the system moved into deeper
        integration.
      </SplitSection>

      {/* 4 — CUSTOM WELDER HOLDER */}
      <Section n="03" label="Custom Welder Holder" heading="Designing the Welder Mount">
        <Body>
          A core mechanical challenge was designing a holder that could securely attach the ultrasonic welder to the
          cobot while maintaining the correct position above the fixture. I developed and tested a custom 3D-printed
          holder concept to establish the physical interface between the robot, welder body, and eventual integrated
          handling hardware.
        </Body>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <Figure img={IMG.holder} onZoom={setZoom}
            caption="3D-printed holder fixture developed to create a dedicated mechanical interface for the ultrasonic welder. This component was used to evaluate tool retention, mounting geometry, and how the holder could become the base structure for the end-effector." />
          <Figure img={IMG.holderFit} onZoom={setZoom}
            caption="Physical welder-to-holder fit-up used to validate the custom fixture's geometry before full system integration. This stage confirmed how the holder positioned the welder relative to the fixture — tool orientation, clearance, and working alignment." />
        </div>
      </Section>

      {/* 5 — VACUUM / PNEUMATIC */}
      <Section n="04" label="Vacuum / Pneumatic Development" heading="Developing Vacuum-Assisted Part Handling">
        <Body>
          To support part handling while the ultrasonic welder remained mounted to the cobot, I integrated a
          vacuum-assisted concept using compressed air and pneumatic components. The system was developed through
          bench-level component layout, tubing assembly, and physical integration into the end-effector architecture.
        </Body>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <Figure img={IMG.vacParts} onZoom={setZoom}
            caption="Pneumatic and vacuum hardware arranged during the early subsystem-development stage. This layout was used to plan the components required for a Venturi-based vacuum approach and determine how the suction system would be incorporated into the larger tool assembly." />
          <Figure img={IMG.vacAssembly} onZoom={setZoom}
            caption="Vacuum tubing and pneumatic connections being assembled during integration. This stage focused on routing the air lines, connecting the handling components, and preparing the vacuum system for combined testing with the welder mount and fixture." />
        </div>
      </Section>

      {/* 6 — INTEGRATED END-EFFECTOR */}
      <SplitSection
        n="05"
        label="Integrated End-Effector Prototype"
        heading="Integrating Tooling, Vacuum Hardware, and Support Structure"
        img={IMG.endEffector}
        onZoom={setZoom}
        reverse
        caption="Completed end-effector prototype combining the ultrasonic welder, custom holder, support rods, suction hardware, tubing, and integrated mechanical interfaces. The prototype was built to evaluate alignment, access, part handling, and the interaction between all subsystems before final refinement."
      >
        The end-effector prototype combined the robot-mounted ultrasonic welder with the holder, support structure,
        vacuum lines, and suction hardware. This stage transformed separate mechanical and pneumatic ideas into a
        working prototype that could be evaluated as one integrated system.
      </SplitSection>

      {/* 7 — FABRICATION & ITERATION */}
      <SplitSection
        n="06"
        label="Fabrication & Iteration"
        heading="Building Through Physical Iteration"
        img={IMG.fabrication}
        onZoom={setZoom}
        caption="Fabricated parts and development hardware used throughout prototype iteration. The project relied on hands-on testing and adjustment to refine the fixture, holder, vacuum hardware, and supporting components as an integrated automation system."
      >
        The project progressed through fabricated support pieces, temporary setups, fit-up changes, bench testing, and
        ongoing refinement. These physical iterations were a deliberate part of the development process — allowing
        mechanical interfaces and system behavior to be validated before moving toward a cleaner final configuration.
      </SplitSection>

      {/* 8 — KEY TAKEAWAY (editorial callout) */}
      <section className="px-6 sm:px-14 py-16 sm:py-24">
        <Reveal>
          <figure className="max-w-4xl">
            <span className="font-mono text-[11px] tracking-[0.24em] uppercase text-[#8a909b]">The Engineering Lesson</span>
            <blockquote className="mt-6 pl-6 sm:pl-8 border-l-2 font-display font-light text-2xl sm:text-4xl leading-[1.2] tracking-tight text-[#1d2126]" style={{ borderColor: ACCENT }}>
              “A faster robot does not fix a variable process. The biggest improvement came from controlling fixture
              repeatability, part presentation, tool position, and handling so the robot could perform the same
              operation consistently.”
            </blockquote>
          </figure>
        </Reveal>
      </section>

      <div className="mx-6 sm:mx-14 border-t border-black/10" />

      {/* 9 — CONTRIBUTIONS */}
      <section className="px-6 sm:px-14 py-16 sm:py-20">
        <div className="mb-10">
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>07 — Contributions</span>
          <h2 className="mt-4 font-display font-light text-3xl sm:text-4xl tracking-tight">My Contributions</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-10">
          {CONTRIB.map((col) => (
            <Reveal key={col.heading}>
              <div>
                <h3 className="font-display text-lg sm:text-xl text-[#1d2126]">{col.heading}</h3>
                <ul className="mt-5 space-y-3.5">
                  {col.items.map((it, i) => (
                    <li key={i} className="flex gap-3.5 text-[#454c57] text-sm sm:text-base leading-relaxed">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-6 sm:mx-14 border-t border-black/10" />

      {/* 10 — PROBLEM (recruiter summary) */}
      <Section n="08" label="Problem" heading="Problem">
        <Body>
          Ultrasonic welding cell at Watkins Wellness needed consistent, repeatable welds, but the manual process was
          variable and slow.
        </Body>
      </Section>

      {/* 11 — MY ROLE */}
      <Section n="09" label="My Role" heading="My Role">
        <Body>
          Manufacturing Engineer, Watkins Wellness, January 2026 to present. I designed the fixtures, integrated the
          automation, and programmed the cobot.
        </Body>
      </Section>

      {/* 12 — DESIGN */}
      <Section n="10" label="Design" heading="Design">
        <ul className="mt-2 space-y-3.5 max-w-2xl">
          {[
            "Designed fixtures for consistent part location during welding",
            "Designed a custom 3D-printed holder for the ultrasonic welder",
            "Integrated vacuum and pneumatic handling for part loading and unloading",
            "Programmed the cobot for the weld cycle",
          ].map((it, i) => (
            <li key={i} className="flex gap-3.5 text-[#454c57] text-sm sm:text-base leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
              {it}
            </li>
          ))}
        </ul>
      </Section>

      {/* 13 — LESSON LEARNED */}
      <Section n="11" label="Lesson Learned" heading="Lesson Learned">
        <Body>A faster robot does not fix a variable process.</Body>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="cobot-lightbox"
          >
            <div className="absolute inset-0 bg-[#0b0e12]/92 backdrop-blur-sm" onClick={() => setZoom(null)} />
            <button
              onClick={() => setZoom(null)}
              data-testid="cobot-lightbox-close"
              className="absolute top-5 right-5 z-10 h-11 w-11 grid place-items-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Close image"
            >
              <X size={20} />
            </button>
            <motion.figure
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="relative max-w-4xl w-full"
            >
              <img src={zoom.src} alt={zoom.alt} className="w-full max-h-[82vh] object-contain rounded-lg" />
              <figcaption className="mt-3 text-center text-xs text-white/60 font-mono tracking-wide">{zoom.alt}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ---------- primitives ---------- */

const Figure = ({ img, onZoom, caption, priority }) => (
  <figure>
    <button
      onClick={() => onZoom(img)}
      className="group relative block w-full overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_18px_40px_-24px_rgba(0,0,0,0.4)]"
      aria-label={`Enlarge image: ${img.alt}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading={priority ? "eager" : "lazy"}
        className="w-full h-auto max-h-[62vh] object-contain bg-[#eeeae3] group-hover:scale-[1.015] transition-transform duration-500"
      />
      <span className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-white/85 backdrop-blur border border-black/10 text-[#1d2126] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ZoomIn size={16} />
      </span>
    </button>
    {caption && <Caption>{caption}</Caption>}
  </figure>
);

const Caption = ({ children }) => (
  <figcaption className="mt-3 flex items-start gap-2.5 text-[#6a7178] text-xs sm:text-[13px] leading-relaxed max-w-3xl">
    <span className="mt-1.5 h-px w-5 shrink-0" style={{ background: ACCENT }} />
    <span>{children}</span>
  </figcaption>
);

const Body = ({ children }) => (
  <p className="text-[#454c57] text-base sm:text-lg leading-relaxed max-w-2xl">{children}</p>
);

const Section = ({ n, label, heading, children }) => (
  <section className="px-6 sm:px-14 py-14 sm:py-20">
    <Reveal>
      <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>{n} — {label}</span>
      <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-4xl tracking-tight leading-tight max-w-3xl">
        {heading}
      </h2>
      {children}
    </Reveal>
  </section>
);

const SplitSection = ({ n, label, heading, img, onZoom, caption, reverse, children }) => (
  <section className="px-6 sm:px-14 py-14 sm:py-20">
    <div className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${reverse ? "" : ""}`}>
      <Reveal className={reverse ? "lg:order-2" : ""}>
        <Figure img={img} onZoom={onZoom} caption={caption} />
      </Reveal>
      <Reveal className={reverse ? "lg:order-1" : ""} delay={0.05}>
        <div>
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>{n} — {label}</span>
          <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-4xl tracking-tight leading-tight">{heading}</h2>
          <Body>{children}</Body>
        </div>
      </Reveal>
    </div>
  </section>
);
