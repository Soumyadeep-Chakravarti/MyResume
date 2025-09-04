// src/components/LearnMore/LearnMoreHero.jsx
import React from 'react'; // Removed useRef, useEffect as canvas logic moved
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react'; // Example icon
import useDarkMode from '../../hooks/useDarkMode'; // Import the useDarkMode hook
import FluidAnimationBackground from '../Backgrounds/FluidAnimationBackground'; // NEW: Import the background component

// Animation variants for a subtle fade-up and scale-in effect
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
        },
    },
};

const LearnMoreHero = () => {
    const [isDarkMode] = useDarkMode(); // Get the current theme mode

    return (
        <section
            className="relative flex flex-col items-center justify-center w-full min-h-[70vh]
                       text-text-primary transition-colors duration-700 ease-in-out
                       px-4 py-20 sm:px-6 md:px-8 overflow-hidden text-center
                       bg-background" // Base background color
        >
            {/* Render the FluidAnimationBackground component */}
            <FluidAnimationBackground isDarkMode={isDarkMode} />

            <motion.div
                className="relative z-10 max-w-4xl mx-auto p-8 bg-card-background/60
                           rounded-2xl shadow-2xl backdrop-blur-sm border border-border-color/50"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-6">
                    <Sparkles size={64} className="text-primary mx-auto drop-shadow-lg" />
                </motion.div>
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text
                               bg-gradient-to-r from-primary to-secondary
                               mb-6 leading-tight tracking-tight drop-shadow-lg"
                    variants={itemVariants}
                >
                    Deep Dive into Our Story
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
                    variants={itemVariants}
                >
                    Learn about our journey, the principles that guide us, and the technology that powers our vision for the future.
                </motion.p>
            </motion.div>
        </section>
    );
};

export default LearnMoreHero;
