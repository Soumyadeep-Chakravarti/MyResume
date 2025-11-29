// MainContent.jsx (or included within App.jsx if preferred)

import React, { Suspense, lazy } from 'react';
import { useCinematic } from './context/CinematicModeContext.jsx';
import ScrollTransitionZone from './components/Transition/ScrollTransitionZone.jsx';
// Import the centralized loading component
import { LoadingSpinner } from './components/LoadingSpinner.jsx'; // Assuming you create this

// Lazy load pages
const SimplifiedResume = lazy(() => import('./components/Simplified/SimplifiedResume'));
const CinematicWorld = lazy(() => import('./components/Cinematic/CinematicWorld.jsx'));

// Main content component that conditionally renders based on mode
function MainContent() {
	const { mode } = useCinematic();

	const isSimplified = mode === 'simplified';
	const isCinematic = mode === 'cinematic';

	return (
		<>
			{/* Simplified Mode + Scroll Transition Zone */}
			<div
				className={`min-h-screen ${isCinematic ? 'hidden' : ''}`}
				aria-hidden={isCinematic}
			>
				<Suspense
					fallback={
						<LoadingSpinner message="Loading simplified resume..." />
					}
				>
					{/* Conditionally render the simplified content */}
					{isSimplified && <SimplifiedResume />}
				</Suspense>

				{/* The Scroll Bridge - Renders below the resume, but only if Simplified is the active mode or has just loaded */}
				<ScrollTransitionZone />
			</div>

			{/* Cinematic Mode - The 3D World */}
			<div
				className={`min-h-screen bg-black ${isSimplified ? 'hidden' : ''}`}
				aria-hidden={isSimplified}
			>
				<Suspense
					fallback={
						<LoadingSpinner message="Loading cinematic experience..." />
					}
				>
					{/* Conditionally render the cinematic content */}
					{isCinematic && <CinematicWorld />}
				</Suspense>
			</div>
		</>
	);
}

export { MainContent }; // Export it for use in App
