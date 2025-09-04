// src/App.jsx
import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load your page components (This is good for performance and should remain lazy)
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const LearnMorePage = lazy(() => import('./pages/LearnMorePage.jsx'));

// CRITICAL FIX: Import Context Providers DIRECTLY. DO NOT lazy load them.
// They must be available synchronously at the root of your application's component tree.
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      {/* ThemeProvider and LenisProvider are now directly rendered and available immediately */}
      <ThemeProvider>
        <LenisProvider>
          {/* Suspense still wraps the Routes because page components are lazy loaded */}
          <Suspense fallback={<div className="flex justify-center items-center min-h-screen text-text-primary">Loading application...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<FeaturesPage  />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/learn-more" element={<LearnMorePage />} />
            </Routes>
            )}
          </Suspense>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
