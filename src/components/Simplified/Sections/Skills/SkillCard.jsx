import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import { Info } from 'lucide-react'; // Added Info icon for the tooltip hint

// SkillCard now accepts the 'description' prop again for the tooltip/popover.
const SkillCard = memo(({ name, level, icon: Icon, color, variants, description }) => {

    // Memoize the style object to prevent unnecessary re-renders of Icon components.
    const iconStyle = useMemo(() => {
        // Only apply 'color' if it's not the special HTML & CSS component.
        return name !== "HTML & CSS" ? { color } : {};
    }, [name, color]);

    // Determine level styling for clear visual differentiation
    const levelStyle = useMemo(() => {
        switch (level) {
            case 'Expert':
                return 'text-green-600 dark:text-green-400';
            case 'Intermediate':
                return 'text-yellow-600 dark:text-yellow-400';
            case 'Familiar':
                return 'text-blue-600 dark:text-blue-400';
            default:
                return 'text-teal-600 dark:text-teal-400';
        }
    }, [level]);


    return (
        <motion.div
            variants={variants}
            role="listitem"
            tabIndex={0}
            
            // Interactive Effects and Group Class
            // Added z-index-50 to motion.div to ensure the tooltip is on top of other cards
            className="relative group w-full focus-within:ring-4 focus-within:ring-teal-400 focus-within:ring-offset-4 
                        focus-within:ring-offset-gray-100 dark:focus-within:ring-offset-[#131722] rounded-xl cursor-pointer z-20"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 6px 10px rgba(0,0,0,0.08)' }} 
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            {/* Dynamic Glow Effect */}
            <div
                className="absolute -inset-6 rounded-xl blur-3xl z-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                            transition-opacity duration-300 pointer-events-none" // Added pointer-events-none
                style={{ backgroundColor: color || '#86efac', opacity: 0.3 }}
            />

            {/* Skill Content Card */}
            <div
                className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-full
                             transform transition-all duration-300 flex flex-col items-center justify-center text-center 
                             border-b-4 border-transparent group-hover:border-teal-400 group-focus-within:border-teal-400 group-hover:shadow-xl"
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
                <p className={`text-sm font-semibold uppercase ${levelStyle}`}>
                    {level}
                </p>
                
                {/* --- Tooltip/Description Popover (NEW) --- */}
                {description && (
                    <div 
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 w-max max-w-[200px]
                                   bg-gray-900 text-white text-xs rounded shadow-2xl opacity-0 
                                   group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                        aria-hidden={!(name || description)}
                    >
                        <Info size={12} className="inline mr-1 text-teal-400" />
                        {description}
                        {/* Tooltip arrow */}
                        <div className="absolute bottom-[-4px] left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                    </div>
                )}
                {/* -------------------------------------- */}

            </div>
        </motion.div>
    );
});
SkillCard.displayName = 'SkillCard';

export default SkillCard;
