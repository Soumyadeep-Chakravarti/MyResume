import { useEffect, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useLenis } from '../context/LenisContext.jsx';

/**
 * Hook to map scroll position to a global progress value (0-1)
 * for controlling depth effects in cinematic mode
 */
export const useCinematicScroll = (totalHeight = 1) => {
  const { scrollYProgress } = useScroll();
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Gracefully handle when Lenis is not yet available
    if (!lenis) {
      setProgress(0);
      return;
    }

    const updateProgress = ({ scroll, limit }) => {
      // Calculate progress as scroll position divided by total scrollable height
      const scrollProgress = limit > 0 ? scroll / limit : 0;
      setProgress(Math.min(Math.max(scrollProgress, 0), 1));
    };

    lenis.on('scroll', updateProgress);
    
    // Initial calculation
    lenis.resize();
    const currentScroll = lenis.scroll;
    const scrollLimit = lenis.limit;
    updateProgress({ scroll: currentScroll, limit: scrollLimit });

    return () => {
      lenis.off('scroll', updateProgress);
    };
  }, [lenis]);

  // Also use Framer Motion's scroll progress as a fallback/alternative
  const motionProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Transform progress to depth values
  const depth = useTransform(motionProgress, (p) => {
    // Map progress to translateZ (-500 to 1000 range)
    return p * 1500 - 500;
  });

  const scale = useTransform(motionProgress, (p) => {
    // Scale from 0.5 (distant) to 1.2 (close)
    return 0.5 + p * 0.7;
  });

  const opacity = useTransform(motionProgress, (p) => {
    // Opacity curve: fade in quickly, stay visible, fade out slowly
    if (p < 0.1) return p * 10; // Fade in
    if (p > 0.9) return (1 - p) * 10; // Fade out
    return 1; // Full opacity
  });

  return {
    progress,
    motionProgress,
    depth,
    scale,
    opacity,
    scrollYProgress,
  };
};

