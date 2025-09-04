// src/components/DetailedFeatureCard/DetailedFeatureCard.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DetailedFeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Subtler and more professional slide-in effect
    const x = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        index % 2 === 0 ? [-50, 0, 0, 50] : [50, 0, 0, -50]
    );

    // Subtler Y-axis parallax for a more refined feel
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        index % 2 === 0 ? [20, -20] : [-20, 20]
    );

    // Fade in/out
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Corrected scale animation: zooms in slightly and returns to a normal scale of 1
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

    const isEven = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            // Apply animations based on the refined useTransform hooks
            style={{ y, x, opacity, scale }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 p-12 rounded-2xl shadow-xl
                         bg-card-background border border-border-color/50 max-w-6xl mx-auto
                         ${!isEven && 'md:flex-row-reverse'}`} // Use a single conditional class
        >
            <div className="md:w-1/2 flex justify-center items-center p-4">
                <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto rounded-lg shadow-xl object-cover transform transition-transform duration-300 hover:scale-105"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/000000?text=Image+Error"; }}
                />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <div className="mb-6 p-4 rounded-full bg-primary/10 inline-block shadow-md">
                    {feature.icon}
                </div>
                <h3 className="text-4xl font-bold text-text-primary mb-4 leading-tight">
                    {feature.title}
                </h3>
                <div className="text-lg text-text-secondary leading-relaxed">
                    {feature.description}
                </div>
            </div>
        </motion.div>
    );
};

export default DetailedFeatureCard;
