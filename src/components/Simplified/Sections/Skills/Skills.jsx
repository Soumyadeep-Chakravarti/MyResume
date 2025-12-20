// src/sections/Skills.jsx - FINAL ARCHITECTURAL REVISION

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle.jsx";
import SkillCard from './SkillCard.jsx';
import { useIsMobile } from "../../../../hooks/useIsMobile.js"; 
// --- Category Icon Imports for visual clarity ---
import { Code, LayoutDashboard, Database, Settings, Zap } from "lucide-react"; 

// ===============================================
// 1. ORIGINAL SKILL DATA IMPORTS (MUST BE KEPT)
// ===============================================
// --- Languages ---
import JavaScriptSkillData from "./Data/Languages/JavaScript.jsx";
import TypeScriptSkillData from "./Data/Languages/TypeScript.jsx";
import PythonSkillData from "./Data/Languages/Python.jsx";
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
// 2. REQUIRED ICON IMPORTS & LOCAL DEFINITIONS (KEPT)
// ===============================================
import { SiHtml5, SiCss3, SiTensorflow, SiNumpy, SiGnubash } from "react-icons/si";

const HtmlCssIcon = ({ className, style }) => (
    <div className={`flex space-x-2 ${className}`} style={style}>
        <SiHtml5 className="w-10 h-10" style={{ color: "#E34F26" }} />
        <SiCss3 className="w-10 h-10" style={{ color: "#1572B6" }} />
    </div>
);
HtmlCssIcon.displayName = 'HtmlCssIcon';

const HtmlCssSkillData = {
    name: "HTML & CSS",
    description: "Semantic markup and modern styling.",
    icon: HtmlCssIcon,
    level: "Expert",
};
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
const ShellScriptingSkillData = { 
    name: "Shell/Bash",
    description: "Automation and system tasks.",
    icon: SiGnubash,
    level: "Expert" 
};
const EmbeddedCSkillData = { 
    name: "Embedded C", 
    description: "Firmware and microcontrollers.", 
    icon: CSkillData.icon,
    level: "Familiar" 
};


// ===============================================
// 3. OPTIMIZED CATEGORIES (Professional Grouping)
// ===============================================
const ALL_SKILLS_DATA = {
    // 1. Core competency, low-level, and scripting
    "Core Languages & Systems": [
        HtmlCssSkillData, JavaScriptSkillData, TypeScriptSkillData, PythonSkillData, 
        CSkillData, CPPSkillData, JavaSkillData, KotlinSkillData, RustSkillData,
    ],
    // 2. Application Development (Front/Back)
    "Frontend & Backend Frameworks": [
        ReactSkillData, NodeJsSkillData, TailwindSkillData,
    ],
    // 3. Automation, Deployment, and Infrastructure
    "DevOps & Systems": [
        DockerSkillData, GitSkillData, LinuxSkillData, WindowsSkillData,
        ShellScriptingSkillData,
    ],
    // 4. Persistence, Querying, and Data Manipulation
    "Data Science & Storage": [ 
        SqlSkillData, PandasSkillData, TensorFlowSkillData,
    ],
    // 5. Niche skills or future focus areas
    "Specializations": [ 
        EmbeddedCSkillData, // Niche C/Firmware
    ]
};

const UPDATED_AT = "2025-10";

// --- Category Icon Mapping ---
const getCategoryIcon = (name) => {
    switch (name) {
        case "Core Languages & Systems": return Code;
        case "Frontend & Backend Frameworks": return LayoutDashboard;
        case "Data Science & Storage": return Database;
        case "DevOps & Systems": return Settings;
        case "Specializations": return Zap;
        default: return Code;
    }
};

// ===============================================
// 4. FRAMER MOTION VARIANT (Unchanged, passed to SkillCard)
// ===============================================
const skillCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

// ===============================================
// 5. MAIN SKILLS COMPONENT (Revised Title/H3 Tags)
// ===============================================

function Skills() {
    const isMobile = useIsMobile(); 
    const skillCategories = useMemo(() => Object.entries(ALL_SKILLS_DATA), []);
    const containerPaddingClass = "px-4 sm:px-6"; 

    return (
        <section
            id="skills"
            aria-label="Technical Skills Summary"
            className="min-h-screen pt-20 pb-20 flex flex-col items-center
                       bg-gray-100 dark:bg-[#131722] transition-colors duration-500"
        >
            <SectionTitle text="Technical Skills" /> {/* Clearer overall section title */}

            <div className={`mt-12 w-full max-w-7xl ${containerPaddingClass} space-y-16`}>
                {skillCategories.map(([categoryName, skills]) => {
                    const categoryId = `skill-category-${categoryName.toLowerCase().replace(/\s|&/g, '-')}`;
                    const CategoryIcon = getCategoryIcon(categoryName); 

                    return (
                        <div 
                            key={categoryName} 
                            className="flex flex-col items-center w-full" 
                            role="group"
                            aria-labelledby={categoryId}
                        >
                            {/* Category Title: Now H3 (semantic hierarchy) with Icon (scannability) */}
                            <motion.h3
                                id={categoryId}
                                className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 pb-2 
                                           border-b-4 border-teal-500/50 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6 }}
                            >
                                <CategoryIcon size={24} className="text-teal-500 flex-shrink-0" />
                                {categoryName}
                            </motion.h3>

                            {/* Skills Grid - Staggered Animation retained */}
                            <motion.div
                                className="grid w-full gap-6 grid-cols-3 sm:grid-cols-4 lg:grid-cols-5"
                                role="list"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={{
                                    visible: { transition: { staggerChildren: isMobile ? 0.08 : 0.05 } } 
                                }}
                            >
                                {skills.map((skill) => (
                                    <SkillCard
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
