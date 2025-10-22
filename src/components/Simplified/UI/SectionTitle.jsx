import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function SectionTitle({ text }) {
  // Use whileInView for lazy-loading animations (runs only when scrolled into view)
  return (
    <motion.h2
      className="text-3xl md:text-4xl font-extrabold relative inline-block mb-10 text-gray-900 dark:text-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }} // Runs when the element enters the viewport
      viewport={{ once: true, amount: 0.5 }} // Runs only once, when 50% of the element is visible
      transition={{ duration: 0.6 }}
    >
      {text}
      {/* Animated underline for a dynamic effect */}
      <motion.span
        className="block h-1 bg-teal-500 dark:bg-teal-400 mt-2 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }} // Animated underline width when in view
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      />
    </motion.h2>
  );
}

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

// Memoize the component to prevent re-renders when the parent re-renders
export default memo(SectionTitle);
