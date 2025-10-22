import React, { memo } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../../UI/SectionTitle.jsx';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Hero() {
  return (
    <section
      id="hero"
      // --- CORRECTED: Replaced opaque colors with bg-transparent and a slight dark mode overlay ---
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 
                 bg-transparent dark:bg-black/30 transition-colors duration-500 relative overflow-hidden"
    >
      <motion.div
        className="max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/*
           NOTE: We rely on the SectionTitle component's internal margins and the 
           mt-4 on the paragraph below to keep the text vertically centered and tight.
        */}
        <SectionTitle text="Soumyadeep Chakravarti" />

        <motion.p
          // mt-4 for tighter vertical spacing after the title
          className="mt-4 text-xl md:text-2xl max-w-2xl text-gray-600 dark:text-gray-300 font-light"
          variants={itemVariants}
        >
          A **Full-Stack Developer** & problem solver focused on building engaging, functional, and performant web applications.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          variants={itemVariants}
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300
                       bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl active:scale-95"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-semibold transition-all duration-300
                       text-teal-600 border-2 border-teal-600 dark:text-teal-400 dark:border-teal-400
                       hover:bg-teal-50 dark:hover:bg-gray-800 active:scale-95"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Hero);
