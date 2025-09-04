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
            className="py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto text-center relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            {/* Background decorative blur */}
            <div className="absolute -top-1/4 -left-1/4 w-3/5 h-3/5 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-1/4 -right-1/4 w-3/5 h-3/5 bg-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <motion.div className="mb-20 relative z-10" variants={itemVariants}>
                <Lightbulb size={80} className="text-accent mx-auto mb-8 drop-shadow-lg" />
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">My Vision & Core Philosophy</h2>
                <p className="text-xl sm:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
                    Driving technology with clarity and efficiency, guided by principles of precision and long-term impact.
                </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 relative z-10">
                {/* Your original points */}
                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-primary leading-tight">Engineering Excellence</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        I believe in building software that is efficient, maintainable and transparent. My focus is on clean architectures, performance-oriented design and well-written documentation so every project can scale and adapt without friction.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary leading-tight">Responsible Innovation</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        New technologies should solve real problems without adding unnecessary complexity. My philosophy is to integrate AI and data-driven features thoughtfully, ensuring reliability, security and usability for everyone who interacts with my work.
                    </p>
                </motion.div>

                {/* New points added here */}
                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-primary leading-tight">User-Centric Design</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        I prioritize usability and accessibility so that every product feels intuitive and inclusive. Every technical decision is weighed against the real experience of the people who will use it.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary leading-tight">Continuous Learning</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Technology evolves rapidly; I stay ahead through constant learning and experimentation. This helps me adopt new tools responsibly and bring the best practices to every project.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-primary leading-tight">Ethical Technology</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Beyond just functionality, I believe in creating software that respects privacy, promotes fairness and reduces unintended harm.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-card-background p-12 rounded-3xl shadow-2xl border border-border-color/50 text-left transition-all duration-300 hover:shadow-3xl hover:scale-[1.02] transform">
                    <h3 className="text-3xl sm:text-4xl font-semibold mb-4 text-secondary leading-tight">Collaboration & Mentorship</h3>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Great technology is a team effort. I value open communication, knowledge-sharing and mentoring as ways to elevate both individuals and projects.
                    </p>
                </motion.div> 
            </motion.div>
        </motion.section>
    );
};

export default VisionPhilosophySection;
