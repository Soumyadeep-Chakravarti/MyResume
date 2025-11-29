import React, { useRef, Suspense, useMemo, useCallback, useContext } from "react";

import { sections } from "./ComponentsRegistry.js";
import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';
import { CursorContext } from '../../context/CursorContext.jsx';
import { useIsMobile } from '../../hooks/useIsMobile.js';
// New Import: Section Observer Hook
import { useSectionObserver } from '../../hooks/useSectionObserver.js';

// Lazy-load backgrounds
// Removed CursorBall import since it is rendered globally in App.jsx
const Aquarium = React.lazy(() => import('../DynamicBackground/Aquarium.jsx'));

// Removed unused constants/imports: throttle, THROTTLE_LIMIT

// Define Stable Section IDs for the observer
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'];

export default function SimplifiedResume() {
	// Get the global context provider data (which includes the cursor position ref)
	const globalCursorContext = useContext(CursorContext);

	// Safely extract the current cursor position object from the global ref
	const globalCursorRef = globalCursorContext?.cursorRef;
	const cursorPosition = globalCursorRef ? globalCursorRef.current : { x: 0, y: 0 };

	const isMobile = useIsMobile();

	// 1. Integrate Section Observer Hook
	const activeSectionId = useSectionObserver(SECTION_IDS);

	// REMOVED: local cursorRef, cursorValue, and handleMouseMove as mouse position is now global.

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
		// REMOVED: CursorContext.Provider as it is provided globally in App.jsx
		<div
			className="simplified-resume relative min-h-screen"
		// REMOVED: onMouseMove handler as position is tracked globally by CursorProvider
		>
			<Suspense fallback={null}>
				{/* Pass the global cursor position object to Aquarium */}
				<Aquarium numBalls={50} cursorRef={globalCursorRef} />
				{/* REMOVED: Local CursorBall rendering as it is rendered globally in App.jsx */}
			</Suspense>

			{/* 2. Pass Active Section ID to Navigation Components */}
			<NavBar activeSectionId={activeSectionId} />
			{!isMobile && <SectionNav activeSectionId={activeSectionId} />}

			<div className="relative z-10">
				{renderedSections}
			</div>
		</div>
	);
}
