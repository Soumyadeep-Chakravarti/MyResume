// src/components/Simplified/SimplifiedResume.jsx
import React, { useRef, Suspense, useMemo } from "react";
import { sections } from "./ComponentsRegistry.js";
import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';
import { CursorContext } from '../../context/CursorContext.jsx';

// Lazy-load backgrounds
const CursorBall = React.lazy(() => import('../DynamicBackground/CursorBall.jsx'));
const Aquarium = React.lazy(() => import('../DynamicBackground/Aquarium.jsx'));

export default function SimplifiedResume() {
  const cursorRef = useRef({ x: 0, y: 0, r: 40 });
  const cursorValue = useMemo(() => cursorRef, []);

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
          <CursorBall />
        </Suspense>

        {/* Navigation */}
        <NavBar />
        <SectionNav />

        {/* Sections */}
        <div className="relative z-10">
          {renderedSections}
        </div>
      </div>
    </CursorContext.Provider>
  );
}

