import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useCinematic } from '../../context/CinematicModeContext.jsx';
import IndoorScene from './IndoorScene.jsx';
import OutdoorReveal from './OutdoorReveal.jsx';

const TransitionScene = () => {
  const { mode } = useCinematic();
  // Correctly declared variable: shouldReduceMotion
  const shouldReduceMotion = useReducedMotion();
  
  const isTransitioning = mode === "transitioning-to-cinematic" || mode === "transitioning-to-simplified";
  const isForward = mode === "transitioning-to-cinematic";

  // If we are not transitioning, we don't need to render anything.
  if (!isTransitioning) {
    return null;
  }

  // FIX APPLIED HERE: Use the correctly declared variable name
  if (shouldReduceMotion) { 
    // If reduced motion is preferred, we skip the animated transition wrapper.
    return null;
  }

  // When motion is enabled, run the full cinematic transition sequence.
  return (
    <AnimatePresence mode="wait">
      {/* Since isTransitioning is true here, we render the motion wrapper */}
      <motion.div
        className="fixed inset-0 z-[100] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        style={{ willChange: 'opacity' }}
      >
        <IndoorScene isForward={isForward} />
        <OutdoorReveal isForward={isForward} />
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionScene;
