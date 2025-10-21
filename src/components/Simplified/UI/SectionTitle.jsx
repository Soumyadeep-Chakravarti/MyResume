import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function SectionTitle({ text }) {
  return (
    <motion.h2
      className="text-3xl md:text-4xl font-bold relative inline-block mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
      <motion.span
        className="block h-1 bg-accent mt-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </motion.h2>
  );
}

SectionTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

