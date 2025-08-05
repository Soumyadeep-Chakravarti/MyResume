// src/components/Footer/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair } from 'lucide-react';

const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Footer = () => {
    return (
        <motion.footer
            className="py-12 px-4 sm:px-6 md:px-8 bg-card-background border-t border-border-color/50 text-text-secondary"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={footerVariants} // Apply variants to the main footer container
        >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                {/* Apply motion to the first content block */}
                <motion.div
                    className="mb-6 md:mb-0"
                    variants={footerVariants} // Apply the same variants for staggered effect
                >
                    <h3 className="text-2xl font-bold text-accent-dark flex items-center justify-center md:justify-start gap-2 mb-2">
                        <Crosshair size={24} className="relative top-[1px]" />
                        <span>Team ByteOps</span>
                    </h3>
                    <p className="text-sm">&copy; {new Date().getFullYear()} All rights reserved.</p>
                </motion.div>

                {/* Apply motion to the second content block (navigation links) */}
                <motion.div
                    className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4 text-sm"
                    variants={footerVariants} // Apply the same variants for staggered effect
                >
                    <a onClick={() => window.open('/privacy-policy', '_blank')} className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a onClick={() => window.open('/terms-of-service', '_blank')} className="hover:text-primary transition-colors">Terms of Service</a>
                    <a onClick={() => window.open('/contact', '_blank')} className="hover:text-primary transition-colors">Contact Us</a>
                </motion.div>
            </div>
        </motion.footer>
    );
};

export default Footer;
