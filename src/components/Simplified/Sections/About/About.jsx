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
            staggerChildren: 0.15, // Delay between each child animation
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About({ id }) { // Accept id prop if passed from map
    
    // 1. REFINE TEXT PARTS: Use a standardized object structure for clarity
    const textParts = [
        { content: "I am " },
        { content: "Soumyadeep Chakravarti", highlight: true, key: "name" },
        { content: ", a " },
        { content: "full-stack developer", highlight: true, key: "role" },
        { content: ", with experience building " },
        { content: "interactive, user-friendly web applications", highlight: true, key: "apps" },
        { content: ". I enjoy transforming ideas into real-world solutions using modern web technologies and a passion for clean, performant code." },
    ];

    // Define the special styles for highlighted parts
    const highlightClasses = "font-extrabold text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 inline-block px-1 mx-0.5";

    return (
        <section
            id={id || "about"} // Use prop ID or default to 'about'
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 relative 
                        bg-gradient-to-b from-white/80 to-white/40 dark:from-background/30 dark:to-background/60 
                        xl:px-8 2xl:px-16 overflow-hidden"
        >
            <SectionTitle text="About Me" />

            <motion.div
                className="mt-6 text-lg md:text-xl max-w-3xl text-gray-800 dark:text-gray-200 leading-relaxed"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* 2. SIMPLIFIED MAPPING LOGIC */}
                {textParts.map((part, index) => (
                    <motion.span
                        key={part.key || index} // Use unique key from object or index fallback
                        variants={itemVariants}
                        // Conditionally apply classes based on the object flag
                        className={part.highlight ? highlightClasses : ''}
                    >
                        {/* Use a <strong> tag for semantic importance when highlighting */}
                        {part.highlight ? <strong>{part.content}</strong> : part.content}
                    </motion.span>
                ))}
            </motion.div>
        </section>
    );
}
