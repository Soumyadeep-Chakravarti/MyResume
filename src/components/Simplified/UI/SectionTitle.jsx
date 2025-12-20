// src/components/Simplified/UI/SectionTitle.jsx

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// Utility function for clean class management
const clsx = (...classes) => classes.filter(Boolean).join(' ');

// Define base classes for text and underline
const BASE_TITLE_CLASSES = "relative inline-block mb-10";
const TEXT_CLASSES = "text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight";
const UNDERLINE_CLASSES = "absolute left-0 bottom-0 h-1 bg-teal-500 dark:bg-teal-400 rounded-full";


function SectionTitle({ text, level = 'h2' }) {
    // Determine the correct HTML heading tag based on the 'level' prop (for SEO/A11Y)
    const HTag = motion[level];

    return (
        <HTag
            className={clsx(BASE_TITLE_CLASSES, TEXT_CLASSES)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            // Stagger duration for a small pause before the underline starts
            transition={{ duration: 0.6 }} 
            viewport={{ once: true, amount: "some" }}
        >
            {/* The actual visible text */}
            <span className="relative z-10">{text}</span>

            {/* Animated underline. Absolute positioning allows it to be placed precisely */}
            <motion.span
                className={UNDERLINE_CLASSES}
                initial={{ width: 0 }}
                // Animate to full width relative to the parent HTag size
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                // Increased delay slightly to make the title appear first
                transition={{ 
                    duration: 0.8, 
                    delay: 0.4, 
                    ease: [0.17, 0.55, 0.55, 1] // Snappy custom ease
                }} 
            />
        </HTag>
    );
}

SectionTitle.propTypes = {
    text: PropTypes.string.isRequired,
    // Optional prop to enforce semantic heading structure (h2-h4)
    level: PropTypes.oneOf(['h2', 'h3', 'h4']), 
};


export default memo(SectionTitle);
