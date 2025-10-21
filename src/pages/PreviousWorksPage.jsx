// src/pages/PreviousWorkPage.jsx
import React, { Suspense, lazy } from 'react';

// Components
import DynamicBackground from '../components/DynamicBackground/PreviousWorkBG.jsx';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Lazy load main content
const GitHubSection = lazy(() => import("../components/PreviousWorkPage/GithubSection/GithubSection.jsx"));

const PreviousWorkPage = () => {
    return (
        <div className="w-full min-h-screen text-text-primary flex flex-col relative overflow-x-hidden">
            {/* Dynamic background */}
            <DynamicBackground />

            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow relative w-full pt-40 px-4 md:px-8 lg:px-16">
                {/* Lazy-loaded sections with fallback */}
                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-[50vh] text-text-secondary">
                        Loading content...
                    </div>
                }>
                    <GitHubSection username="Soumyadeep-Chakravarti" />
                </Suspense>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default PreviousWorkPage;


