// src/components/Footer/Footer.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.6, 
            ease: 'easeOut',
            staggerChildren: 0.2
        } 
    },
};

const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

const Footer = () => {
    return (
        <motion.footer
            className="py-12 px-4 sm:px-6 md:px-8 bg-card-background border-t border-border-color/50 text-text-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={footerVariants}
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                
                {/* Contact Info & Social Links */}
                <motion.div
                    className="mb-6 md:mb-0 flex flex-col items-center md:items-start"
                    variants={childVariants}
                >
                    <p className="mb-2">© 2025 Soumyadeep Chakravarti</p>
                    <div className="flex gap-4">
                        <a href="mailto:you@example.com" className="hover:text-primary transition-colors">
                            <Mail className="w-5 h-5" />
                        </a>
                        <a href="https://github.com/Soumyadeep-Chakravarti" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="https://linkedin.com/in/soumyadeep-chakravarti-03237028a" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="mt-2 text-sm text-text-secondary">
                        Let's work together! <a href="#contact" className="text-primary underline">Contact me</a>
                    </p>
                </motion.div>

                {/* Legal & Navigation Links */}
                <motion.div
                    className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm"
                    variants={childVariants}
                >
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Privacy Policy
                    </a>
                    <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Terms of Service
                    </a>
                    <a href="#contact" className="hover:text-primary transition-colors">
                        Contact
                    </a>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;

