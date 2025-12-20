// src/components/Simplified/Sections/About.jsx
import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle";

// Define animation variants for staggering the text reveal
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Fluent stagger
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Subtle lift-in animation
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// --- Content and Spacing: Using mixed array for guaranteed spacing ---
const ARCHITECT_BIO_PARTS = [
    "My name is ",
    <strong key="name">Soumyadeep Chakravarti</strong>,
    ". I am a dedicated ", 
    <strong key="role">Full-Spectrum Software Architect</strong>,
    ", passionate about engineering ", 
    <strong key="systems">resilient, high-performance systems</strong>,
    " from the user interface to the underlying cloud infrastructure.",

    <span key="spacer">&nbsp;</span>, 
    "My focus is on strategic problem-solving, architectural design, and automating the entire development lifecycle for maximum operational stability."
];

// --- IMPROVEMENT: Replaced underline with drop-shadow for visual pop ---
const highlightClass = "font-semibold text-teal-700 dark:text-teal-300 transition-colors duration-300 inline-block drop-shadow-sm dark:drop-shadow-md";


export default function About({ id }) {
    return (
        <section
            id={id || "about"} // Accept id prop for clean integration
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 relative 
                       bg-gradient-to-b from-white/80 to-white/40 dark:from-background/30 dark:to-background/60 
                       xl:px-8 2xl:px-16 overflow-hidden" 
        >
            <SectionTitle text="Architectural Overview" />

            <motion.div
                className="mt-8 text-lg md:text-xl max-w-4xl text-gray-800 dark:text-gray-200 leading-relaxed font-light"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {ARCHITECT_BIO_PARTS.map((part, index) => (
                    <motion.span
                        key={index}
                        variants={itemVariants}
                        className={
                            (typeof part === 'object' && part.type !== 'strong') 
                                ? "inline-block"
                                : (typeof part === 'object' && part.type === 'strong') 
                                    ? highlightClass // Apply shadow/glow here
                                    : ''
                        }
                    >
                        {typeof part === 'object' ? part : part}
                    </motion.span>
                ))}
            </motion.div>
        </section>
    );
}
