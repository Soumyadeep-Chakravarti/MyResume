// src/components/Simplified/SimplifiedResume.jsx

import React, { useRef, Suspense, useMemo, useCallback } from "react";

import { sections } from "./ComponentsRegistry.js";
import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';
import { CursorContext } from '../../context/CursorContext.jsx';
import { useIsMobile } from '../../hooks/useIsMobile.js';
// New Import: Section Observer Hook
import { useSectionObserver } from '../../hooks/useSectionObserver.js'; 

// Lazy-load backgrounds
const CursorBall = React.lazy(() => import('../DynamicBackground/CursorBall.jsx'));
const Aquarium = React.lazy(() => import('../DynamicBackground/Aquarium.jsx'));

import throttle from '../Utils/Throttle.js'; 
const THROTTLE_LIMIT = 16; 

// Define Stable Section IDs for the observer
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'];

export default function SimplifiedResume() {
    const cursorRef = useRef({ x: 0, y: 0, r: 40 });
    const cursorValue = useMemo(() => cursorRef, []);
    const isMobile = useIsMobile();

    // 1. Integrate Section Observer Hook
    const activeSectionId = useSectionObserver(SECTION_IDS);

    // Throttled Mouse Handler
    const handleMouseMove = useCallback(
        throttle((e) => {
            const cursor = cursorRef?.current;
            if (!cursor) return;
            cursor.x = e.clientX; 
            cursor.y = e.clientY; 
        }, THROTTLE_LIMIT),
        [cursorRef] 
    );

    // Memoized sections (Unchanged)
    const renderedSections = useMemo(() =>
        sections.map((Section, index) => (
            <Suspense
                key={Section.name || index}
                fallback={<div className="text-center py-20 text-gray-400">Loading Section...</div>}
            >
                {/* IMPORTANT: Ensure your Section components render with the correct ID */}
                <Section id={SECTION_IDS[index]} /> 
            </Suspense>
        )), []
    );

    return (
        <CursorContext.Provider value={cursorValue}>
            <div 
                className="simplified-resume relative min-h-screen" 
                onMouseMove={!isMobile ? handleMouseMove : undefined} 
            >
                <Suspense fallback={null}>
                    <Aquarium numBalls={50} cursor={cursorRef.current} /> 
                    {!isMobile && <CursorBall />}
                </Suspense>

                {/* 2. Pass Active Section ID to Navigation Components */}
                <NavBar activeSectionId={activeSectionId} />
                {!isMobile && <SectionNav activeSectionId={activeSectionId} />}
                
                <div className="relative z-10">
                    {renderedSections}
                </div>
            </div>
        </CursorContext.Provider>
    );
}
