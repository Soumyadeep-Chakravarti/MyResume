import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const SceneArchive = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sceneRef = React.useRef(null);
  
  // Calculate this scene's scroll progress (second scene: 0.2-0.4 of total)
  const sceneStart = 0.2;
  const sceneEnd = 0.4;
  const sceneProgress = useTransform(scrollYProgress, [sceneStart, sceneEnd], [0, 1]);
  
  // Depth effects
  const translateZ = useTransform(sceneProgress, [0, 1], [-200, 0]);
  const scale = useTransform(sceneProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(sceneProgress, [0, 1], [0, 1]);

  // Stone tablet rise animation
  const tabletY = useTransform(sceneProgress, [0, 0.5, 1], [200, 0, -50]);
  const tabletOpacity = useTransform(sceneProgress, [0, 0.3, 1], [0, 1, 1]);
  const tabletScale = useTransform(sceneProgress, [0, 0.5, 1], [0.9, 1, 1]);

  // Columns parallax
  const columnTranslateZ = useTransform(sceneProgress, [0, 1], [-300, -50]);

  const simplifiedVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }
    : {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
      };

  return (
    <section
      ref={sceneRef}
      className="sticky top-0 flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', willChange: 'transform' }}
    >
      {/* Background layer - Ruined columns */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-gray-900"
        style={{
          translateZ: columnTranslateZ,
          opacity: 0.7,
          willChange: 'transform',
        }}
      >
        {/* Ruined columns */}
        <div className="absolute inset-0 flex justify-around items-end pb-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="w-16 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600"
              style={{
                height: `${60 + Math.random() * 20}%`,
                opacity: 0.6,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ 
                scaleY: 1,
                transition: {
                  duration: 1,
                  delay: i * 0.1,
                  ease: [0.34, 1.56, 0.64, 1],
                }
              }}
              viewport={{ once: true, margin: "-200px" }}
            >
              {/* Column capital (broken) */}
              <div className="absolute -top-4 left-0 right-0 h-8 bg-gray-700 rounded-t-lg opacity-50" />
              {/* Cracks */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main content layer - Stone Tablet */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-8"
        style={{
          translateZ: translateZ,
          scale: scale,
          opacity: opacity,
          willChange: 'transform',
        }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                     p-8 md:p-12 rounded-lg border-2 border-amber-600/40
                     shadow-2xl"
          style={{
            y: tabletY,
            opacity: tabletOpacity,
            scale: tabletScale,
            boxShadow: '0 20px 60px rgba(0,0,0,0.8), inset 0 0 100px rgba(59, 130, 246, 0.1)',
            willChange: 'transform',
          }}
        >
          {/* Stone texture effect */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-amber-700/30"
                style={{ top: `${i * 10}%` }}
              />
            ))}
          </div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 text-teal-400"
            style={{ textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}
            variants={simplifiedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            The Archive
          </motion.h2>

          <motion.div
            className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-4 relative z-10"
            variants={simplifiedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
          >
            <p>
              Within these ancient halls, knowledge is preserved...
            </p>
            <p>
              I am a passionate <span className="text-teal-400 font-bold">Full-Stack Developer</span> with expertise in 
              building modern web applications. My journey has led me through the realms of 
              React, Node.js, and beyond, solving complex problems with elegant solutions.
            </p>
            <p className="text-amber-400">
              This Lost City represents not just ruins, but the foundation of what we build today.
            </p>
          </motion.div>

          {/* Glowing inscription lines */}
          <motion.div
            className="absolute top-4 left-4 right-4 h-0.5 bg-teal-400/50"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: ['0 0 5px rgba(16, 185, 129, 0.3)', '0 0 15px rgba(16, 185, 129, 0.7)', '0 0 5px rgba(16, 185, 129, 0.3)'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 right-4 h-0.5 bg-teal-400/50"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: ['0 0 5px rgba(16, 185, 129, 0.3)', '0 0 15px rgba(16, 185, 129, 0.7)', '0 0 5px rgba(16, 185, 129, 0.3)'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Foreground layer - Dust particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.3,
          willChange: 'transform',
        }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -40, -70],
              opacity: [0.3, 0.6, 0],
              scale: [1, 1.5, 2],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default SceneArchive;

