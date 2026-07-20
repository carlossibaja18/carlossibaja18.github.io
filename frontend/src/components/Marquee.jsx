const WORDS = [
  "Robotics",
  "Automation",
  "Fixture Design",
  "Cobot Programming",
  "CAD",
  "Prototyping",
  "Vacuum Systems",
  "Testing",
  "Product Development",
];

export const Marquee = () => {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="relative border-y border-white/5 bg-slate-950 py-6 sm:py-8 overflow-hidden marquee-mask" data-testid="marquee">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display font-light text-2xl sm:text-4xl text-slate-300 px-6 sm:px-10">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          </span>
        ))}
      </div>
    </div>
  );
};
