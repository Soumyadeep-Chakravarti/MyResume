import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function Card({ title, subtitle, link }) {
  return (
    <motion.a
      href={link || '#'}
      target={link ? '_blank' : '_self'}
      className="block p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}
    </motion.a>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  link: PropTypes.string,
};

