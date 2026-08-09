// Generated premium engineering renders (cohesive visual identity)
const GEN = "https://static.prod-images.emergentagent.com/jobs/f36f7da0-5f6a-4584-8b27-9866c5525cee/images";
export const HERO_CENTERPIECE = `${GEN}/84a32f373a4b16f38c11faf4b0683fbb372f4b09ac5675856c7387428bfd513b.png`;

const IMG = (slug, ix) =>
  `https://images.unsplash.com/photo-${slug}?crop=entropy&cs=srgb&fm=jpg&ixid=${ix}&ixlib=rb-4.1.0&q=85`;

const TESTING_LAB = IMG("1743482710456-0570baa1b240", "M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxyb2JvdGljcyUyMGVuZ2luZWVyJTIwdGVzdGluZyUyMGxhYiUyMGRhcmt8ZW58MHx8fHwxNzgzOTk5MDQwfDA");
const GRIPPER_STOCK = IMG("1563968743333-044cef800494", "M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxyb2JvdGljJTIwZ3JpcHBlciUyMG1lY2hhbmljYWwlMjBmaXh0dXJlfGVufDB8fHx8MTc4Mzk5OTA0MHww");
const WHITE_ARM = IMG("1655393001768-d946c97d6fd1", "M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww");
const PRINTER = IMG("1642969164999-979483e21601", "M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA");
const PRINTER2 = IMG("1611117775350-ac3950990985", "M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA");
const PRINTER3 = IMG("1702390600380-5dc2bb300025", "M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA");
const IND_MACHINE = IMG("1581093803931-46e730e7622e", "M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxyb2JvdGljJTIwZ3JpcHBlciUyMG1lY2hhbmljYWwlMjBmaXh0dXJlfGVufDB8fHx8MTc4Mzk5OTA0MHww");

export const PROFILE = {
  name: "Carlos Sibaja",
  subtitle: "Engineering",
  positioning:
    "Mechanical & design-focused engineer working across robotics, automation, and product development.",
  intro:
    "I build, test, and refine real hardware — cobots, tooling, fixtures, and prototypes. My work lives where mechanical design meets the shop floor: turning manual, inconsistent processes into repeatable, manufacturable systems. I'm now focused on mechanical design and product development roles.",
  location: "San Diego, CA · Relocating to Miami, FL — Dec 2026",
  email: "Carlossibaja18@gmail.com",
  linkedin: "https://www.linkedin.com/",
  focus: ["Robotics", "Automation", "Tooling & Fixtures", "CAD", "Prototyping", "Testing"],
};

export const LINKS = [
  { label: "LinkedIn", value: "Connect professionally", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "Email", value: "Carlossibaja18@gmail.com", href: "mailto:Carlossibaja18@gmail.com", icon: "mail" },
  { label: "Resume", value: "Download PDF", href: "#resume", icon: "file", action: "resume" },
  { label: "Drone Work", value: "Aerial photography", href: "#drone", icon: "camera", action: "scroll" },
];

export const PROJECTS = [
  {
    id: "cobot-ultrasonic-welding-automation",
    featured: true,
    emphasis: "featured",
    custom: "cobot",
    date: "2026",
    title: "Cobot Ultrasonic Welding Automation",
    summary:
      "Developed a cobot-assisted ultrasonic welding concept for spa components to reduce variation from manual handling and improve repeatability — combining fixture design, custom welder mounting, vacuum-assisted handling, cobot programming, and iterative physical testing.",
    tags: [
      "Mechanical Design",
      "Fixture Development",
      "End-Effector Tooling",
      "Cobot Programming",
      "Vacuum Integration",
      "Prototype Development",
    ],
    year: "Flagship Project",
    cover: "/projects/cobot/IMG_6125.jpg",
  },
  {
    id: "gripper-fixture",
    emphasis: "medium",
    title: "Robot Gripper & Fixture Development",
    summary: "Custom grippers and holding fixtures for reliable, repeatable part handling.",
    tags: ["CAD", "Tooling", "Prototyping"],
    year: "Tooling",
    cover: GRIPPER_STOCK,
    hero: GRIPPER_STOCK,
    blocks: [
      {
        label: "Overview",
        body:
          "Off-the-shelf grippers couldn't securely hold irregular parts, causing drops and misalignment during automated handling. I designed custom grippers and locating fixtures that guarantee part position every cycle.",
      },
      {
        label: "The Challenge",
        body:
          "The parts had awkward geometry with few reliable clamping surfaces. I needed tooling that located the part precisely and held it without deforming or dropping it mid-cycle.",
      },
      {
        label: "My Role",
        body:
          "I led the CAD design, rapid prototyping, and iteration — modeling jaw profiles and datum fixtures, 3D printing test versions, and validating grip force and repeatability on the line.",
      },
      {
        type: "gallery",
        title: "Design & Prototyping",
        layout: "duo",
        images: [
          { url: PRINTER, caption: "Printed prototype jaws for fast fit-and-function checks." },
          { url: IND_MACHINE, caption: "Fixture integrated into the handling cell." },
        ],
      },
      {
        label: "Outcome & Lesson",
        highlight: true,
        body:
          "Custom tooling eliminated dropped parts and kept locating tolerance tight. Lesson: prototyping in plastic first let me iterate in hours instead of days before committing to machined tooling.",
      },
    ],
  },
  {
    id: "faro-fairino-reliability",
    emphasis: "medium",
    title: "Faro / Fairino Robot Reliability Improvement",
    summary: "Diagnosed recurring faults and improved robot-cell reliability to reduce downtime.",
    tags: ["Reliability", "Testing", "Root Cause"],
    year: "Reliability",
    cover: WHITE_ARM,
    hero: WHITE_ARM,
    blocks: [
      {
        label: "Overview",
        body:
          "A robot cell was experiencing recurring faults and unplanned downtime, hurting throughput. I ran the investigation to find root causes and implement mechanical and process fixes.",
      },
      {
        label: "The Challenge",
        body:
          "Faults were intermittent and spread across mechanical, controls, and process causes. Separating the real culprit from the noise required data, not assumptions.",
      },
      {
        label: "My Role",
        body:
          "I logged and categorized fault patterns, inspected alignment and wear points, ran root-cause analysis, and implemented corrective fixes plus a preventive maintenance schedule.",
      },
      {
        type: "gallery",
        title: "Investigation",
        layout: "duo",
        images: [
          { url: TESTING_LAB, caption: "Inspecting mechanical wear and alignment." },
          { url: WHITE_ARM, caption: "Verifying improvement across follow-up runs." },
        ],
      },
      {
        label: "Outcome & Lesson",
        highlight: true,
        body:
          "Reduced recurring faults and improved uptime through targeted fixes and preventive maintenance. Lesson: data beats intuition — the logs revealed the real culprit wasn't what the team first assumed.",
      },
    ],
  },
  {
    id: "cad-3d-printing",
    emphasis: "medium",
    title: "CAD / 3D Printing / Prototype Work",
    summary: "A selection of CAD models, printed prototypes, and functional parts.",
    tags: ["CAD", "3D Printing", "Design"],
    year: "Design",
    cover: PRINTER,
    hero: PRINTER,
    blocks: [
      {
        label: "Overview",
        body:
          "The design-to-part workflow: from concept and parametric CAD to functional 3D-printed prototypes ready for testing — always modeling with manufacturability in mind.",
      },
      {
        label: "My Role",
        body:
          "I model parts in CAD, then print, assemble, and test — refining wall thickness, tolerances, and print orientation for strong, functional results.",
      },
      {
        type: "gallery",
        title: "Prototypes",
        layout: "grid",
        images: [
          { url: PRINTER2, caption: "Tuning print orientation and infill for strength." },
          { url: PRINTER3, caption: "Functional prototype ready for fit-checks." },
        ],
      },
      {
        label: "Outcome & Lesson",
        highlight: true,
        body:
          "A steady library of functional prototypes that de-risk designs before production. Lesson: designing for the manufacturing method from the first sketch saves the most time downstream.",
      },
    ],
  },
];

// Chronological education & career journey (editable — use "Year TBD" where unknown)
export const TIMELINE = [
  {
    period: "Year TBD",
    title: "Mechanical Engineering Studies",
    org: "Florida International University",
    desc: "Pursuing a mechanical engineering degree — building fundamentals in design, mechanics, materials, and manufacturing.",
  },
  {
    period: "Year TBD",
    title: "Manufacturing Engineering / Automation",
    org: "Watkins Wellness",
    desc: "Hands-on manufacturing and automation work — tooling, fixtures, and process development on the production floor.",
  },
  {
    period: "Year TBD",
    title: "Robotics & Cobot Development",
    org: "Automation Projects",
    desc: "Developed cobot-assisted systems including end-effectors, fixtures, and vacuum integration for real production processes.",
  },
  {
    period: "Year TBD",
    title: "FANUC Training / Certification",
    org: "FANUC",
    desc: "Industrial robotics training and certification milestone supporting automation and cobot integration work.",
  },
  {
    period: "Year TBD",
    title: "Mechanical Engineering Degree Completion",
    org: "Florida International University",
    desc: "Completing the degree and transitioning toward mechanical design and product development roles.",
  },
];

export const DRONE_PHOTOS = [
  { url: IMG("1476231682828-37e571bc172f", "M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBkcm9uZSUyMGxhbmRzY2FwZSUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTc4NDUwMzU2NXww"), caption: "Forest bend" },
  { url: IMG("1757980175008-d1fbc609b152", "M3w4NjA1NTZ8MHwxfHNlYXJjaHw0fHxkcm9uZSUyMGFlcmlhbCUyMGNvYXN0bGluZSUyMG1vdW50YWlucyUyMGNpdHl8ZW58MHx8fHwxNzg0NTAzNTkzfDA"), caption: "Coastal bridge" },
  { url: IMG("1619719826894-89d6c4fd5739", "M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxhZXJpYWwlMjBkcm9uZSUyMGxhbmRzY2FwZSUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTc4NDUwMzU2NXww"), caption: "Open field" },
  { url: IMG("1769442872335-0388ab39bcb9", "M3w4NjA1NTZ8MHwxfHNlYXJjaHwzfHxkcm9uZSUyMGFlcmlhbCUyMGNvYXN0bGluZSUyMG1vdW50YWlucyUyMGNpdHl8ZW58MHx8fHwxNzg0NTAzNTkzfDA"), caption: "Island at dusk" },
  { url: IMG("1508233620467-f79f1e317a05", "M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxhZXJpYWwlMjBkcm9uZSUyMGxhbmRzY2FwZSUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTc4NDUwMzU2NXww"), caption: "Winding road" },
  { url: IMG("1763378172654-be8301c0f912", "M3w4NjA1NTZ8MHwxfHNlYXJjaHwyfHxkcm9uZSUyMGFlcmlhbCUyMGNvYXN0bGluZSUyMG1vdW50YWlucyUyMGNpdHl8ZW58MHx8fHwxNzg0NTAzNTkzfDA"), caption: "City lights" },
  { url: IMG("1534196355937-f3d8b0cae922", "M3w4NjAzMjV8MHwxfHNlYXJjaHwzfHxhZXJpYWwlMjBkcm9uZSUyMGxhbmRzY2FwZSUyMHBob3RvZ3JhcGh5fGVufDB8fHx8MTc4NDUwMzU2NXww"), caption: "Water's edge" },
  { url: IMG("1576867718286-fb8160ea9ea9", "M3w4NjA1NTZ8MHwxfHNlYXJjaHwxfHxkcm9uZSUyMGFlcmlhbCUyMGNvYXN0bGluZSUyMG1vdW50YWlucyUyMGNpdHl8ZW58MHx8fHwxNzg0NTAzNTkzfDA"), caption: "City grid" },
];
