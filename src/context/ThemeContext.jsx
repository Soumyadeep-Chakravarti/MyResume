// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

// --- 1. Define Context and Initial State ---

// Define a default/initial value for the context. This helps the consumer hook.
const defaultContextValue = {
    /** @type {boolean} */
    darkMode: false, 
    /** @type {(value: boolean) => void} */
    setDarkMode: () => {}, // Dummy function
    /** @type {() => void} */
    toggleDarkMode: () => {}, // New function
};

// Create the context initialized with the default value (for JSDoc/Intellisense)
const ThemeContext = createContext(defaultContextValue);

// --- 2. Custom Hook with Error Handling ---

/**
 * Hook to access the current theme state and controls.
 * @returns {{darkMode: boolean, setDarkMode: (value: boolean) => void, toggleDarkMode: () => void}}
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    
    // Check if the hook is used outside of the provider
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    
    return context;
};

// --- 3. The Provider Component ---

/**
 * Provides theme state (dark/light mode) and persistence to the application.
 * @param {{children: React.ReactNode}} props
 */
export const ThemeProvider = ({ children }) => {
    // Determine initial state using a function for lazy initialization
    const [darkMode, setDarkMode] = useState(() => {
        // If not running in a browser environment (e.g., SSR), default to false
        if (typeof window === 'undefined') {
            return false;
        }

        // 1. Check localStorage first
        const persistedTheme = localStorage.getItem("theme");
        if (persistedTheme) {
            return persistedTheme === "dark";
        }
        
        // 2. Fallback to system preference
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    // Helper function to toggle the mode
    const toggleDarkMode = useCallback(() => {
        setDarkMode(prevMode => !prevMode);
    }, []);

    // --- EFFECT 1: DOM Manipulation & Local Storage Persistence ---
    useEffect(() => {
        const html = document.documentElement;
        
        if (darkMode) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // --- EFFECT 2: System Preference Listener (Optional but Recommended) ---
    // This allows the theme to automatically switch if the OS theme setting changes
    useEffect(() => {
        // Only run this listener if the user hasn't explicitly set a preference
        // by checking if 'theme' is absent in localStorage or if we want to always sync.
        // For simplicity, we'll listen always, but only use it if the user hasn't
        // manually overridden (optional logic, removed here for a simpler listener).
        
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        
        const handleChange = (e) => {
             // Only update the state if the localStorage isn't explicitly overriding it
             const persistedTheme = localStorage.getItem("theme");
             if (!persistedTheme) {
                 setDarkMode(e.matches);
             }
        };

        // Add the listener
        mediaQuery.addEventListener('change', handleChange);

        // Cleanup the listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [setDarkMode]); // Rerun if setDarkMode changes (though unlikely with useState)


    // Memoize the context value to prevent unnecessary re-renders in consumers
    const value = useMemo(() => ({
        darkMode,
        setDarkMode,
        toggleDarkMode,
    }), [darkMode, setDarkMode, toggleDarkMode]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
