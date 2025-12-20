import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, ArrowRight } from 'lucide-react'; 
import { FaDiscord } from 'react-icons/fa'; 
import SectionTitle from '../../UI/SectionTitle';

// --- Configuration Constants ---
const EMAIL_ADDRESS = "soumyadeepsai1@gmail.com";

// --- CSS Polish Classes (SIMPLIFIED FOR CLEANER INLINE USE) ---
// Using a simpler string that only contains non-shadow elements for clarity
const POLISH_CLASSES = `
    transform hover:scale-[1.02] active:scale-95 transition-all duration-300
    shadow-lg dark:shadow-teal-900/50 
    ring-1 ring-inset ring-white/20 dark:ring-black/50
`;

// Variants remain the same
const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.1 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
const buttonItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};
const arrowHoverVariants = {
    rest: { x: 0 },
    hover: { x: 6, transition: { duration: 0.3 } }, // Increased X for a clearer push effect
};
// -------------------------------------------------------------------

const socialLinks = [
    { 
        name: "LinkedIn", 
        label: "Connect on LinkedIn", 
        href: "https://www.linkedin.com/in/soumyadeep-chakravarti-03237028a/", 
        icon: Linkedin, 
        style: "bg-blue-700 hover:bg-blue-800 bg-gradient-to-b from-blue-600/90 to-blue-800/90" 
    },
    { 
        name: "GitHub", 
        label: "View Code", 
        href: "https://github.com/Soumyadeep-Chakravarti", 
        icon: Github, 
        style: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-900 dark:text-white text-white bg-gradient-to-b from-gray-700/90 to-gray-900/90 dark:from-gray-600/90 dark:to-gray-800/90" 
    },
    { 
        name: "Instagram", 
        label: "Follow on Instagram", 
        href: "https://www.instagram.com/soumyadeep_chakravarti?igsh=a213cjdpNXJkbXh1", 
        icon: Instagram, 
        style: "bg-pink-600 hover:bg-pink-700 bg-gradient-to-b from-pink-500/90 to-pink-700/90" 
    },
    { 
        name: "Discord", 
        label: "Message on Discord", 
        href: "https://discordapp.com/users/1141007161070194748", 
        icon: FaDiscord, 
        style: "bg-indigo-500 hover:bg-indigo-600 bg-gradient-to-b from-indigo-400/90 to-indigo-600/90" 
    },
];

function Contact() {
    const linkCount = socialLinks.length;
    // Removed the dynamic grid class calculation; lg:grid-cols-2 centered is best for 4 items
    const desktopGridClass = 'lg:grid-cols-2 lg:max-w-xl mx-auto'; 

    return (
        <section 
            id="contact" 
            className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 
                       bg-gray-100 dark:bg-[#131722] transition-colors duration-500 overflow-hidden 
                       pattern-dots pattern-gray-300 pattern-opacity-10 pattern-size-4 dark:pattern-white dark:pattern-opacity-5"
        >
            <SectionTitle text="Connect With Me" />
            
            <motion.div
                className="max-w-3xl w-full mt-8 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.p 
                    className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-12"
                    variants={itemVariants}
                >
                    I'm always open to new opportunities and interesting projects. Reach out on any of the platforms below!
                </motion.p>

                {/* --- Social Buttons Grid Container --- */}
                <motion.div 
                    className={`grid grid-cols-2 sm:grid-cols-2 gap-6 ${desktopGridClass} w-full`}
                    variants={containerVariants} 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {socialLinks.map(({ name, href, icon: Icon, style, label }) => (
                        <motion.a
                            key={name}
                            href={href}
                            target="_blank" 
                            rel="noopener noreferrer"
                            // Use the full label as the aria-label for accessibility
                            aria-label={label} 
                            // Integrated POLISH_CLASSES
                            className={`flex items-center justify-center p-4 rounded-xl text-white font-semibold 
                                       ${style} ${POLISH_CLASSES} text-base`}
                            variants={buttonItemVariants} 
                            whileHover={{ scale: 1.03 }} // Adjusted scale for cleaner visual hover
                        >
                            <Icon size={24} className="flex-shrink-0 mr-3" />
                            
                            {/* Mobile/Desktop Label Consistency */}
                            <span className="truncate"> 
                                {name} 
                            </span>
                        </motion.a>
                    ))}
                </motion.div>
                
                {/* --- Primary CTA Button (Direct Email) --- */}
                <motion.div variants={itemVariants} className="mt-12">
                    <motion.a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full 
                                   text-white bg-teal-600 hover:bg-teal-700 shadow-lg transition-colors duration-300 transform active:scale-95"
                        initial="rest"
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }} // Apply motion state to the entire button
                    >
                        Send a Direct Email
                        <motion.div variants={arrowHoverVariants}> 
                            <ArrowRight size={20} className="ml-3" />
                        </motion.div>
                    </motion.a>
                </motion.div>

            </motion.div>
        </section>
    );
}

export default memo(Contact);
