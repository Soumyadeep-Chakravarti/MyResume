// src/pages/LandingPage.jsx

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Features from '../components/LandingFeatures/Features';
import Footer from '../components/Footer/Footer';

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
