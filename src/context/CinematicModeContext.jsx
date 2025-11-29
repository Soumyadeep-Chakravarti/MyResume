import { createContext, useContext, useState } from "react";
import { useLenis } from "./LenisContext.jsx";

const CinematicContext = createContext();

export function useCinematic() {
  return useContext(CinematicContext);
}

// State machine type: "simplified" | "transitioning-to-cinematic" | "cinematic" | "transitioning-to-simplified"
export function CinematicProvider({ children }) {
  const [mode, setMode] = useState("simplified");
  // We no longer need 'transitioning' state for the context itself, 
  // as the visual transition is handled by the ScrollTransitionZone component.

  const enterCinematic = () => {
    setMode("cinematic");
    window.scrollTo(0, 0); // Reset scroll for the new world
  };

  const exitCinematic = () => {
    setMode("simplified");
  };

  return (
    <CinematicContext.Provider
      value={{
        mode,
        isCinematic: mode === "cinematic",
        enterCinematic,
        exitCinematic
      }}
    >
      {children}
    </CinematicContext.Provider>
  );
}

