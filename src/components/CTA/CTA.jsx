// src/components/CTA/CTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ctaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const CTA = ({ setShowLogin }) => { // Accept setShowLogin prop
    const navigate = useNavigate();

    const handleCTAClick = () => {
        // If setShowLogin is provided, open the login modal
        if (setShowLogin) {
            setShowLogin(true);
        } else {
            // Fallback to navigation if not used as an overlay trigger
            navigate('/login');
        }
    };

    return (
        <section className="py-20 px-4 sm:px-6 md:px-8 bg-primary dark:bg-primary-hover text-white text-center">
            <motion.div
                className="max-w-4xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={ctaVariants}
            >
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
                    Ready to Transform Your Workflow?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                    Join thousands of satisfied users and start building something amazing today.
                </p>
                <button
                    onClick={handleCTAClick}
                    className="px-10 py-4 bg-white text-primary font-bold rounded-full shadow-lg
                               hover:bg-gray-100 transition-all duration-300 ease-in-out
                               transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
                >
                    Get Started Now
                </button>
            </motion.div>
        </section>
    );
};

export default CTA;
