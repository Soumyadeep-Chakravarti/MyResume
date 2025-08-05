import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";

// Animation variants for a subtle fade-up and scale-in effect
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Delay children animations
            delayChildren: 0.3,   // Delay start of children animations
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

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section
            className="relative flex flex-col items-center justify-center w-screen min-h-screen
                       bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-zinc-950 dark:to-zinc-800
                       text-gray-900 dark:text-white transition-colors duration-700 ease-in-out
                       px-4 py-20 sm:px-6 md:px-8 overflow-hidden" // Added py-20 for more vertical padding
        >
            {/* Background decorative elements (subtle) */}
            <div className="absolute inset-0 z-0 opacity-20 dark:opacity-1">
                <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-primary-hover rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary-hover rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-accent-dark rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <motion.div
                className="relative z-10 text-center max-w-4xl mx-auto p-6 bg-card-background/60    /* Changed opacity from /70 to /60 */
                           rounded-2xl shadow-xl backdrop-blur-sm border border-border-color/50"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text
                               bg-gradient-to-r from-accent-dark to-secondary
                               mb-6 leading-tight tracking-tight drop-shadow-lg"
                    variants={itemVariants}
                >
                    Unlock Your Potential
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
                    variants={itemVariants}
                >
                    Discover innovative solutions and elevate your experience with our cutting-edge platform.
                    Designed for efficiency and creativity.
                </motion.p>

                <motion.button
                    onClick={() => navigate('/learn-more')} // Changed path for clarity
                    className="px-10 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold
                               rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out
                               transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/50"
                    variants={itemVariants}
                >
                    Get Started Today
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
