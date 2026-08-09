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

## Backlog
- P1: Replace placeholder photos/renders with Carlos's real robotics/CAD/prototype/drone media.
- P1: Add real resume PDF and wire link-file to it.
- P2: Update LinkedIn URL from root to actual profile; add real contact links.

## Next Tasks
- **Shell + visual-system overhaul DONE (iteration_6, 100%):** new near-black + electric-blue system (#080A0D / #67D7FF, no teal/purple/neon), top-center hero identity, central floating Cobot featured card (CSS 3D + tilt, reduced-motion aware), top-right 4-link nav (Home/Projects/Timeline/About Me), asymmetric Projects grid (emphasis config; Cobot first & flagship), chronological Timeline (editable "Year TBD"), About Me (focus areas + credentials trophy-case empty states + contact), fixed bottom-left Resume QR module (Coming Soon; mobile drawer), minimal footer. Cobot light case study PRESERVED exactly.
- **Resume:** set `RESUME_URL` in `components/ResumeModule.jsx` to the hosted PDF to auto-generate the scannable QR + live links.
- **Interactive 3D hero:** infra kept (Hero3D.jsx, model-viewer+three) for when Carlos sends a STEP/STL/OBJ (convert to .glb).
- Await remaining assets: other 3 project photos, resume PDF, real dates for Timeline, FANUC/other certificate images, actual LinkedIn URL.
