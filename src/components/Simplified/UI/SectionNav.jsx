import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { useLenis } from '../../../context/LenisContext.jsx';

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

    // 1. Memoize Section Positions (Recalculate on window height change) 📐
    const sectionPositions = useMemo(() => {
        if (typeof window === 'undefined' || windowHeight === 0) return [];
        
        return sections.map(id => {
            const el = document.getElementById(id);
            if (el) {
                // IMPROVEMENT: Use the section's top position minus a reasonable offset (e.g., 20% of viewport)
                // This ensures the dot lights up when the section starts entering the top 20% of the screen.
                const threshold = el.offsetTop - windowHeight * 0.20; 
                return { id, threshold };
            }
            return { id, threshold: Infinity };
        }).filter(item => item.threshold !== Infinity);
    }, [windowHeight]); // Dependency changed to windowHeight

    // 2. Lenis Scroll Handler - The definitive fix for the color being stuck! ✅
    useEffect(() => {
        if (!lenis || sectionPositions.length === 0) return;
        
        const updateActiveSection = ({ scroll }) => {
            let current = 'hero'; 
            
            // Iterate through positions in reverse to correctly catch the highest section 
            // whose threshold has been passed. This is generally more reliable.
            for (let i = sectionPositions.length - 1; i >= 0; i--) {
                const { id, threshold } = sectionPositions[i];
                if (scroll >= threshold) {
                    current = id;
                    break; // Found the active section, stop checking lower ones
                }
            }

            setActive(prev => (prev !== current ? current : prev));
        };

        lenis.on('scroll', updateActiveSection);

        return () => {
            lenis.off('scroll', updateActiveSection);
        };
    // Dependencies now correctly include all external values: lenis and sectionPositions
    }, [lenis, sectionPositions]); 

    // 3. Memoize Scroll Function (Stable)
    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (el && lenis) {
            // IMPROVEMENT: Scroll to the section with an offset that matches the active threshold
            const targetOffset = el.offsetTop - windowHeight * 0.20; 
            lenis.scrollTo(targetOffset, { duration: 1.2 });
            setActive(id); // Set active immediately for fast visual feedback
        } else if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setActive(id);
        }
    }, [lenis, windowHeight]);

    return (
        <nav 
            className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-3 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-md p-2 rounded-lg shadow-xl hidden md:flex" // Added hidden on small screens
            aria-label="Section navigation"
        >
            {sections.map((section) => (
                <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    // Ensure 'bg-accent' is defined in your Tailwind config to use the correct color
                    className={`w-3 h-3 rounded-full transition-all ${
                        active === section 
                            ? 'bg-teal-600 dark:bg-teal-400 scale-150 shadow-md shadow-teal-500/50' // IMPROVED ACTIVE STATE
                            : 'bg-gray-400 dark:bg-gray-500 hover:bg-gray-500 dark:hover:bg-gray-400' 
                    }`}
                    aria-label={`Go to ${section} section`}
                    aria-current={active === section ? 'true' : 'false'}
                />
            ))}
        </nav>
    );
}

export default memo(SectionNav);
