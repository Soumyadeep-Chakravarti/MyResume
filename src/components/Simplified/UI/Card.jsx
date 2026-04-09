// src/components/UI/Card.jsx

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Star, Link as LinkIcon } from 'lucide-react'; 
import { clsx } from '../../../utils/clsx.js';

// --- Utility: Language Color Mapping for Visual Scannability ---
const getLanguageColorClass = (language) => {
    switch (language) {
        case 'JavaScript': return 'bg-yellow-400';
        case 'TypeScript': return 'bg-blue-600';
        case 'Python': return 'bg-green-600';
        case 'Java': return 'bg-red-500';
        case 'HTML': return 'bg-orange-600';
        case 'CSS': return 'bg-purple-500';
        case 'Go': return 'bg-cyan-500';
        default: return 'bg-gray-400';
    }
};

function Card({ title, subtitle, link, stars, language, updatedAt, className }) {
    // Determine the appropriate component tag (motion.a if link exists, motion.div otherwise)
    const Tag = link ? motion.a : motion.div;

    // Use a string for the target/rel attributes only if the link exists
    const targetAttr = link ? '_blank' : undefined;
    const relAttr = link ? 'noopener noreferrer' : undefined;

    // Define the combined class string using clsx
    const combinedClassName = clsx(
        // Core layout for consistent height (flex-col and h-full)
        "flex flex-col h-full p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700",
        // Visual styling and smooth transition
        "bg-white dark:bg-gray-800 transition-all duration-300",
        className
    );
    
    // Define Framer Motion props for a professional, subtle hover effect
    const motionProps = {
        // Subtle lift (y: -5) and a clean shadow effect
        whileHover: { y: -5, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)" }, 
        whileTap: { scale: 0.99 },
    };

    return (
        <Tag
            href={link}
            target={targetAttr}
            rel={relAttr}
            className={combinedClassName}
            // A11Y: Provides a clear description for screen readers
            aria-label={link ? `View project ${title} on GitHub` : undefined} 
            {...motionProps}
        >
            {/* Header: Title and Link Icon */}
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mr-2 line-clamp-2">
                    {title}
                </h3>
                {/* Visual indicator for external link */}
                {link && <LinkIcon size={18} className="text-teal-500 dark:text-teal-400 flex-shrink-0" />}
            </div>

            {/* Subtitle/Description (flex-grow ensures it takes up available space) */}
            {subtitle && (
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                    {subtitle}
                </p>
            )}

            {/* Footer Area: Metrics (Pinned to the bottom using mt-auto) */}
            <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs font-medium">

                    {/* Primary Metrics Group (Language & Stars) */}
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                        
                        {/* Language with Color Dot (High Scannability) */}
                        {language && (
                            <span className="flex items-center gap-1.5 text-sm">
                                <span 
                                    className={`w-2 h-2 rounded-full ${getLanguageColorClass(language)}`} 
                                    aria-hidden="true" 
                                />
                                {language}
                            </span>
                        )}

                        {/* Stars (Prominent Metric) */}
                        {typeof stars === 'number' && stars > 0 && (
                            <div className="flex items-center gap-1 text-sm">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="font-semibold">{stars}</span>
                            </div>
                        )}
                    </div>

                    {/* Secondary Metadata (Updated Date) */}
                    {updatedAt && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-4">
                            Updated: {updatedAt}
                        </span>
                    )}
                </div>
            </div>
        </Tag>
    );
}

// PropTypes remain correct
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
