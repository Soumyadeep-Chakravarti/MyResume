import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from 'react-icons/fi'; // Icon for detail hint

// ===============================================
// II. HELPER: Dynamic Level Styling
// ===============================================

/**
 * Maps the skill level string to a distinct Tailwind CSS class for visual emphasis.
 * @param {string} level - The skill level (e.g., 'Expert', 'Intermediate').
 * @returns {string} Tailwind CSS classes for color/style.
 */
const getLevelClass = (level) => {
    switch (level) {
        case "Expert":
            return "text-green-600 dark:text-green-400 font-bold";
        case "Intermediate":
            return "text-yellow-600 dark:text-yellow-400 font-semibold";
        case "Familiar":
            return "text-blue-600 dark:text-blue-400 font-medium";
        default:
            return "text-gray-500 dark:text-gray-400";
    }
};

// ===============================================
// MAIN COMPONENT
// ===============================================
// Added 'description' to props list (I)
const SkillCard = memo(({ name, level, icon: Icon, color, variants, description }) => {

    const iconStyle = useMemo(() => {
        return name !== "HTML & CSS" ? { color } : {};
    }, [name, color]);

    const levelClass = useMemo(() => getLevelClass(level), [level]);

    // III. Reduced glow inset for tighter effect
    const glowInsetClass = "absolute -inset-2 rounded-xl blur-2xl z-0 opacity-0 group-hover:opacity-100";


    return (
        <motion.div
            variants={variants}
            role="listitem"
            tabIndex={0}
            className="relative group w-full focus-within:ring-4 focus-within:ring-teal-400 
                       focus-within:ring-offset-4 focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-[#131722] 
                       rounded-xl cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 6px 10px rgba(0,0,0,0.08)' }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {/* Dynamic Glow Effect (III) */}
            <div
                className={`${glowInsetClass} transition-opacity duration-300`}
                style={{ backgroundColor: color || '#86efac', opacity: 0.3 }}
            />

            {/* Skill Content Card */}
            <div
                className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full
                             transform transition-all duration-300 flex flex-col items-center justify-center text-center 
                             border-b-4 border-transparent group-hover:border-teal-400 group-hover:shadow-xl"
            >
                {/* Icon Rendering */}
                <div className="mb-4">
                    <Icon className="w-10 h-10" style={iconStyle} />
                </div>

                {/* Name (Title) */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {name}
                </h3>

                {/* Level (Subtitle) - Using dynamic class (II) */}
                <p className={`text-sm uppercase ${levelClass} mb-3`}>
                    {level}
                </p>
                
                {/* I. Detail Hint (Only visible on hover/focus) */}
                {description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* We use an icon to hint at 'more detail' */}
                        View Detail 
                        <FiChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                    </p>
                )}
            </div>
        </motion.div>
    );
});
SkillCard.displayName = 'SkillCard';

export default SkillCard;
