import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      data-testid="scroll-progress-bar"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-taxi origin-left z-[60]"
    />
  );
}
