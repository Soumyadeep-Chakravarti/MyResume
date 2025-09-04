// src/components/LearnMore/VisionPhilosophySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

// Animation variants for sections
const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

// Animation variants for individual items within sections
const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const VisionPhilosophySection = () => {
    return (
        <motion.section
            className="py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center relative overflow-hidden" // Increased vertical padding
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            {/* Background decorative blur - Adjusted size and position for more dynamic look */}
            <div className="absolute -top-1/4 -left-1/4 w-3/5 h-3/5 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-3/5 h-3/5 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <motion.div className="mb-20 relative z-10" variants={itemVariants}> {/* Increased margin-bottom */}
                <Lightbulb size={80} className="text-accent mx-auto mb-8 drop-shadow-lg" /> {/* Increased icon size, margin */}
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Our Vision & Core Philosophy</h2> {/* Increased font size, added gradient to heading */}
                <p className="text-xl sm:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed"> {/* Increased font size, max-width */}
                    Driving innovation with purpose, guided by principles of empowerment and sustainable growth, shaping the future of technology.
                </p>
            </motion.div>
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10"> {/* Increased gap */}
                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform"> {/* Increased padding, rounded corners, shadow, hover effects */}
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-primary leading-tight">Empowering Innovation</h3> {/* Increased font size */}
                    <p className="text-lg text-text-secondary leading-relaxed">
                        We envision a world where technology serves as a catalyst for human potential, not a barrier. Our philosophy centers on building tools that are not just powerful, but also intuitive, accessible, and designed to unlock creativity and efficiency for every user, from individual creators to large enterprises. We believe in fostering an environment where ideas flourish and progress is limitless.
                    </p>
                </motion.div>
                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform"> {/* Increased padding, rounded corners, shadow, hover effects */}
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary leading-tight">Sustainable Growth</h3> {/* Increased font size */}
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Beyond immediate solutions, we are committed to sustainable development and long-term partnerships. Our architecture is built for scalability and resilience, ensuring that our platform grows seamlessly with your needs, providing reliable performance and security for years to come. We strive to create lasting value and positive impact for our clients and the broader community.
                    </p>
                </motion.div>
            </motion.div>
        </motion.section>
    );
};

export default VisionPhilosophySection;
