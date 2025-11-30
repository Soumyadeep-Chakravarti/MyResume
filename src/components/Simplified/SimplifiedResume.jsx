import React, { useRef, Suspense, useMemo, useCallback, useContext } from "react";

import { sections } from "./ComponentsRegistry.js";
import SectionNav from './UI/SectionNav.jsx';
import NavBar from './UI/NavBar.jsx';
import { CursorContext } from '../../context/CursorContext.jsx';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import { useSectionObserver } from '../../hooks/useSectionObserver.js';

// Define Stable Section IDs (Good Practice)
const SECTION_IDS = ['hero', 'about', 'skills', 'projects', 'contact'];

// Lazy-load backgrounds
const Aquarium = React.lazy(() => import('../DynamicBackground/Aquarium.jsx'));


export default function SimplifiedResume() {
	// 1. Context and Hook Integration
	// Use object destructuring for cleaner access
	const { cursorRef: globalCursorRef } = useContext(CursorContext) || {};
	
	const isMobile = useIsMobile();
	const activeSectionId = useSectionObserver(SECTION_IDS);

	// 2. Cursor Position Access (Simplified)
	// The Aquarium component needs the REF, not the extracted value, but we can simplify the ternary.
	// NOTE: It is best practice to pass the REF to the external component if possible, 
	// rather than extracting .current here, as done below.
	
	// const cursorPosition = globalCursorRef?.current || { x: 0, y: 0 }; // Not needed for Aquarium

	// 3. Memoized Sections (Refactored for cleaner logic)
	const renderedSections = useMemo(() =>
		sections.map((Section, index) => {
			// Ensure a valid ID exists for the section
			const id = SECTION_IDS[index];
			if (!id) {
				console.error(`Missing ID for section at index ${index}.`);
				return null;
			}
			
			return (
				<Suspense
					// Use the stable ID as the key
					key={id}
					fallback={<div className="text-center py-20 text-gray-400">Loading {id} Section...</div>}
				>
					{/* Pass the section ID as a prop */}
					<Section id={id} />
				</Suspense>
			);
		}), [SECTION_IDS] // IMPORTANT: List SECTION_IDS as dependency if it were defined outside the module scope
	);

	// 4. Placeholder for Future Callbacks (Best Practice)
	// Example: If you were to add an event handler here later, you'd use useCallback:
	// const handleButtonClick = useCallback(() => { /* ... */ }, []);


	return (
		<div
			className="simplified-resume relative min-h-screen"
		>
			<Suspense fallback={null}>
				{/* Pass the REF directly. Handle null safely in case context is missing. */}
				<Aquarium numBalls={50} cursorRef={globalCursorRef || useRef({ x: 0, y: 0 })} />
			</Suspense>

			{/* Pass Active Section ID to Navigation Components */}
			<NavBar activeSectionId={activeSectionId} sectionIds={SECTION_IDS} />
			{/* Pass sectionIds list to SectionNav as well, in case it needs to render the links */}
			{!isMobile && <SectionNav activeSectionId={activeSectionId} sectionIds={SECTION_IDS} />}

			<div className="relative z-10">
				{renderedSections}
			</div>
		</div>
	);
}
