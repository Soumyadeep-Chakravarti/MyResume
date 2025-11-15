import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Linkedin, Github, Instagram, Mail } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const SceneBeacon = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const sceneRef = React.useRef(null);
  
  // Calculate this scene's scroll progress (fifth scene: 0.8-1.0 of total)
  const sceneStart = 0.8;
  const sceneEnd = 1.0;
  const sceneProgress = useTransform(scrollYProgress, [sceneStart, sceneEnd], [0, 1]);
  
  // Depth effects
  const translateZ = useTransform(sceneProgress, [0, 1], [-200, 0]);
  const scale = useTransform(sceneProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(sceneProgress, [0, 1], [0, 1]);

  // Beacon ascent animation
  const beaconScale = useTransform(sceneProgress, [0, 0.7, 1], [0.5, 1.2, 1]);
  const beaconGlow = useTransform(sceneProgress, [0, 0.5, 1], [0.3, 1, 0.8]);

  const socialLinks = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/soumyadeep-chakravarti-03237028a/", icon: Linkedin, color: "bg-blue-600 hover:bg-blue-700" },
    { name: "GitHub", href: "https://github.com/Soumyadeep-Chakravarti", icon: Github, color: "bg-gray-800 hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white" },
    { name: "Instagram", href: "https://www.instagram.com/soumyadeep_chakravarti?igsh=a213cjdpNXJkbXh1", icon: Instagram, color: "bg-pink-600 hover:bg-pink-700" },
    { name: "Discord", href: "https://discordapp.com/users/1141007161070194748", icon: FaDiscord, color: "bg-indigo-500 hover:bg-indigo-600" },
  ];

  return (
    <section
      ref={sceneRef}
      className="sticky top-0 flex items-center justify-center overflow-hidden"
      style={{ height: '100vh', willChange: 'transform' }}
    >
      {/* Background layer - Tower structure */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-sky-900 via-purple-900 to-indigo-900"
        style={{
          opacity: 0.9,
          willChange: 'transform',
        }}
      >
        {/* Tower silhouette in background */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[70vh] opacity-30">
          <svg viewBox="0 0 200 700" className="w-full h-full">
            <path
              d="M100,700 L100,100 Q100,50 50,50 L50,700 Z M100,700 L150,700 L150,50 Q100,50 100,100 Z"
              fill="url(#towerGradient)"
            />
            <defs>
              <linearGradient id="towerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Main content layer - Beacon and Contact */}
      <motion.div
        className="relative z-10 w-full max-w-4xl mx-auto px-8 text-center"
        style={{
          translateZ: translateZ,
          scale: scale,
          opacity: opacity,
          willChange: 'transform',
        }}
      >
        {/* Glowing Beacon */}
        <motion.div
          className="relative mb-12"
          style={{
            scale: beaconScale,
            willChange: 'transform',
          }}
        >
          <motion.div
            className="w-32 h-32 mx-auto bg-gradient-to-b from-teal-400 via-blue-500 to-purple-500 
                       rounded-full shadow-2xl relative"
            style={{
              boxShadow: useTransform(
                beaconGlow,
                (g) => `0 0 ${g * 80}px rgba(16, 185, 129, ${g}), 0 0 ${g * 120}px rgba(59, 130, 246, ${g * 0.6})`
              ),
            }}
            animate={{
              rotate: [0, 360],
              boxShadow: [
                '0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
                '0 0 80px rgba(16, 185, 129, 1), 0 0 120px rgba(59, 130, 246, 0.6)',
                '0 0 40px rgba(16, 185, 129, 0.8), 0 0 60px rgba(59, 130, 246, 0.4)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Beacon inner glow */}
            <div className="absolute inset-4 bg-gradient-to-br from-white to-teal-300 rounded-full opacity-60 blur-sm" />
          </motion.div>

          {/* Beacon rays */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 w-1 h-32 bg-gradient-to-b from-teal-400 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: 'bottom center',
                rotate: i * 45,
                opacity: 0.6,
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scaleY: [1, 1.5, 1],
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

        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 text-teal-400"
          style={{ textShadow: '0 0 30px rgba(16, 185, 129, 0.8)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          The Beacon
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2 }}
        >
          Let's connect and build something amazing together.
        </motion.p>

        {/* Contact Links */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center justify-center p-4 rounded-xl text-white font-semibold 
                         transition-all duration-300 ${link.color} shadow-lg`}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <link.icon size={32} className="mb-2" />
              <span className="text-sm">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Email CTA */}
        <motion.a
          href="mailto:soumyadeepsai1@gmail.com"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold
                     bg-teal-600 hover:bg-teal-700 shadow-xl transition-all duration-300
                     text-lg md:text-xl"
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 1 }}
        >
          <Mail size={24} />
          Send a Direct Email
        </motion.a>
      </motion.div>

      {/* Foreground layer - Signal particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.5,
          willChange: 'transform',
        }}
      >
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -180],
              opacity: [0.5, 1, 0],
              scale: [1, 2, 3],
            }}
            transition={{
              duration: 7 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 7,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default SceneBeacon;

