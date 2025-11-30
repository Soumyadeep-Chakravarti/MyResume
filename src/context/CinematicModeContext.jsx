import { createContext, useContext, useState, useMemo, useEffect } from "react";
// Ensure this import path is correct for your Lenis Context file
import { useLenis } from "./LenisContext.jsx"; 

// The Context will now hold an object with the mode string and functions.
const CinematicContext = createContext();

// --- 1. Custom Hook ---

export function useCinematic() {
  const context = useContext(CinematicContext);
  if (context === undefined) {
    throw new Error("useCinematic must be used within a CinematicProvider");
  }
  return context;
}

// State machine type: "simplified" | "transitioning-to-cinematic" | "cinematic" | "transitioning-to-simplified"
export function CinematicProvider({ children }) {
  // Mode state initialization (Mode is just a string here in JS)
  const [mode, setMode] = useState("simplified"); 
  const [transitionProgress, setTransitionProgress] = useState(0);
  const lenis = useLenis(); // Get the Lenis instance

  // --- State Transition Logic ---

  const startTransitionToCinematic = () => {
    if (mode === "simplified") {
      setMode("transitioning-to-cinematic");
    }
  };
  
  const enterCinematic = () => {
    if (mode === "transitioning-to-cinematic") {
      setMode("cinematic");
      window.scrollTo(0, 0); 
      setTransitionProgress(0); 
    }
  };

  const startTransitionToSimplified = () => {
    if (mode === "cinematic") {
      setMode("transitioning-to-simplified");
    }
  };

  const exitCinematic = () => {
    if (mode === "transitioning-to-simplified") {
      setMode("simplified");
      setTransitionProgress(0);
    }
  };

  // --- Lenis Scroll Control Effect ---
  // Disable Lenis scroll when we are in a transition or active cinematic mode.
  useEffect(() => {
    const isScrollDisabled = mode !== "simplified";
    if (lenis) {
      if (isScrollDisabled) {
        lenis.stop(); 
      } else {
        lenis.start();
      }
    }
    // Cleanup ensures Lenis is restarted if the component unmounts
    return () => {
      if (lenis) lenis.start();
    };
  }, [mode, lenis]);


  // --- Memoized Context Value ---
  const value = useMemo(() => {
    const isTransitioning =
      mode === "transitioning-to-cinematic" ||
      mode === "transitioning-to-simplified";

    return {
      mode,
      isCinematic: mode === "cinematic",
      isSimplified: mode === "simplified",
      isTransitioning,
      transitionProgress,
      setTransitionProgress,
      enterCinematic,
      exitCinematic,
      startTransitionToCinematic,
      startTransitionToSimplified,
    };
  }, [mode, transitionProgress]); // Dependencies remain the same

  return (
    <CinematicContext.Provider value={value}>
      {children}
    </CinematicContext.Provider>
  );
}
