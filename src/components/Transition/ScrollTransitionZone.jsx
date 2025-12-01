// src/components/Transition/ScrollTransitionZone.jsx (Fixed)
import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useCinematic } from '../../context/CinematicModeContext.jsx';
import { FiArrowUpRight } from 'react-icons/fi';

// --- Custom Hook for Physics and Parallax ---
const useAdvancedScrollEffects = (containerRef) => {
    // 1. SCROLL PROGRESS (Hooks at Top Level)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 12,
        mass: 0.8
    });

    // 2. MOUSE PARALLAX / 3D TILT (Hooks at Top Level)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rectRef = useRef(null);

    // Effect to update bounding box on mount and resize
    useEffect(() => {
        const updateRect = () => {
            if (containerRef.current) {
                rectRef.current = containerRef.current.getBoundingClientRect();
            }
        };

        updateRect();
        window.addEventListener('resize', updateRect);
        
        return () => {
            window.removeEventListener('resize', updateRect);
        };
    }, [containerRef]);

    const handleMouseMove = useCallback((event) => {
        if (!containerRef.current || !rectRef.current) return;

        const rect = rectRef.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        mouseX.set((event.clientX - centerX) / (rect.width / 2));
        mouseY.set((event.clientY - centerY) / (rect.height / 2));
    }, [mouseX, mouseY, containerRef]); 

    // 3D Tilt Transforms (Hooks at Top Level)
    const rotateX = useTransform(mouseY, [-1, 1], [3, -3]);
    const rotateY = useTransform(mouseX, [-1, 1], [-3, 3]);

    // Box Shadow Parallax Transforms (Hooks at Top Level)
    const shadowX = useTransform(mouseX, [-1, 1], [-50, 50]);
    const shadowY = useTransform(mouseY, [-1, 1], [-50, 50]);
    
    // 4. VISUAL TRANSFORMS (Hooks at Top Level)
    const backgroundScale = useTransform(smoothProgress, [0, 0.8], [0.5, 1.2]); 
    const backgroundFilter = useTransform(smoothProgress, [0.8, 1], ['brightness(100%) saturate(100%)', 'brightness(300%) saturate(200%)']);
    
    // FIX: Define the combined motion value for boxShadow at the top level
    const boxShadowValue = useTransform([shadowX, shadowY, smoothProgress], ([sX, sY, progress]) => {
        if (progress > 0.4) {
            return `${sX}px ${sY}px 100px rgba(59, 130, 246, 0.4)`;
        }
        return 'none';
    });


    // Memoize the background motion styles
    const backgroundMotion = useMemo(() => ({
        scale: backgroundScale,
        filter: backgroundFilter,
        rotateX: rotateX,
        rotateY: rotateY,
        willChange: 'transform, filter, box-shadow',
        boxShadow: boxShadowValue // Use the motion value defined above
    }), [backgroundScale, backgroundFilter, rotateX, rotateY, boxShadowValue]); 

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
    
    const { 
        setTransitionProgress, 
        isSimplified, 
        isCinematic,
        startTransitionToCinematic,
        enterCinematic 
    } = useCinematic();

    const {
        handleMouseMove,
        backgroundMotion,
        buttonOpacity,
        buttonPointerEvents,
        instructionsOpacity,
        smoothProgress 
    } = useAdvancedScrollEffects(containerRef);

    // LOGIC: Synchronize scroll progress and trigger transition
    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latestProgress) => {
            // 1. ALWAYS SYNCHRONIZE PROGRESS
            setTransitionProgress(latestProgress);
            
            // 2. AUTOPILOT TRANSITION TRIGGER
            if (latestProgress >= 0.99 && isSimplified) {
                // This starts the blob animation (rendered in CinematicWorld.jsx)
                startTransitionToCinematic();
            }
        });

        return unsubscribe;

    }, [smoothProgress, setTransitionProgress, isSimplified, startTransitionToCinematic]);


    return (
        <section
            ref={containerRef}
            // The outer container already has 'relative'
            className="relative h-[400vh] w-full" 
            role="region"
            aria-label="Scroll transition zone with parallax"
            onMouseMove={handleMouseMove} // Attach mouse handler
        >
            {/* The sticky container holds the 2D visual elements */}
            {/* FIX APPLIED HERE: Added 'relative' to the sticky container for Framer Motion projection */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden perspective-[1000px] z-20 relative">
                
                {/* 1. Background Element (Simple 2D Parallax/Tilt Overlay) */}
                <motion.div
                    style={backgroundMotion}
                    // Keep this DOM element for visual feedback (tilt/shadow) on the 2D page
                    className="absolute w-[80%] h-[80%] bg-blue-500/50 rounded-[4rem] border border-blue-400/30"
                    transition={{ type: 'spring', stiffness: 50, damping: 10 }} 
                />

                {/* 2. Visual Hint */}
                <motion.div
                    style={{ opacity: instructionsOpacity }}
                    className="absolute top-[15%] text-2xl font-light text-center text-gray-800 dark:text-gray-200 pointer-events-none"
                >
                    <p className="tracking-widest uppercase">Explore the world beyond the resume.</p>
                    <p className="mt-2 text-base">Scroll down to synchronize the view.</p>
                </motion.div>

                {/* 3. Cinematic Trigger Button (Confirms entry) */}
                <motion.button
                    style={{ 
                        opacity: buttonOpacity, 
                        pointerEvents: buttonPointerEvents 
                    }}
                    onClick={enterCinematic} // Direct entry on click
                    className="absolute bottom-20 px-8 py-3 bg-primary text-white font-bold rounded-full shadow-xl hover:bg-primary-hover transition-colors flex items-center space-x-2 z-30"
                    disabled={isCinematic}
                >
                    <span>Enter Cinematic View</span>
                    <FiArrowUpRight className="w-5 h-5" />
                </motion.button>

            </div>
        </section>
    );
}
