// src/components/MainContent.jsx
import React, { Suspense, lazy, useMemo, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useCinematic } from "./context/CinematicModeContext.jsx";
import ScrollTransitionZone from "./components/Transition/ScrollTransitionZone.jsx";
import { LoadingSpinner } from "./components/Utils/LoadingSpinner.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

/**
 * MainContent
 *
 * - Canvas stays mounted to avoid WebGL context loss.
 * - Heavy scene (CinematicWorld) is only mounted when mode === "cinematic".
 * - 2D resume is lazy-loaded and hidden during cinematic mode.
 * - TransitionBlob is isolated/memoized and only renders when transitionProgress > 0.
 */

/* ----------------------------- TransitionBlob ---------------------------- */
const TransitionBlob = React.memo(function TransitionBlob({ transitionProgress = 0, darkMode = false }) {
  const blobScale = useMemo(() => Number(transitionProgress) * 3, [transitionProgress]);
  const filterScale = useMemo(() => 30 + Number(transitionProgress) * 40, [transitionProgress]);

  // Expose a CSS var for styling (color) so tailwind classes may reference it if needed.
  useEffect(() => {
    document.documentElement.style.setProperty("--animus-blob-color", darkMode ? "#FFFFFF" : "#000000");
  }, [darkMode]);

  if (!transitionProgress || transitionProgress <= 0) return null;

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden>
        <defs>
          <filter id="ink-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="5" seed="42" result="noise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={filterScale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
        <div
          className={`w-[100vmin] h-[100vmin] rounded-full transition-transform duration-100 ease-out will-change-transform ${
            darkMode ? "blob-dark-styles" : "blob-light-styles"
          }`}
          style={{
            // CSS var + transform so it stays on GPU
            ["--blob-scale"]: blobScale,
            transform: "scale(var(--blob-scale))",
            filter: "url(#ink-bleed)",
            // ensure the blob color can be controlled via CSS variable
            background: "var(--animus-blob-color)",
          }}
          aria-hidden
        />
      </div>
    </>
  );
});

/* ----------------------------- Lazy imports ----------------------------- */
const SimplifiedResume = lazy(() => import("./components/Simplified/SimplifiedResume.jsx"));
const CinematicWorld = lazy(() => import("./components/Cinematic/CinematicWorld.jsx"));

/* -------------------------------- Component ------------------------------- */
export default function MainContent() {
  const { mode, transitionProgress = 0, exitCinematic } = useCinematic();
  const { darkMode } = useTheme();

  const isSimplified = mode === "simplified";
  const isCinematic = mode === "cinematic";

  // Prevent page scroll while inside cinematic mode
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = isCinematic ? "hidden" : prevOverflow || "";
    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [isCinematic]);

  // Detect prefers-reduced-motion (defensive: window may be undefined in SSR)
  const prefersReducedMotion = useMemo(() => {
    try {
      return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }, []);

  return (
    <>
      {/* --------------------------- 2D CONTENT --------------------------- */}
      <div className={`min-h-screen ${isCinematic ? "hidden" : ""}`}>
        <Suspense fallback={<LoadingSpinner message="Loading simplified resume..." />}>
          {isSimplified && <SimplifiedResume prefersReducedMotion={prefersReducedMotion} />}
        </Suspense>

        {/* The ScrollTransitionZone handles mapping scroll -> transitionProgress */}
        {transitionProgress < 1 && <ScrollTransitionZone />}
      </div>

      {/* --------------------------- CINEMATIC OVERLAY --------------------------- */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-500 ease-in"
        style={{ opacity: isCinematic ? 1 : 0, pointerEvents: isCinematic ? "auto" : "none" }}
        aria-hidden={!isCinematic}
      >
        {/* Exit button outside the Canvas so it remains accessible */}
        {isCinematic && (
          <button
            onClick={exitCinematic}
            className="fixed top-4 right-4 z-50 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
            aria-label="Exit cinematic mode"
            type="button"
          >
            Back to Resume
          </button>
        )}

        {/* Canvas is mounted once; heavy scene mounts/unmounts inside it based on isCinematic */}
        <Suspense fallback={<LoadingSpinner message="Preparing WebGL…" />}>
          <Canvas
            gl={{ failIfMajorPerformanceCaveat: true, preserveDrawingBuffer: false }}
            // Consider frameloop="demand" + manual invalidation when idle to save GPU,
            // but beware of input responsiveness for camera motion.
          >
            {/* Keep the canvas lightweight until cinematic starts */}
            <Suspense fallback={null}>
              {isCinematic && <CinematicWorld prefersReducedMotion={prefersReducedMotion} />}
            </Suspense>
          </Canvas>
        </Suspense>
      </div>

      {/* --------------------------- TRANSITION BLOB --------------------------- */}
      <TransitionBlob transitionProgress={transitionProgress} darkMode={darkMode} />
    </>
  );
}

