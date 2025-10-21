// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';

// Lazy load pages
const SimplifiedResume = lazy(() => import('./components/Simplified/SimplifiedResume'));

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LenisProvider>
          <Suspense
            fallback={
              <div className="flex justify-center items-center min-h-screen text-text-primary">
                Loading application...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<SimplifiedResume />} />
              {/* Add more routes here if needed */}
            </Routes>
          </Suspense>
        </LenisProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

