// App.jsx (Refined Implementation)

import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';
import { CinematicProvider } from './context/CinematicModeContext.jsx';
import { CursorProvider } from './context/CursorContext.jsx';

import CursorBall from './components/DynamicBackground/CursorBall.jsx';
import { MainContent } from './MainContent.jsx';

/**
 * Optimized Context Provider Composition
 * This component handles the complex nesting of all necessary providers.
 */
function RootProviders({ children }) {
    // Define the Providers array to manage the nesting order visually and logically.
    // The list is processed in reverse order by reduceRight to ensure correct nesting (top-down in the DOM).
    const providers = useMemo(() => [
        BrowserRouter,      // Must be high level for routing access
        ThemeProvider,
        LenisProvider,      // Smooth scrolling physics
        CinematicProvider,  // Cinematic logic relies on Lenis/Scroll
        CursorProvider,     // Lowest level state for mouse position
    ], []);

    // Reduces boilerplate by composing the providers using Array.reduceRight
    return providers.reduceRight((acc, Provider) => (
        <Provider>{acc}</Provider>
    ), children);
}

export default function App() {
	return (
        // The RootProviders handles all the context nesting
		<RootProviders>
			{/* Components that rely on all contexts */}
			<CursorBall />
			<MainContent />
		</RootProviders>
	);
}
