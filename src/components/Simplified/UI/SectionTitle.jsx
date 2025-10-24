import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

// Separate classes for better readability and maintainability
const TITLE_CLASSES = "text-3xl md:text-4xl font-extrabold relative inline-block mb-10 text-gray-900 dark:text-white";
const UNDERLINE_CLASSES = "block h-1 bg-teal-500 dark:bg-teal-400 mt-2 rounded-full";

function SectionTitle({ text }) {
  return (
    <motion.h2
      className={TITLE_CLASSES}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      // IMPROVEMENT: Changed amount to 'some'. Starts animation when any part is visible.
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.6 }}
    >
      {text}
      {/* Animated underline */}
      <motion.span
        className={UNDERLINE_CLASSES}
        initial={{ width: 0 }}
        whileInView={{ width: '100%' }}
        viewport={{ once: true }}
        // Increased the easing for a snappier, professional reveal
        transition={{ duration: 0.8, delay: 0.4, ease: [0.17, 0.55, 0.55, 1] }} 
      />
    </motion.h2>
  );
}

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default memo(SectionTitle);
