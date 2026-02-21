"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NOTES } from "@/lib/constants";

interface NoteModalProps {
  selectedNoteId: number | null;
  onClose: () => void;
  onNavigate: (noteId: number) => void;
}

export default function NoteModal({ selectedNoteId, onClose, onNavigate }: NoteModalProps) {
  const note = NOTES.find((n) => n.id === selectedNoteId) ?? null;
  const currentIndex = NOTES.findIndex((n) => n.id === selectedNoteId);

  const goNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % NOTES.length;
    onNavigate(NOTES[nextIndex].id);
  }, [currentIndex, onNavigate]);

  const goPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + NOTES.length) % NOTES.length;
    onNavigate(NOTES[prevIndex].id);
  }, [currentIndex, onNavigate]);

  useEffect(() => {
    if (!selectedNoteId) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedNoteId, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {note && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            key={note.id}
            className="relative z-10 w-full max-w-lg bg-[#f5e9fa] rounded-2xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Photo */}
            <div className="w-full aspect-4/3 bg-[hsl(282,30%,85%)] overflow-hidden">
              <img
                src={note.photo}
                alt={`Photo from ${note.from}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>

            {/* Text content */}
            <div className="p-6 sm:p-8">
              <p className="font-serif italic text-purple-600 text-base sm:text-lg leading-relaxed">
                &ldquo;{note.fullText}&rdquo;
              </p>
              <p className="mt-4 font-serif font-bold text-sm" style={{ color: note.color }}>
                — {note.from}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40
                text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            {/* Navigation arrows */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                bg-black/20 hover:bg-black/40 text-white flex items-center justify-center
                transition-colors cursor-pointer"
              aria-label="Previous note"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                bg-black/20 hover:bg-black/40 text-white flex items-center justify-center
                transition-colors cursor-pointer"
              aria-label="Next note"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Page indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {NOTES.map((n) => (
                <div
                  key={n.id}
                  className="w-1.5 h-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor: n.id === note.id ? "var(--color-gold)" : "hsl(42, 30%, 80%)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
