import React, { memo } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../../UI/SectionTitle";
import Card from "../../UI/Card";
import { 
  SiJavascript, 
  SiReact, 
  SiNodedotjs, 
  SiPython, 
  SiCplusplus 
} from "react-icons/si";

const skills = [
  { name: "JavaScript", level: "Advanced", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", level: "Advanced", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", level: "Intermediate", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", level: "Intermediate", icon: SiPython, color: "#3776AB" },
  { name: "C / C++", level: "Intermediate", icon: SiCplusplus, color: "#00599C" },
];

const updatedAt = "2025"; // single source of truth for all skills

function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center px-6
                 bg-gradient-to-b from-gray-100/80 to-gray-200/80
                 dark:from-[#0c1019]/80 dark:to-[#131722]/80
                 transition-colors duration-500"
    >
      <SectionTitle text="Skills" />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {skills.map(({ name, level, icon: Icon, color }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {/* Card wrapper with group and focus for keyboard users */}
            <motion.div
              className="relative group focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-300 rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Glow behind the card */}
              <div className="absolute -inset-6 rounded-xl bg-yellow-300/30 blur-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card */}
              <Card
                title={name}
                subtitle={level}
                updatedAt={updatedAt}
                className="relative z-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md 
                           hover:shadow-xl transform transition-all duration-300 flex flex-col items-center text-center"
                // Removed the motion.div wrapper and the infinite 'animate' prop
                language={
                  <Icon className="w-10 h-10" style={{ color }} />
                }
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default memo(Skills);
