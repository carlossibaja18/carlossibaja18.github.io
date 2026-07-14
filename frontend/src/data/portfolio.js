export const PROFILE = {
  name: "Carlos Sibaja",
  title: "Mechanical Design | Product Development",
  location: "San Diego, CA — Relocating to Miami, FL · Dec 2026",
  email: "Carlossibaja18@gmail.com",
  linkedin: "https://www.linkedin.com/",
  statement:
    "Mechanical & manufacturing engineer building, testing, and improving systems through robotics, automation, and hands-on design. I turn rough problems into reliable, manufacturable hardware.",
  focus: ["Robotics", "Automation", "Prototyping", "CAD", "Testing", "DFM"],
};

export const PROJECTS = [
  {
    id: "cobot-ultrasonic",
    title: "Cobot Ultrasonic Welding Automation",
    summary: "Automated a manual ultrasonic welding station using a collaborative robot.",
    tags: ["Automation", "Cobot", "Process Design"],
    cover:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    result:
      "https://images.unsplash.com/photo-1716191299980-a6e8827ba10b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    goal:
      "The ultrasonic welding of plastic components was fully manual — inconsistent cycle times, operator fatigue, and variable weld quality. The goal was to automate the load, weld, and unload sequence with a collaborative robot without compromising operator safety.",
    role:
      "I owned the mechanical integration and process design: mapping the weld sequence, designing the end-of-arm tooling interface, defining part-presentation fixtures, and dialing in the robot path and force parameters alongside the controls team.",
    steps: [
      "Mapped the manual process and captured baseline cycle time, scrap rate, and weld consistency.",
      "Designed a repeatable part-presentation fixture so the cobot could pick and place with tight tolerance.",
      "Developed the end-of-arm tooling interface and integrated it with the welding head.",
      "Programmed and tuned the cobot path, approach speeds, and force/hold parameters.",
      "Validated weld strength through pull-testing and iterated on clamp geometry.",
    ],
    process: [
      "https://images.unsplash.com/photo-1647427060118-4911c9821b82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1637002722490-5f8ceed9774c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHw0fHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    ],
    outcome:
      "Delivered a repeatable automated weld cell with consistent cycle time and reduced operator load. The biggest lesson: fixture repeatability matters more than robot speed — nailing part presentation solved 80% of the quality variation.",
  },
  {
    id: "gripper-fixture",
    title: "Robot Gripper & Fixture Development",
    summary: "Designed custom grippers and holding fixtures for reliable part handling.",
    tags: ["CAD", "Tooling", "Prototyping"],
    cover:
      "https://images.unsplash.com/photo-1563968743333-044cef800494?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxyb2JvdGljJTIwZ3JpcHBlciUyMG1lY2hhbmljYWwlMjBmaXh0dXJlfGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    result:
      "https://images.unsplash.com/photo-1563968743333-044cef800494?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwyfHxyb2JvdGljJTIwZ3JpcHBlciUyMG1lY2hhbmljYWwlMjBmaXh0dXJlfGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    goal:
      "Off-the-shelf grippers couldn't securely hold irregular parts, causing drops and misalignment during automated handling. I needed to design custom grippers and fixtures that guaranteed part location every cycle.",
    role:
      "I led the CAD design, rapid prototyping, and iteration — modeling the gripper jaws and locating fixtures, 3D printing test versions, and validating grip force and repeatability on the line.",
    steps: [
      "Analyzed part geometry and identified reliable clamping/locating surfaces.",
      "Modeled custom jaw profiles and datum fixtures in CAD.",
      "3D printed prototype jaws for fast fit-and-function checks.",
      "Tested grip retention and adjusted contact geometry and compliance.",
      "Finalized designs for durable machined/printed production tooling.",
    ],
    process: [
      "https://images.unsplash.com/photo-1642969164999-979483e21601?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1581093803931-46e730e7622e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwzfHxyb2JvdGljJTIwZ3JpcHBlciUyMG1lY2hhbmljYWwlMjBmaXh0dXJlfGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    ],
    outcome:
      "Custom tooling eliminated dropped parts and kept locating tolerance tight across cycles. Lesson: prototyping in plastic first let me iterate designs in hours instead of days before committing to machined tooling.",
  },
  {
    id: "faro-fairino-reliability",
    title: "Faro / Fairino Robot Reliability Improvement",
    summary: "Diagnosed and improved reliability of a robot cell to reduce downtime.",
    tags: ["Reliability", "Testing", "Root Cause"],
    cover:
      "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    result:
      "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    goal:
      "A robot cell was experiencing recurring faults and unplanned downtime, hurting throughput. The goal was to find the root causes and implement mechanical and process fixes to raise reliability.",
    role:
      "I ran the failure investigation — logging fault patterns, inspecting mechanical wear and alignment, and implementing corrective design changes and preventive maintenance steps.",
    steps: [
      "Collected and categorized fault logs to find the most frequent failure modes.",
      "Inspected mechanical alignment, cabling, and wear points on the arm and fixtures.",
      "Ran root-cause analysis to separate mechanical, controls, and process causes.",
      "Implemented corrective fixes: alignment, hardened tooling, and maintenance schedule.",
      "Verified improvement by tracking mean time between failures over follow-up runs.",
    ],
    process: [
      "https://images.unsplash.com/photo-1743482710456-0570baa1b240?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwzfHxyb2JvdGljcyUyMGVuZ2luZWVyJTIwdGVzdGluZyUyMGxhYiUyMGRhcmt8ZW58MHx8fHwxNzgzOTk5MDQwfDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjh8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwcm9ib3QlMjBhcm0lMjBhdXRvbWF0aW9ufGVufDB8fHx8MTc4Mzk5OTA0MHww&ixlib=rb-4.1.0&q=85",
    ],
    outcome:
      "Reduced recurring faults and improved uptime through targeted mechanical fixes and preventive maintenance. Lesson: data beats intuition — logging faults revealed the real culprit wasn't what the team initially assumed.",
  },
  {
    id: "cad-3d-printing",
    title: "CAD / 3D Printing / Prototype Work",
    summary: "A selection of CAD models, printed prototypes, and functional parts.",
    tags: ["CAD", "3D Printing", "Design"],
    cover:
      "https://images.unsplash.com/photo-1642969164999-979483e21601?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA&ixlib=rb-4.1.0&q=85",
    result:
      "https://images.unsplash.com/photo-1642969164999-979483e21601?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA&ixlib=rb-4.1.0&q=85",
    goal:
      "Showcase the design-to-part workflow: taking an idea from concept sketch through parametric CAD to a functional 3D-printed prototype ready for testing.",
    role:
      "I model parts in CAD with manufacturability in mind, then print, assemble, and test — refining wall thickness, tolerances, and print orientation for strong, functional results.",
    steps: [
      "Define requirements and constraints for the part or assembly.",
      "Build parametric CAD models designed for the manufacturing method.",
      "Slice and print prototypes, tuning orientation and infill for strength.",
      "Assemble, fit-check, and stress the parts against real use.",
      "Iterate the model based on what the physical part reveals.",
    ],
    process: [
      "https://images.unsplash.com/photo-1611117775350-ac3950990985?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwyfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA&ixlib=rb-4.1.0&q=85",
      "https://images.unsplash.com/photo-1702390600380-5dc2bb300025?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxDQUQlMjAzRCUyMHByaW50aW5nJTIwcHJvdG90eXBlJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzgzOTk5MDQwfDA&ixlib=rb-4.1.0&q=85",
    ],
    outcome:
      "A steady library of functional prototypes that de-risk designs before production. Lesson: designing for the manufacturing method from the first sketch saves the most time downstream.",
  },
];

export const TIMELINE = [
  {
    period: "High School",
    title: "Early Robotics Interest",
    desc: "Discovered a love for building and problem-solving through hands-on robotics and tinkering with mechanical systems.",
  },
  {
    period: "High School",
    title: "VEX Robotics",
    desc: "Competed in VEX Robotics — designing, building, and iterating on competition robots. First real exposure to the design-build-test loop.",
  },
  {
    period: "College",
    title: "Engineering Development",
    desc: "Pursued mechanical engineering, deepening skills in CAD, mechanics, materials, and manufacturing fundamentals.",
  },
  {
    period: "College",
    title: "Certifications & Skills",
    desc: "Earned technical certifications and sharpened CAD, prototyping, and manufacturing capabilities through coursework and projects.",
  },
  {
    period: "Professional",
    title: "Robotics & Automation Work",
    desc: "Worked hands-on with cobots and industrial robots — automation systems, tooling, fixtures, and reliability improvements.",
  },
  {
    period: "Now",
    title: "Transition to Mechanical Design & Product Development",
    desc: "Focusing my manufacturing and robotics experience toward mechanical design and product development roles — building things that are reliable and manufacturable.",
  },
];
