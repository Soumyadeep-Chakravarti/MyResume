import React, { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
// Assuming social icons are available, e.g., via lucide-react or react-icons
import { ArrowRight, Download } from 'lucide-react'; 

// --- Configuration ---
const HERO_DATA = {
    NAME: "Soumyadeep Chakravarti",
    // This is now the H2, making it visually and semantically the main description
    TITLE: "Full-Spectrum Software Architect", 
    // Merged description parts for cleaner template use
    DESCRIPTION: "Specializing in designing, building, and operating complex, resilient, and high-performance systems across the entire technology stack, from user interface to cloud operations.",
};

// --- Framer Motion Variants (Unchanged, they are perfect) ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, }, },
};
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (customDelay = 0.0) => ({ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut", delay: customDelay } 
    }),
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
};
const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const baseCharVariants = {
    hidden: { opacity: 0, y: 15, rotateX: 90 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { type: "spring", damping: 12, stiffness: 100, },
    },
};
const reducedCharVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
// -----------------------------------------------------------------


function Hero() {
    const shouldReduceMotion = useReducedMotion();
    
    // Select the appropriate character variants
    const finalCharVariants = useMemo(() => 
        shouldReduceMotion ? reducedCharVariants : baseCharVariants,
        [shouldReduceMotion]
    );

    // --- WavyText component moved inside Hero for direct access to variants ---
    const WavyText = memo(({ text, ariaLabel }) => {
        const words = text.split(" ");
        
        return (
            <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 dark:text-white 
                           text-shadow-sm dark:text-shadow-md mb-4 whitespace-nowrap md:whitespace-normal 
                           transition-colors duration-500"
                variants={itemVariants}
                custom={0.0} // First item in stagger sequence
                aria-label={ariaLabel}
            >
                {words.map((word, wordIndex) => (
                    <motion.span 
                        key={wordIndex} 
                        variants={wordVariants}
                        className="inline-block"
                    >
                        {word.split("").map((char, charIndex) => (
                            <motion.span 
                                key={`${wordIndex}-${charIndex}`} 
                                variants={finalCharVariants} // Uses the memoized variant from parent
                                className="inline-block"
                            >
                                {char}
                            </motion.span>
                        ))}
                        {/* Add a non-breaking space between words */}
                        {wordIndex < words.length - 1 && "\u00A0"} 
                    </motion.span>
                ))}
            </motion.h1>
        );
    });
    // -----------------------------------------------------------------


    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 
                       bg-transparent dark:bg-black/30 transition-colors duration-500 relative overflow-hidden"
        >
            {/* Dynamic Background Element */}
            {!shouldReduceMotion && ( // Hide background motion for reduced motion users
                <motion.div 
                    className="absolute w-40 h-40 md:w-64 md:h-64 bg-teal-500/20 dark:bg-teal-400/10 rounded-full blur-3xl will-change-transform"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                        opacity: [0.1, 0.3, 0.1], 
                        scale: [1, 1.2, 1], 
                        x: ['-50%', '50%', '-50%'], 
                        y: ['50%', '-50%', '50%'],
                        rotate: [0, 360], 
                    }}
                    transition={{
                        duration: 30, // Slightly slower duration
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                    }}
                />
            )}
            
            <motion.div
                className="max-w-4xl relative z-10 transition-colors duration-500"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. Wavy H1 Name */}
                <WavyText 
                    text={HERO_DATA.NAME} 
                    ariaLabel={HERO_DATA.NAME}
                />

                {/* 2. H2 Aspirational Title */}
                <motion.h2
                    className="mt-2 text-2xl md:text-3xl font-bold max-w-2xl mx-auto 
                               text-teal-600 dark:text-teal-400 transition-colors duration-500"
                    variants={itemVariants} 
                    custom={0.2} // Start slightly later than the H1
                >
                    {HERO_DATA.TITLE}
                </motion.h2>

                {/* 3. P Description */}
                <motion.p
                    className="mt-6 text-lg md:text-xl max-w-3xl text-gray-600 dark:text-gray-300 font-light mx-auto transition-colors duration-500"
                    variants={itemVariants} 
                    custom={0.4} // Start after the H2
                >
                    {HERO_DATA.DESCRIPTION}
                </motion.p>

                {/* --- 4. Action Buttons --- */}
                <motion.div
                    className="mt-12 flex flex-col sm:flex-row justify-center gap-4"
                    variants={itemVariants}
                    custom={0.7} // Start after the paragraph
                >
                    {/* Primary CTA: Projects */}
                    <motion.a 
                        href="#projects"
                        whileHover="hover"
                        whileTap="tap"
                        className="px-8 py-3 rounded-full text-white font-semibold transition-all duration-300
                                   bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap
                                   inline-flex items-center justify-center gap-2"
                        aria-label="View my portfolio projects"
                    >
                        View Projects <ArrowRight size={20} />
                    </motion.a>
                    
                    {/*<motion.a 
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover="hover"
                        whileTap="tap"
                        className="px-8 py-3 rounded-full font-semibold transition-all duration-300
                                   text-teal-600 border-2 border-teal-600 dark:text-teal-400 dark:border-teal-400
                                   hover:bg-teal-50 dark:hover:bg-gray-800 active:scale-95 whitespace-nowrap
                                   inline-flex items-center justify-center gap-2"
                        aria-label="Download the full resume as PDF"
                    >
                        Download Resume <Download size={18} />
                    </motion.a>*/}
                </motion.div>
            </motion.div>
        </section>
    );
}

export default memo(Hero);
