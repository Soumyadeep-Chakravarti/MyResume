// src/hooks/useIsMobileMatchMedia.js

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

export const useIsMobileMatchMedia = (breakpoint = MOBILE_BREAKPOINT) => {
  // Media query string for the breakpoint
  const query = `(max-width: ${breakpoint - 1}px)`;

  // Initialize state with media query check
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);

    // Handler function updates state based on the match
    const handler = (e) => setIsMobile(e.matches);

    // Use modern addEventListener/removeEventListener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", handler);
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handler);
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", handler);
      } else {
        mediaQueryList.removeListener(handler);
      }
    };
  }, [query]); // Dependency on query string

  return isMobile;
};
