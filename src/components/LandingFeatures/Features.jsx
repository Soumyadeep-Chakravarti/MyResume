// src/components/LandingFeatures/Features.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Cloud } from 'lucide-react';

// Import individual feature description components
import PerformanceDescription from './descriptions/PerformanceDescription';
import SecurityDescription from './descriptions/SecurityDescription';
import CloudIntegrationDescription from './descriptions/CloudIntegrationDescription';
import ScalableArchitecturreDescription from './descriptions/ScalableArchitectureDescription';
import UserInterfaceDescription from './descriptions/UserInterfaceDescription';
import SupportDescription from './descriptions/SupportDescription';

const Features = () => {
    const features = [
        {
            icon: <Zap size={36} className="text-primary" />,
            title: "Blazing Fast Performance",
            description: <PerformanceDescription />, // Now a component
        },
        {
            icon: <Shield size={36} className="text-secondary" />,
            title: "Robust Security",
            description: <SecurityDescription />, // Now a component
        },
        {
            icon: <Cloud size={36} className="text-accent" />,
            title: "Seamless Cloud Integration",
            description: <CloudIntegrationDescription />, // Now a component
        },
        {
            icon: <Zap size={36} className="text-primary" />,
            title: "Scalable Architecture",
            description: <ScalableArchitecturreDescription />, // Now a component
        },
        {
            icon: <Shield size={36} className="text-secondary" />,
            title: "Intuitive User Interface",
            description: <UserInterfaceDescription />, // Now a component
        },
        {
            icon: <Cloud size={36} className="text-accent" />,
            title: "24/7 Dedicated Support",
            description: <SupportDescription />, // Now a component
        },
    ];

    // Variants for the section's heading and paragraph
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    };

    return (
        <section className="py-20 px-4 sm:px-6 md:px-8 bg-background text-text-primary"> {/* REMOVED overflow-hidden */}
            <div className="max-w-6xl mx-auto text-center">
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold mb-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={textVariants}
                >
                    Powerful Features for You
                </motion.h2>
                <motion.p
                    className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    variants={textVariants}
                >
                    Explore what makes our platform stand out and how it can benefit your daily tasks.
                </motion.p>

                <div className="relative flex flex-col gap-32"> {/* Increased gap from gap-24 to gap-32 */}
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Separate component for each feature card to handle its individual scroll animation
const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Enhanced Y transformation: more pronounced vertical movement
    const y = useTransform(scrollYProgress, [0, 1], [-200, 200]); // Increased range from -100/100 to -200/200

    // Opacity with a sharper fade-in/out
    const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]); // Adjusted input range for faster fade

    // Scale with a more subtle zoom
    const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.9, 1, 1, 0.9]); // Adjusted input range

    // Horizontal transformation based on index (odd/even for left/right slide)
    const x = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        index % 2 === 0 ? [-300, 0, 0, 300] : [300, 0, 0, -300] // Slide in from left/right, then out
    );

    return (
        <motion.div
            ref={ref}
            // Apply all transformed styles
            style={{ y, opacity, scale, x }}
            className="bg-card-background p-8 rounded-xl shadow-lg border border-border-color/50
                       flex flex-col items-center text-center group transition-all duration-300
                       hover:shadow-xl hover:scale-[1.02] max-w-2xl mx-auto"
        >
            <div className="mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold text-text-primary mb-3">
                {feature.title}
            </h3>
            {feature.description}
        </motion.div>
    );
};

export default Features;
