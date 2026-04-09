// src/App.jsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { LenisProvider } from './context/LenisContext.jsx';
import ErrorBoundary from './components/Utils/ErrorBoundary.jsx';

const SimplifiedResume = lazy(() => import('./components/Simplified/SimplifiedResume'));

const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">Loading system...</p>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <LenisProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<SimplifiedResume />} />
              </Routes>
            </Suspense>
          </LenisProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

