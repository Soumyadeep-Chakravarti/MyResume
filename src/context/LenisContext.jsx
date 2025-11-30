// src/context/LenisContext.jsx
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// --- 1. Define Context ---
// LenisContext will hold either a Lenis instance or null.
// We initialize it with 'undefined' to distinguish it from a 'null' Lenis instance.
const LenisContext = createContext(undefined);

// --- 2. Custom Hook to Access Lenis Instance ---

/**
 * Custom hook to easily access the Lenis instance.
 * @returns {object | null} The active Lenis instance or null if not yet initialized.
 * @throws {Error} If the hook is used outside of a LenisProvider.
 */
export const useLenis = () => {
    const context = useContext(LenisContext);

    // Guardrail: Check if the consumer is inside the Provider component tree.
    if (context === undefined) {
        throw new Error('useLenis must be used within a LenisProvider.');
    }

    // Returns the Lenis instance (Lenis object or null).
    return context;
};

// --- 3. The Provider Component ---

export const LenisProvider = ({ children }) => {
    // State to store the Lenis instance, initialized as null.
    const [lenisInstance, setLenisInstance] = useState(null);
    const animationFrameIdRef = useRef(null);
    const isInitializedRef = useRef(false);

    // useEffect hook to handle Lenis initialization, RAF loop, and cleanup
    useEffect(() => {
        // Prevent double initialization (e.g., React Strict Mode)
        if (isInitializedRef.current) {
            return;
        }

        // Initialize a new Lenis instance
        const lenis = new Lenis({
            wrapper: document.documentElement,
            content: document.documentElement,
            lerp: 0.1,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 0.7, 
        });

        setLenisInstance(lenis);
        isInitializedRef.current = true;

        // --- Event Handlers & RAF Loop ---
        const handleResize = () => {
            lenis.resize();
        };
        window.addEventListener('resize', handleResize);

        const raf = (time) => {
            lenis.raf(time);
            animationFrameIdRef.current = requestAnimationFrame(raf);
        };

        animationFrameIdRef.current = requestAnimationFrame(raf);

        // --- Cleanup Function ---
        return () => {
            if (animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current);
                animationFrameIdRef.current = null;
            }
            window.removeEventListener('resize', handleResize);
            
            // Destroy the Lenis instance
            lenis.destroy();
            isInitializedRef.current = false;
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisInstance}>
            {children}
        </LenisContext.Provider>
    );
};
