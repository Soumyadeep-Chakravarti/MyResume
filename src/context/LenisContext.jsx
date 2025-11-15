// src/context/LenisContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Lenis from 'lenis'; // Ensure Lenis library is installed (e.g., npm install lenis)

// Create the context that will hold the Lenis instance
const LenisContext = createContext(null);

// LenisProvider component to wrap your application or specific parts that need smooth scrolling
export const LenisProvider = ({ children }) => {
    // State to store the Lenis instance. It will be null initially.
    const [lenisInstance, setLenisInstance] = useState(null);
    // Ref to hold the requestAnimationFrame ID for proper cleanup
    const animationFrameIdRef = useRef(null);

    // useEffect hook to handle Lenis initialization and cleanup
    // Runs only once on component mount due to the empty dependency array []
    useEffect(() => {
        // Check if a Lenis instance already exists to prevent re-initialization
        // (useful in React StrictMode which might run effects twice in development)
        if (!lenisInstance) {
            // Initialize a new Lenis instance
            const lenis = new Lenis({
                wrapper: document.documentElement, // Target the <html> element for global scroll control
                content: document.documentElement, // Content that will be scrolled (also <html>)
                lerp: 0.1,                       // Controls the smoothness (lower = smoother)
                duration: 1.2,                   // Duration of scroll animations
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
            });

            // Store the newly created Lenis instance in state
            setLenisInstance(lenis);

            // Crucial: Tell Lenis to re-measure the document's scrollable height.
            // This is vital immediately after initialization and whenever content/layout changes.
            lenis.resize();

            // Add a resize event listener to the window.
            // This ensures Lenis updates its scroll calculations if the browser window is resized,
            // which is essential for responsive layouts and preventing scroll issues.
            const handleResize = () => {
                lenis.resize();
            };
            window.addEventListener('resize', handleResize);

            // Define the requestAnimationFrame (raf) loop.
            // This loop continuously updates Lenis's internal state, enabling smooth scrolling.
            const raf = (time) => {
                lenis.raf(time); // Call Lenis's requestAnimationFrame handler
                // Continue the loop by requesting the next animation frame
                animationFrameIdRef.current = requestAnimationFrame(raf);
            };

            // Start the initial animation frame loop
            animationFrameIdRef.current = requestAnimationFrame(raf);

            // Cleanup function: This runs when the component unmounts.
            // It's essential to prevent memory leaks and ensure proper unsubscription.
            return () => {
                // Cancel the ongoing animation frame loop
                if (animationFrameIdRef.current) {
                    cancelAnimationFrame(animationFrameIdRef.current);
                    animationFrameIdRef.current = null;
                }
                // Remove the window resize event listener
                window.removeEventListener('resize', handleResize);
                // Destroy the Lenis instance to clean up its internal state and event listeners
                if (lenis) { // Use the 'lenis' constant from this closure
                    lenis.destroy();
                }
                // No need to set lenisInstance to null here, as the component is unmounting.
            };
        }
        // If lenisInstance already exists (e.g., due to React StrictMode's double render in dev),
        // we don't re-initialize, and this part of the effect returns undefined.
        return undefined;
    }, []); // Empty dependency array ensures this effect runs ONLY ONCE on mount

    // Provide the Lenis instance to all children components via context
    return (
        <LenisContext.Provider value={lenisInstance}>
            {children}
        </LenisContext.Provider>
    );
};

// Custom hook to easily access the Lenis instance from any child component
export const useLenis = () => {
    const context = useContext(LenisContext);
    // Provide a helpful error message if the hook is used outside of the LenisProvider.
    // This helps debug "Cannot convert object to primitive value" errors early.
    // Return null gracefully if Lenis is not yet initialized or provider is missing
    // This allows components to check for null and handle it appropriately
    // Don't log errors here as Lenis may still be initializing
    return context;
};

// Export LenisProvider as the default export for easier import
export default LenisProvider;
