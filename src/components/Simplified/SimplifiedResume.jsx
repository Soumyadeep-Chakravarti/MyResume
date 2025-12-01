import React, {
	useRef,
	useContext,
	useMemo,
	Suspense,
} from "react";

import { sections } from "./ComponentsRegistry.js";
import NavBar from "./UI/NavBar.jsx";
import SectionNav from "./UI/SectionNav.jsx";

import { CursorContext } from "../../context/CursorContext.jsx";
import { useIsMobile } from "../../hooks/useIsMobile.js";
import { useSectionObserver } from "../../hooks/useSectionObserver.js";

const SECTION_IDS = ["hero", "about", "skills", "projects", "contact"];
const Aquarium = React.lazy(() => import("../DynamicBackground/Aquarium.jsx"));

export default function SimplifiedResume() {
	// Cursor Context with guaranteed ref fallback
	const ctx = useContext(CursorContext);
	const fallbackCursor = useRef({ x: 0, y: 0 });
	const cursorRef = ctx?.cursorRef ?? fallbackCursor;

	const isMobile = useIsMobile();
	const activeSectionId = useSectionObserver(SECTION_IDS);

	// Render all page sections with perfect ID-index sync
	const renderedSections = useMemo(() => {
		return sections.map((Section, idx) => {
			const id = SECTION_IDS[idx];
			if (!id || !Section) return null;

			return (
				<Suspense
					key={id}
					fallback={
						<div className="text-center py-20 text-gray-400">
							Loading {id}…
						</div>
					}
				>
					<Section id={id} />
				</Suspense>
			);
		});
	}, []); // Completely stable — no re-renders needed

	return (
		<div className="simplified-resume relative min-h-screen">

			{/* Background */}
			<Suspense fallback={<div className="absolute inset-0 bg-black/40" />}>
				<Aquarium numBalls={50} cursorRef={cursorRef} />
			</Suspense>

			{/* Navigation */}
			<NavBar activeSectionId={activeSectionId} sectionIds={SECTION_IDS} />
			{!isMobile && (
				<SectionNav
					activeSectionId={activeSectionId}
					sectionIds={SECTION_IDS}
				/>
			)}

			{/* Page Sections */}
			<div className="relative z-10">
				{renderedSections}
			</div>
		</div>
	);
}

