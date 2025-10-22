// src/components/Simplified/Sections/About.jsx
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle";
// NOTE: CursorContext and the associated handler are removed
// as global cursor tracking should be handled at a higher component level
// to prevent excessive re-renders on every section.

export default function About() {
  // 1. Removed useContext(CursorContext) and the handleMouseMove useCallback
  // for optimization, as global mouse tracking is expensive on large sections.

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden
                 bg-gradient-to-b from-white/80 to-white/40 dark:from-black/30 dark:to-black/60 py-20"
      // 2. Removed onMouseMove={handleMouseMove}
    >
      <SectionTitle text="About Me" />

      <motion.p
        className="mt-6 text-lg md:text-xl max-w-3xl text-gray-800 dark:text-gray-200 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        I am{" "}
        {/* 3. Removed continuous infinite 'animate' prop for performance */}
        <span
          className="font-extrabold text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 inline-block"
        >
          Soumyadeep Chakravarti
        </span>
        , a{" "}
        {/* 3. Removed continuous infinite 'animate' prop for performance */}
        <span
          className="font-bold text-teal-600 dark:text-teal-400 inline-block"
        >
          full-stack developer
        </span>{" "}
        with experience building{" "}
        {/* 3. Removed continuous infinite 'animate' prop for performance */}
        <span
          className="font-bold text-teal-600 dark:text-teal-400 inline-block"
        >
          interactive, user-friendly web applications
        </span>
        . I enjoy transforming ideas into real-world solutions using modern web technologies and a passion for clean, performant code.
      </motion.p>
    </section>
  );
}
