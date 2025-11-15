import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCinematic } from '../../context/CinematicModeContext.jsx';

const ModeToggle = () => {
  const { mode, toggleMode } = useCinematic();
  const shouldReduceMotion = useReducedMotion();
  
  const isCinematic = mode === "cinematic" || mode === "transitioning-to-cinematic";
  const isDisabled = mode === "transitioning-to-cinematic" || mode === "transitioning-to-simplified";

  const containerVariants = {
    simplified: { x: 0 },
    cinematic: { x: 52 }, // Width of toggle button minus handle width
  };

  const handleVariants = shouldReduceMotion
    ? {
        simplified: { x: 0 },
        cinematic: { x: 48 },
      }
    : {
        simplified: { 
          x: 0,
          rotate: 0,
        },
        cinematic: { 
          x: 48,
          rotate: 180,
        },
      };

  return (
    <motion.button
      onClick={toggleMode}
      disabled={isDisabled}
      className="relative flex items-center gap-2 px-2 py-2 rounded-full bg-gray-200 dark:bg-gray-800 
                 border-2 border-gray-300 dark:border-gray-700 
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors duration-200"
      aria-label={isCinematic ? "Switch to simplified mode" : "Switch to cinematic mode"}
      aria-pressed={isCinematic}
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
    >
      {/* Background indicator */}
      <motion.div
        className="absolute left-1 top-1 bottom-1 w-12 bg-teal-500 rounded-full"
        variants={containerVariants}
        animate={isCinematic ? "cinematic" : "simplified"}
        transition={shouldReduceMotion ? { duration: 0.2 } : { type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Toggle handle */}
      <motion.div
        className="relative z-10 w-12 h-12 rounded-full bg-white dark:bg-gray-100 
                   shadow-lg flex items-center justify-center"
        variants={handleVariants}
        animate={isCinematic ? "cinematic" : "simplified"}
        transition={shouldReduceMotion ? { duration: 0.2 } : { type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Icon - simplified mode (tablet/indoor icon) */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-gray-700 dark:text-gray-800"
          initial={false}
          animate={isCinematic ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="12" y1="18" x2="12" y2="18" />
        </motion.svg>

        {/* Icon - cinematic mode (mountain/outdoor icon) */}
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute w-6 h-6 text-gray-700 dark:text-gray-800"
          initial={false}
          animate={isCinematic ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M12 3L2 21h20L12 3z" />
          <path d="M12 3l6 18" />
          <path d="M12 3L6 21" />
        </motion.svg>
      </motion.div>

      {/* Labels */}
      <div className="relative z-0 flex items-center gap-3 ml-2">
        <span 
          className={`text-sm font-medium transition-colors duration-200 ${
            !isCinematic 
              ? 'text-gray-900 dark:text-white' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Simplified
        </span>
        <span 
          className={`text-sm font-medium transition-colors duration-200 ${
            isCinematic 
              ? 'text-gray-900 dark:text-white' 
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Cinematic
        </span>
      </div>
    </motion.button>
  );
};

export default ModeToggle;

