"use client";

import { useRef, useCallback } from "react";
import { LONG_PRESS_DURATION } from "@/lib/constants";

export function useLongPress(onLongPress: () => void, duration = LONG_PRESS_DURATION) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const start = useCallback(() => {
    timerRef.current = setTimeout(() => {
      onLongPress();
    }, duration);
  }, [onLongPress, duration]);

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: cancel,
  };
}
