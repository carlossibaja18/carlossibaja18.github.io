import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { Reveal } from "./Motion";

const ACCENT = "#67D7FF";
const P = "/projects/eco";

/*
 * FIU Eco Engineering Club — Vehicle Design & Fabrication (Carlos Sibaja, junior club member, 2022–2023)
 * Each uploaded ECO image is used exactly once. Original filenames preserved below.
 */
const HERO = { src: `${P}/IMG_1988.jpeg`, alt: "FIU Eco Engineering Club members preparing the completed energy-efficient vehicle at a Shell Eco-marathon event.", cap: "FIU Eco Engineering Club vehicle-development work connected digital design, hands-on fabrication, and competition preparation around an energy-efficient urban-concept vehicle." };
const CTX = { src: `${P}/IMG_1980.jpeg`, alt: "Transparent CAD view of the vehicle showing the aerodynamic shell around the internal tubular chassis.", cap: "CAD packaging study of the energy-efficient urban-concept platform, showing the outer shell wrapped around the internal tubular chassis and roll-hoop structure." };
const CAD_LEAD = { src: `${P}/IMG_1984.jpeg`, alt: "Transparent CAD assembly view showing the aerodynamic shell integrated around the tubular chassis and roll hoops.", cap: "Vehicle CAD view showing the aerodynamic shell integrated around the tubular chassis and roll-hoop structure." };
const CAD_SEC1 = { src: `${P}/IMG_1982.jpeg`, alt: "SolidWorks shell surface model with a dimensioned cross-section defining the outer-body profile.", cap: "Shell cross-section development used to define the vehicle's outer-body proportions and packaging envelope." };
const CAD_SEC2 = { src: `${P}/IMG_1981.jpeg`, alt: "Dimensioned half-section sketch of the shell profile in SolidWorks.", cap: "Dimensioned shell profile section used to develop the vehicle's outer-body geometry before physical prototyping." };
const CAD_S1 = { src: `${P}/IMG_7445.webp`, alt: "SolidWorks shell surface model, front/nose development view on the workstation.", cap: "SolidWorks shell development — front/nose surface view." };
const CAD_S2 = { src: `${P}/IMG_7446.webp`, alt: "SolidWorks shell surface model, side-profile view on the workstation.", cap: "SolidWorks shell development — side-profile surface view." };
const CAD_S3 = { src: `${P}/IMG_7447.webp`, alt: "SolidWorks shell surface model, three-quarter view on the workstation.", cap: "SolidWorks shell development — three-quarter surface view." };
const CAD_S4 = { src: `${P}/IMG_1983.jpeg`, alt: "SolidWorks lofted-shell wireframe with reference planes and profile sections.", cap: "SolidWorks-based shell development using reference planes, sketches, and surface-modeling workflows." };
const FOAM = { src: `${P}/IMG_1985.jpeg`, alt: "Full-scale white foam shell buck of the eco vehicle body on a workshop table.", cap: "Full-scale foam shell form used to translate the vehicle's aerodynamic concept into a physical prototype." };
const LAYUP = { src: `${P}/IMG_1987.jpeg`, alt: "Club members applying composite fiberglass layup over the vehicle shell form.", cap: "Composite and shell-fabrication work during the transition from design concept to a buildable exterior body. Hands-on support included sanding, preparation, assembly assistance, and workshop-based learning." };
const EVENT = { src: `${P}/event-track.webp`, alt: "An energy-efficient prototype vehicle running on track inside a Shell Eco-marathon circuit.", cap: "Shell Eco-marathon is the competition environment the FIU Eco Engineering Club develops its energy-efficient urban-concept vehicle for." };
const POSTER = { src: `${P}/IMG_5171.webp`, alt: "FIU Mechanical and Materials Engineering senior-design poster on Maximize Eco Vehicle Efficiency.", cap: "FIU Mechanical and Materials Engineering senior-design presentation documenting the broader Eco Engineering vehicle-development effort. I contributed to the club's related CAD and hands-on fabrication activities as a junior member; I was not a member of the senior-design presentation team." };
const BTS = { src: `${P}/IMG_6070.webp`, alt: "SolidWorks and Ansys simulation work shown on a laptop and monitor during vehicle development.", cap: "Behind the scenes: SolidWorks modeling and simulation during the broader team's vehicle-development process. Simulation and analysis shown here reflect broader team/project context, not individual results." };

const CONTRIB = [
  "Supported SolidWorks CAD work for vehicle and aerodynamic-shell development",
  "Assisted with vehicle geometry, shell form, and chassis-to-body packaging exploration",
  "Contributed to hands-on sanding, building, assembly, and general workshop fabrication",
  "Provided welding-related support during fabrication activities",
  "Learned how CAD models translate into physical prototypes and fabricated components",
  "Participated in a collaborative student engineering workflow focused on practical vehicle development",
];

const SKILLS = [
  "SolidWorks CAD", "Surface and shell geometry exploration", "Vehicle packaging awareness",
  "Prototype development", "Hands-on fabrication support", "Sanding and surface preparation",
  "Welding support", "Team-based workshop collaboration", "Mechanical design iteration",
  "CAD-to-fabrication workflow",
];

export const EcoCaseStudy = ({ onClose }) => {
  const [zoom, setZoom] = useState(null);

  return (
    <div className="relative bg-[#080A0D] text-[#F3F7FA]" data-testid="eco-case-study">
      <div className="sticky top-0 z-30 flex items-center justify-between px-5 sm:px-8 py-3 bg-[#080A0D]/85 backdrop-blur border-b border-[#67D7FF]/12">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-[#9AA8B3] truncate">
            FIU Eco Engineering Club · 2022–2023
          </span>
        </div>
        <button onClick={onClose} data-testid="modal-close-btn"
          className="h-10 w-10 grid place-items-center rounded-full bg-[#11171D] border border-white/10 text-[#F3F7FA] hover:text-[#67D7FF] hover:border-[#67D7FF]/50 transition-colors duration-200 shrink-0"
          aria-label="Close project">
          <X size={18} />
        </button>
      </div>

      {/* Hero */}
      <header>
        <div className="relative w-full h-[52vh] min-h-[320px] sm:h-[62vh] overflow-hidden">
          <img src={HERO.src} alt={HERO.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080A0D] via-[#080A0D]/45 to-[#080A0D]/10" />
          <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-14 pb-8 sm:pb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8" style={{ background: ACCENT }} />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>
                2022–2023 · Student Engineering Club Contribution
              </span>
            </div>
            <h1 className="font-display font-light tracking-tight text-3xl sm:text-5xl leading-[1.05] max-w-4xl">
              FIU Eco Engineering Club — Vehicle Design &amp; Fabrication
            </h1>
            <p className="mt-4 text-[#c3ccd4] text-sm sm:text-lg max-w-2xl leading-relaxed">
              CAD Support · Aerodynamic Shell Development · Hands-On Vehicle Fabrication
            </p>
          </div>
        </div>
        <div className="px-6 sm:px-14 pt-8">
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#9AA8B3] leading-relaxed border-t border-white/10 pt-6">
            FIU Eco Engineering Club · Florida International University
            <span className="block mt-1 text-[#67D7FF]/90">2022–2023 · CAD Support · Fabrication Support · Student Engineering Team</span>
          </p>
          <div className="mt-6 space-y-4">
            <Body>As a junior member of FIU's Eco Engineering Club, I supported the team's vehicle-development work while learning the end-to-end process behind an energy-efficient competition vehicle.</Body>
            <Body>My work focused primarily on CAD support for vehicle and aerodynamic-shell development in SolidWorks. I also contributed to hands-on fabrication activities, including sanding, building, welding support, assembly, and general workshop work.</Body>
            <Body>This experience connected digital design work to real fabrication constraints and gave me practical exposure to vehicle packaging, aerodynamic-shell development, composite prototyping, and collaborative engineering workflows.</Body>
          </div>
          <Reveal delay={0.05}><Caption>{HERO.cap}</Caption></Reveal>
        </div>
      </header>

      {/* My Contribution */}
      <Section n="01" label="My Contribution" heading="My Contribution">
        <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3.5">
          {CONTRIB.map((c, i) => (
            <li key={i} className="flex gap-3.5 text-[#9AA8B3] text-sm sm:text-base leading-relaxed">
              <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: ACCENT }} />{c}
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      {/* 1 Project Context */}
      <Section n="02" label="Project Context" heading="An Energy-Efficient Vehicle Platform">
        <Body>The FIU Eco Engineering Club worked on an urban-concept, energy-efficient vehicle platform designed around lightweight construction, aerodynamic efficiency, driver packaging, manufacturability, and competition-oriented design constraints.</Body>
        <Body className="mt-4">As a junior club member, I joined the project as a contributor and learner within an established team. My role was to support the ongoing vehicle-development process through CAD work and workshop fabrication activities, while gaining firsthand experience with how an engineering team moves from design concepts to a physical vehicle.</Body>
        <div className="mt-8"><Figure img={CTX} onZoom={setZoom} wide /></div>
      </Section>

      <Divider />

      {/* 2 CAD Support */}
      <Section n="03" label="CAD Support" heading="CAD Support and Vehicle Packaging">
        <Body>My primary contribution was supporting CAD work for the vehicle and its aerodynamic outer shell in SolidWorks. The design process involved working with vehicle geometry, shell proportions, body packaging, and the relationship between the exterior form and the internal chassis structure.</Body>
        <Body className="mt-4">I gained experience interpreting dimensional sketches, developing and refining shell geometry, working with reference planes and profiles, and understanding how a modeled outer body must accommodate the vehicle structure and physical build process.</Body>
        <div className="mt-8"><Figure img={CAD_LEAD} onZoom={setZoom} wide /></div>
        <div className="mt-6 grid sm:grid-cols-2 gap-6">
          <Figure img={CAD_SEC1} onZoom={setZoom} />
          <Figure img={CAD_SEC2} onZoom={setZoom} />
        </div>
        <p className="mt-8 font-mono text-[10px] tracking-[0.24em] uppercase text-[#9AA8B3]">Shell Development · SolidWorks</p>
        <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[CAD_S1, CAD_S2, CAD_S3, CAD_S4].map((im) => (
            <Figure key={im.src} img={im} onZoom={setZoom} small />
          ))}
        </div>
      </Section>

      <Divider />

      {/* 3 Design to Physical */}
      <Section n="04" label="Design to Prototype" heading="From Digital Geometry to Physical Form">
        <Body>A key part of the club experience was seeing how an aerodynamic surface model becomes a physical object. CAD geometry informed the development of full-scale shell forms, which were prepared and refined for the next stages of fabrication.</Body>
        <Body className="mt-4">I supported the hands-on work required to turn design intent into a buildable vehicle body, including sanding, shaping, preparing components, assisting with assembly, and helping with general fabrication tasks. This process reinforced the importance of designing with manufacturability, access, material behavior, and real workshop constraints in mind.</Body>
        <div className="mt-8"><Figure img={FOAM} onZoom={setZoom} wide /></div>
      </Section>

      <Divider />

      {/* 4 Hands-On Fabrication */}
      <Section n="05" label="Hands-On Fabrication" heading="Hands-On Fabrication and Team Build">
        <Body>Beyond CAD support, I contributed in the workshop alongside other club members. I assisted with building, sanding, welding support, assembly work, and general fabrication tasks as the vehicle progressed through its development stages.</Body>
        <Body className="mt-4">Working directly on the vehicle strengthened my understanding of the gap between a digital model and a finished mechanical system. It also gave me early experience collaborating in a shop environment where design decisions must work in practice, not only on a screen.</Body>
        <div className="mt-8"><Figure img={LAYUP} onZoom={setZoom} wide /></div>
      </Section>

      <Divider />

      {/* 5 Event / Outcome */}
      <Section n="06" label="Outcome Context" heading="Vehicle Development in Context">
        <Body>The vehicle-development effort supported FIU Eco Engineering Club's broader goal of preparing an efficient urban-concept vehicle for Shell Eco-marathon competition activity.</Body>
        <Body className="mt-4">My participation was centered on learning and contributing to the club's design-and-build process as a junior member. The experience helped build the CAD, mechanical-design, prototyping, and fabrication foundation that I continue to apply in later automation and manufacturing engineering work.</Body>
        <div className="mt-8"><Figure img={EVENT} onZoom={setZoom} wide /></div>
      </Section>

      <Divider />

      {/* 6 Broader Context (poster) */}
      <Section n="07" label="Broader Project Context" heading="Broader Project Context">
        <Body>The larger FIU Eco Engineering vehicle effort included formal senior-design work, engineering analysis, material selection, manufacturing planning, physical testing, and aerodynamic evaluation.</Body>
        <Body className="mt-4">I was not a member of the senior-design presentation team. The poster is included here only to provide context for the broader engineering environment and vehicle-development work that I supported through the FIU Eco Engineering Club.</Body>
        <div className="mt-8"><Figure img={POSTER} onZoom={setZoom} wide contain /></div>
      </Section>

      <Divider />

      {/* Skills */}
      <Section n="08" label="Skills Developed" heading="Skills Developed">
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((s) => (
            <span key={s} className="rounded-full border border-[#67D7FF]/20 bg-[#151C22] px-3.5 py-1.5 text-[#c3ccd4] text-xs sm:text-sm">{s}</span>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Behind the scenes */}
      <Section n="09" label="Learning in the Workshop" heading="Behind the Scenes">
        <div className="max-w-2xl"><Figure img={BTS} onZoom={setZoom} /></div>
      </Section>

      <Divider />

      {/* Final reflection */}
      <section className="px-6 sm:px-14 py-16 sm:py-20">
        <Reveal>
          <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>What I Took Forward</span>
          <h2 className="mt-4 font-display font-light text-2xl sm:text-4xl tracking-tight max-w-3xl">What I Took Forward</h2>
          <div className="mt-6 space-y-4">
            <Body>The FIU Eco Engineering Club experience gave me an early foundation in practical mechanical engineering. It showed me how vehicle concepts evolve through CAD iteration, physical prototype development, hands-on fabrication, and team-based problem solving.</Body>
            <Body>That foundation continues to inform the way I approach mechanical design, prototyping, automation tooling, manufacturing systems, and continuous improvement work today.</Body>
          </div>
        </Reveal>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid="eco-lightbox">
            <div className="absolute inset-0 bg-[#050607]/94 backdrop-blur-sm" onClick={() => setZoom(null)} />
            <button onClick={() => setZoom(null)} data-testid="eco-lightbox-close"
              className="absolute top-5 right-5 z-10 h-11 w-11 grid place-items-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors" aria-label="Close image">
              <X size={20} />
            </button>
            <motion.figure initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} transition={{ duration: 0.28 }} className="relative max-w-4xl w-full">
              <img src={zoom.src} alt={zoom.alt} className="w-full max-h-[82vh] object-contain rounded-lg" />
              <figcaption className="mt-3 text-center text-xs text-white/60 font-mono tracking-wide">{zoom.alt}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* primitives */
const Figure = ({ img, onZoom, wide, small, contain }) => (
  <Reveal>
    <figure>
      <button onClick={() => onZoom(img)}
        className={`group relative block w-full overflow-hidden rounded-lg border border-white/10 ${contain ? "bg-[#0b0f13]" : "bg-[#0d1217]"} cursor-zoom-in`}
        aria-label={`Enlarge image: ${img.alt}`}>
        <img src={img.src} alt={img.alt} loading="lazy"
          className={`w-full group-hover:scale-[1.015] transition-transform duration-500 ${contain ? "object-contain max-h-[80vh]" : wide ? "object-cover max-h-[68vh]" : small ? "object-cover aspect-square" : "object-cover aspect-[4/3]"}`} />
        <span className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-[#080A0D]/70 backdrop-blur border border-white/15 text-[#F3F7FA] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <ZoomIn size={16} />
        </span>
      </button>
      {img.cap && <Caption>{img.cap}</Caption>}
    </figure>
  </Reveal>
);

const Caption = ({ children }) => (
  <figcaption className="mt-3 flex items-start gap-2.5 text-[#8794a0] text-xs sm:text-[13px] leading-relaxed max-w-3xl">
    <span className="mt-1.5 h-px w-5 shrink-0" style={{ background: ACCENT }} /><span>{children}</span>
  </figcaption>
);

const Body = ({ children, className = "" }) => (
  <p className={`text-[#9AA8B3] text-base sm:text-lg leading-relaxed max-w-3xl ${className}`}>{children}</p>
);

const Divider = () => <div className="mx-6 sm:mx-14 border-t border-white/8" />;

const Section = ({ n, label, heading, children }) => (
  <section className="px-6 sm:px-14 py-14 sm:py-16">
    <Reveal>
      <span className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>{n} — {label}</span>
      <h2 className="mt-4 mb-6 font-display font-light text-2xl sm:text-3xl tracking-tight leading-tight max-w-3xl">{heading}</h2>
    </Reveal>
    {children}
  </section>
);
