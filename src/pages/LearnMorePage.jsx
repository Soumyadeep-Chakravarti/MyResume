// src/pages/LearnMorePage.jsx
import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Directly import Navbar, Footer, and background for immediate render
import FluidAnimationBackground from '../components/DynamicBackground/LearnMoreBG.jsx';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Lazy-loaded content sections
const LearnMoreHero = lazy(() => import('../components/LearnMore/LearnMoreHero.jsx'));
const VisionPhilosophySection = lazy(() => import('../components/LearnMore/VisionPhilosophySection.jsx'));
const TechnologySection = lazy(() => import('../components/LearnMore/TechnologySection.jsx'));

const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const LearnMorePage = () => {
    return (
        <div className="w-full min-h-screen bg-background text-text-primary flex flex-col relative">
            {/* Animated background */}
            <FluidAnimationBackground />

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow relative w-full pt-40">
                {/* Hero Section */}
                <Suspense fallback={
                    <div className="py-20 text-center animate-pulse" role="status" aria-live="polite">
                        Loading hero...
                    </div>
                }>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                    >
                        <LearnMoreHero />
                    </motion.div>
                </Suspense>

                {/* Vision & Philosophy Section */}
                <Suspense fallback={
                    <div className="py-10 text-center animate-pulse" role="status" aria-live="polite">
                        Loading vision & philosophy...
                    </div>
                }>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                    >
                        <VisionPhilosophySection />
                    </motion.div>
                </Suspense>

                {/* Technology Section */}
                <Suspense fallback={
                    <div className="py-10 text-center animate-pulse" role="status" aria-live="polite">
                        Loading technology...
                    </div>
                }>
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInVariants}
                    >
                        <TechnologySection />
                    </motion.div>
                </Suspense>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LearnMorePage;

