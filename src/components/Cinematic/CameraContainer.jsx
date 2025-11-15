import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useReducedMotion } from 'framer-motion';
// Assume useIsMobile is working correctly
import { useIsMobile } from '../../hooks/useIsMobile.js';
// Replace custom throttle with a standardized utility or Framer Motion's event handling if possible
import throttle from '../Utils/Throttle.js'; 

// Configuration constants for clarity
const MAX_TILT_DEGREE = 10;
const SPRING_CONFIG = { stiffness: 100, damping: 20, mass: 1 };
const PERSPECTIVE_DISTANCE = '2000px';
const THROTTLE_LIMIT = 16; // ~60fps

/**
 * CameraContainer - Main camera wrapper with refined mouse tilt effects.
 * @param {object} props
 * @param {React.ReactNode} props.children - Content to be tilted.
 * @param {number} [props.tiltLimit=10] - Max rotation degree on both axes.
 * @param {boolean} [props.disableOnScroll=true] - Stop tilting when scrolling.
 */
const CameraContainer = ({ children, tiltLimit = MAX_TILT_DEGREE, disableOnScroll = true }) => {
    const containerRef = useRef(null);
    const shouldReduceMotion = useReducedMotion();
    const isMobile = useIsMobile();
    const isReady = !shouldReduceMotion && !isMobile;

    // Use spring for smooth mouse tilt, using dynamic configuration
    const tiltX = useSpring(0, SPRING_CONFIG);
    const tiltY = useSpring(0, SPRING_CONFIG);
    
    // Track if the user is scrolling (important for preventing tilt interference)
    const isScrolling = useRef(false);

    // --- Mouse Move Handler (Throttled) ---
    const updateTilt = useCallback(
        throttle((e) => {
            if (!isReady) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            // Calculate normalized position (-1 to 1)
            // x: -1 (left) to 1 (right)
            // y: -1 (top) to 1 (bottom)
            const normalizedX = (clientX / innerWidth - 0.5) * 2;
            const normalizedY = (clientY / innerHeight - 0.5) * 2;

            // Update spring targets (Invert Y for natural feel)
            // Looking up (normalizedY is negative) tilts camera down (positive rotateX)
            const targetX = -normalizedY * tiltLimit; 
            const targetY = normalizedX * tiltLimit;

            tiltX.set(targetX);
            tiltY.set(targetY);
        }, THROTTLE_LIMIT),
        [isReady, tiltLimit, tiltX, tiltY]
    );

    // --- Reset Handler ---
    const resetTilt = useCallback(() => {
        if (!isReady) return;
        tiltX.set(0);
        tiltY.set(0);
    }, [isReady, tiltX, tiltY]);

    // --- Scroll Listener (To prevent tilt while user is actively scrolling) ---
    useEffect(() => {
        if (!isReady || !disableOnScroll) return;

        let scrollTimer;
        
        const handleScroll = () => {
            if (!isScrolling.current) {
                isScrolling.current = true;
                // Instantly reset tilt while scrolling starts
                resetTilt(); 
            }
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                isScrolling.current = false;
            }, 100); // Wait 100ms after last scroll event
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimer);
        };
    }, [isReady, disableOnScroll, resetTilt]);


    // --- Effect for Attaching Mouse Listeners ---
    useEffect(() => {
        // This effect handles the tilt activation/deactivation
        if (!isReady) {
            resetTilt(); // Ensure reset if motion reduction or mobile is detected
            window.removeEventListener('mousemove', updateTilt);
            return;
        }

        window.addEventListener('mousemove', updateTilt);
        return () => {
            window.removeEventListener('mousemove', updateTilt);
        };
    }, [isReady, updateTilt, resetTilt]);


    // The `onMouseLeave` is now handled by the custom `resetTilt` logic.

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full" // Added h-full for better sizing context
            style={{
                // Explicitly define 3D context
                perspective: PERSPECTIVE_DISTANCE,
                perspectiveOrigin: 'center center',
            }}
            onMouseLeave={resetTilt} // Reset when mouse leaves the component area
        >
            {/* The tiltable content container */}
            <motion.div
                className="relative w-full h-full" // Added h-full
                style={{
                    rotateX: tiltX,
                    rotateY: tiltY,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default CameraContainer;
