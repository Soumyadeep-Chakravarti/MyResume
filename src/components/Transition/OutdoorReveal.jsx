import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Lost City landscape component - moved up for clarity and reuse
const LostCityLandscape = React.memo(() => {
  // Memoize random column positions to avoid recalculation on every render
  const columnData = useMemo(() =>
    [...Array(8)].map((_, i) => ({
      id: i,
      left: 15 + i * 12,
      height: 40 + Math.random() * 20,
      delay: 1.6 + i * 0.1,
    }))
    , []);

  // Memoize particle positions - reduced count for performance
  const particleData = useMemo(() =>
    [...Array(10)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      bottom: Math.random() * 50,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    , []);

  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-sky-800 to-amber-900 overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-purple-900/20 to-amber-900/40" />
      {/* Distant mountains/ruins (background layer) - unchanged SVG for silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[60vh] opacity-40">
        <svg viewBox="0 0 1200 400" className="w-full h-full">
          <path
            d="M0,400 L100,300 L150,280 L200,250 L250,240 L300,220 L350,200 L400,180 L450,200 L500,190 L550,210 L600,200 L650,220 L700,210 L750,230 L800,220 L850,240 L900,230 L950,250 L1000,240 L1050,260 L1100,250 L1150,270 L1200,280 L1200,400 Z"
            fill="url(#mountainGradient)"
            opacity="0.6"
          />
          <path
            d="M200,400 L250,320 L300,310 L350,290 L400,300 L450,280 L500,290 L550,270 L600,280 L650,260 L700,270 L750,250 L800,260 L850,240 L900,250 L950,230 L1000,240 L1050,220 L1100,230 L1150,210 L1200,240 L1200,400 Z"
            fill="url(#mountainGradient)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Middle ground - Lost City ruins (Columns) */}
      <div className="absolute bottom-0 left-0 right-0 h-[50vh]">
        {columnData.map((col) => (
          <motion.div
            key={col.id}
            className="absolute bottom-0 w-8 bg-gradient-to-t from-gray-800 to-gray-600"
            style={{
              left: `${col.left}%`,
              height: `${col.height}%`,
              opacity: 0.6,
              willChange: shouldReduceMotion ? undefined : 'transform',
            }}
            // Only apply animation if motion is NOT reduced
            initial={shouldReduceMotion ? false : { scaleY: 0 }}
            animate={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : {
              duration: 0.8,
              delay: col.delay,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {/* Column top (capital) */}
            <div className="absolute -top-2 left-0 right-0 h-4 bg-gray-700 rounded-t-lg" />
          </motion.div>
        ))}
      </div>

      {/* Foreground - ground/dust particles */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-amber-900/60 via-gray-800/40 to-transparent">
        {/* Dust particles effect */}
        <div className="absolute inset-0 opacity-30">
          {!shouldReduceMotion && particleData.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-amber-200 rounded-full"
              style={{
                left: `${particle.left}%`,
                bottom: `${particle.bottom}%`,
                willChange: 'transform, opacity',
              }}
              animate={{
                y: [-10, -30, -50],
                opacity: [0.5, 0.8, 0],
                scale: [1, 1.5, 2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Atmospheric glow from Lost City */}
      <motion.div
        className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
        // Only animate if motion is NOT reduced
        animate={shouldReduceMotion ? {} : {
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={shouldReduceMotion ? { duration: 0 } : {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
});

export default function OutdoorReveal({ isForward }) {
  const shouldReduceMotion = useReducedMotion();

  // 1. Use useMemo to prevent re-calculating variants on every render
  const variants = useMemo(() => ({
    landscape: {
      // Static final state for reduced motion
      static: { opacity: 1, scale: 1 },
      // Animation states
      hidden: { opacity: 0, scale: 1.15 },
      reveal: {
        opacity: 1, scale: 1,
        transition: { duration: 1.0, delay: isForward ? 1.4 : 0.8, ease: [0.25, 0.1, 0.25, 1] }
      },
      hide: {
        opacity: 0, scale: 1.15,
        transition: { duration: 0.8, delay: isForward ? 0 : 2.6, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    cameraMove: {
      static: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
      initial: { scale: 1, y: 0, rotateX: 0, rotateY: 0 },
      zoomIn: {
        scale: 1.5, y: '-10%', rotateX: -5, rotateY: 0,
        transition: { duration: 1.2, delay: 2.4, ease: [0.25, 0.1, 0.25, 1] }
      },
      zoomOut: {
        scale: 1, y: 0, rotateX: 0, rotateY: 0,
        transition: { duration: 1.2, delay: 1.8, ease: [0.25, 0.1, 0.25, 1] }
      }
    },
    door: {
      static: { x: '-100%', opacity: 0 }, // Final 'open' state for reduced motion
      closed: { x: '0%', opacity: 0.85 },
      opening: {
        x: '-100%', opacity: 0,
        transition: { duration: 0.9, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }
      },
      closing: {
        x: '0%', opacity: 0.85,
        transition: { duration: 1.0, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }
      }
    }
  }), [isForward]); // Recalculate only when direction changes

  // Determine the animation state based on direction and reduced motion setting
  const landscapeAnimate = shouldReduceMotion
    ? "static"
    : isForward ? "reveal" : "hide";

  const cameraAnimate = shouldReduceMotion
    ? "static"
    : isForward ? "zoomIn" : "zoomOut";

  const doorAnimate = shouldReduceMotion
    ? "static" // Door is 'opened' instantly
    : isForward ? "opening" : "closing";

  return (
    <>
      {/* 3. Combined Camera Movement and Landscape */}
      {/* Use static state as initial and animate to ensure content shows up instantly */}
      <motion.div
        className="absolute inset-0"
        variants={variants.landscape}
        initial={shouldReduceMotion ? "static" : "hidden"}
        animate={landscapeAnimate}
        style={{ willChange: shouldReduceMotion ? undefined : 'transform, opacity' }}
      >
        <motion.div
          variants={variants.cameraMove}
          initial={shouldReduceMotion ? "static" : "initial"}
          animate={cameraAnimate}
          className="absolute inset-0"
          style={{
            perspective: '2000px',
            transformStyle: 'preserve-3d',
            willChange: shouldReduceMotion ? undefined : 'transform',
          }}
        >
          {/* The LostCityLandscape component itself */}
          <LostCityLandscape />
          
          {/* 4. Camera HUD/Frame - Conditionally render or disable animation */}
          {!shouldReduceMotion && (
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Camera frame border - gets bigger as camera zooms */}
              <motion.div 
                className="absolute inset-[3%] border-2 border-teal-400/40 rounded-lg shadow-[0_0_80px_rgba(16,185,129,0.5)]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  boxShadow: [
                    '0 0 50px rgba(16,185,129,0.3)',
                    '0 0 100px rgba(16,185,129,0.6)',
                    '0 0 50px rgba(16,185,129,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Corner brackets */}
              <div className="absolute top-[3%] left-[3%] w-10 h-10 border-t-2 border-l-2 border-teal-400/60" />
              <div className="absolute top-[3%] right-[3%] w-10 h-10 border-t-2 border-r-2 border-teal-400/60" />
              <div className="absolute bottom-[3%] left-[3%] w-10 h-10 border-b-2 border-l-2 border-teal-400/60" />
              <div className="absolute bottom-[3%] right-[3%] w-10 h-10 border-b-2 border-r-2 border-teal-400/60" />
              
              {/* Motion lines - show forward movement */}
              {isForward && (
                <div className="absolute inset-0">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-px bg-teal-400/20"
                      style={{ left: '0%', width: '100%', top: `${15 + i * 15}%` }}
                      animate={{ opacity: [0, 0.4, 0], scaleX: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Door/window overlay that "opens" */}
      <motion.div
        className="absolute inset-0 bg-black z-20"
        variants={variants.door}
        initial={shouldReduceMotion ? "static" : "closed"}
        animate={doorAnimate}
        style={{ 
          willChange: shouldReduceMotion ? undefined : 'transform, opacity',
          transformOrigin: 'left center',
        }}
      />
    </>
  );
}
