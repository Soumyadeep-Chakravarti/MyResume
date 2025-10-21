import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IconGrid = ({ icons, size = 28, gap = "gap-4", showLabels = false, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % icons.length);
    }, interval);

    return () => clearInterval(timer);
  }, [icons.length, interval]);

  const iconVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  return (
    <div className={`flex flex-wrap justify-center ${gap}`}>
      <AnimatePresence mode="wait">
        {icons.slice(currentIndex, currentIndex + 1).map(({ Icon, label }, idx) => (
          <motion.div
            key={currentIndex}
            className="flex flex-col items-center text-center"
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <Icon size={size} className="text-primary" />
            {showLabels && <span className="text-xs mt-1 opacity-75">{label}</span>}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default IconGrid;

