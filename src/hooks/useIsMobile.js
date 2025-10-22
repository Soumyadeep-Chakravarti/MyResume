// src/hooks/useIsMobile.js

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768; // Tailwind's 'md' breakpoint

export const useIsMobile = () => {
  // 1. Initialize state with a check (important for server-side rendering/initial render)
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false,
  );

  useEffect(() => {
    // 2. Define the handler function
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // 3. Set up the event listener
    window.addEventListener("resize", handleResize);

    // 4. Initial check (in case state was initialized differently)
    handleResize();

    // 5. Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
