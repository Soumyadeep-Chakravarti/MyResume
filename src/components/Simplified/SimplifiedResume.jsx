// src/components/Simplified/SimplifiedResume.jsx
import React, { useRef, Suspense, useMemo } from "react";

import { sections } from "./ComponentsRegistry.js";
import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';
import { CursorContext } from '../../context/CursorContext.jsx';
import { useIsMobile } from '../../hooks/useIsMobile.js'; // <-- NEW IMPORT

// Lazy-load backgrounds
const CursorBall = React.lazy(() => import('../DynamicBackground/CursorBall.jsx'));
const Aquarium = React.lazy(() => import('../DynamicBackground/Aquarium.jsx'));

export default function SimplifiedResume() {
  const cursorRef = useRef({ x: 0, y: 0, r: 40 });
  const cursorValue = useMemo(() => cursorRef, []);

  // Check if we are on a mobile device
  const isMobile = useIsMobile(); // <-- NEW: Hook call

  // Memoized sections remain unchanged and correct
  const renderedSections = useMemo(() =>
    sections.map((Section, index) => (
      <Suspense
        key={Section.name || index}
        fallback={<div className="text-center py-20 text-gray-400">Loading Section...</div>}
      >
        <Section />
      </Suspense>
    )), []
  );

  return (
    <CursorContext.Provider value={cursorValue}>
      <div className="simplified-resume relative">

        {/* Backgrounds */}
        <Suspense fallback={null}>
          <Aquarium numBalls={50} cursor={cursorRef.current} />

          {/* CONDITIONAL RENDERING: Only load and render CursorBall if NOT mobile */}
          {!isMobile && <CursorBall />}

        </Suspense>

        {/* Navigation */}
        <NavBar />
        {!isMobile && <SectionNav />}
        
        {/* Sections */}
        <div className="relative z-10">
          {renderedSections}
        </div>
      </div>
    </CursorContext.Provider>
  );
}
