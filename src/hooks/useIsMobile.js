// src/hooks/useIsMobile.js

import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768; // Tailwind's 'md' breakpoint
const DEBOUNCE_DELAY_MS = 150; // Standard delay for resize events

// --- Debounce Utility Function ---
const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
// ---------------------------------

export const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  // Use a function for initial state to ensure window check only happens once
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false; // Safely return false during SSR
    }
    return window.innerWidth < breakpoint;
  });

  // useCallback ensures the debounced function reference is stable
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return; // Skip setup during SSR
    }

    // Create the debounced handler once
    const debouncedHandleResize = debounce(handleResize, DEBOUNCE_DELAY_MS);

    // Initial check (in case state was initialized differently or during client hydration)
    debouncedHandleResize();

    // Set up the event listener
    window.addEventListener("resize", debouncedHandleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
      // Clean up any pending timer
      clearTimeout(debouncedHandleResize.timer);
    };
  }, [handleResize]); // Dependency on stable handleResize

  return isMobile;
};
