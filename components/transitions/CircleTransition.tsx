"use client";

import { motion, AnimatePresence } from "framer-motion";
import { TRANSITION_DURATION } from "@/lib/constants";

interface CircleTransitionProps {
  isActive: boolean;
  origin: { x: number; y: number };
}

export default function CircleTransition({ isActive, origin }: CircleTransitionProps) {
  const maxRadius =
    typeof window !== "undefined"
      ? Math.hypot(
          Math.max(origin.x, window.innerWidth - origin.x),
          Math.max(origin.y, window.innerHeight - origin.y)
        )
      : 2000;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-50 bg-linear-to-br from-[#EDE7FF] to-[#DCCFFF]"
          initial={{
            clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
          }}
          animate={{
            clipPath: `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`,
          }}
          exit={{
            clipPath: `circle(0px at ${origin.x}px ${origin.y}px)`,
          }}
          transition={{
            duration: TRANSITION_DURATION,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
