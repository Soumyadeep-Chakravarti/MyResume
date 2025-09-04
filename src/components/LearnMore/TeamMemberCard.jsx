// src/components/LearnMore/TeamMemberCard.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TeamMemberCard = ({ member, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Omni-directional movement: X and Y transforms for exaggerated slide-in
    // Now uniform: all cards slide in from the left and bottom
    const x = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [-300, 0, 0, 300] // All cards slide in from left, then out to right
    );
    const y = useTransform(
        scrollYProgress,
        [0, 0.2, 0.8, 1],
        [200, 0, 0, -200] // All cards slide in from bottom, then out to top
    );

    // Fade in/out
    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

    // Subtle scale effect - Cards will now reach a maximum scale of 1.0 (their natural size)
    const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1.0, 1.0, 0.95]);

    return (
        <motion.div
            ref={ref}
            style={{ y, x, opacity, scale }}
            className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-10 rounded-2xl shadow-xl // Adjusted gap from md:gap-16 to md:gap-12
                        bg-card-background border border-border-color/50 max-w-5xl mx-auto // Reduced max-w from 6xl to 5xl
                        md:flex-row group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`} // Added group, hover effects
        >
            <div className="md:w-1/2 flex justify-center items-center p-4">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-auto rounded-lg shadow-xl object-cover transform transition-transform duration-300 group-hover:scale-105" // Applied group-hover
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/CCCCCC/000000?text=Image+Error"; }}
                />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                {/* Conditionally render icon if it exists in member data */}
                {member.icon && (
                    <div className="mb-6 p-4 rounded-full bg-primary/10 inline-block shadow-md">
                        {member.icon}
                    </div>
                )}
                <h3 className="text-4xl font-bold text-text-primary mb-2 leading-tight">
                    {member.name}
                </h3>
                <p className="text-xl text-text-secondary mb-4">
                    {member.role}
                </p>
                {/* Conditionally render description if it exists, otherwise use a default */}
                <p className="text-lg text-text-secondary leading-relaxed">
                    {member.description || "Passionate about innovation and dedicated to building exceptional products that make a real impact."}
                </p>
            </div>
        </motion.div>
    );
};

export default TeamMemberCard;
