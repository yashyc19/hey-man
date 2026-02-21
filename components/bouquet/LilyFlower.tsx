"use client";

import { useRef, useEffect } from "react";
import { useTransform, motion, type MotionValue } from "framer-motion";

interface LilyFlowerProps {
  scrollProgress: MotionValue<number>;
}

// Rounded Cosmos/Lavender petal path
const PETAL_PATH = "M 0,0 C 25,-10 45,-40 45,-70 C 45,-95 25,-110 0,-110 C -25,-110 -45,-95 -45,-70 C -45,-40 -25,-10 0,0 Z";

const PETAL_COUNT = 8; // Increased count to match the reference image
const PETAL_FILLS = [
  "url(#lavender-0)",
  "url(#lavender-1)",
  "url(#lavender-2)",
  "url(#lavender-0)",
  "url(#lavender-1)",
  "url(#lavender-2)",
  "url(#lavender-0)",
  "url(#lavender-1)",
];

function clamp(v: number) {
  return Math.max(0, Math.min(1, v));
}

function LavenderPetal({
  baseAngle,
  color,
  scrollProgress,
  index,
}: {
  baseAngle: number;
  color: string;
  scrollProgress: MotionValue<number>;
  index: number;
}) {
  const gRef = useRef<SVGGElement>(null);
  const stagger = index * 0.03;
  const openStart = 0.1 + stagger;
  const openEnd = 0.4 + stagger;
  const spreadTarget = index % 2 === 0 ? -8 : 8;

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (v) => {
      const g = gRef.current;
      if (!g) return;
      const t = clamp((v - openStart) / (openEnd - openStart));
      const scale = 0.2 + t * 0.8;
      const spread = t * spreadTarget;
      const opacityT = clamp((v - openStart) / 0.1);
      const opacity = 0.2 + opacityT * 0.8;
      g.setAttribute("transform", `rotate(${spread}) rotate(${baseAngle}) scale(${scale})`);
      g.setAttribute("opacity", String(opacity));
    });
    return unsubscribe;
  }, [scrollProgress, baseAngle, openStart, openEnd, spreadTarget]);

  return (
    <g ref={gRef} transform={`rotate(0) rotate(${baseAngle}) scale(0.2)`} opacity="0.2">
      <path
        d={PETAL_PATH}
        fill={color}
        stroke="hsl(270, 30%, 40%)" // Darker purple outline
        strokeWidth="0.4"
      />
    </g>
  );
}

export default function LavenderFlower({ scrollProgress }: LilyFlowerProps) {
  const centerOpacity = useTransform(scrollProgress, [0, 0.3, 0.5, 1], [0, 0, 1, 1]);
  const stamenOpacity = useTransform(scrollProgress, [0, 0.4, 0.6, 1], [0, 0, 1, 1]);

  return (
    <svg
      viewBox="-130 -160 260 280"
      className="w-48 h-56 sm:w-56 sm:h-64 md:w-64 md:h-72 shrink-0"
      overflow="visible"
    >
      <defs>
        {/* Lavender Purple Gradients */}
        <linearGradient id="lavender-0" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(275, 60%, 75%)" />
          <stop offset="100%" stopColor="hsl(275, 80%, 30%)" />
        </linearGradient>
        <linearGradient id="lavender-1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(285, 55%, 70%)" />
          <stop offset="100%" stopColor="hsl(285, 75%, 35%)" />
        </linearGradient>
        <linearGradient id="lavender-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(265, 50%, 80%)" />
          <stop offset="100%" stopColor="hsl(265, 70%, 25%)" />
        </linearGradient>
      </defs>

      {/* Stem */}
      <path
        d="M 0,120 C -5,80 5,40 0,0"
        stroke="hsl(120, 20%, 30%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Petals */}
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <LavenderPetal
          key={i}
          baseAngle={(360 / PETAL_COUNT) * i}
          color={PETAL_FILLS[i]}
          scrollProgress={scrollProgress}
          index={i}
        />
      ))}

      {/* Golden/Green Center (Pistil) */}
        <motion.circle
          cx="0"
          cy="0"
          r="12"
          fill="hsl(75, 40%, 45%)" // Muted olive green base
          style={{ opacity: centerOpacity }}
        />
        <motion.circle
          cx="0"
          cy="0"
          r="8"
          fill="hsl(70, 60%, 65%)" // Lighter, yellowish-green top
          style={{ opacity: centerOpacity }}
        />

      {/* Greenish-Yellow Stamens */}
      {[30, 90, 150, 210, 270, 330].map((angle, i) => (
        <motion.g key={i} style={{ opacity: stamenOpacity }}>
          <line
            x1="0"
            y1="0"
            x2={Math.cos((angle * Math.PI) / 180) * 15}
            y2={Math.sin((angle * Math.PI) / 180) * 15}
            stroke="hsl(85, 45%, 45%)" // Sage green stem
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx={Math.cos((angle * Math.PI) / 180) * 16}
            cy={Math.sin((angle * Math.PI) / 180) * 16}
            r="2"
            fill="hsl(65, 80%, 70%)" // Pale lime pollen tip
          />
        </motion.g>
      ))}
    </svg>
  );
}
