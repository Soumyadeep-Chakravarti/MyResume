import React, { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// --- Configuration ---
const NAME = "Soumyadeep Chakravarti";

// Variants for the overall container and individual items (paragraphs/buttons)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Item variants for H1, P, and Button
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05 }, // For motion.a gestures
    tap: { scale: 0.95 },   // For motion.a gestures
};

// Variants for the word container to control stagger
const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

// Base Spring Variants for Character/Word-based Title Animation
const baseCharVariants = {
    hidden: { opacity: 0, y: 10, rotateX: 90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

// Simplified Variants for Reduced Motion users
const reducedCharVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
// -----------------------------------------------------------------

function Hero() {
    // Hook to detect user preference for reduced motion
    const shouldReduceMotion = useReducedMotion();
    
    // Select the appropriate character variants
    const finalCharVariants = shouldReduceMotion ? reducedCharVariants : baseCharVariants;

    // Conditionally set the background animation transition properties
    const backgroundTransition = shouldReduceMotion
        ? { duration: 0 } // Stop the animation instantly
        : {
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "yoyo",
        };

    // Conditionally set the background animate properties
    const backgroundAnimate = shouldReduceMotion
        ? { opacity: 0.1, scale: 1, x: '0%', y: '0%' } // Static, subtle state
        : {
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
            x: ['-50%', '50%', '-50%'],
            y: ['50%', '-50%', '50%'],
        };


    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 
                        bg-transparent dark:bg-black/30 transition-colors duration-500 relative overflow-hidden"
        >
            {/* Dynamic Background Element - Motion reduced implementation */}
            <motion.div 
                className="absolute w-40 h-40 md:w-64 md:h-64 bg-teal-500/20 dark:bg-teal-400/10 rounded-full blur-3xl will-change-transform"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={backgroundAnimate}
                transition={backgroundTransition}
            />
            
            <motion.div
                className="max-w-4xl relative z-10 transition-colors duration-500"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Semantic H1 with Wavy/Staggered Text Animation */}
                <motion.h1
                    className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4 whitespace-nowrap md:whitespace-normal transition-colors duration-500"
                    variants={itemVariants} 
                    aria-label={NAME}
                >
                    {NAME.split(" ").map((word, wordIndex) => (
                        <motion.span 
                            key={wordIndex} 
                            variants={wordVariants}
                            className="inline-block"
                        >
                            {word.split("").map((char, charIndex) => (
                                <motion.span 
                                    key={`${wordIndex}-${charIndex}`} 
                                    variants={finalCharVariants}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                            {wordIndex < NAME.split(" ").length - 1 && "\u00A0"} 
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    className="mt-6 text-xl md:text-2xl max-w-2xl text-gray-600 dark:text-gray-300 font-light mx-auto transition-colors duration-500"
                    variants={itemVariants} 
                >
                    A{' '}
                    <span className="font-extrabold text-teal-600 dark:text-teal-400">
                        Full-Stack Developer
                    </span>{' '}
                    & problem solver focused on building engaging, functional, and performant web applications.
                </motion.p>

                {/* --- Action Buttons --- */}
                <motion.div
                    className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <motion.a
                        href="#projects"
                        variants={itemVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300
                                    bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap 
                                    focus:ring-4 focus:ring-teal-500/50 focus:outline-none" // Focus improvement
                    >
                        View Projects
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default memo(Hero);
