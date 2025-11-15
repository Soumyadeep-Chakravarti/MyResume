import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useLenis } from "./LenisContext.jsx";

const CinematicContext = createContext();

export function useCinematic() {
  return useContext(CinematicContext);
}

// State machine type: "simplified" | "transitioning-to-cinematic" | "cinematic" | "transitioning-to-simplified"
export function CinematicProvider({ children }) {
  const [mode, setMode] = useState("simplified");
  const [transitioning, setTransitioning] = useState(false);
  const transitionTimeoutRef = useRef(null);
  const lenis = useLenis();

  // Lock/unlock scroll during transitions
  useEffect(() => {
    if (transitioning) {
      // Lock scroll - stop Lenis if available
      if (lenis) {
        lenis.stop();
      }
      // Also disable body scroll as backup
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock scroll - start Lenis if available
      if (lenis) {
        lenis.start();
        // Trigger resize to recalculate scroll limits after content changes
        // Use a small delay to ensure DOM has updated
        setTimeout(() => {
          if (lenis) {
            lenis.resize();
          }
        }, 100);
      }
      // Re-enable body scroll
      document.body.style.overflow = '';
    }

    return () => {
      // Cleanup: ensure scroll is enabled
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = '';
    };
  }, [transitioning, lenis]);

  // Ensure scroll is enabled on mount and when mode changes (if not transitioning)
  useEffect(() => {
    if (!transitioning && lenis) {
      // Use a slightly longer delay for cinematic mode to ensure DOM is ready
      const delay = mode === "cinematic" ? 200 : 100;
      setTimeout(() => {
        if (lenis) {
          lenis.start();
          lenis.resize();
        }
      }, delay);
      document.body.style.overflow = '';
    }
  }, [mode, lenis, transitioning]);

  const enterCinematic = () => {
    if (mode !== "simplified" && mode !== "transitioning-to-simplified") return;
    
    setMode("transitioning-to-cinematic");
    setTransitioning(true);

    transitionTimeoutRef.current = setTimeout(() => {
      setMode("cinematic");
      setTransitioning(false);
    }, 4000); // Total transition time: ~4s for indoor→outdoor sequence
  };

  const exitCinematic = () => {
    if (mode !== "cinematic" && mode !== "transitioning-to-cinematic") return;
    
    setMode("transitioning-to-simplified");
    setTransitioning(true);

    transitionTimeoutRef.current = setTimeout(() => {
      setMode("simplified");
      setTransitioning(false);
    }, 3600); // Slightly faster reverse: ~3.6s
  };

  const toggleMode = () => {
    if (mode === "simplified" || mode === "transitioning-to-simplified") {
      enterCinematic();
    } else {
      exitCinematic();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <CinematicContext.Provider
      value={{
        mode,
        isCinematic: mode === "cinematic" || mode === "transitioning-to-cinematic",
        transitioning,
        enterCinematic,
        exitCinematic,
        toggleMode
      }}
    >
      {children}
    </CinematicContext.Provider>
  );
}

