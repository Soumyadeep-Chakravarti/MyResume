import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiChevronRight } from 'react-icons/fi';

const getLevelClass = (level, isDark) => {
    switch (level) {
        case "Expert":
            return isDark ? "text-green-400" : "text-green-600";
        case "Intermediate":
            return isDark ? "text-yellow-400" : "text-yellow-600";
        case "Familiar":
            return isDark ? "text-blue-400" : "text-blue-600";
        default:
            return isDark ? "text-gray-400" : "text-gray-500";
    }
};

const SkillCard = memo(({ name, level, icon: Icon, color, variants, description, onSelect }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [latency] = useState(() => Math.floor(Math.random() * 40 + 10) + 'ms');
    
    const iconStyle = useMemo(() => {
        return name !== "HTML & CSS" ? { color } : {};
    }, [name, color]);

    const levelClass = getLevelClass(level, false);

    const glowInsetClass = "absolute -inset-2 rounded-xl z-0 opacity-0 group-hover:opacity-100";
    const pulseClass = "animate-pulse-skill";

    const handleClick = () => {
        onSelect?.({ name, level, icon: Icon, color, description });
    };

    return (
        <motion.div
            variants={variants}
            role="listitem"
            tabIndex={0}
            layoutId={`skill-${name}`}
            className="relative group w-full focus-within:ring-4 focus-within:ring-cyan-400 
                       focus-within:ring-offset-4 focus-within:ring-offset-white dark:focus-within:ring-offset-[#131722] 
                       rounded-xl cursor-pointer"
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
            {/* Dynamic Glow Effect */}
            <div
                className={`${glowInsetClass} ${isHovered ? 'skill-card-glow' : ''} blur-xl transition-all duration-300`}
                style={{ backgroundColor: color || 'oklch(70% 0.12 140)' }}
            />

            {/* Skill Content Card - Solar Neumorphism */}
            <div
                className="relative z-10 bg-white dark:bg-gray-900 p-6 rounded-xl h-full
                             transform transition-all duration-300 flex flex-col items-center justify-center text-center 
                             border-b-4 border-gray-200 dark:border-gray-700 group-hover:border-cyan-500
                             shadow-[8px_8px_24px_rgba(0,0,0,0.08),-4px_-4px_16px_rgba(255,255,255,1)]
                             dark:shadow-[0_4px_20px_rgba(6,182,212,0.15)]"
            >
                {/* Icon Rendering */}
                <div className="mb-4 relative">
                    <Icon className="w-10 h-10" style={iconStyle} />
                    {isHovered && (
                        <motion.span 
                            className="absolute -top-1 -right-1 text-xs font-mono text-cyan-500"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {latency}ms
                        </motion.span>
                    )}
                </div>

                {/* Name (Title) */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {name}
                </h3>

                {/* Level (Subtitle) with L-tier */}
                <p className={`text-sm ${levelClass} mb-3 font-mono`}>
                    [{level?.charAt(0).toUpperCase() || 'L1'}]
                </p>
                
                {/* Detail Hint */}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Inspect Module 
                    <FiChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </p>
            </div>
        </motion.div>
    );
});
SkillCard.displayName = 'SkillCard';

export default SkillCard;