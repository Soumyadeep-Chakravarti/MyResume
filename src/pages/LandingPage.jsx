// src/pages/LandingPage.jsx
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy load components
const Navbar = lazy(() => import('../components/Navbar/Navbar'));
const Hero = lazy(() => import('../components/Hero/Hero'));
const Features = lazy(() => import('../components/LandingFeatures/Features'));
const Footer = lazy(() => import('../components/Footer/Footer'));

// Fade-in animation variants
const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// LandingPage accepts setShowLogin prop
const LandingPage = ({ setShowLogin }) => {
    return (
        <div className="relative w-full min-h-screen text-text-primary bg-background flex flex-col">
            {/* Navbar */}
            <Suspense fallback={<div className="py-4 text-center animate-pulse" aria-live="polite">Loading navbar...</div>}>
                <Navbar setShowLogin={setShowLogin} />
            </Suspense>

            {/* Main content */}
            <main className="relative w-full flex-grow">
                {/* Hero Section */}
                <Suspense fallback={<div className="py-20 text-center animate-pulse" aria-live="polite">Loading hero...</div>}>
                    <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
                        <Hero />
                    </motion.div>
                </Suspense>

                {/* Features Section */}
                <Suspense fallback={<div className="py-10 text-center animate-pulse" aria-live="polite">Loading features...</div>}>
                    <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
                        <Features />
                    </motion.div>
                </Suspense>
            </main>

            {/* Footer */}
            <Suspense fallback={<div className="py-4 text-center animate-pulse" aria-live="polite">Loading footer...</div>}>
                <Footer />
            </Suspense>
        </div>
    );
};

export default LandingPage;

