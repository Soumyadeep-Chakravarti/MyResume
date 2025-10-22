import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

/**
 * Props:
 * - count: number of particles
 * - colors: array of tailwind color classes or hex strings
 * - sizeRange: [min, max] in px (or Tailwind class mapping)
 * - durationRange: [min, max] seconds for animation duration
 * - blur: boolean for motion blur effect
 */
function Particles({
  count = 16,
  colors = ["bg-teal-400/30", "bg-yellow-400/30", "bg-purple-400/30"],
  sizeRange = [1, 3],
  durationRange = [15, 30],
  blur = true,
}) {
  const particleData = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.floor(Math.random() * (sizeRange[1] - sizeRange[0] + 1)) + sizeRange[0];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const duration = Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0];
      return {
        key: i,
        className: `${blur ? "blur-sm" : ""} ${color} rounded-full w-${size} h-${size}`,
        initialStyle: {
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        },
        animation: {
          y: ["0%", "100%"],
          x: [`${Math.random() * 4 - 2}rem`, `${Math.random() * 4 - 2}rem`],
          opacity: [0.1, 0.4, 0.1],
        },
        transition: {
          repeat: Infinity,
          duration,
          ease: "easeInOut",
          delay: Math.random() * 6,
        },
      };
    });
  }, [count, colors, sizeRange, durationRange, blur]);

  return (
    <>
      {particleData.map(({ key, className, initialStyle, animation, transition }) => (
        <motion.div
          key={key}
          className={`absolute ${className}`}
          style={initialStyle}
          animate={animation}
          transition={transition}
        />
      ))}
    </>
  );
}

export default memo(Particles);

