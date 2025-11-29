import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useCinematic } from '../../context/CinematicModeContext';
import { FiArrowUpRight } from 'react-icons/fi';

// --- Custom Hook for Physics and Parallax ---
const useAdvancedScrollEffects = (containerRef) => {
    // 1. SCROLL PHYSICS
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Custom spring settings for heavier inertia (more acceleration/deceleration feel)
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60, // Lower stiffness for a "heavier" pull
        damping: 12,   // Lower damping for a longer "coast"
        mass: 0.8      // Added mass property for more realistic inertia
    });

    // 2. MOUSE PARALLAX / 3D TILT
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimization: Cache rect dimensions to avoid layout thrashing
    const rectRef = useRef(null);

    React.useEffect(() => {
        const updateRect = () => {
            if (containerRef.current) {
                rectRef.current = containerRef.current.getBoundingClientRect();
            }
        };

        // Initial measurement
        updateRect();

        // Update on resize
        window.addEventListener('resize', updateRect);
        // Update on scroll (since it's a scroll transition zone, position might change relative to viewport if not sticky, 
        // but here the container is the reference. If the container moves, we might need to update. 
        // However, for a simple parallax within a section, resize is usually sufficient unless the layout shifts dynamically.)
        window.addEventListener('scroll', updateRect);

        return () => {
            window.removeEventListener('resize', updateRect);
            window.removeEventListener('scroll', updateRect);
        };
    }, [containerRef]);

    const handleMouseMove = (event) => {
        if (!rectRef.current) return;

        const rect = rectRef.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize mouse position to [-1, 1] relative to the center of the sticky area
        // Using cached rect prevents forced reflow on every frame
        mouseX.set((event.clientX - centerX) / (rect.width / 2));
        mouseY.set((event.clientY - centerY) / (rect.height / 2));
    };

    // Use transform to map mouse position to rotation and light source shift
    const rotateX = useTransform(mouseY, [-1, 1], [3, -3]); // Max 3 degrees tilt
    const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

    // Background Shadow shift for a "pseudo-3D" light source
    const shadowX = useTransform(mouseX, [-1, 1], [-50, 50]);
    const shadowY = useTransform(mouseY, [-1, 1], [-50, 50]);

    // 3. VISUAL TRANSFORMS (Reorganized for clarity)
    const backgroundScale = useTransform(smoothProgress, [0, 0.8], [0.5, 1.2]);
    const backgroundFilter = useTransform(smoothProgress, [0.8, 1], ['brightness(100%) saturate(100%)', 'brightness(300%) saturate(200%)']);

    // Combined background motion value for the sticky element
    const backgroundMotion = {
        scale: backgroundScale,
        filter: backgroundFilter,
        rotateX: rotateX,
        rotateY: rotateY,
        willChange: 'transform, filter, box-shadow', // Optimization: Hint browser
        boxShadow: useTransform([shadowX, shadowY, smoothProgress], ([sX, sY, progress]) => {
            // Only apply the mouse-based shadow when the effect is fully visible (progress > 0.4)
            if (progress > 0.4) {
                return `${sX}px ${sY}px 100px rgba(59, 130, 246, 0.4)`;
            }
            return 'none';
        })
    };

    // Button and Instruction transforms remain similar
    const buttonOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
    const buttonPointerEvents = useTransform(smoothProgress, (value) => value > 0.95 ? 'auto' : 'none');
    const instructionsOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return {
        handleMouseMove,
        backgroundMotion,
        buttonOpacity,
        buttonPointerEvents,
        instructionsOpacity,
        smoothProgress
    };
};
// ---------------------------------------------


export default function ScrollTransitionZone() {
    const containerRef = useRef(null);
    const stickyRef = useRef(null); // Ref for the sticky div to track mouse events
    const { enterCinematic } = useCinematic();

    const {
        handleMouseMove,
        backgroundMotion,
        buttonOpacity,
        buttonPointerEvents,
        instructionsOpacity
    } = useAdvancedScrollEffects(containerRef);

    return (
        // Use a <section> for semantic meaning
        <section
            ref={containerRef}
            className="relative h-[400vh] bg-black w-full overflow-hidden"
            // Announce the transition start for screen reader users
            role="region"
            aria-live="polite"
            aria-label="Scroll transition section culminating in cinematic mode."
        >
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen flex flex-col items-center justify-center perspective-[1000px] overflow-hidden"
                onMouseMove={handleMouseMove} // Mouse tracking on the sticky element
                onMouseLeave={() => { /* Optionally reset tilt here */ }}
            >

                {/* --- Animated Background Element (The 'Void') --- */}
                {/* Apply 3D perspective and mouse-based motion */}
                <motion.div
                    style={backgroundMotion}
                    className="absolute inset-0 w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
                >
                    <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full 
                                    bg-gradient-to-br from-blue-900 to-black transition-all duration-300
                                    [transform:translateZ(100px)]" // Pushed forward in 3D space
                    />
                </motion.div>

                {/* --- Central Action Button (Semantic: role="button") --- */}
                <motion.button
                    onClick={enterCinematic}
                    style={{
                        opacity: buttonOpacity,
                        pointerEvents: buttonPointerEvents
                    }}
                    className="relative group z-10 p-2 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black transition-transform duration-300 hover:scale-[1.05]"
                    aria-label="Activate Cinematic Mode" // Better accessibility label
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                    <div className="relative px-8 sm:px-12 py-4 sm:py-6 bg-black rounded-full leading-none flex items-center divide-x divide-gray-600 border border-gray-800">
                        <span className="flex items-center space-x-3 sm:space-x-5">
                            <span className="text-cyan-100 font-extrabold text-xl sm:text-2xl tracking-[0.2em] uppercase transition-colors">
                                Enter The Void
                            </span>
                            <FiArrowUpRight className="text-cyan-400 text-2xl sm:text-3xl transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                    </div>
                </motion.button>

                {/* --- Instructions --- */}
                <motion.div
                    style={{ opacity: instructionsOpacity }}
                    className="absolute bottom-10 text-gray-500 text-sm uppercase tracking-widest z-20"
                >
                    Scroll to Initialize
                </motion.div>

            </div>
        </section>
    );
}
