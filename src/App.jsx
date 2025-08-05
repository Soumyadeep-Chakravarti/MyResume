import React, { useState, Suspense, lazy } from 'react';

// Lazy load all your page components
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const LearnMorePage = lazy(() => import('./pages/LearnMorePage.jsx'));
const Maps = lazy(() => import('./pages/Maps.jsx'));

// CRITICAL FIX: Import Context Providers DIRECTLY.
// They must be available synchronously at the root of your application's component tree.
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';

export default function App() {
  // Use a state variable for managing the current page
  const [page, setPage] = useState('landing');

  // A function to handle navigation
  const handleNavigate = (newPage) => {
    setPage(newPage);
  };

  const renderPage = () => {
    // A switch statement to render the correct component based on the `page` state
    switch (page) {
      case 'landing':
        return <LandingPageContent />;
      case 'features':
        return <FeaturesPageContent />;
      case 'contact':
        return <ContactPageContent />;
      case 'learn-more':
        return <LearnMorePageContent />;
      case 'maps':
        return <MapsContent />;
      default:
        return <LandingPageContent />;
    }
  };

  return (
    <ThemeProvider>
      <LenisProvider>
        <div className="bg-gray-950 min-h-screen font-sans">
          {/* Header component for navigation */}
          <Header onNavigate={handleNavigate} />

          {/* Suspense still wraps the main content because page components are lazy loaded */}
          <Suspense fallback={<div className="flex justify-center items-center h-screen text-teal-400 text-2xl">Loading...</div>}>
            {renderPage()}
          </Suspense>
        </div>
      </LenisProvider>
    </ThemeProvider>
  );
}
