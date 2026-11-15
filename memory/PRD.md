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

## Hero True HDR Environment (DELIVERED — 2026-07)
- Replaced the LDR `studio-env.png` (1024x512, clipped at 1.0) with a custom true Radiance RGBE `studio-env.hdr` (2048x1024, peak ~6.0, ~12% HDR-range pixels) generated by `/app/scripts/gen_studio_hdr.py`.
- Same art direction preserved: overhead cool-white softbox key, secondary upper-right fill, cool-blue rim lower-left, warm-orange rim right, dark floor, gentle floor bounce. Avg luminance ~0.39 matches the old map's diffuse mood at the existing exposure 1.18; only speculars/reflections gain punch.
- Hero.jsx environment-image now `/models/studio-env.hdr`; old PNG deleted. Verified: model loads, warm/cool rims + joint-cap speculars visible, zero console errors, HDRJPGLoader notice gone.

## LinkedIn Profile Link (DELIVERED — 2026-07)
- Real profile URL `https://www.linkedin.com/in/carlos-sibaja-enginnering` (verbatim as user provided — note "enginnering" spelling) set once in `PROFILE.linkedin` / `LINKS` in portfolio.js.
- Surfaced in UI (previously the data was unused): About Me contact card gains a LinkedIn row (`about-linkedin`, lucide Linkedin icon, opens new tab) and Footer nav gains a LINKEDIN link (`footer-linkedin`). Both hrefs verified in preview.

## Modal Trackpad/Wheel Scroll Fix (DELIVERED — 2026-07)
- User bug: trackpad two-finger scroll did nothing inside project/credential modals — only scrollbar dragging worked. Root cause: Lenis smooth-scroll intercepts wheel events at root level; with body locked, the modal's own overflow container never received native wheel scrolling.
- Fix: added `data-lenis-prevent` to the scroll containers in ProjectModal.jsx (covers all 4 case studies) and CredentialModal.jsx. Verified with real wheel events: FANUC modal scrollTop 0→1440→0, credential modal 0→1440; no regressions.

## Scoped Edit Batch — Skills + Case-Study Expansions + Corrections (DELIVERED — iteration_17, 100% pass, 2026-07)
- Part 1: Expected Graduation 2027→2028 (timeline note; degree date range also 2021–2028 for consistency). "Hydraulic Cylinder Design" chip removed from timeline meta AND its claim clause removed from that entry's desc (user: "I did not do that work").
- Part 2: New `Skills.jsx` section directly between Hero and Projects in App.js. Title "Skills", 3 cards exact content (Design / Analysis and Manufacturing / Automation and Robotics), bottom line "Also experienced with: CNC, Mastercam". Kickers renumbered: 01 Skills, 02 Projects, 03 Timeline, 04 About Me.
- Part 3: CobotCaseStudy expanded IN PLACE after Contributions: 08 Problem, 09 My Role, 10 Design (4 exact bullets), 11 Results (Metric/Before/After table, 6 grey [TO ADD:] placeholder cells + 3 grey placeholder boxes), 12 Lesson Learned. Original sections/images/order untouched.
- Part 4: FanucCaseStudy expanded IN PLACE after Key Lesson: 07 Problem, 08 My Role, 09 What I Did (3 exact bullets), 10 Results (exact values; only "Shell models supported" Before cell is a [TO ADD: Before] placeholder) + 3 grey placeholder boxes. Original content + credential untouched.
- New shared primitives: `/app/frontend/src/components/CaseStudyShared.jsx` (ResultsTable + PlaceholderBox, light/dark).
- Pending user uploads (placeholders live): Cobot — weld cycle time before/after, weld repeatability before/after, scrap rate before/after, fixture photo, welder holder CAD screenshot, pneumatic/vacuum diagram. FANUC — shell models supported "before" value, cell layout photo, vision setup photo, cycle time data.

## Hero Joint Animation (DELIVERED — iteration_18, 100% pass, 2026-07)
- Replaced the model-viewer turntable hero with real per-joint animation of the SAME FAIRINO FR3-WMS model. Offline rig: `/app/scripts/rig_fr3.py` splits the single Draco mesh into 2539 CAD components, groups them into 7 links by centroid region rules (no geometry cut/modified), exports `/models/fairino-fr3-wms-rigged.glb` with node chain root(bakes Z-up→Y-up)→J1..J6 at measured pivots; identical PBR material preserved. Verify/iterate with `/app/scripts/verify_rig.py`.
- Measured joint map (file frame, Z-up, meters): J1 yaw +Y@(0,0.07,0) puck/turret; J2 shoulder +X@(0.14,0.14,0); J3 elbow +Y@(0.115,0.14,0.30); J4 forearm roll +X@(0.05,0.14,0.295); J5 wrist pitch +Y@(0,0.14,0.36); J6 flange roll +X@(0.16,0.038,0.52). Note: tool wand sits at y≈0.038 (offset toward viewer), not the y=0.14 arm plane.
- New `/app/frontend/src/components/HeroRobot.jsx`: raw three.js (0.185.1) — NeutralToneMapping, exposure 1.18, studio-env.hdr PMREM env, camera fov 30 orbit 20°/76°/158% equivalent, OrbitControls (no zoom/pan, polar 45–100°), key light + contact shadow, drag-vs-click guard (≤6px = click → opens Cobot modal).
- Loop 10.5s, cosine ease: home hold 1s → reach [J1 6, J2 20, J3 30] 2s → weld [+J3 40, +J5 20] 1.5s → hold 1s → lift 2s → return 2s → pause 1s. J1 reduced 30°→6° under user's safe-angle rule (shoulder housing 0.168m off yaw axis would dip below base plane >7°; verified minY never below base bottom −0.064). J4/J6 rigged, held at 0.
- Pause via IntersectionObserver + visibilitychange (anim-time accumulation → resume without snap); prefers-reduced-motion renders one static home frame; verified 0 console errors, mobile clean. Old model-viewer element removed from Hero.jsx; original GLB untouched (fairino-fr3-wms.glb kept, .orig.glb backup kept).

## Hero Joint Animation REPAIR v2 (DELIVERED — iteration_19, 100% pass, 2026-07)
- User rejected the iteration_18 animation on sight: J3 elbow visibly dislocated (dark gap), wrist locked/rigid with clipping, no real five-pose cycle, impossible folded pose aiming the flange at the base.
- Root causes found by mesh forensics: J3 rotated about the WRONG axis (v1 used +Y through (0.115,0.14,0.30)); the real elbow barrel is an X-axis cylinder centered at x=0.11, z≈0.28, and the wrist-1 housing blob (0.005,0.14,0.288) is COAXIAL with that axis. The wand is a separate tool tube at y≈0.038 whose root collar pivots about Y at (0.06,0.038,0.52).
- Re-rigged (`/app/scripts/rig_fr3.py` v2 → `/models/fairino-fr3-wms-rigged.glb`), pivots now at measured housing centers: J1 yaw +Y@(0,0.07,0); J2 shoulder +X@(0.14,0.14,0) (barrel stays with lower column — coaxial spin is seam-free); J3 elbow +X@(0.11,0.14,0.28); J4 column roll +Z@(0,0.14,0.40); J5 wand pitch +Y@(0.06,0.038,0.52) (nose dips inside its root pocket); J6 flange roll +X@(0.16,0.038,0.52). No geometry cut; only the 2539 CAD solids re-grouped; PBR material preserved.
- HeroRobot.jsx loop replaced: 11 s five-pose cycle Home 0.8s → Reach 2.2s [J1 6,J2 15,J3 25] → Weld Dip 1.2s [J2 20,J3 35,J5 20] → hold 0.9s → Lift 1.6s → Return 2.2s → Home dwell 2.1s; J1/J2/J3/J5 always move together, cosine-eased; J4/J6 rigged, held at 0. Joint axes corrected to [y,x,x,z,y,x]. No impossible folds (FK-verified minY never below base plane; wand-arm clearance ≥2 mm in-loop, 6.2 mm at weld).
- Test hooks on `data-testid=hero-centerpiece`: `__scene`, `__setTime(sec)`, `__isRunning()`.
- Verified: 0/25/50/75/100% checkpoint stills show connected elbow and wand-root seams, no dislocation, flange never aims at base; pause offscreen/tab-hidden; reduced-motion static Home; orbit drag works, click opens Cobot modal; hero layout/scale/lighting unchanged; zero console errors.

## Currently Building Section (DELIVERED — iteration_20; card content revised 2026-07, verified 100%)
- `CurrentlyBuilding.jsx` between Projects and Timeline in App.js. Kicker "03 / Currently Building", title "Currently Building", exact subheading "AI in practice. I am using AI to make SolidWorks and DFM faster, not learning AI as a separate skill."
- Exactly 3 cards (same card style as Skills): 1) Parametric CAD Generator (Building) — unchanged original copy 2) AI-Assisted DFM Workflow (Testing) — user-revised exact description/bullets 3) Systematic Trading Bot (Paper Trading Only) — replaced the earlier CAD Automation Macros card (phrase removed everywhere), with exact copy incl. the italic note "Note: Side learning project, not an income plan, never touches Miami move money" under its Next bullet. No link/placeholder boxes in this section; each card ends with plain muted text "Currently working on this". PlaceholderBox remains used by the Cobot/FANUC case studies only.
- Section renumbering: Timeline → "04 / Timeline", About Me → "05 / About Me". Nav labels unchanged per instructions. No changes to hero/Skills/Projects order or styling.

## Timeline — 2027 Plans Entry (DELIVERED — 2026-07, verified 100%)
- New final TIMELINE entry in portfolio.js: date "2027", title "2027 Plans", context "Future Plans", desc "Plans for 2027 after moving to Miami.", meta ["PLANS"], `planned: true` (renders hollow dashed cyan node instead of filled dot), bullets: exact 5 user-provided lines (finishing school at FIU / ocean research in Miami / expanding AI knowledge / expanding CAD skills / living in Miami). No new section; sits at the end of the existing timeline after the 2026 Cobot entry. Timeline.jsx gained a `m.bullets` render branch; the expandable `details` toggle is unchanged and still only on the 2026 Manufacturing Engineer entry.

## Placeholder Removal + Typo + Spacing + Results Merge (DELIVERED — iteration_21, 100% pass, 2026-07)
- Fix 1: All "[TO ADD" placeholders removed site-wide (zero matches). Cobot case study: entire placeholder Results table + 3 photo boxes removed — ends cleanly at Lesson Learned. FANUC case study: "Shell models supported" row + 3 photo boxes removed — Results table keeps 2 real rows (Operators per shell 6→2 robots, Time per shell 40→6 minutes).
- Fix 2: FARINO→FAIRINO / Farino→Fairino corrected everywhere in portfolio.js (zero matches). LinkedIn URL carlos-sibaja-enginnering kept verbatim (user's actual handle).
- Fix 3: Section gaps roughly halved — Projects pb-12 sm:pb-16, CurrentlyBuilding py-12 sm:py-16, Timeline pb-12 sm:pb-16. CaseStudyShared.jsx reduced to ResultsTable only (placeholder components deleted).
- Fix 4: Cobot has one Results heading (editorial 08) and ends with Lesson Learned; FANUC keeps editorial 05 — Results (comparison cards) + single 10 — Results table with real numbers only.

## Backlog
- P1: Add real resume PDF and wire link-file to it.
- P2: (done) LinkedIn URL.
- P2: If the user later supplies real values/photos (weld cycle times, repeatability, scrap rate, fixture photo, holder CAD screenshot, pneumatic/vacuum diagram, cell layout photo, vision setup photo, cycle-time data), re-add those rows/figures to the case studies.

## Next Tasks
- **Timeline redesigned (iteration_7, 100%):** 8 exact chronological milestones (Mission Vista HS → VEX → FIU BSME 2021–2027 → ECO/VEX → San Diego exploration → Watkins Wellness Jan 2026–Present w/ expandable role details → FANUC HandlingTool May 2026 → Cobot 2026). Alternating rail w/ scroll-fill blue line, reduced-motion aware, mobile left-rail stack. Last milestone's "View Cobot Case Study →" opens the PRESERVED cobot modal. No invented facts/images.
- **Resume:** set `RESUME_URL` in `ResumeModule.jsx` to auto-generate the scannable QR + live links.
- **Interactive 3D hero:** Hero3D.jsx infra kept for a future .glb (Carlos to send STEP/STL/OBJ).
- Await remaining assets: other 3 project photos, resume PDF, certificate images (FANUC etc.) for About Me archive, LinkedIn URL.
