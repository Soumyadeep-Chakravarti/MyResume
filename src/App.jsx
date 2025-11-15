// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';
import { CinematicProvider, useCinematic } from './context/CinematicModeContext.jsx';
import ModeToggle from './components/UI/ModeToggle.jsx';
import TransitionScene from './components/Transition/TransitionScene.jsx';
// Lazy load pages
const SimplifiedResume = lazy(() => import('./components/Simplified/SimplifiedResume'));
const CinematicResume = lazy(() => import('./components/Cinematic/CinematicResume.jsx'));

// Main content component that conditionally renders based on mode
function MainContent() {
  const { mode } = useCinematic();

  return (
    <>
      {/* Mode Toggle - visible in both modes */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200]">
        <ModeToggle />
      </div>

      {/* Transition Scene - shows during transitions */}
      <TransitionScene />

      {/* Conditional rendering based on mode */}
      {mode === "simplified" && (
        <div className="min-h-screen">
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen text-text-primary">
                Loading simplified resume...
              </div>
            }
          >
            <SimplifiedResume />
          </Suspense>
        </div>
      )}

      {mode === "cinematic" && (
        <div className="min-h-screen bg-black">
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen text-white">
                Loading cinematic experience...
              </div>
            }
          >
            <CinematicResume />
          </Suspense>
        </div>
      )}

      {/* During transitions, show nothing (transition scene handles it) */}
      {(mode === "transitioning-to-cinematic" || mode === "transitioning-to-simplified") && (
        <div className="min-h-screen bg-black" />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
          <CinematicProvider>
            <MainContent />
          </CinematicProvider>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

