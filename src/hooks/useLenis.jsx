import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

/**
 * A custom hook to initialize and manage a singleton Lenis smooth-scrolling instance.
 * It ensures the instance is created only once, runs the necessary RAF loop,
 * and handles proper destruction on component unmount.
 *
 * @param {object} options - Optional configuration object passed directly to the Lenis constructor.
 * @returns {Lenis | null} The Lenis instance, or null if it hasn't been initialized yet.
 */
const useLenis = (options = {}) => {
    // 1. Use a ref to store the Lenis instance so it persists across re-renders
    const lenisInstanceRef = useRef(null);

    useEffect(() => {
        let animationFrame; // Declare animationFrame outside of any conditional logic

        // Only create a new Lenis instance if one doesn't already exist
        if (!lenisInstanceRef.current) {
            // Create the instance with user-provided options
            const lenis = new Lenis(options);
            lenisInstanceRef.current = lenis; // Store the instance

            // 2. Define the RAF loop function
            const raf = (time) => {
                lenis.raf(time);
                
                // CRITICAL: Update the animationFrame variable to the new frame ID
                // to ensure the cleanup function stops the *latest* frame.
                if (lenisInstanceRef.current) {
                    animationFrame = requestAnimationFrame(raf);
                }
            };

            // 3. Start the loop and save the initial frame ID
            animationFrame = requestAnimationFrame(raf); 
        }

        // Cleanup function
        return () => {
            if (lenisInstanceRef.current) {
                // Stop the entire loop via the last registered frame ID
                cancelAnimationFrame(animationFrame); 
                
                // Destroy the Lenis instance, which removes all listeners and resets the DOM
                lenisInstanceRef.current.destroy();
                
                // Clean up the ref to prevent memory leaks/re-use issues
                lenisInstanceRef.current = null;
            }
        };
    }, [options]); // Depend on options to allow re-initialization if options change

    // Return the current Lenis instance
    return lenisInstanceRef.current;
};

export default useLenis;
