// Generated premium engineering renders (cohesive visual identity)
const GEN = "https://static.prod-images.emergentagent.com/jobs/f36f7da0-5f6a-4584-8b27-9866c5525cee/images";
export const HERO_CENTERPIECE = `${GEN}/84a32f373a4b16f38c11faf4b0683fbb372f4b09ac5675856c7387428bfd513b.png`;

const IMG = (slug, ix) =>
  `https://images.unsplash.com/photo-${slug}?crop=entropy&cs=srgb&fm=jpg&ixid=${ix}&ixlib=rb-4.1.0&q=85`;

const PRINTER = IMG("1642969164999-979483e21601", "M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA");
const PRINTER2 = IMG("1611117775350-ac3950990985", "M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA");
const PRINTER3 = IMG("1702390600380-5dc2bb300025", "M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA");

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
    id: "fanuc-vision-trim-drill-automation",
    emphasis: "large",
    custom: "fanuc",
    date: "2026",
    title: "FANUC Vision-Guided Dual-Robot Trim & Drill Automation",
    summary:
      "Improved a dual-FANUC vision-guided trim-and-drill process automating hole cutting in spa shells on a conveyor cell — refining lighting and vision conditions, adjusting point-to-point drilling locations, correcting positional offsets, and tuning hole diameters across five shell models.",
    tags: [
      "FANUC Robotics",
      "Machine Vision",
      "Point-to-Point Programming",
      "Automation Programming",
      "Manufacturing Process Improvement",
      "Drilling Automation",
      "Robot Tooling",
      "Production Systems",
    ],
    year: "Automation",
    cover: "/projects/fanuc/IMG_0786.webp",
  },
  {
    id: "fiu-eco-engineering-vehicle",
    emphasis: "medium",
    custom: "eco",
    date: "2022–2023",
    title: "FIU Eco Engineering Club — Vehicle Design & Fabrication",
    summary:
      "As a junior member of FIU's Eco Engineering Club, I supported CAD work for the vehicle and aerodynamic shell in SolidWorks and contributed to hands-on fabrication — sanding, building, welding support, and assembly — for an energy-efficient Shell Eco-marathon urban-concept vehicle.",
    tags: [
      "CAD Support",
      "Aerodynamic Shell Development",
      "Hands-On Fabrication",
      "SolidWorks",
      "Composite Prototyping",
      "Vehicle Packaging",
    ],
    year: "Student Project",
    cover: "/projects/eco/IMG_1988.jpeg",
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

// Chronological engineering journey — exact content, no invented facts/dates
export const TIMELINE = [
  {
    date: "2016–2019",
    title: "Mission Vista High School",
    context: "Engineering Foundations · California",
    desc: "My interest in engineering began through hands-on tinkering — repairing, upgrading, and reassembling technology. At Mission Vista High School I explored creative and engineering activities before discovering that CAD and mechanical design combined the creativity, problem solving, and building that interested me most.",
    meta: ["AutoCAD", "SolidWorks", "Design Exploration"],
  },
  {
    date: "2016–2019",
    title: "Early Robotics and VEX Exposure",
    context: "High School Engineering Activities",
    desc: "Through engineering and VEX-related activities, I gained early exposure to collaborative robotics, assembly, and design support. This experience helped confirm my interest in designing physical systems and pursuing a future in engineering.",
    meta: ["Robotics", "Assembly", "Design Support"],
  },
  {
    date: "2021–2027",
    title: "B.S. Mechanical Engineering",
    context: "Florida International University · Miami, Florida",
    desc: "I began pursuing a B.S. in Mechanical Engineering at Florida International University in 2021. My academic work expanded my experience with CAD, engineering projects, and practical problem solving while strengthening my focus on design and product development.",
    meta: ["Mechanical Design", "CAD", "Engineering Analysis"],
    note: "Expected Graduation: 2027",
  },
  {
    date: "2024–2025",
    title: "ECO Engineering + FIU VEX Robotics",
    context: "Vehicle Design · Robotics Competition · Florida International University",
    desc: "I contributed to an eco-vehicle project through the ECO Engineering club and joined the FIU VEX Robotics club, competing in a robotics competition. During this period I also developed a hydraulic-cylinder CAD project, worked on personal designs, and supported peers in bringing engineering concepts to life.",
    meta: ["Eco Vehicle", "VEX Robotics", "CAD", "Hydraulic Cylinder Design"],
  },
  {
    date: "2025",
    title: "San Diego Engineering Exploration",
    context: "Startup San Diego · R&D Shadowing · Hands-On Mechanical Work",
    desc: "After moving to California, I pursued real-world exposure to startups, engineering development, and mechanical repair. I volunteered with Startup San Diego, shadowed an R&D engineer observing product development for client companies, and gained hands-on experience with golf carts and Cessna aircraft-related mechanical work in a Carlsbad Airport hangar.",
    meta: ["Startup San Diego", "R&D", "Product Development Exposure", "Mechanical Repair"],
  },
  {
    date: "January 2026–Present",
    title: "Manufacturing Engineer",
    context: "Watkins Wellness · Vista, California",
    desc: "At Watkins Wellness I apply mechanical engineering in a manufacturing environment through automation, robotics, CNC processes, fixture development, documentation, and production support. The role connects design decisions to real manufacturing constraints while building hands-on experience with robot programming, mechanical tooling, and process development.",
    meta: ["FANUC", "Farino Cobot", "CNC", "Mastercam", "G-Code", "Fixtures", "Automation"],
    featured: true,
    details: [
      "Supported FANUC trim-and-drill processes.",
      "Programmed FANUC robots and a Farino collaborative robot.",
      "Organized PKZs and supported work-instruction development.",
      "Supported CNC operations and wrote Mastercam programs for precision cutting.",
      "Designed, repaired, and improved fixtures and mechanical support hardware.",
      "Developed tooling and attachments for cobot automation work.",
    ],
  },
  {
    date: "May 2026",
    title: "FANUC HandlingTool Training",
    context: "FANUC Academy · Rochester Hills, Michigan",
    desc: "Completed FANUC HandlingTool training at FANUC Academy to strengthen my understanding of industrial robot handling, programming, setup, and automation-system implementation — expanding the skills I apply to robotics and manufacturing automation.",
    meta: ["Industrial Robotics", "HandlingTool", "Robot Programming"],
  },
  {
    date: "2026",
    title: "Cobot Ultrasonic Welding Automation",
    context: "Watkins Wellness · Mechanical Design + Automation Integration",
    desc: "Developed a cobot-assisted ultrasonic welding concept focused on improving repeatability through fixture design, a custom welder holder, vacuum-assisted handling, pneumatic integration, robot programming, and system testing. This project represents the intersection of my mechanical design, prototype development, and manufacturing automation experience.",
    meta: ["Fixture Development", "End-Effector Tooling", "Vacuum Integration", "Cobot Programming"],
    featured: true,
    cobotLink: true,
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
