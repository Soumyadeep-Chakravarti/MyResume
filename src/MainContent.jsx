import React, { Suspense, lazy, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
// FIX: Corrected import paths to resolve compilation errors
import { useCinematic } from "./context/CinematicModeContext.jsx";
import ScrollTransitionZone from "./components/Transition/ScrollTransitionZone.jsx";
import { LoadingSpinner } from "./components/Utils/LoadingSpinner.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

// ===================================
// Optimized Transition Blob Component
// ===================================

const TransitionBlob = React.memo(({ transitionProgress, darkMode }) => {
  // Calculate blob scale based on progress (Memoized)
  const blobScale = useMemo(() => transitionProgress * 3, [transitionProgress]); // Calculate displacement scale for SVG filter (Memoized)

  const filterScale = useMemo(
    () => 30 + transitionProgress * 40,
    [transitionProgress]
  );

  const showBlob = transitionProgress > 0; // Set a CSS variable on the root element for theme-aware blob color

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--blob-base-color",
      darkMode ? "#fff" : "#000"
    );
  }, [darkMode]);

  if (!showBlob) return null;

  return (
    <>
      {/* SVG Filter Definition for Organic Ink Bleed */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="ink-bleed">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.02" // Low frequency for large, smooth noise
            numOctaves="5"
            seed="42"
            result="noise"
          />
          {/* FeDisplacementMap distorts the source graphic using the noise texture */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={filterScale} // Dynamic scale drives the distortion intensity
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        {/* The actual blob element */}
        <div
          className={`
      w-[100vmin] h-[100vmin] rounded-full transition-transform duration-100 ease-out will-change-transform
      ${darkMode ? "blob-dark-styles" : "blob-light-styles"}
     `}
          style={{
            // Pass scale as a CSS variable for animation performance
            "--blob-scale": blobScale,
            transform: "scale(var(--blob-scale))",
            filter: "url(#ink-bleed)",
          }}
        />{" "}
      </div>{" "}
    </>
  );
});

// ===================================
// Lazy load pages
// ===================================

const SimplifiedResume = lazy(() =>
  // FIX: Corrected lazy import path
  import("./components/Simplified/SimplifiedResume.jsx")
);
const CinematicWorld = lazy(() =>
  // FIX: Corrected lazy import path
  import("./components/Cinematic/CinematicWorld.jsx")
);

// Main content component that conditionally renders based on mode
function MainContent() {
  const { mode, transitionProgress, exitCinematic } = useCinematic();
  const { darkMode } = useTheme();

  const isSimplified = mode === "simplified";
  const isCinematic = mode === "cinematic"; // ✅ FIX: Use a stable flag to mount the 3D world once the transition starts // This prevents the Canvas from being rapidly mounted/unmounted if transitionProgress // jitters near zero, which was the likely cause of the Context Lost error.

  const shouldMount3D = isCinematic || transitionProgress > 0; // --- Side Effects --- // Disable/Enable scrolling based on cinematic mode

  useEffect(() => {
    if (isCinematic) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCinematic]);

  return (
    <>
      {/* Simplified Mode + Scroll Transition Zone */}
      <div // Hide the 2D content entirely when in cinematic mode
        className={`min-h-screen ${isCinematic ? "hidden" : ""}`}
      >
        <Suspense
          fallback={<LoadingSpinner message="Loading simplified resume..." />}
        >
          {isSimplified && <SimplifiedResume />}
        </Suspense>
        {/* Render the ScrollTransitionZone until we are past it */}
        {transitionProgress < 1 && <ScrollTransitionZone />}
      </div>
      {/* Cinematic Mode - The 3D World Wrapper */}
      {/* Mount the R3F environment using the stable flag */}
      {shouldMount3D && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-500 ease-in"
          style={{
            opacity: isCinematic ? 1 : 0, // Visibility is driven by 'mode' state
            pointerEvents: isCinematic ? "auto" : "none", // Interaction is disabled when hidden
          }}
          aria-hidden={!isCinematic}
        >
          {isCinematic && (
            <button
              onClick={exitCinematic}
              className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
              aria-label="Exit cinematic mode"
            >
              Back to Resume
            </button>
          )}

          <Suspense
            fallback={
              <LoadingSpinner message="Loading cinematic experience..." />
            }
          >
            {/* R3F Canvas - WebGL Configuration added to improve stability */}
            <Canvas
              gl={{
                failIfMajorPerformanceCaveat: true,
                preserveDrawingBuffer: false,
              }}
            >
              <CinematicWorld />
            </Canvas>
          </Suspense>
        </div>
      )}
      {/* Isolated and memoized TransitionBlob component */}
      <TransitionBlob
        transitionProgress={transitionProgress}
        darkMode={darkMode}
      />
    </>
  );
}

export { MainContent };
