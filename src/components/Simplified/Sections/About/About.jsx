// src/components/Simplified/Sections/About.jsx
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08 + (Math.random() * 0.04 - 0.02), // Organic stagger
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.5, 
            ease: "easeOut",
            type: "spring",
            stiffness: 150,
            damping: 20
        } 
    },
};

const ARCHITECT_BIO_PARTS = [
    "My name is ",
    <strong key="name">Soumyadeep Chakravarti</strong>,
    ". I'm a ", 
    <strong key="role">Full-Spectrum Technologist</strong>,
    " — bridging low-level systems (kernel, firmware) with high-level kinetic energy (drifting, ML).",
    <span key="spacer">&nbsp;</span>,
    "I don't fit in one box. From ", 
    <strong key="systems">systems programming</strong>,
    " to ", 
    <strong key="cyber">cybersecurity</strong>,
    ", my brain chases rabbit holes across the entire stack."
];

const highlightClass = "font-semibold text-cyan-700 dark:text-cyan-300 transition-colors duration-300 inline-block drop-shadow-sm dark:drop-shadow-md";


export default function About({ id }) {
    return (
        <section
            id={id || "about"} // Accept id prop for clean integration
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 relative 
                       bg-gradient-to-b from-white/80 to-white/40 dark:from-background/30 dark:to-background/60 
                       xl:px-8 2xl:px-16 overflow-hidden" 
        >
            <SectionTitle text="System Map // Root Access" />

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
