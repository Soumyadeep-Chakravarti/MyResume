import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const SceneObelisks = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sceneRef = React.useRef(null);
  
  // Calculate this scene's scroll progress (third scene: 0.4-0.6 of total)
  const sceneStart = 0.4;
  const sceneEnd = 0.6;
  const sceneProgress = useTransform(scrollYProgress, [sceneStart, sceneEnd], [0, 1]);
  
  // Depth effects
  const translateZ = useTransform(sceneProgress, [0, 1], [-200, 0]);
  const scale = useTransform(sceneProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(sceneProgress, [0, 1], [0, 1]);

  // Skill categories data
  const skillCategories = [
    { name: "Languages", skills: ["JavaScript", "TypeScript", "Python", "Java", "Kotlin", "Rust", "C", "C++"] },
    { name: "Frameworks", skills: ["React", "Node.js", "Tailwind CSS"] },
    { name: "Tools", skills: ["Docker", "Git", "Linux", "SQL"] },
  ];

  // Obelisk light-up animation based on scroll
  const getObeliskLightProgress = (index, total) => {
    return useTransform(sceneProgress, [
      0.1 + (index / total) * 0.6,
      0.1 + ((index + 1) / total) * 0.6
    ], [0, 1]);
  };

  return (
    <section
      ref={sceneRef}
      className="sticky top-0 flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', willChange: 'transform' }}
    >
      {/* Background layer - Lost City plaza */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-amber-800"
        style={{
          opacity: 0.8,
          willChange: 'transform',
        }}
      >
        {/* Ancient plaza floor pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-30">
          <svg viewBox="0 0 1200 400" className="w-full h-full">
            <pattern id="plazaPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.3" />
              <circle cx="50" cy="50" r="5" fill="#10b981" opacity="0.2" />
            </pattern>
            <rect width="1200" height="400" fill="url(#plazaPattern)" />
          </svg>
        </div>
      </motion.div>

      {/* Main content layer - Obelisks */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8"
        style={{
          translateZ: translateZ,
          scale: scale,
          opacity: opacity,
          willChange: 'transform',
        }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-teal-400"
          style={{ textShadow: '0 0 30px rgba(16, 185, 129, 0.8)' }}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          The Obelisks of Knowledge
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, catIndex) => (
            <div key={category.name} className="space-y-4">
              <motion.h3
                className="text-2xl font-bold text-amber-400 text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: catIndex * 0.2 }}
              >
                {category.name}
              </motion.h3>
              
              <div className="flex flex-col items-center gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const lightProgress = useTransform(
                    sceneProgress,
                    [
                      0.1 + ((catIndex * category.skills.length + skillIndex) / (skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0))) * 0.6,
                      0.1 + ((catIndex * category.skills.length + skillIndex + 1) / (skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0))) * 0.6
                    ],
                    [0, 1]
                  );
                  
                  const glowHeight = useTransform(lightProgress, [0, 1], [0, 100]);
                  const glowOpacity = useTransform(lightProgress, [0, 0.5, 1], [0, 1, 1]);

                  return (
                    <motion.div
                      key={skill}
                      className="relative w-20 group"
                      whileHover={{ scale: 1.1, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Obelisk base to top glow */}
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 bg-teal-400 rounded-t-full origin-bottom"
                        style={{
                          height: glowHeight,
                          opacity: glowOpacity,
                          boxShadow: '0 0 20px rgba(16, 185, 129, 0.8), inset 0 0 10px rgba(16, 185, 129, 0.6)',
                        }}
                      />

                      {/* Obelisk structure */}
                      <motion.div
                        className="relative w-full bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 
                                   rounded-t-lg border-2 border-teal-400/50 shadow-lg
                                   group-hover:border-teal-400 group-hover:shadow-2xl group-hover:shadow-teal-400/50
                                   transition-all duration-300"
                        style={{
                          height: '120px',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        }}
                        animate={{
                          boxShadow: [
                            '0 10px 30px rgba(0,0,0,0.5)',
                            '0 10px 40px rgba(16, 185, 129, 0.4)',
                            '0 10px 30px rgba(0,0,0,0.5)',
                          ],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: skillIndex * 0.2,
                          ease: "easeInOut",
                        }}
                      >
                        {/* Obelisk tip */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-400 rounded-full
                                        group-hover:scale-150 group-hover:shadow-lg group-hover:shadow-teal-400/80
                                        transition-all duration-300" />
                        
                        {/* Skill name */}
                        <motion.div
                          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                                     text-sm font-semibold text-gray-300 group-hover:text-teal-400
                                     transition-colors duration-300"
                        >
                          {skill}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Foreground layer - Atmospheric particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.4,
          willChange: 'transform',
        }}
      >
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -80, -140],
              opacity: [0.4, 0.8, 0],
              scale: [1, 1.5, 2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default SceneObelisks;

