import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle.jsx";
import SkillCard from './SkillCard.jsx';
import { useIsMobile } from "../../../../hooks/useIsMobile.js";

// ===============================================
// 1. IMPORT ALL SKILL Data FILES
// ===============================================
// --- Languages ---
import JavaScriptSkillData from "./Data/Languages/JavaScript.jsx";
import TypeScriptSkillData from "./Data/Languages/TypeScript.jsx";
import PythonSkillData from "./Data/Languages/Python.jsx"; // <-- Primary Python data
import JavaSkillData from "./Data/Languages/Java.jsx";
import KotlinSkillData from "./Data/Languages/Kotlin.jsx";
import RustSkillData from "./Data/Languages/Rust.jsx";
import CSkillData from "./Data/Languages/C.jsx";
import CPPSkillData from "./Data/Languages/CPP.jsx";
// --- Frameworks ---
import ReactSkillData from "./Data/Frameworks/React.jsx";
import NodeJsSkillData from "./Data/Frameworks/NodeJs.jsx";
import TailwindSkillData from "./Data/Frameworks/Tailwindcss.jsx";
// --- Tools & Platforms ---
import SqlSkillData from "./Data/ToolsPlatforms/SQL.jsx";
import DockerSkillData from "./Data/ToolsPlatforms/Docker.jsx";
import GitSkillData from "./Data/ToolsPlatforms/Git.jsx";
import LinuxSkillData from "./Data/ToolsPlatforms/Linux.jsx";
import WindowsSkillData from "./Data/ToolsPlatforms/Windows.jsx";

// ===============================================
// 2. REQUIRED ICON IMPORTS
// ===============================================
import { SiHtml5, SiCss3, SiTensorflow, SiNumpy, SiGnubash } from "react-icons/si";


// ===============================================
// 3. MODULAR ICON COMPONENT FOR SPECIAL CASE (HTML/CSS)
// ===============================================
const HtmlCssIcon = ({ className, style }) => (
    <div className={`flex space-x-2 ${className}`} style={style}>
        <SiHtml5 className="w-10 h-10" style={{ color: "#E34F26" }} />
        <SiCss3 className="w-10 h-10" style={{ color: "#1572B6" }} />
    </div>
);
HtmlCssIcon.displayName = 'HtmlCssIcon';


// ===============================================
// 4. EXTENDED SKILL DATA
// ===============================================
// Adjusted description to reflect foundation
const HtmlCssSkillData = {
    name: "HTML & CSS",
    description: "Semantic markup and modern styling.",
    icon: HtmlCssIcon,
    level: "Expert",
};

// --- Data Science & ML (Using separate data objects for reuse clarity) ---
const TensorFlowSkillData = { 
    name: "TensorFlow", 
    description: "Deep Learning framework.", 
    icon: SiTensorflow, 
    level: "Intermediate" 
};
const PandasSkillData = { 
    name: "Pandas/NumPy", 
    description: "Data manipulation and analysis.", 
    icon: SiNumpy, 
    level: "Expert" 
};

// --- System & Low-Level ---
const ShellScriptingSkillData = { 
    name: "Shell/Bash",
    description: "Automation and system tasks.",
    icon: SiGnubash,
    level: "Expert" 
};
// Reusing CSkillData.icon is a great idea
const EmbeddedCSkillData = { 
    name: "Embedded C", 
    description: "Firmware and microcontrollers.", 
    icon: CSkillData.icon,
    level: "Familiar" 
};


// ===============================================
// 5. EXPANDED SKILL CATEGORIES (REVISED FOR CLARITY)
// ===============================================
const ALL_SKILLS_DATA = {
    "Languages & Foundations": [
        HtmlCssSkillData, JavaScriptSkillData, TypeScriptSkillData, PythonSkillData, 
        JavaSkillData, KotlinSkillData, RustSkillData, CSkillData, CPPSkillData,
    ],
    "Frameworks & Libraries": [
        ReactSkillData, NodeJsSkillData, TailwindSkillData,
    ],
    "Data Science & ML": [ 
        // Python is intentionally duplicated here to list the *same* skill in a different context
        PythonSkillData, TensorFlowSkillData, PandasSkillData,
    ],
    "System & Low-Level": [ 
        ShellScriptingSkillData, EmbeddedCSkillData, LinuxSkillData,
    ],
    "Tools & Platforms": [
        SqlSkillData, DockerSkillData, GitSkillData, WindowsSkillData,
    ]
};

const UPDATED_AT = "2025-10";

// ===============================================
// 6. FRAMER MOTION VARIANT (To be used by each SkillCard)
// ===============================================
const skillCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        transition: { 
            // Reduced transition duration slightly for snappier stagger
            duration: 0.3 
        } 
    },
};

// ===============================================
// 7. MAIN SKILLS COMPONENT
// ===============================================

function Skills({ id }) { // Added id prop for consistency
    const isMobile = useIsMobile(); 
    
    // Memoize the array of categories for optimal rendering performance
    const skillCategories = useMemo(() => Object.entries(ALL_SKILLS_DATA), []);

    const containerPaddingClass = "px-4 sm:px-6"; 


    return (
        <section
            id={id || "skills"}
            aria-label="Technical Skills Summary"
            className="min-h-screen pt-20 pb-20 flex flex-col items-center
                             bg-gray-100 dark:bg-[#131722] transition-colors duration-500"
        >
            <SectionTitle text="Skills" />

            <div className={`mt-12 w-full max-w-7xl ${containerPaddingClass} space-y-16`}>
                {skillCategories.map(([categoryName, skills]) => {
                    // Use a clean ID derived from the category name
                    const categoryId = `skill-category-${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

                    return (
                        <div 
                            key={categoryName} 
                            className="flex flex-col items-center w-full" 
                            role="group"
                            aria-labelledby={categoryId}
                        >
                            {/* Category Title */}
                            <motion.h2
                                id={categoryId}
                                className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 mb-8 pb-2 
                                            border-b-4 border-teal-500/50 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6 }}
                            >
                                {categoryName}
                            </motion.h2>

                            {/* Skills Grid with Staggered Animation */}
                            <motion.div
                                className="grid w-full gap-6 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
                                role="list"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={{
                                    visible: { 
                                        // Dynamic stagger timing based on device
                                        transition: { staggerChildren: isMobile ? 0.08 : 0.05 } 
                                    } 
                                }}
                            >
                                {skills.map((skill) => (
                                    <SkillCard
                                        // Use skill name as key, since it's the unique identifier for the skill object
                                        key={skill.name} 
                                        {...skill}
                                        variants={skillCardVariants}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            <p className={`mt-16 text-center text-lg max-w-3xl ${containerPaddingClass} text-gray-600 dark:text-gray-300`}>
                This comprehensive list highlights the key areas of expertise, structured for immediate clarity and technical relevance. Last updated: <span className="font-semibold">{UPDATED_AT}</span>.
            </p>

        </section>
    );
}

export default memo(Skills);
