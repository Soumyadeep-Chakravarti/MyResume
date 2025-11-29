// src/context/CursorContext.jsx
import React, { createContext, useRef, useState, useEffect, useMemo } from "react";

// 1. Create the Context
export const CursorContext = createContext(null);

// Define selectors for elements that should trigger the "interactive" (dimmed) state
const INTERACTIVE_SELECTORS = [
    "a", 
    "button", 
    "input", 
    "textarea", 
    ".group", 
    "[data-cursor-interactive='true']",
    // ✅ FIX: Add common text elements for dimming
    "p",      // Paragraphs
    "h1", 
    "h2", 
    "h3", 
    "h4", 
    "h5", 
    "h6",     // Headings
    "span",   // In-line text containers (useful for emphasized text)
    "li",     // List items
    
    // Existing custom selectors
    ".group", 
    "[data-cursor-interactive='true']"
];

// 2. Define the Provider Component
export const CursorProvider = ({ children }) => {
	// useRef for high-frequency position updates
	const cursorRef = useRef({ 
		x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
		y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0, 
		r: 40 
	});
	
	// useState for interaction state
	const [isInteractive, setIsInteractive] = useState(false);
	
	// --- Lifecycle: Attach/Detach Listener ---
	useEffect(() => {
		
		const handleMouseMove = (e) => {
			// 1. Update position
			cursorRef.current.x = e.clientX;
			cursorRef.current.y = e.clientY;

			// 2. Check interaction target
			const target = e.target;
			const shouldBeInteractive = INTERACTIVE_SELECTORS.some(selector => 
				target.closest(selector)
			);

			// 3. Update state (only triggers re-render if the value changes)
			setIsInteractive(prev => {
                if (prev !== shouldBeInteractive) {
                    return shouldBeInteractive;
                }
                return prev;
            });
		};

		window.addEventListener("mousemove", handleMouseMove);
		
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []); 
	
	// --- Context Value ---
    // ✅ FIX: Use useMemo to ensure the context value object is only recreated when 
    //         'isInteractive' changes, reliably propagating updates to consumers.
	const contextValue = useMemo(() => ({
		cursorRef, 
		isInteractive 
	}), [isInteractive]); 
    

	return (
		<CursorContext.Provider value={contextValue}>
			{children}
		</CursorContext.Provider>
	);
};
