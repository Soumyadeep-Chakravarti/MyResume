// src/pages/LandingPage.jsx
import React, { Suspense, lazy } from 'react';

// Lazy load components
const Navbar = lazy(() => import('../components/Navbar/Navbar'));
const Hero = lazy(() => import('../components/Hero/Hero'));
const Features = lazy(() => import('../components/LandingFeatures/Features'));
const Footer = lazy(() => import('../components/Footer/Footer'));


// LandingPage now accepts setShowLogin as a prop from App.jsx
const LandingPage = ({ setShowLogin }) => {
    return (
        <div
            className="relative w-full min-h-screen text-text-primary"
        >
            {/* Navbar is fixed, so it floats above content */}
            <Navbar setShowLogin={setShowLogin} /> {/* Pass setShowLogin to Navbar */}

            {/* Main content area - Added 'relative' for Framer Motion children */}
            <main className="relative w-full">
                <Hero/>
                <Features/>
            </main>

            <Footer/>
        </div>
    );
};

export default LandingPage;
