import { useEffect, useState } from "react";

const useDarkMode = () => {
    // Initialize theme from localStorage or system preference
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    // Apply/remove 'dark' class on <html> and save to localStorage
    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle("dark", isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    // Sync theme across browser tabs/windows
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "theme") {
                setIsDarkMode(e.newValue === "dark");
            }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;