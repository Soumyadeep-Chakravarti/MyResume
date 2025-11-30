import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// NOTE: Inline definition of a basic class utility for cleaner class management.
const clsx = (...classes) => classes.filter(Boolean).join(' ');

function Card({ title, subtitle, link, stars, language, updatedAt, className }) {
    // 1. Determine the appropriate motion component tag semantically
    // motion.a if link exists, otherwise motion.div
    const Tag = link ? motion.a : motion.div;
    
    // Use a string for the target/rel attributes only if the link exists
    const targetAttr = link ? '_blank' : undefined;
    const relAttr = link ? 'noopener noreferrer' : undefined;

    // 2. Define the combined class string using clsx for clarity
    const combinedClassName = clsx(
        "block p-6 rounded-lg shadow-md transition-shadow duration-300 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800", // Added explicit focus styles
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
            // Use role="link" for accessibility when Tag is motion.div but behaves like a link (if needed), 
            // but since it's used within a `motion.a` context here, this is implicit and correct.
            className={combinedClassName}
            whileHover={{ scale: 1.03 }} // Reduced scale slightly for project cards vs. skill cards
            whileTap={{ scale: 0.98 }}
            // We ensure we pass `tabIndex` only if the element is not natively focusable (i.e., not an 'a' tag)
            tabIndex={link ? undefined : 0} 
        >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            
            {/* 3. Conditional rendering of subtitle */}
            {subtitle && (
                <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3 min-h-[60px]">{subtitle}</p>
            )}

            {/* Footer Area: Adjusted for better mobile/small screen layout */}
            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-sm text-gray-500 dark:text-gray-300">
                
                {/* 4. Robust Star Check: Use typeof for clarity */}
                {typeof stars === 'number' && (
                    <div className="flex items-center gap-2 font-medium whitespace-nowrap">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        {stars}
                    </div>
                )}
                
                <div className="flex flex-wrap gap-x-4 gap-y-1 ml-auto text-xs sm:text-sm">
                    {language && <span className="font-medium text-teal-600 dark:text-teal-400 whitespace-nowrap">{language}</span>}
                    {updatedAt && <span className="whitespace-nowrap">Updated: {updatedAt}</span>}
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
