"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import LilyFlower from "./LilyFlower";
import NotesMap from "./NotesMap";
import NoteModal from "./NoteModal";

export default function BouquetView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const confettiFired = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (mounted.current && v > 0.15 && !hasScrolled) {
      setHasScrolled(true);
    }
  });

  useEffect(() => {
    if (hasScrolled && !confettiFired.current) {
      confettiFired.current = true;
      const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 60 };
      confetti({ ...defaults, particleCount: 60, origin: { x: 0.3, y: 0.3 }, colors: ["#D4A843", "#E8C767", "#B08930", "#FDFCF0"] });
      confetti({ ...defaults, particleCount: 60, origin: { x: 0.7, y: 0.3 }, colors: ["#D4A843", "#E8C767", "#B08930", "#FDFCF0"] });
      setTimeout(() => {
        confetti({ ...defaults, particleCount: 40, origin: { x: 0.5, y: 0.2 }, colors: ["#D4A843", "#E8C767", "#ff71ce", "#b967ff"] });
      }, 300);
    }
  }, [hasScrolled]);

  // "Happy Friday" — visible initially, fades out as scroll begins
  const fridayOpacity = useTransform(scrollYProgress, [0, 0.02, 0.08, 1], [1, 1, 0, 0]);

  // "Happy Birthday" — cross-fades in, then slides up to top
  const birthdayOpacity = useTransform(scrollYProgress, [0, 0.05, 0.12, 1], [0, 0, 1, 1]);
  const birthdayTop = useTransform(scrollYProgress, [0.05, 0.3, 1], ["40%", "5%", "5%"]);

  return (
    <div ref={containerRef} className="h-[300vh] bg-purple-200 grain-overlay">
      <div className="sticky top-0 h-screen">

        {/* "Happy Friday" + scroll prompt — visible at start, fades out on scroll */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
          style={{ opacity: fridayOpacity }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-purple-700 select-none mb-4">
            MUMBAI DIARIES
          </h1>
          <p className="font-serif italic text-purple-600/60 text-lg sm:text-xl mb-3 select-none">
            scroll down
          </p>
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-purple-600/40"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>

        {/* "Happy Birthday" — cross-fades in, slides up to top */}
        <motion.h1
          className="absolute left-0 right-0 text-center font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-purple-700 select-none z-30 pointer-events-none"
          style={{ opacity: birthdayOpacity, top: birthdayTop }}
        >
           Mumbai is going to < br/>
           <b>MISS YOUUUU !!!</b>
        </motion.h1>

        {/* Flower + Notes container — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[90vw] h-[60vh] sm:w-[80vw] sm:h-[65vh] max-w-2xl flex items-center justify-center">
            <LilyFlower scrollProgress={scrollYProgress} />
            <NotesMap
              scrollProgress={scrollYProgress}
              onNoteClick={(id) => setSelectedNoteId(id)}
            />
          </div>
        </div>
      </div>

      <NoteModal
        selectedNoteId={selectedNoteId}
        onClose={() => setSelectedNoteId(null)}
        onNavigate={(id) => setSelectedNoteId(id)}
      />
    </div>
  );
}
