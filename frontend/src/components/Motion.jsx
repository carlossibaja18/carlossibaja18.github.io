import { motion } from "framer-motion";

const lineVariants = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { duration: 0.9, delay: 0.05 + i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

// Line-by-line masked reveal. trigger: "load" | "view"
export const MaskText = ({ lines, className = "", lineClassName = "", trigger = "view", as = "div" }) => {
  const Tag = motion[as] || motion.div;
  const animateProps =
    trigger === "load"
      ? { initial: "hidden", animate: "show" }
      : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.5 } };

  return (
    <Tag className={className} {...animateProps}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span custom={i} variants={lineVariants} className={`block ${lineClassName}`}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

// Simple fade/slide reveal on scroll
export const Reveal = ({ children, className = "", delay = 0, y = 28 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// Section eyebrow with animated rule
export const Eyebrow = ({ children, center = false }) => (
  <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "left" }}
      className="h-px w-10 bg-teal-400"
    />
    <span className="font-mono text-xs tracking-[0.28em] uppercase text-teal-400">{children}</span>
    {center && (
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "right" }}
        className="h-px w-10 bg-teal-400"
      />
    )}
  </div>
);
