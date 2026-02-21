"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BouquetView from "@/components/bouquet/BouquetView";
import CircleTransition from "@/components/transitions/CircleTransition";
// import MyLadyView from "@/components/private/MyLadyView";

export default function Home() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });
  const [showPasswordGate, setShowPasswordGate] = useState(false);
  const brickOriginRef = useRef({ x: 0, y: 0 });

  const handleActivatePrivate = useCallback((origin: { x: number; y: number }) => {
    setTransitionOrigin(origin);
    setIsTransitioning(true);

    setTimeout(() => {
      // setIsPrivateMode(true);
      window.scrollTo(0, 0);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 200);
    }, 800);
  }, []);

  const handleRequestPassword = useCallback(() => {
    // Capture approximate center of the lego brick (bottom-right corner)
    brickOriginRef.current = {
      x: window.innerWidth - 20,
      y: window.innerHeight - 20,
    };
    setShowPasswordGate(true);
  }, []);

  const handlePasswordSuccess = useCallback(() => {
    setShowPasswordGate(false);
    handleActivatePrivate(brickOriginRef.current);
  }, [handleActivatePrivate]);

  return (
    <main className="min-h-screen">
        <BouquetView
          // onActivatePrivate={handleActivatePrivate}
          // onRequestPassword={handleRequestPassword}
        />


      <CircleTransition isActive={isTransitioning} origin={transitionOrigin} />

      <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* <MyLadyView /> */}
          </motion.div>
      </AnimatePresence>
    </main>
  );
}
