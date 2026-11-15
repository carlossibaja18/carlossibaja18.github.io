import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn, ArrowDown } from "lucide-react";
import { Reveal } from "./Motion";
import { ResultsTable, PlaceholderBox } from "./CaseStudyShared";

const ACCENT = "#67D7FF";

/*
 * FANUC Vision-Guided Dual-Robot Trim & Drill Automation — Carlos Sibaja (2026)
 * LOCKED IMAGE ASSET MAP (original filename -> hosted asset). Do not reorder / remix.
 *   IMG_4173.jpeg   -> /projects/fanuc/IMG_4173.webp   (entire single robot arm)
 *   IMG_5146.jpeg   -> /projects/fanuc/IMG_5146.webp   (single robot arm with shell inside chamber)
 *   IMG_0501.jpeg   -> /projects/fanuc/IMG_0501.webp   (shell inside chamber, doors open, on conveyor)
 *   IMG_0790.jpeg   -> /projects/fanuc/IMG_0790.webp   (close-up of robot arm head)
 *   IMG_0786.jpeg   -> /projects/fanuc/IMG_0786.webp   (shell inside chamber getting cut, holes visible)  [HERO + card]
 *   749767389_..._n.jpg -> /projects/fanuc/vision-example.jpg (robot vision example)
 *   IMG_0509.jpeg   -> /projects/fanuc/IMG_0509.webp   (robot controller / operator panel)
 *   IMG_0796.jpeg   -> /projects/fanuc/IMG_0796.webp   (empty chamber showing conveyor and area)
 *   IMG_0810.jpeg   -> /projects/fanuc/IMG_0810.webp   (FANUC teach pendant, code area blurred)
 *   IMG_0968.jpeg   -> /projects/fanuc/IMG_0968.webp   (manual process example 1)
 *   IMG_0975.jpeg   -> /projects/fanuc/IMG_0975.webp   (manual process example 2)
 *   IMG_1096.jpeg   -> /projects/fanuc/IMG_1096.webp   (point-to-point programming computer, labels blurred)
 *   IMG_1116.jpeg   -> /projects/fanuc/IMG_1116.webp   (robot arm taking a picture of the shell)
 */
const IMG = {
  hero: { src: "/projects/fanuc/IMG_0786.webp", file: "IMG_0786.jpeg", alt: "Two FANUC industrial robots operating around a spa shell inside the trim-and-drill chamber, with drilled holes visible on the shell." },
  manualA: { src: "/projects/fanuc/IMG_0968.webp", file: "IMG_0968.jpeg", alt: "Operator manually drilling a spa shell with a handheld tool before automation." },
  manualB: { src: "/projects/fanuc/IMG_0975.webp", file: "IMG_0975.jpeg", alt: "A second view of the manual spa-shell drilling process before automation." },
  cellEmpty: { src: "/projects/fanuc/IMG_0796.webp", file: "IMG_0796.jpeg", alt: "Empty trim-and-drill chamber showing the conveyor layout and working area of the FANUC automation cell." },
  cellShell: { src: "/projects/fanuc/IMG_0501.webp", file: "IMG_0501.jpeg", alt: "Spa shell positioned inside the automation chamber with doors open and conveyor visible." },
  arm: { src: "/projects/fanuc/IMG_4173.webp", file: "IMG_4173.jpeg", alt: "A single FANUC industrial robot arm inside the trim-and-drill cell." },
  armShell: { src: "/projects/fanuc/IMG_5146.webp", file: "IMG_5146.jpeg", alt: "FANUC robot positioned around a spa shell inside the chamber, showing robot reach and working envelope." },
  head: { src: "/projects/fanuc/IMG_0790.webp", file: "IMG_0790.jpeg", alt: "Close-up of the FANUC robot head and drilling hardware." },
  panel: { src: "/projects/fanuc/IMG_0509.webp", file: "IMG_0509.jpeg", alt: "Operator control panel for the dual-robot trim-and-drill cell." },
  pendant: { src: "/projects/fanuc/IMG_0810.webp", file: "IMG_0810.jpeg", alt: "FANUC teach pendant used during robot setup and programming refinement (program text intentionally obscured)." },
  vizCapture: { src: "/projects/fanuc/IMG_1116.webp", file: "IMG_1116.jpeg", alt: "FANUC robot arm capturing an image of the spa shell before drilling." },
  vizExample: { src: "/projects/fanuc/vision-example.jpg", file: "749767389_1015061668116123_2219387072705687029_n.jpg", alt: "Vision-system camera view used to identify a programmed target area on the shell." },
  programming: { src: "/projects/fanuc/IMG_1096.webp", file: "IMG_1096.jpeg", alt: "Computer-based point-to-point programming view used to refine robot positions (sensitive values intentionally obscured)." },
};

const CONTRIB_LEFT = [
  "Refined FANUC point-to-point programming for drilling locations.",
  "Adjusted robot positions based on measured placement corrections.",
  "Tuned programmed hole diameters and drilling locations.",
  "Improved lighting and vision conditions for more reliable marker recognition.",
  "Tested drilling results across five shell models.",
  "Supported ongoing troubleshooting, setup, and process refinement.",
  "Worked directly with robot operation, teach-pendant workflows, and cell controls.",
];

const CONTRIB_RIGHT = [
  "Worked with periodic guidance from a FANUC automation engineer who visited approximately every two months.",
  "Handled much of the day-to-day on-site testing, iteration, and programming refinement between support visits.",
  "Learned how robot motion, camera visibility, lighting, tooling, shell variation, and process timing must work together in a production automation system.",
  "Developed practical experience with FANUC robot programming, machine vision, robot tooling, and manufacturing process improvement.",
];

export const FanucCaseStudy = ({ onClose }) => {
  const [zoom, setZoom] = useState(null);

  return (
    <div className="relative bg-[#080A0D] text-[#F3F7FA]" data-testid="fanuc-case-study">
      {/* Sticky project label + close */}
      <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3 bg-[#080A0D]/85 backdrop-blur border-b border-[#67D7FF]/12">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#9AA8B3] truncate">
            FANUC Trim &amp; Drill Automation · 2026
          </span>
        </div>
        <button
          onClick={onClose}
          data-testid="modal-close-btn"
          className="h-10 w-10 grid place-items-center rounded-full bg-[#11171D] border border-white/10 text-[#F3F7FA] hover:text-[#67D7FF] hover:border-[#67D7FF]/50 transition-colors duration-200 shrink-0"
          aria-label="Close case study"
        >
          <X size={18} />
        </button>
      </div>

      {/* 1 — HERO (wide, edge-to-edge) */}
      <header>
        <div className="relative w-full h-[52vh] min-h-[320px] sm:h-[64vh] overflow-hidden">
          <img src={IMG.hero.src} alt={IMG.hero.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/45 to-[#080A0D]/10" />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-14 pb-8 sm:pb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>
                2026 · Vision-Guided Trim &amp; Drill Cell
              </span>
            </div>
            <h1 className="font-display font-light tracking-tight text-3xl sm:text-5xl leading-[1.04] max-w-4xl">
              FANUC Vision-Guided Dual-Robot Trim &amp; Drill Automation
            </h1>
            <p className="mt-4 text-[#c3ccd4] text-sm sm:text-lg max-w-2xl leading-relaxed">
              Improving drilling accuracy, vision reliability, and cycle time for a two-robot spa-shell manufacturing process.
            </p>
          </div>
        </div>

        <div className="px-6 sm:px-14 pt-8">
          <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 border-t border-white/10 pt-6">
            {[
              ["Year", "2026"],
              ["Platform", "Two FANUC Industrial Robots"],
              ["System", "Vision-Guided Trim & Drill Cell"],
              ["Coverage", "Five Shell Models"],
              ["Focus", "Vision / Lighting / Programming / Accuracy"],
              ["Result", "~40 min manual → ~6 min automated"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#67D7FF]">{k}</dt>
                <dd className="mt-1.5 text-sm text-[#c3ccd4] leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
          <Reveal delay={0.05}>
            <Caption>
              Two FANUC industrial robots operating around a spa shell inside the trim-and-drill chamber. The cell used
              camera-guided positioning and simultaneous drilling from both sides to automate hole cutting across five
              shell models.
            </Caption>
          </Reveal>
        </div>
      </header>

      {/* 2 — THE MANUAL PROCESS */}
      <Section n="01" label="The Manual Process" heading="From Manual Drilling to Dual-Robot Automation">
        <Body>
          Before automation, spa-shell holes were drilled manually by six operators as each shell moved along the
          conveyor. The process took approximately 40 minutes per completed shell and required consistent control of
          hole position, diameter, tool handling, and drilling quality.
        </Body>
        <div className="mt-8">
          <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#9AA8B3]">Before Automation</span>
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <Figure img={IMG.manualA} onZoom={setZoom}
              caption="Manual drilling example showing the original hands-on process used before the dual-robot automation system. Operators manually positioned drilling tools across the shell, making accuracy and consistency dependent on repeated manual work." />
            <Figure img={IMG.manualB} onZoom={setZoom}
              caption="A second view of the manual drilling process before automation. These manual operations established the baseline process that the vision-guided FANUC cell was designed to improve." />
          </div>
        </div>
      </Section>

      <Divider />

      {/* 3 — THE AUTOMATION CELL */}
      <Section n="02" label="The Automation Cell" heading="Building the Conveyor-Based Robot Cell">
        <Body>
          The automated system used two FANUC industrial robots positioned on opposite sides of the shell as it moved
          through a conveyor-based chamber. Both robots worked simultaneously, allowing the process to drill required
          locations while maintaining a continuous production flow.
        </Body>
        <div className="mt-8">
          <Figure img={IMG.cellEmpty} onZoom={setZoom} wide
            caption="Empty trim-and-drill chamber showing the conveyor layout and working area used by the FANUC automation cell. The physical arrangement had to support safe robot access, shell movement, tool clearance, and repeatable positioning." />
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          <Figure img={IMG.cellShell} onZoom={setZoom}
            caption="Spa shell positioned inside the automation chamber with the doors open and conveyor visible. This view shows how the shell entered the cell and was presented to the two-robot drilling process." />
          <Figure img={IMG.arm} onZoom={setZoom}
            caption="Single FANUC industrial robot arm inside the trim-and-drill cell. The robot was part of a dual-robot configuration designed to access drilling locations from opposite sides of the shell." />
        </div>
        <div className="mt-6">
          <Figure img={IMG.armShell} onZoom={setZoom} wide
            caption="FANUC robot positioned around a spa shell inside the chamber. This image shows the relationship between robot reach, shell geometry, and the physical working envelope required for automated drilling." />
        </div>
      </Section>

      <Divider />

      {/* 4 — ROBOT TOOLING AND OPERATOR CONTROL */}
      <Section n="03" label="Tooling & Control" heading="Tooling, Control, and Robot Operation">
        <Body>
          Reliable drilling required more than moving the robot to a location. The process depended on the correct tool
          selection, controlled robot operation, appropriate end-effector positioning, and a repeatable way to manage
          the cell during setup and production.
        </Body>
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <Figure img={IMG.head} onZoom={setZoom}
            caption="Close-up of the FANUC robot head and drilling hardware. The robot tooling had to maintain the correct orientation, reach, and clearance while approaching shell features from multiple angles." />
          <Figure img={IMG.panel} onZoom={setZoom}
            caption="Operator control panel for the dual-robot trim-and-drill cell. The interface supported cell operation, robot status monitoring, and controlled access to the automated process." />
        </div>
        <div className="mt-6">
          <Figure img={IMG.pendant} onZoom={setZoom} wide
            caption="FANUC teach pendant used during robot setup, programming refinement, and troubleshooting — included as evidence of hands-on robot-programming work. Readable program details are intentionally obscured to protect proprietary code." />
        </div>
      </Section>

      <Divider />

      {/* 5 — VISION, LIGHTING, AND POSITION REFINEMENT */}
      <Section n="04" label="Vision & Position Refinement" heading="Using Vision to Locate the Correct Drill Points">
        <Body>
          The cell used a camera-based vision system to identify programmed markers and determine the correct drilling
          locations on each shell. I refined lighting and vision conditions to improve marker visibility, then adjusted
          point-to-point robot locations and measured offsets to improve drilling accuracy.
        </Body>
        <div className="mt-8">
          <Figure img={IMG.vizCapture} onZoom={setZoom} wide
            caption="FANUC robot arm capturing an image of the spa shell before drilling. The camera step provided the visual reference needed to identify programmed locations and guide the next robot actions." />
        </div>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          <Figure img={IMG.vizExample} onZoom={setZoom}
            caption="Vision-system example showing a camera view used to identify the programmed target area. Lighting and marker visibility were important factors in achieving consistent recognition before drilling." />
          <Figure img={IMG.programming} onZoom={setZoom}
            caption="Computer-based point-to-point programming view used to refine robot positions around the shell. I adjusted drilling locations, approach points, hole diameters, and small positional offsets — such as 2 mm right or 4 mm left — based on testing and observed drilling results. Sensitive on-screen values are intentionally obscured." />
        </div>
      </Section>

      <Divider />

      {/* 6 — OUTCOME */}
      <section className="px-6 sm:px-14 py-16 sm:py-20">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>05 — Outcome</span>
          <h2 className="mt-4 font-display font-light text-2xl sm:text-4xl tracking-tight">A Faster, More Repeatable Process</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-10 grid md:grid-cols-[1fr_auto_1fr] items-stretch gap-6">
            <CompareCard
              kicker="Before"
              big="6 OPERATORS"
              bigSub="Manual drilling across a moving spa shell"
              time="~40 MINUTES"
              timeSub="Approximate manual process time per completed shell"
            />
            <div className="flex md:flex-col items-center justify-center text-[#67D7FF]" aria-hidden="true">
              <ArrowDown size={30} className="rotate-90 md:rotate-0" />
            </div>
            <CompareCard
              kicker="After"
              accent
              big="2 FANUC ROBOTS"
              bigSub="Vision-guided simultaneous drilling from opposite sides"
              time="~6 MINUTES"
              timeSub="Approximate automated cycle time per completed shell"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 text-[#9AA8B3] text-base sm:text-lg leading-relaxed max-w-3xl">
            The improved automation cell supported a faster and more repeatable drilling process across five shell
            models. By refining lighting, vision conditions, programmed positions, hole diameters, and robot approach
            points, the process reduced manual involvement while improving consistency in how drilling locations were
            executed.
          </p>
        </Reveal>
      </section>

      <Divider />

      {/* 7 — ROLE AND COLLABORATION */}
      <section className="px-6 sm:px-14 py-16 sm:py-20">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>06 — My Contribution</span>
          <h2 className="mt-4 font-display font-light text-2xl sm:text-4xl tracking-tight">My Contribution</h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-2 gap-x-14 gap-y-10">
          <Reveal>
            <div>
              <h3 className="font-display text-lg sm:text-xl text-[#F3F7FA]">On-Site Automation Development</h3>
              <BulletList items={CONTRIB_LEFT} />
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div>
              <h3 className="font-display text-lg sm:text-xl text-[#F3F7FA]">Collaboration and System Learning</h3>
              <BulletList items={CONTRIB_RIGHT} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — KEY LESSON */}
      <section className="px-6 sm:px-14 pb-20">
        <Reveal>
          <figure className="rounded-2xl border border-[#67D7FF]/18 bg-[#11171D] px-6 sm:px-10 py-10 sm:py-12 max-w-4xl">
            <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>Key Engineering Lesson</span>
            <blockquote className="mt-5 font-display font-light text-xl sm:text-3xl leading-[1.3] tracking-tight text-[#F3F7FA]">
              “Reliable industrial automation depends on the complete system — not only robot motion. Vision conditions,
              lighting, programmed points, tool behavior, shell variation, and real-world testing all have to work
              together.”
            </blockquote>
          </figure>
        </Reveal>
      </section>

      <Divider />

      {/* 9 — PROBLEM (recruiter summary) */}
      <Section n="07" label="Problem" heading="Problem">
        <Body>Trimming and drilling shells by hand took 6 operators and 40 minutes per shell.</Body>
      </Section>

      {/* 10 — MY ROLE */}
      <Section n="08" label="My Role" heading="My Role">
        <Body>I refined the robot programs and tuned the vision system for production use across 5 shell models.</Body>
      </Section>

      {/* 11 — WHAT I DID */}
      <Section n="09" label="What I Did" heading="What I Did">
        <BulletList
          items={[
            "Refined point-to-point robot programs for trim and drill paths",
            "Tuned vision and lighting for reliable part detection across 5 shell models",
            "Worked on a dual-robot cell for trim and drill operations",
          ]}
        />
      </Section>

      {/* 12 — RESULTS */}
      <Section n="10" label="Results" heading="Results">
        <ResultsTable
          testid="fanuc-results-table"
          dark
          rows={[
            ["Operators per shell", "6 operators", "2 robots"],
            ["Time per shell", "40 minutes", "6 minutes"],
            ["Shell models supported", "[TO ADD: Before]", "5 models"],
          ]}
        />
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <PlaceholderBox dark testid="fanuc-placeholder-cell-layout-photo" label="[TO ADD: Upload cell layout photo here]" />
          <PlaceholderBox dark testid="fanuc-placeholder-vision-setup-photo" label="[TO ADD: Upload vision setup photo here]" />
          <PlaceholderBox dark testid="fanuc-placeholder-cycle-time-data" label="[TO ADD: Upload cycle time data here]" />
        </div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-testid="fanuc-lightbox"
          >
            <div className="absolute inset-0 bg-[#050607]/94 backdrop-blur-sm" onClick={() => setZoom(null)} />
            <button
              onClick={() => setZoom(null)}
              data-testid="fanuc-lightbox-close"
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

/* ---------- primitives (dark) ---------- */

const Figure = ({ img, onZoom, caption, wide }) => (
  <figure>
    <button
      onClick={() => onZoom(img)}
      className="group relative block w-full overflow-hidden rounded-lg border border-white/10 bg-[#0d1217]"
      aria-label={`Enlarge image: ${img.alt}`}
    >
      <img
        src={img.src}
        alt={img.alt}
        loading="lazy"
        className={`w-full object-cover group-hover:scale-[1.015] transition-transform duration-500 ${
          wide ? "max-h-[68vh]" : "aspect-[4/3]"
        }`}
      />
      <span className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-[#080A0D]/70 backdrop-blur border border-white/15 text-[#F3F7FA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <ZoomIn size={16} />
      </span>
    </button>
    {caption && <Caption>{caption}</Caption>}
  </figure>
);

const Caption = ({ children }) => (
  <figcaption className="mt-3 flex items-start gap-2.5 text-[#8794a0] text-xs sm:text-[13px] leading-relaxed max-w-3xl">
    <span className="mt-1.5 h-px w-5 shrink-0" style={{ background: ACCENT }} />
    <span>{children}</span>
  </figcaption>
);

const Body = ({ children }) => (
  <p className="text-[#9AA8B3] text-base sm:text-lg leading-relaxed max-w-3xl">{children}</p>
);

const Divider = () => <div className="mx-6 sm:mx-14 border-t border-white/8" />;

const Section = ({ n, label, heading, children }) => (
  <section className="px-6 sm:px-14 py-14 sm:py-20">
    <Reveal>
      <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>{n} — {label}</span>
      <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-4xl tracking-tight leading-tight max-w-3xl">
        {heading}
      </h2>
    </Reveal>
    {children}
  </section>
);

const BulletList = ({ items }) => (
  <ul className="mt-5 space-y-3.5">
    {items.map((it, i) => (
      <li key={i} className="flex gap-3.5 text-[#9AA8B3] text-sm sm:text-base leading-relaxed">
        <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
        {it}
      </li>
    ))}
  </ul>
);

const CompareCard = ({ kicker, big, bigSub, time, timeSub, accent }) => (
  <div className={`rounded-2xl border px-6 sm:px-8 py-8 ${accent ? "border-[#67D7FF]/30 bg-[#11171D]" : "border-white/10 bg-[#0d1217]"}`}>
    <span className="font-mono text-[10px] tracking-[0.24em] uppercase text-[#9AA8B3]">{kicker}</span>
    <p className={`mt-3 font-display font-light text-2xl sm:text-3xl tracking-tight ${accent ? "text-[#A4EAFF]" : "text-[#F3F7FA]"}`}>{big}</p>
    <p className="mt-1.5 text-[#9AA8B3] text-sm leading-relaxed">{bigSub}</p>
    <div className="mt-6 pt-5 border-t border-white/10">
      <p className={`font-display font-light text-3xl sm:text-4xl tracking-tight ${accent ? "text-[#67D7FF]" : "text-[#F3F7FA]"}`}>{time}</p>
      <p className="mt-1.5 text-[#8794a0] text-xs sm:text-sm leading-relaxed">{timeSub}</p>
    </div>
  </div>
);
