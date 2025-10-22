import React, { memo } from 'react'; // Added memo
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Renamed to PascalCase for the component function
function Card({ title, subtitle, link, stars, language, updatedAt, className }) {
  // Determine if the component should be a link or a plain div (Skills.jsx was passing it as part of another motion.div)
  // For flexibility, it's safer to use a div and let the parent handle links/interaction, or accept a flag.
  // Given the current structure, we'll keep it as motion.a but make 'link' optional.
  
  // NOTE: In the Skills.jsx component, this Card was passed a 'language' prop which was a <Icon /> element, 
  // but here it's rendered inside a <span>. I'm keeping the original rendering but adjusting propTypes.

  const Tag = motion.a;

  return (
    <Tag
      href={link || '#'}
      target={link ? '_blank' : undefined} // Use undefined instead of '_self' if no link exists
      rel={link ? 'noopener noreferrer' : undefined} // Added security for external links
      // The className prop is essential as the Skills component passed styling via it.
      className={`block p-6 rounded-lg bg-white dark:bg-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300 ${className || ''} ${link ? 'cursor-pointer' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      {subtitle && <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
        {(stars || stars === 0) && (
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-500" /> {stars}
          </div>
        )}
        {language && <span>{language}</span>}
        {updatedAt && <span>Updated: {updatedAt}</span>}
      </div>
    </Tag>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  stars: PropTypes.number,
  // Changed to node to support both strings and React elements (like the Icon in Skills.jsx)
  language: PropTypes.node, 
  updatedAt: PropTypes.string,
  // Added className prop for external styling control
  className: PropTypes.string,
};

// Memoize the component for performance
export default memo(Card);
