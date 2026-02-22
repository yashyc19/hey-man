"use client";

import { motion, type MotionValue, useTransform } from "framer-motion";
import type { Note } from "@/lib/constants";

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  index: number;
  scrollProgress: MotionValue<number>;
}

export default function NoteCard({ note, onClick, index, scrollProgress }: NoteCardProps) {
  const start = 0.30 + index * 0.03;
  const end = start + 0.10;
  const opacity = useTransform(scrollProgress, [0, start, end, 1], [0, 0, 1, 1]);
  const scale = useTransform(scrollProgress, [0, start, end, 1], [0.4, 0.4, 1, 1]);

  return (
    <motion.div style={{ opacity, scale }}>
      <motion.button
        onClick={onClick}
        className="w-20 h-24 sm:w-24 sm:h-28 md:w-28 md:h-32 rounded-lg shadow-md cursor-pointer
          border border-[hsl(270,31%,69%)] bg-[#e9e5fa] hover:shadow-lg
          flex flex-col items-center justify-between p-2 sm:p-2.5 text-left
          transition-shadow"
        style={{
          rotate: `${(index % 2 === 0 ? 1 : -1) * (2 + (index % 3))}deg`,
        }}
        whileHover={{ scale: 1.08, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
      >
      {/* Tiny photo thumbnail */}
      <div
        className="w-full h-8 sm:h-10 md:h-12 rounded overflow-hidden bg-[hsl(275,36%,79%)] shrink-0"
      >
        <img
          src={note.photo}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Note text */}
      <p className="text-[9px] sm:text-xs md:text-sm leading-snug text-purple-600 font-serif line-clamp-2 mt-1 w-full">
        {note.text}
      </p>

      {/* From name */}
      <span
        className="text-[6px] sm:text-[8px] font-sans font-semibold self-end mt-auto"
        style={{ color: note.color }}
      >
        — {note.from}
      </span>
      </motion.button>
    </motion.div>
  );
}
