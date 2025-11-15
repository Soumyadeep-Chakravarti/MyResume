import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const SceneGate = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sceneRef = React.useRef(null);
  
  // Calculate this scene's scroll progress (first scene: 0-0.2 of total)
  const sceneStart = 0;
  const sceneEnd = 0.2;
  const sceneProgress = useTransform(scrollYProgress, [sceneStart, sceneEnd], [0, 1]);
  
  // Depth effects
  const translateZ = useTransform(sceneProgress, [0, 1], [-200, 0]);
  const scale = useTransform(sceneProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(sceneProgress, [0, 1], [0, 1]);

  // Background parallax (slower)
  const bgTranslateZ = useTransform(sceneProgress, [0, 1], [-400, -100]);
  const bgScale = useTransform(sceneProgress, [0, 1], [0.6, 0.9]);
  
  // Foreground parallax (faster)
  const fgTranslateZ = useTransform(sceneProgress, [0, 1], [100, 300]);
  const fgScale = useTransform(sceneProgress, [0, 1], [1.1, 1.3]);

  const simplifiedVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }
    : {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
      };

  return (
    <section
      ref={sceneRef}
      className="sticky top-0 flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', willChange: 'transform' }}
    >
      {/* Background layer - Distant ruins/architecture */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-amber-900"
        style={{
          translateZ: bgTranslateZ,
          scale: bgScale,
          opacity: 0.6,
          willChange: 'transform',
        }}
      >
        {/* Massive archway silhouette */}
        <svg viewBox="0 0 1200 800" className="absolute bottom-0 left-0 right-0 w-full h-full opacity-30">
          <path
            d="M400,800 L400,400 Q400,200 600,200 Q800,200 800,400 L800,800 Z"
            fill="url(#archGradient)"
            opacity="0.8"
          />
          <defs>
            <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Main content layer - Gate entrance */}
      <motion.div
        className="relative z-10 text-center"
        style={{
          translateZ: translateZ,
          scale: scale,
          opacity: opacity,
          willChange: 'transform',
        }}
      >
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-6"
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.5))',
          }}
          variants={simplifiedVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          Soumyadeep Chakravarti
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          variants={simplifiedVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-teal-400 font-bold">Full-Stack Developer</span> & problem solver
          <br />
          Welcome to the Lost City
        </motion.p>

        {/* Glowing glyphs decoration */}
        <motion.div
          className="mt-12 flex justify-center gap-4"
          variants={simplifiedVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-12 bg-teal-400 rounded-full"
              style={{
                boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Foreground layer - Debris/particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          translateZ: fgTranslateZ,
          scale: fgScale,
          opacity: 0.4,
          willChange: 'transform',
        }}
      >
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -100],
              opacity: [0.5, 0.8, 0],
              scale: [1, 1.5, 2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default SceneGate;

