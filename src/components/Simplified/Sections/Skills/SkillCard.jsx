import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

// Removed UPDATED_AT constant as it's being removed from the card body.

// The SkillCard now only accepts the required props.
const SkillCard = memo(({ name, level, icon: Icon, color, variants }) => {

    // Memoize the style object to prevent unnecessary re-renders of Icon components.
    const iconStyle = useMemo(() => {
        // Only apply 'color' if it's not the special HTML & CSS component.
        return name !== "HTML & CSS" ? { color } : {};
    }, [name, color]);

    return (
        <motion.div
            // Framer Motion Stagger Integration: Receives variants from the parent container.
            variants={variants}
            
            // Accessibility Improvement
            role="listitem"
            tabIndex={0}

            // Interactive Effects and Group Class
            className="relative group w-full focus-within:ring-4 focus-within:ring-teal-400 
                       focus-within:ring-offset-4 focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-[#131722] 
                       rounded-xl cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 6px 10px rgba(0,0,0,0.08)' }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {/* Dynamic Glow Effect */}
            <div
                className="absolute -inset-6 rounded-xl blur-3xl z-0 opacity-0 group-hover:opacity-100 
                           transition-opacity duration-300"
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

                {/* Level (Subtitle) */}
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase">
                    {level}
                </p>

                {/* **IMPROVEMENT**: Removed the redundant 'Updated' date for cleaner UI. */}
                
            </div>
        </motion.div>
    );
});
SkillCard.displayName = 'SkillCard';

export default SkillCard;
