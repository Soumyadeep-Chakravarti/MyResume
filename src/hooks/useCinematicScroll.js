import { useEffect, useState, useRef } from "react"; // <-- Import useRef
import { useScroll, useTransform, useMotionValue } from "framer-motion"; // <-- Import useMotionValue
import { useLenis } from "../context/LenisContext.jsx"; // Assuming this provides the Lenis instance

/**
 * Hook to map scroll position to a global progress value (0-1)
 * for controlling depth effects in cinematic mode.
 * The progress value is derived primarily from the Lenis instance if available,
 * otherwise it falls back to Framer Motion's native scroll tracking.
 */
export const useCinematicScroll = (totalHeight = 1) => {
  const lenis = useLenis();

  // Use Framer Motion's useScroll for standard progress tracking (used as fallback)
  const { scrollYProgress: motionScrollYProgress } = useScroll();

  // Create a MotionValue to hold the progress. This will be the single source of truth (0 to 1).
  // We'll update this MotionValue from *either* the Lenis event or the standard browser scroll.
  const progressMotionValue = useMotionValue(0);

  // Store the progress value (0-1) for any non-Framer Motion components that need it
  const [progressValue, setProgressValue] = useState(0);

  // Reference to hold the last Lenis progress value for cleanup/initialization
  const lastProgressRef = useRef(0);

  useEffect(() => {
    // 1. Lenis Integration: This is the preferred method
    if (lenis) {
      const updateProgress = ({ scroll, limit }) => {
        const scrollProgress = limit > 0 ? scroll / limit : 0;
        const boundedProgress = Math.min(Math.max(scrollProgress, 0), 1);

        // Update both the MotionValue and the React state
        progressMotionValue.set(boundedProgress);
        setProgressValue(boundedProgress);
        lastProgressRef.current = boundedProgress;
      };

      // Initial calculation
      lenis.resize(); // Ensure limits are calculated
      const currentScroll = lenis.scroll;
      const scrollLimit = lenis.limit;
      updateProgress({ scroll: currentScroll, limit: scrollLimit });

      lenis.on("scroll", updateProgress);

      return () => {
        lenis.off("scroll", updateProgress);
      };
    }

    // 2. Framer Motion Fallback: Only runs if Lenis is NOT available
    // We use a separate useEffect to handle the fallback progress update
    // from Framer Motion's scrollYProgress to our single MotionValue.
    // NOTE: This logic is moved outside this useEffect for cleaner dependency management.
  }, [lenis, progressMotionValue]); // Only dependent on lenis and the motion value

  // Fallback Progress (if Lenis is not available)
  // This separate effect ensures we use the Framer Motion progress only when Lenis is null.
  useEffect(() => {
    if (!lenis) {
      // Subscribe to Framer Motion's useScroll progress
      const unsubscribe = motionScrollYProgress.onChange((p) => {
        progressMotionValue.set(p); // Update the single MotionValue source
        setProgressValue(p); // Update React state for non-Motion components
        lastProgressRef.current = p;
      });
      return () => unsubscribe();
    }
    // This effect should only run when lenis is null.
  }, [lenis, motionScrollYProgress, progressMotionValue]);

  // --- Derived Motion Values (Now driven by the single 'progressMotionValue') ---

  // Transform progress to depth values
  const depth = useTransform(progressMotionValue, (p) => {
    // Map progress (0 to 1) to translateZ (-500px to 1000px range)
    return p * 1500 - 500;
  });

  const scale = useTransform(progressMotionValue, (p) => {
    // Scale from 0.5 (distant) to 1.2 (close)
    return 0.5 + p * 0.7;
  });

  const opacity = useTransform(progressMotionValue, (p) => {
    // Opacity curve: fade in quickly (0-0.1), stay visible (0.1-0.9), fade out slowly (0.9-1)
    if (p < 0.1) return p * 10; // Fade in (0 -> 1)
    if (p > 0.9) return (1 - p) * 10; // Fade out (1 -> 0)
    return 1; // Full opacity
  });

  return {
    progress: progressValue, // The simple React state (0-1)
    cinematicProgress: progressMotionValue, // The authoritative Framer MotionValue (0-1)
    depth,
    scale,
    opacity,
    // Original Framer Motion scroll progress (useful for debugging/other effects)
    scrollYProgress: motionScrollYProgress,
  };
};
