"use client";

import { useState, useCallback } from "react";
import type { PanInfo } from "framer-motion";

export function useVinylDrag() {
  const [rotation, setRotation] = useState(0);

  const handleDrag = useCallback((_: unknown, info: PanInfo) => {
    const delta = (info.delta.x + info.delta.y) * 0.5;
    setRotation((prev) => prev + delta);
  }, []);

  return { rotation, handleDrag };
}
