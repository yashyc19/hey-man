"use client";

import { type MotionValue } from "framer-motion";
import NoteCard from "./NoteCard";
import { NOTES } from "@/lib/constants";

interface NotesMapProps {
  scrollProgress: MotionValue<number>;
  onNoteClick: (noteId: number) => void;
}

export default function NotesMap({ scrollProgress, onNoteClick }: NotesMapProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
    >
      {NOTES.map((note, index) => {
        const angleDeg = (360 / NOTES.length) * index;
        const angleRad = (angleDeg * Math.PI) / 180;
        // Alternate distance for visual variety, keep within safe bounds
        const dist = index % 2 === 0 ? 0.34 : 0.38;
        const rawX = Math.cos(angleRad) * dist * 100;
        const rawY = Math.sin(angleRad) * dist * 100;
        // Clamp so cards don't overflow the container
        const x = Math.max(-42, Math.min(42, rawX));
        const y = Math.max(-42, Math.min(42, rawY));

        return (
          <div
            key={note.id}
            className="absolute pointer-events-auto"
            style={{
              left: `calc(50% + ${x}%)`,
              top: `calc(50% + ${y}%)`,
              transform: "translate(-50%, -50%)",
              zIndex: (() => {
                const N = NOTES.length;
                const peak = 1;
                const dist = Math.min(
                  (index - peak + N) % N,
                  (peak - index + N) % N,
                );
                return N - dist;
              })(),
            }}
          >
            <NoteCard
              note={note}
              onClick={() => onNoteClick(note.id)}
              index={index}
              scrollProgress={scrollProgress}
            />
          </div>
        );
      })}
    </div>
  );
}
