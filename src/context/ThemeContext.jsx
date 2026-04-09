// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

const defaultContextValue = {
    darkMode: false,
    setDarkMode: () => {},
    toggleDarkMode: () => {},
};

const ThemeContext = createContext(defaultContextValue);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const isDayMode = () => {
    if (typeof window === 'undefined') return false;
    return !document.documentElement.classList.contains('dark');
};

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window === 'undefined') return false;
        const persistedTheme = localStorage.getItem("theme");
        if (persistedTheme) return persistedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const toggleDarkMode = useCallback(() => {
        setDarkMode(prev => !prev);
    }, []);

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

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                setDarkMode(e.matches);
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const value = useMemo(() => ({
        darkMode,
        setDarkMode,
        toggleDarkMode,
    }), [darkMode, toggleDarkMode]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};