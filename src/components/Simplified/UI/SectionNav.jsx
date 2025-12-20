// src/components/Simplified/SectionNav/SectionNav.jsx

import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { useLenis } from '../../../context/LenisContext.jsx';
// Import utility function for class names
const clsx = (...classes) => classes.filter(Boolean).join(' ');

// ARCHITECTURAL NOTE: Keep section names defined outside the component for stability
const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

function SectionNav() {
    const [active, setActive] = useState('hero');
    const lenis = useLenis();

    // Store a reference to the window height for threshold calculations
    const [windowHeight, setWindowHeight] = useState(0);

    // Update window height on mount and resize
    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight);
        if (typeof window !== 'undefined') {
            handleResize(); // Initial set
            window.addEventListener('resize', handleResize);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 1. Memoize Section Positions (Robust Threshold Calculation) 📐
    const sectionPositions = useMemo(() => {
        if (typeof window === 'undefined' || windowHeight === 0) return [];
        
        // Filter out sections that don't exist (e.g., if 'contact' is removed)
        const validPositions = sections.map(id => {
            const el = document.getElementById(id);
            if (el) {
                // Threshold: Lights up when the section starts entering the top 20% of the screen.
                const threshold = el.offsetTop - windowHeight * 0.20; 
                return { id, threshold };
            }
            return null;
        }).filter(Boolean); // Filter out null entries
        
        // Sort ascending by threshold to ensure correct reverse iteration later
        return validPositions.sort((a, b) => a.threshold - b.threshold);
    }, [windowHeight]); 

    // 2. Lenis Scroll Handler (The definitive fix for the active state) ✅
    useEffect(() => {
        if (!lenis || sectionPositions.length === 0) return;
        
        const updateActiveSection = ({ scroll }) => {
            let current = 'hero'; // Default to the first section
            
            // Iterate through positions in reverse (from bottom to top of page)
            for (let i = sectionPositions.length - 1; i >= 0; i--) {
                const { id, threshold } = sectionPositions[i];
                if (scroll >= threshold) {
                    current = id;
                    break; // Found the highest section passed, stop checking
                }
            }

            // Only update state if the section has actually changed (Rate Limit/Performance)
            setActive(prev => (prev !== current ? current : prev));
        };

        lenis.on('scroll', updateActiveSection);

        return () => {
            lenis.off('scroll', updateActiveSection);
        };
    // Dependencies are correct: lenis and sectionPositions (which changes only on resize)
    }, [lenis, sectionPositions]); 

    // 3. Memoize Scroll Function (Stable & Coordinated)
    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        const positionItem = sectionPositions.find(p => p.id === id);

        if (el && lenis && positionItem) {
            // Scroll to the calculated threshold position for alignment consistency
            lenis.scrollTo(positionItem.threshold, { duration: 1.2 });
            setActive(id); // Set active immediately for fast visual feedback
        } else if (el) {
            // Fallback for missing Lenis or position data
            el.scrollIntoView({ behavior: 'smooth' });
            setActive(id);
        }
    }, [lenis, sectionPositions]);

    return (
        <nav 
            className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-5 z-50 p-2 rounded-xl shadow-2xl transition-all duration-300 hidden xl:flex" 
            aria-label="Section navigation"
        >
            {/* Added container styling for blur/background (Hidden on anything smaller than XL) */}
             <div className="absolute inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-xl" aria-hidden="true" />
             
            {sections.map((section) => (
                <div key={section} className="relative z-10 group"> {/* Group for Tooltip */}
                    <button
                        onClick={() => scrollToSection(section)}
                        className={clsx(
                            "w-3 h-3 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500",
                            active === section
                                ? 'bg-teal-600 dark:bg-teal-400 scale-150 shadow-md shadow-teal-500/50' // IMPROVED ACTIVE STATE
                                : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400'
                        )}
                        aria-label={`Go to ${section} section`}
                        aria-current={active === section ? 'true' : 'false'}
                    />
                    
                    {/* 2. UX/A11Y: Tooltip for Dot Navigation (Hidden by default) */}
                    <span 
                        className={clsx(
                            "absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap opacity-0 transition-opacity duration-300 pointer-events-none",
                            "bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900",
                            "group-hover:opacity-100 group-focus-within:opacity-100" // Show on hover/focus
                        )}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)} {/* Capitalize the section name */}
                    </span>
                </div>
            ))}
        </nav>
    );
}

export default memo(SectionNav);
