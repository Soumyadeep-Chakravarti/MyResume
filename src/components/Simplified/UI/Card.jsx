import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// NOTE: Assuming a simple 'clsx' utility is available or defined inline for cleaner class management.
const clsx = (...classes) => classes.filter(Boolean).join(' ');

function Card({ title, subtitle, link, stars, language, updatedAt, className }) {
  // 1. Determine the appropriate motion component tag semantically
  const Tag = link ? motion.a : motion.div;
  
  // Use a string for the target/rel attributes only if the link exists
  const targetAttr = link ? '_blank' : undefined;
  const relAttr = link ? 'noopener noreferrer' : undefined;

  // 2. Define the combined class string using clsx for clarity
  const combinedClassName = clsx(
    "block p-6 rounded-lg shadow-md transition-shadow duration-300",
    "bg-white dark:bg-gray-700 hover:shadow-xl",
    {
      'cursor-pointer': link, // Only apply cursor if it's a link
    },
    className // Append external classes last
  );

  return (
    <Tag
      href={link} // href is only relevant if Tag is motion.a
      target={targetAttr}
      rel={relAttr}
      className={combinedClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
      
      {/* 3. Conditional rendering of subtitle */}
      {subtitle && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">{subtitle}</p>
      )}

      {/* Footer Area */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-300">
        
        {/* 4. Robust Star Check: Use typeof for clarity */}
        {typeof stars === 'number' && (
          <div className="flex items-center gap-2">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            {stars}
          </div>
        )}
        
        <div className="flex items-center gap-4">
          {language && <span>{language}</span>}
          {updatedAt && <span>Updated: {updatedAt}</span>}
        </div>
      </div>
    </Tag>
  );
}

// 5. PropTypes remain correct
Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  link: PropTypes.string,
  stars: PropTypes.number,
  language: PropTypes.node, 
  updatedAt: PropTypes.string,
  className: PropTypes.string,
};

export default memo(Card);
