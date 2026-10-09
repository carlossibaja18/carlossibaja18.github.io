# PRD — Carlos Sibaja Portfolio

## Original Problem Statement
Modern, high-tech, dark-mode personal portfolio for Carlos Sibaja, a mechanical/manufacturing
engineer transitioning into mechanical design & product development. Sleek, minimal, recruiter-friendly,
interactive. 4 sections: Home, Projects, Journey, Resume/Contact. Floating project cards that open
centered scrollable case-study modals. Visual growth timeline. Minimal resume/contact block.

## User Choices
- Rich smooth animations (framer-motion)
- Electric cyan/teal accent (#00E5FF) on dark (slate-950)
- Placeholder resume download (no real PDF yet)
- No contact form — display email (Carlossibaja18@gmail.com) + LinkedIn only

## Architecture / Stack
- Frontend-only React SPA (no custom backend). Tailwind + framer-motion + lucide-react + sonner.
- Fonts: Outfit (display) + IBM Plex Mono (body).
- Files: src/App.js, components/{Navbar,Hero,Projects,ProjectModal,Journey,Contact}.jsx, data/portfolio.js

## User Personas
- Recruiters / hiring managers scanning quickly for credibility.
- Engineering leads reviewing project depth via case studies.

## Core Requirements (static)
- Hero with name/title/statement/focus tags/CTAs
- Sticky glass navbar w/ active-section tracking + mobile menu
- 4 floating project cards -> scrollable case-study modal (goal, role, steps, process images, outcome)
- Vertical journey timeline (6 milestones)
- Resume placeholder download + email + LinkedIn + location

## Implemented (2026-06)
- v1: All sections built and verified (frontend 100%).
- Refinement: mature/cleaner restyle (IBM Plex Sans body, muted teal, less flash).
- v2 REDESIGN (verified 100%, iteration_2):
  - 5-section nav: Home, Projects, History/About, Contact/Linktree, Drone.
  - Hero: name + "Engineering" subtitle + positioning/intro + floating engineered-object centerpiece (custom-generated cobot end-effector render) with parallax + float, featured-project chip.
  - Projects: premium tiles, flagship "Cobot Ultrasonic Welding Automation" spans full width.
  - Editorial case-study modal: flexible text/gallery blocks with captions, highlighted lesson.
  - Flagship cobot case study fully rewritten (Venturi vacuum system, welder holder/gripper, wood->fiberglass fixture, ownership list).
  - Linktree contact + masonry Drone gallery with lightbox.
  - Custom generated renders (hero centerpiece, cobot cell, gripper, vacuum system) for cohesive identity.

## Interactive 3D Robot Hero (DELIVERED — iteration_8, 100% pass, 2026-07)
- Homepage central featured card replaced with an interactive 3D FAIRINO FR3-WMS cobot via `@google/model-viewer` (peer dep `three@0.185.1`).
- Model hosted at `/app/frontend/public/models/fairino-fr3-wms.glb` (self-contained GLB, 200 model/gltf-binary).
- Fix: GLB was a Z-up CAD export (arm long-axis on Z=0.56m, Y only 0.196m) so it rendered lying down. Corrected at runtime with `orientation="0deg -90deg 0deg"` (rotate -90° about X) → robot now stands upright, base grounded at bottom, centered, fully visible. GLB source NOT modified.
- model-viewer config: camera-controls, auto-rotate (disabled under prefers-reduced-motion), disable-zoom, camera-orbit="25deg 74deg 112%", fov 32deg, neutral env, soft shadow, exposure 1.05.
- Clicking the robot (`data-testid=hero-featured-card`) OR the chip (`data-testid=hero-featured-chip`) opens the existing PRESERVED Cobot case-study modal. Drag orbits without firing the click.
- Model has no materials → renders natural white (gray/orange not present in source GLB).
- All other sections unchanged (Projects, Timeline, About Me, Resume QR, Cobot case study).

## 3D Robot Refinement (DELIVERED — iteration_10, 100% acceptance, 2026-07)
- Material realism: injected a single light-gray PBR material into the GLB (baseColor ~0.82 gray, metallicFactor 0.34, roughness 0.44) — original preserved as `fairino-fr3-wms.orig.glb`. Only a materials entry + primitive.material index were added; geometry/BIN untouched.
- Custom lighting env `/app/frontend/public/models/studio-env.png` generated via `/app/scripts/gen_env.py` (equirectangular: bright cool-white key, cool fill, a blue rim lobe on the left, a warm-orange rim lobe on the right). Gives subtle orange + blue rim accents on the gray body. (LDR PNG → model-viewer logs a benign HDRJPGLoader SDR notice; a real .hdr would remove it.)
- Sizing/pivot: `camera-orbit="20deg 76deg 158%"` (zoomed out → fully visible w/ breathing room), `bounds="tight"`, `camera-target="auto"` so auto-rotate + mouse-drag rotate around the model's own center. exposure 1.18, tone-mapping neutral, rotation-per-second 10deg.
- Verified pixel balance (mv.toDataURL sampling): warm ~17% / cool ~9% / neutral ~74%. Click/drag/chip/modal/regressions all pass.

## FANUC Vision-Guided Dual-Robot Trim & Drill Automation (DELIVERED — iteration_11, 100% pass, 2026-07)
- New 2nd project (medium-large, emphasis:'large') in PROJECTS; Cobot remains primary featured. id 'fanuc-vision-trim-drill-automation', custom:'fanuc'.
- New DARK case study `/app/frontend/src/components/FanucCaseStudy.jsx` reusing the existing floating centered ProjectModal system (branch added in ProjectModal.jsx on custom==='fanuc' -> dark #080A0D container). Sticky project label, scrollable, accessible lightbox (data-testid fanuc-lightbox), close btn + Escape.
- Story order (all 13 uploaded images used exactly once, hosted at /app/frontend/public/projects/fanuc/): HERO IMG_0786 → Manual (IMG_0968, IMG_0975) → Cell (IMG_0796, IMG_0501, IMG_4173, IMG_5146) → Tooling/Control (IMG_0790, IMG_0509, IMG_0810) → Vision (IMG_1116, vision-example.jpg[=749767389...], IMG_1096) → Outcome comparison (6 operators/~40 min → 2 FANUC robots/~6 min) → Contribution 2-col → Key Lesson callout.
- Accuracy guardrails honored: two FANUC industrial robots drilling simultaneously, five shell models, ~40 min → ~6 min, periodic FANUC-engineer guidance + Carlos's day-to-day on-site ownership; no invented metrics/model numbers.
- Proprietary text protection: IMG_0810 (teach-pendant program text incl. email/names) and IMG_1096 (ROBOGUIDE point-name labels) regions blurred via PIL before hosting; source webp/jpg kept in /app/assets/fanuc-trim-drill/{batch1,batch2,batch3}. Original filenames preserved in FanucCaseStudy.jsx code comments.

## Projects Cleanup (2026-07)
- Removed two projects completely per user request: "Robot Gripper & Fixture Development" (gripper-fixture) and "Faro / Fairino Robot Reliability Improvement" (faro-fairino-reliability), plus their unused stock-image constants. Projects grid now: Cobot (flagship) → FANUC Trim & Drill → CAD / 3D Printing.

## FANUC Academy Credential (DELIVERED — iteration_12, 100% pass; placeholders removed 2026-07)
- Added one clickable credential to About Me "Credentials & Engineering Archive": card `credential-fanuc-academy-card` opens a new DARK floating `CredentialModal` (App-level state, alongside ProjectModal). The 3 empty placeholder cards (and their state/imports/legacy lightbox) were later removed per user request — only the FANUC Academy card remains.
- Credential: "FANUC HandlingTool Operation & Programming", FANUC Academy, Rochester Hills MI, 29-MAY-2026, 4-Day, Course ID J2P0310, instructor Keith Johnson (all real, from uploaded Certificate.pdf).
- Certificate.pdf converted (pymupdf) → certificate.webp (inline, readable) + certificate.png (full-res lightbox), hosted at /app/frontend/public/credentials/fanuc-academy/ with 4 training photos (photo-568, IMG_5421, od_photo-630, photo-614). All 5 mapped assets used once; extra photo-535 was discarded.
- Modal: title/metadata/opening copy → Certificate of Completion → Training at FANUC Academy → Hands-On Robot Programming → Workstation+Classroom → Training Focus (6 bullets) → Applying the Training. "Explore FANUC Automation Project →" (credential-project-link) closes the credential modal and opens the existing FANUC project modal. Lightbox, Escape, close, scroll-lock, mobile all verified.

## FIU Eco Engineering Club — Vehicle Design & Fabrication (DELIVERED — iteration_13, 100% pass, 2026-07)
- New MEDIUM project card (id 'fiu-eco-engineering-vehicle', custom:'eco') added to Projects: order now Cobot(featured) → FANUC(large) → Eco(medium) → CAD/3D Printing. Opens a new DARK floating `EcoCaseStudy.jsx` via ProjectModal branch.
- Role framed accurately: Carlos = JUNIOR FIU Eco club member doing CAD support (SolidWorks) + hands-on fabrication (sanding/building/welding support/assembly); explicitly NOT senior-design lead/owner/presenter. No invented metrics; simulation image labeled broader team context.
- 14 uploaded ECO images hosted at /app/frontend/public/projects/eco/, each used exactly once: hero IMG_1988; ctx IMG_1980; CAD lead IMG_1984 + sections IMG_1982/IMG_1981 + 4-shot SolidWorks grid IMG_7445/7446/7447(.webp)+IMG_1983; foam buck IMG_1985; layup IMG_1987; event-track.webp (neutral caption, non-FIU car); poster IMG_5171 (exact disclosure caption, once); behind-the-scenes IMG_6070. Lightbox on every image; Escape/close/scroll-lock/mobile verified.

## FIU VEX Robotics — CAD Drivetrain & Mounting Design (DELIVERED — iteration_14, 100% pass, 2026-07)
- New SMALLER supporting project (id 'fiu-vex-robotics-cad', custom:'vex', emphasis:'medium') in Projects. Opens a CONCISE dark `VexCaseStudy.jsx` via ProjectModal branch (dark variants now: fanuc/eco/vex).
- Role framed as EARLY CAD-focused robotics supporting a collaborative student team (sophomore year FIU) — not team lead / full-robot designer / full programmer. Also supported teammates with smaller coding + fixture tasks.
- 5 images at /app/frontend/public/projects/vex/, each used once in locked order: hero IMG_1975.webp → My Contribution IMG_1979+IMG_1977 → Design Focus IMG_1976 → What I Learned IMG_1978 (contain). Sections: Overview, My Contribution, Design Focus, What I Learned. Lightbox/Escape/close/mobile verified. (Card shows 3 of 4 tags — shared ProjectCard cap, intended.)

## Removed CAD/3D Printing stock project (2026-07)
- Deleted the generic "CAD / 3D Printing / Prototype Work" card (id 'cad-3d-printing') and its unused stock-image constants (PRINTER/PRINTER2/PRINTER3) per user request — it used stock imagery, not Carlos's real work. Projects now: Cobot (featured) → FANUC → FIU Eco → FIU VEX. Verified iteration_15 (100%).

## Projects Grid Rebalance (DELIVERED — iteration_16, 100% pass, 2026-07)
- After the project count dropped 5→4, rebalanced the 6-col Projects grid per user choice ("tiered editorial"): Cobot stays full-width flagship (unchanged, Flagship badge); FANUC upgraded to a second full-width horizontal card (image left w/ taller h-64/sm:h-[380px] treatment, text right, NO badge, emphasis 'large' now md:col-span-6); FIU Eco + FIU VEX are equal half-width cards (md:col-span-3, image h-52→h-60).
- User note honored: Cobot already has the floating 3D hero, so FANUC now carries comparable visual weight — Cobot is not the sole standout.
- Only Projects.jsx changed (SPAN map + new 'large' horizontal branch). No data/modal/case-study files touched. Verified at 1366/768/390: no gaps, modals all open/close, hero/Timeline/credential/resume regressions clean, zero console errors.

## Backlog
- P1: Add real resume PDF and wire link-file to it.
- P2: Update LinkedIn URL from root to actual profile; add real contact links.
- P2: (optional) swap studio-env.png for a real .hdr equirect for truer IBL and to silence HDRJPGLoader notice.

## Next Tasks
- **Timeline redesigned (iteration_7, 100%):** 8 exact chronological milestones (Mission Vista HS → VEX → FIU BSME 2021–2027 → ECO/VEX → San Diego exploration → Watkins Wellness Jan 2026–Present w/ expandable role details → FANUC HandlingTool May 2026 → Cobot 2026). Alternating rail w/ scroll-fill blue line, reduced-motion aware, mobile left-rail stack. Last milestone's "View Cobot Case Study →" opens the PRESERVED cobot modal. No invented facts/images.
- **Resume:** set `RESUME_URL` in `ResumeModule.jsx` to auto-generate the scannable QR + live links.
- **Interactive 3D hero:** Hero3D.jsx infra kept for a future .glb (Carlos to send STEP/STL/OBJ).
- Await remaining assets: other 3 project photos, resume PDF, certificate images (FANUC etc.) for About Me archive, LinkedIn URL.
