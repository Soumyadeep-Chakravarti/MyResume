import { useEffect, useState } from "react";

/**
 * A custom hook to manage dark mode state, applying the 'dark' class
 * to the <html> element, persisting the setting in localStorage, and
 * reacting to both manual changes and system preference changes.
 * * @returns {[boolean, (value: boolean | ((prevState: boolean) => boolean)) => void]}
 * A tuple containing the current dark mode state and the setter function.
 */
const useDarkMode = () => {
  // 1. Initialize theme from localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Fallback to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // --- EFFECT 1: Apply/remove 'dark' class and save to localStorage ---
  useEffect(() => {
    const root = document.documentElement;

    // Apply the class to the root element (used by Tailwind CSS/standard practice)
    root.classList.toggle("dark", isDarkMode);

    // Persist the setting
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // This effect runs on every change to isDarkMode
  }, [isDarkMode]);

  // --- EFFECT 2: Sync theme across browser tabs/windows (Storage Event) ---
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only update if the 'theme' key was changed externally
      if (e.key === "theme" && e.newValue !== null) {
        // We use a functional update to avoid a dependency on isDarkMode
        setIsDarkMode(e.newValue === "dark");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []); // Runs once on mount

  // --- EFFECT 3: React to real-time system preference changes (NEW) ---
  useEffect(() => {
    // This line is always called, registering the hook unconditionally.
    if (!window.matchMedia) return; // Add a simple guard for non-browser environments

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e) => {
      const savedTheme = localStorage.getItem("theme");
      // Only update if no explicit theme is set
      if (!savedTheme) {
        setIsDarkMode(e.matches);
      }
    };

    // Use the modern API if available, ensuring the hook call is constant.
    // The conditional check for addEventListener/addListener is good, but
    // it's safest to abstract this compatibility logic.

    const changeEvent = "change"; // Standard event name

    // Use a single, constant method call (addEventListener) and wrap the legacy in a helper if needed
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener(changeEvent, handleSystemChange);
    } else if (typeof mediaQuery.addListener === "function") {
      // Fallback for deprecated method
      mediaQuery.addListener(handleSystemChange);
    } else {
      return; // No support, do nothing
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener(changeEvent, handleSystemChange);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []); // Runs once on mount

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;

