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

export default function About() {
    // Break the text into logical parts for individual animation
    const textParts = [
        "I am ",
        // IMPROVEMENT: Using <strong> communicates semantic importance.
        <strong key="name">Soumyadeep Chakravarti</strong>,
        " a ",
        <strong key="role">full-stack developer</strong>,
        " with experience building ",
        <strong key="apps">interactive, user-friendly web applications</strong>,
        ". I enjoy transforming ideas into real-world solutions using modern web technologies and a passion for clean, performant code.",
    ];

    return (
        <section
            id="about"
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
                {textParts.map((part, index) => (
                    <motion.span
                        key={index}
                        variants={itemVariants}
                        className={
                            typeof part === 'string'
                                ? ''
                                : // Apply bold styling to the strong/highlighted parts
                                  "font-extrabold text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400 inline-block px-1 mx-0.5"
                        }
                    >
                        {/* Render the part: either a string or the children of the strong element */}
                        {typeof part === 'object' && part.type === 'strong' ? part.props.children : part}
                    </motion.span>
                ))}
            </motion.div>
        </section>
    );
}
