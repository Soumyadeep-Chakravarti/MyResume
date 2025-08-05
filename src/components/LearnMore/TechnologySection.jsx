// src/components/LearnMore/TechnologySection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, TrendingUp, Users, Award } from 'lucide-react';

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
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Our Cutting-Edge Technology</h2>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    Built on a foundation of modern, secure, and performant technologies.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-card-background p-6 rounded-xl shadow-md border border-border-color/50">
                    <ShieldCheck size={48} className="text-accent flex-shrink-0" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Advanced Security Protocols</h3>
                        <p className="text-text-secondary">
                            Your data's safety is our top priority. We implement end-to-end encryption, multi-factor authentication, and regular security audits to protect your information.
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-card-background p-6 rounded-xl shadow-md border border-border-color/50">
                    <TrendingUp size={48} className="text-secondary flex-shrink-0" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Scalable & Resilient Architecture</h3>
                        <p className="text-text-secondary">
                            Designed to handle immense loads and grow with your demands, our cloud-native architecture ensures high availability and consistent performance, even during peak usage.
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-card-background p-6 rounded-xl shadow-md border border-border-color/50">
                    <Users size={48} className="text-primary flex-shrink-0" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Seamless Collaboration Tools</h3>
                        <p className="text-text-secondary">
                            Facilitate real-time teamwork with integrated communication, shared workspaces, and version control, all designed to boost team productivity and creativity.
                        </p>
                    </div>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-card-background p-6 rounded-xl shadow-md border border-border-color/50">
                    <Award size={48} className="text-accent flex-shrink-0" />
                    <div>
                        <h3 className="text-2xl font-semibold mb-2">Intuitive User Experience</h3>
                        <p className="text-text-secondary">
                            We prioritize user experience, crafting interfaces that are not only beautiful but also incredibly easy to navigate, reducing learning curves and increasing adoption.
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default TechnologySection;
