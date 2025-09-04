//src/pages/PreviousWorkPage.jsx
import React, {Suspense, lazy} from 'react';

// Directly import Navbar and Footer for faster initial render
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

// Lazy load the main content sections



// Main Section
const PreviousWorkPage = () => {
    return(
        <div className="w-full min-h-screen bg-background text-text-primary flex flex-col">
            {/* Navbar is directly rendered for immediate availability */}
            <Navbar  />

            <main className="flex-grow relative w-full">
                {/* Wrap the lazy-loaded content sections in a Suspense boundary */}
                <Suspense fallback={
                    <div className="flex justify-center items-center min-h-[50vh] text-text-secondary">
                        Loading content...
                    </div>
                }>
                    
                </Suspense>
            </main>

            {/* Footer is directly rendered for immediate availability */}
            <Footer />
        </div>
    );
};

export default PreviousWorkPage;

