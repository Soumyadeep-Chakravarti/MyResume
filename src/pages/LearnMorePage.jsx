// src/pages/LearnMorePage.jsx
import React, { Suspense, lazy } from 'react';

// Directly import Navbar and Footer for faster initial render
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Lazy load the main content sections
const LearnMoreHero = lazy(() => import('../components/LearnMore/LearnMoreHero.jsx'));
const VisionPhilosophySection = lazy(() => import('../components/LearnMore/VisionPhilosophySection.jsx'));
const TechnologySection = lazy(() => import('../components/LearnMore/TechnologySection.jsx'));

const LearnMorePage = ({ setShowLogin }) => {
    return (
        <div className="w-full min-h-screen bg-background text-text-primary flex flex-col">
            {/* Navbar is directly rendered for immediate availability */}
            <Navbar setShowLogin={setShowLogin} />

            <main className="flex-grow relative w-full">
                {/* Wrap the lazy-loaded content sections in a Suspense boundary */}
                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-[50vh] text-text-secondary">
                        Loading content...
                    </div>
                }>
                    <LearnMoreHero />
                    <VisionPhilosophySection />
                    <TechnologySection />
                </Suspense>
            </main>

            {/* Footer is directly rendered for immediate availability */}
            <Footer />
        </div>
    );
};

export default LearnMorePage;
