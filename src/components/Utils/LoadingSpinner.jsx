// components/LoadingSpinner.jsx

import React from 'react';

export function LoadingSpinner({ message = "Loading..." }) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen space-y-4 text-text-primary dark:text-white bg-background-primary dark:bg-background-dark">
            {/* Simple Spinning Icon */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-text-primary dark:border-white"></div>
            
            {/* Message */}
            <p className="text-lg font-medium">{message}</p>
        </div>
    );
}
