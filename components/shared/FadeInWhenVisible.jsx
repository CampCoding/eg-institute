import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const FadeInWhenVisible = ({ children, delay = 0, dir = "up" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  // تحديد الاتجاه
  const directions = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  const initialPos = directions[dir] || directions.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initialPos }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};
