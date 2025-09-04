// src/components/LearnMore/TechnologySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Puzzle, Laptop, Cloud, Wrench, Shield } from 'lucide-react'; // Changed ShieldLock to Shield

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

const TechnologySection = () => {
    return (
        <motion.section
            className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto bg-primary/5 dark:bg-primary/10 rounded-2xl shadow-inner border border-border-color/50 relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            {/* Background grid pattern */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <motion.div className="mb-12 text-center relative z-10" variants={itemVariants}>
                <Rocket size={64} className="text-primary mx-auto mb-4 drop-shadow-lg" />
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">My Technical Stack</h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    A versatile skill set built on a foundation of modern, secure, and performant technologies.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                {/* Programming Languages */}
                <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-xl shadow-md border border-border-color/50 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <Code size={36} className="text-accent flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-semibold">Programming Languages</h3>
                            <p className="text-text-secondary mt-1">
                                C, C++, Python, JavaScript/TypeScript, SQL, Bash, HTML & CSS.
                            </p>
                        </div>
                    </div>
                </motion.div>
                
                {/* Frameworks & Libraries */}
                <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-xl shadow-md border border-border-color/50 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <Puzzle size={36} className="text-secondary flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-semibold">Frameworks & Libraries</h3>
                            <p className="text-text-secondary mt-1">
                                React, Next.js, TailwindCSS, Flask, FastAPI, Express.js, NumPy, Pandas, Scikit-learn.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Operating Systems & Environments */}
                <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-xl shadow-md border border-border-color/50 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <Laptop size={36} className="text-primary flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-semibold">Operating Systems & Environments</h3>
                            <p className="text-text-secondary mt-1">
                                Linux (Ubuntu, Arch, Fedora), Windows, Docker, Git, GitHub, CMake, Make.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Databases & Cloud */}
                <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-xl shadow-md border border-border-color/50 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <Cloud size={36} className="text-accent flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-semibold">Databases & Cloud</h3>
                            <p className="text-text-secondary mt-1">
                                MySQL, PostgreSQL, SQLite, MongoDB, REST APIs, AWS/GCP basics.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Tools & Productivity */}
                <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-xl shadow-md border border-border-color/50 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <Wrench size={36} className="text-secondary flex-shrink-0" />
                        <div>
                            <h3 className="text-2xl font-semibold">Tools & Productivity</h3>
                            <p className="text-text-secondary mt-1">
                                VS Code, Neovim, tmux, Poetry, Jupyter, Zathura, version control workflows.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Security & Best Practices */}
                <motion.div variants={itemVariants} className="bg-card-background p-6 rounded-xl shadow-md border border-border-color/50 flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                        <Shield size={36} className="text-primary flex-shrink-0" /> {/* Changed ShieldLock to Shield */}
                        <div>
                            <h3 className="text-2xl font-semibold">Security & Best Practices</h3>
                            <p className="text-text-secondary mt-1">
                                Encryption basics, secure authentication, code reviews, testing frameworks (pytest, Jest).
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TechnologySection;
