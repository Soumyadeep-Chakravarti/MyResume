import { useEffect, useRef } from 'react'; // Import useRef
import Lenis from 'lenis';

const useLenis = () => {
    // Use a ref to store the Lenis instance so it persists across re-renders
    // and can be accessed by the cleanup function or returned.
    const lenisInstanceRef = useRef(null);

    useEffect(() => {
        // Only create a new Lenis instance if one doesn't already exist in the ref
        if (!lenisInstanceRef.current) {
            const lenis = new Lenis();
            lenisInstanceRef.current = lenis; // Store the instance

            let animationFrame;

            const raf = (time) => {
                lenis.raf(time);
                // Continue the animation loop only if the component is still mounted
                // and the instance still exists.
                if (lenisInstanceRef.current) {
                    animationFrame = requestAnimationFrame(raf);
                }
            };

            animationFrame = requestAnimationFrame(raf); // Start the animation loop
        }

        // Cleanup function
        return () => {
            if (lenisInstanceRef.current) {
                cancelAnimationFrame(animationFrame); // Stop the animation frame loop
                lenisInstanceRef.current.destroy(); // Destroy the Lenis instance
                lenisInstanceRef.current = null; // Clear the ref
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // Return the current Lenis instance so other components can interact with it
    return lenisInstanceRef.current;
};

export default useLenis;