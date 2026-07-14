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
- All sections built and verified by testing agent (frontend 100%, no bugs).

## Backlog
- P1: Replace placeholder Unsplash images with Carlos's real robotics/CAD/prototype photos.
- P1: Add real resume PDF to /public and wire the download button to it.
- P2: Update LinkedIn URL from root to Carlos's actual profile.
- P2: Optional SEO/meta tags + Open Graph for link sharing.

## Next Tasks
- Await Carlos's real assets (photos, resume PDF, LinkedIn URL) to swap placeholders.
