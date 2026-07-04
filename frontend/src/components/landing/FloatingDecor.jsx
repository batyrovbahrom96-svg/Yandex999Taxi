import { motion } from "framer-motion";

export const FloatingDecor = ({ src, className = "", delay = 0, testId }) => (
  <motion.div
    aria-hidden="true"
    data-testid={testId}
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.9, delay, ease: "easeOut" }}
    className={`pointer-events-none select-none ${className}`}
    style={{ perspective: 900 }}
  >
    {/* action backdrop: pulsing brand glow */}
    <motion.div
      className="absolute -inset-[28%] rounded-full bg-taxi/15 blur-3xl"
      animate={{ scale: [1, 1.3, 1], opacity: [0.45, 0.85, 0.45] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
    />
    {/* rotating orbit ring */}
    <motion.div
      className="absolute -inset-[10%] rounded-full border border-dashed border-taxi/30"
      animate={{ rotate: 360 }}
      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
    />
    {/* drifting particles */}
    <motion.span
      className="absolute -left-3 top-[18%] w-2 h-2 rounded-full bg-taxi"
      animate={{ y: [-8, 10, -8], x: [0, 5, 0], opacity: [0.35, 0.95, 0.35] }}
      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: delay + 0.4 }}
    />
    <motion.span
      className="absolute -right-2 bottom-[22%] w-1.5 h-1.5 rounded-full bg-white/70"
      animate={{ y: [8, -10, 8], opacity: [0.25, 0.8, 0.25] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }}
    />
    <motion.span
      className="absolute right-[12%] -top-3 w-1.5 h-1.5 bg-taxi/80"
      animate={{ y: [-6, 6, -6], rotate: [0, 180, 360], opacity: [0.3, 0.9, 0.3] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: delay + 0.7 }}
    />
    {/* 3D tumbling object */}
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      className="relative w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)]"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ y: [-10, 12, -10], rotateY: [-16, 16, -16], rotateZ: [-4, 4, -4] }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay }}
    />
  </motion.div>
);
