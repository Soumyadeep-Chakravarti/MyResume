import React, { useRef, Suspense } from "react";
import { sections } from "./ComponentsRegistry.js";
import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';
import { useInView } from "../../hooks/useInView.jsx";

// Lazy-load backgrounds
const CursorBall = React.lazy(() => import('../DynamicBackground/CursorBall.jsx'));
const Aquarium = React.lazy(() => import('../DynamicBackground/Aquarium.jsx'));

export default function SimplifiedResume() {
  const cursorRef = useRef({ x: 0, y: 0, r: 40 });

  return (
    <div className="simplified-resume relative">
      {/* Backgrounds */}
      <Suspense fallback={null}>
        <Aquarium numBalls={8} cursor={cursorRef.current} /> {/* z-0 */}
        <CursorBall ref={cursorRef} />                        {/* z-20 */}
      </Suspense>

      {/* Navigation */}
      <NavBar />                                              {/* z-30 */}
      <SectionNav />                                          {/* z-30 */}

      {/* Sections */}
      <div className="relative z-10">
        {sections.map((Section, idx) => {
          const [ref, isInView] = useInView(0.1); // mount when 10% visible
          return (
            <div ref={ref} key={idx}>
              {isInView && (
                <Suspense fallback={<div className="text-center py-20 text-text-primary">Loading section...</div>}>
                  <Section />
                </Suspense>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

