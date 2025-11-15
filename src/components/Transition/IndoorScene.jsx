import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const IndoorScene = ({ isForward }) => {
  const shouldReduceMotion = useReducedMotion();

  // Indoor scene variants
  const indoorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { 
        duration: 0.8,
        delay: isForward ? 2.0 : 0,
      }
    }
  };

  const cameraVariants = {
    initial: { 
      x: 0, 
      y: 0, 
      scale: 1,
      rotateY: 0,
      rotateX: 0,
    },
    // Forward: camera moves toward window
    moveToWindow: {
      x: '10%',
      y: '-5%',
      scale: 1.05,
      rotateY: -5,
      rotateX: 2,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // easeInOut
      }
    },
    // Reverse: camera returns from window
    returnFromWindow: {
      x: 0,
      y: 0,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: 2.4,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  const windowVariants = {
    closed: {
      scale: 1,
      opacity: 0.3,
      filter: 'brightness(0.5)',
    },
    opening: {
      scale: 1.2,
      opacity: 0.9,
      filter: 'brightness(1.2)',
      transition: {
        duration: 0.8,
        delay: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    closing: {
      scale: 1,
      opacity: 0.3,
      filter: 'brightness(0.5)',
      transition: {
        duration: 1.0,
        delay: 1.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
      variants={indoorVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Indoor room background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Room walls/decor */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-gray-800/40 to-gray-900/60" />
        
        {/* Window area (top right) */}
        <motion.div
          className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-gradient-to-b from-sky-900/30 to-gray-900/50"
          variants={windowVariants}
          animate={
            isForward ? "opening" : "closing"
          }
        >
          {/* Window frame effect */}
          <div className="absolute inset-4 border-4 border-amber-800/40 rounded-lg" />
          <div className="absolute inset-8 border-2 border-amber-600/20" />
        </motion.div>

        {/* Desk/table surface (bottom) */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-t from-gray-900/80 to-transparent">
          {/* Wood grain texture effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-amber-700/20"
                style={{ bottom: `${i * 8}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Camera viewfinder/frame - shows camera perspective */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        variants={cameraVariants}
        initial="initial"
        animate={isForward ? "moveToWindow" : "returnFromWindow"}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Camera frame border */}
        <div className="absolute inset-[5%] border-2 border-teal-400/30 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.3)]" />
        {/* Corner brackets for viewfinder feel */}
        <div className="absolute top-[5%] left-[5%] w-8 h-8 border-t-2 border-l-2 border-teal-400/50" />
        <div className="absolute top-[5%] right-[5%] w-8 h-8 border-t-2 border-r-2 border-teal-400/50" />
        <div className="absolute bottom-[5%] left-[5%] w-8 h-8 border-b-2 border-l-2 border-teal-400/50" />
        <div className="absolute bottom-[5%] right-[5%] w-8 h-8 border-b-2 border-r-2 border-teal-400/50" />
        
        {/* Motion blur effect - subtle overlay to show movement */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{
            x: ['-100%', '100%'],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Camera container - wraps the SimplifiedResume */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={cameraVariants}
        initial="initial"
        animate={isForward ? "moveToWindow" : "returnFromWindow"}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Simplified Resume displayed on a "tablet" or "screen" on the desk */}
        <motion.div
          className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg shadow-2xl overflow-hidden"
          style={{
            transform: 'rotateX(5deg)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 100px rgba(0,0,0,0.5)',
            willChange: 'transform, opacity',
          }}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            transition: { duration: 0.5, delay: 0.2 }
          }}
        >
          {/* Screen glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
          
          {/* Simplified Resume content - static placeholder during transition for performance */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400 text-lg">Resume Preview</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IndoorScene;

