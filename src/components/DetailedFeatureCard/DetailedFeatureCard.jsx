// src/components/DetailedFeatureCard/DetailedFeatureCard.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DetailedFeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Slide in from left/right based on index - INCREASED X TRANSFORM RANGE for more exaggeration
    const x = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        index % 2 === 0 ? [-300, 0, 0, 300] : [300, 0, 0, -300] // Increased from +/-100 to +/-300
    );

    // Omni-directional movement: Y transform now also starts from an exaggerated position
    const y = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        index % 2 === 0 ? [200, 0, 0, -200] : [-200, 0, 0, 200] // Starts from bottom/top, moves to 0, then continues subtle parallax
    );

    // Fade in/out
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Subtle scale effect - Adjusted to make cards slightly smaller to avoid overlap
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95 * 1.4, 1.4, 1.4, 0.95 * 1.4]); // Scaled all values by 1.4 (reduced from 1.5)

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            style={{ y, x, opacity, scale }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 p-12 rounded-2xl shadow-xl
                        bg-card-background border border-border-color/50 max-w-6xl mx-auto
                        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`} // Alternating layout
        >
            <div className="md:w-1/2 flex justify-center items-center p-4"> {/* Added padding to image container */}
                <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto rounded-lg shadow-xl object-cover transform transition-transform duration-300 hover:scale-105" // Added hover effect
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/000000?text=Image+Error"; }}
                />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <div className="mb-6 p-4 rounded-full bg-primary/10 inline-block shadow-md"> {/* Increased padding and added shadow to icon container */}
                    {feature.icon}
                </div>
                <h3 className="text-4xl font-bold text-text-primary mb-4 leading-tight"> {/* Increased font size */}
                    {feature.title}
                </h3>
                <div className="text-lg text-text-secondary leading-relaxed"> {/* Increased font size and line height for description */}
                    {feature.description} {/* Renders the description component */}
                </div>
            </div>
        </motion.div>
    );
};

export default DetailedFeatureCard;
