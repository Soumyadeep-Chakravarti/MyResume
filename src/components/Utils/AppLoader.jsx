// src/components/Utils/AppLoader.jsx
import React from 'react';

/**
 * A dedicated loading screen component for Suspense fallbacks.
 * It features a spinning animation and displays a custom message.
 */
export default function AppLoader({ message = "Loading content..." }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
            <svg 
                className="animate-spin h-8 w-8 text-cyan-400" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
            >
                {/* Background circle */}
                <circle 
                    className="opacity-25" 
                    cx="12" cy="12" r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                ></circle>
                {/* Spinning path */}
                <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
            <p className="mt-4 text-sm uppercase tracking-widest text-gray-400">{message}</p>
        </div>
    );
}
