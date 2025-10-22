import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, Github, Twitter, Code, Instagram, MessageSquare } from 'lucide-react'; 
import SectionTitle from '../../UI/SectionTitle';

// Variants for the content block to animate when scrolling into view
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Define your social links here (Comment out any you don't need)
const socialLinks = [
  // --- ESSENTIALS ---
  { 
    name: "Email", 
    href: "mailto:soumyadeepsai1@gmail.com", 
    icon: Mail, 
    style: "bg-red-600 hover:bg-red-700" 
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/soumyadeep-chakravarti-03237028a/", 
    icon: Linkedin, 
    style: "bg-blue-700 hover:bg-blue-800" 
  },
  { 
    name: "GitHub", 
    href: "https://github.com/Soumyadeep-Chakravarti", 
    icon: Github, 
    // Custom style for better contrast in dark mode
    style: "bg-gray-800 hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white" 
  },

  // --- OTHERS (Comment out what you don't use) ---
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/soumyadeep_chakravarti?igsh=a213cjdpNXJkbXh1", 
    icon: Instagram, 
    style: "bg-pink-600 hover:bg-pink-700" 
  },
  { 
    name: "Discord", 
    href: "https://discordapp.com/users/soumyadeep_chakravarti", // Placeholder URL
    icon: MessageSquare, // Using MessageSquare
    style: "bg-indigo-500 hover:bg-indigo-600" 
  },
];

function Contact() {
  return (
    <section 
      id="contact" 
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 
                 bg-gray-100 dark:bg-[#131722] transition-colors duration-500"
    >
      <SectionTitle text="Connect With Me" />
      
      <motion.div
        className="max-w-3xl w-full mt-8"
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

        {/* --- Social Buttons Grid --- */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 gap-6"
          variants={itemVariants} 
        >
          {socialLinks.map(({ name, href, icon: Icon, style }) => (
            <motion.a
              key={name}
              href={href}
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center p-4 rounded-xl text-white font-semibold shadow-lg 
                          transition-all duration-300 transform active:scale-95 ${style}`}
              variants={itemVariants} 
              whileHover={{ scale: 1.05 }}
            >
              <Icon size={20} className="mr-2" />
              {name}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(Contact);
