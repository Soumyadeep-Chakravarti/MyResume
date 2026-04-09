// src/components/Simplified/SimplifiedResume.jsx

import React, { useRef, Suspense, useMemo, useCallback, memo } from "react";

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
const Komorebi = React.lazy(() => import('../DynamicBackground/Komorebi.jsx'));

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
    // New way: iterating over the sections array which now contains both id and Component
    const renderedSections = useMemo(() => {
        return sections.map(({ id, Component: Section }) => ( // Use destructuring
            <Suspense
                key={id} 
                fallback={<div className="text-center py-20 text-gray-400">Loading Section...</div>}
            >
                <Section id={id} />
            </Suspense>
        ));
    }, []); // Only need 'sections' dependency if it's imported (it is)
    return (
        <CursorContext.Provider value={cursorValue}>
            <div 
                className="simplified-resume relative min-h-screen" 
                onMouseMove={!isMobile ? handleMouseMove : undefined} 
            >
                <Suspense fallback={null}>
                    <Aquarium cursorRef={cursorRef} /> 
                    {!isMobile && <CursorBall />}
                    <Komorebi />
                </Suspense>

                {/* 2. Pass Active Section ID to Navigation Components */}
                <NavBar activeSectionId={activeSectionId} />
                {!isMobile && <SectionNav activeSectionId={activeSectionId} />}
                
                <div className="relative z-10 breathing-container">
                    {renderedSections}
                </div>
            </div>
        </CursorContext.Provider>
    );
}
