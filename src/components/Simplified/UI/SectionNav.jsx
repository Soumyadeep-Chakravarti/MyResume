import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { useLenis } from '../../../context/LenisContext.jsx';

// Define the sections to navigate
const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
const SCROLL_DURATION = 1.2;
const VIEWPORT_OFFSET_PERCENTAGE = 0.20; // 20% from the top

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

    // 1. Memoize Section Positions (Recalculate on window height change) 📐
    const sectionPositions = useMemo(() => {
        if (typeof window === 'undefined' || windowHeight === 0) return [];
        
        // Calculate the viewport offset needed for the threshold
        const offset = windowHeight * VIEWPORT_OFFSET_PERCENTAGE;

        return sections.map(id => {
            const el = document.getElementById(id);
            if (el) {
                // Threshold: Section starts entering the top 20% of the screen.
                const threshold = el.offsetTop - offset;
                return { id, threshold };
            }
            return { id, threshold: Infinity };
        }).filter(item => item.threshold !== Infinity);
    }, [windowHeight]); // Dependency is correctly windowHeight

    // 2. Lenis Scroll Handler - Correctly determines the active section ✅
    useEffect(() => {
        if (!lenis || sectionPositions.length === 0) return;
        
        const updateActiveSection = ({ scroll }) => {
            let current = 'hero'; // Default to the first section

            // Iterate through positions in reverse to correctly catch the highest section 
            // whose threshold has been passed. This is generally more reliable.
            for (let i = sectionPositions.length - 1; i >= 0; i--) {
                const { id, threshold } = sectionPositions[i];
                if (scroll >= threshold) {
                    current = id;
                    break; // Found the active section, stop checking lower ones
                }
            }

            // Only update state if the active section has changed
            setActive(prev => (prev !== current ? current : prev));
        };

        // Attach the scroll listener
        lenis.on('scroll', updateActiveSection);

        // Cleanup the listener on unmount or dependency change
        return () => {
            lenis.off('scroll', updateActiveSection);
        };
    }, [lenis, sectionPositions]); // Dependencies are correct

    // 3. Memoize Scroll Function (Stable and Synchronized)
    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (el && lenis) {
            // Calculate the target scroll position using the same offset as the threshold
            const targetOffset = el.offsetTop - windowHeight * VIEWPORT_OFFSET_PERCENTAGE; 
            
            // Scroll using Lenis
            lenis.scrollTo(targetOffset, { duration: SCROLL_DURATION });
            
            // Set active immediately for fast visual feedback (before the scroll event updates it)
            setActive(id); 
        } else if (el) {
            // Fallback for non-Lenis environment
            el.scrollIntoView({ behavior: 'smooth' });
            setActive(id);
        }
    }, [lenis, windowHeight]); // Dependencies are correct

    return (
        <nav 
            className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-3 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-md p-2 rounded-lg shadow-xl hidden md:flex" 
            aria-label="Section navigation"
        >
            {sections.map((section) => (
                <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                        active === section 
                            ? 'bg-teal-600 dark:bg-teal-400 scale-150 shadow-md shadow-teal-500/50' 
                            : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400' 
                    } focus:outline-none focus:ring-2 focus:ring-teal-400`} // Added focus ring
                    aria-label={`Go to ${section} section`}
                    aria-current={active === section ? 'true' : 'false'}
                />
            ))}
        </nav>
    );
}

export default memo(SectionNav);
