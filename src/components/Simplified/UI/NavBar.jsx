// src/components/Simplified/Navbar/Navbar.jsx

import React, { useState, useCallback, memo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import DarkModeToggle from "../../Darkmode/DarkModeToggle";
import { useLenis } from "../../../context/LenisContext";
import { clsx } from "../../../utils/clsx.js";

// Define constants
const SCROLL_DURATION = 1.2;
const SCROLL_THRESHOLD = 50; // Scroll distance in pixels to trigger visual change

const navItems = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
    // ARCHITECTURAL NOTE: If you add an Experience section, add it here:
    // { name: "Experience", id: "experience" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // New state for scroll activation
    // NOTE: For full scroll spy, you would use another state/context here (e.g., activeSection)
    
    const navigate = useNavigate();
    const location = useLocation();
    const lenis = useLenis();

    // 1. ROBUSTNESS: Handle visual changes on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
        };

        window.addEventListener("scroll", handleScroll);
        // Clean up the event listener
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    // Memoize the scroll logic
    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        
        // Use Lenis for smooth scrolling if available and on the same page
        if (el && lenis && location.pathname === "/") {
            // NOTE: Use el.offsetTop - (Navbar Height) for perfect alignment if needed
            lenis.scrollTo(el, { duration: SCROLL_DURATION });
        } else if (el) {
            // Fallback scroll if Lenis is not available
            el.scrollIntoView({ behavior: "smooth" });
        } else if (location.pathname !== "/") {
            // If navigating from another page, navigate first, then scroll on mount
            navigate("/", { state: { targetId: id } });
        }
        
        setMenuOpen(false); // Close menu automatically after selection
    }, [lenis, location.pathname, navigate]);

    // Memoize the logo click logic
    const handleLogoClick = useCallback(() => {
        if (location.pathname === "/") {
            lenis?.scrollTo(0, { duration: SCROLL_DURATION });
        } else {
            // Navigating automatically handles the new page's scroll position
            navigate("/");
        }
    }, [location.pathname, lenis, navigate]);

    // Tailwind classes based on scroll state
    const navClasses = clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 py-2",
        "bg-card-background/80 backdrop-blur-md", // Base transparency/blur
        isScrolled ? "shadow-xl border-b border-accent/10 py-3" : "shadow-md py-4" // Visual change on scroll
    );

    return (
        <nav className={navClasses}>
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo (Refined Branding) */}
                <button 
                    onClick={handleLogoClick} 
                    className="cursor-pointer transition-colors p-1"
                    aria-label="Go to homepage and scroll to top"
                >
                    <div className="flex items-center gap-3">
                        {/* ICON CONTAINER */}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 border border-accent/20">
                            <User size={18} className="text-accent" />
                        </div>
                        {/* NAME */}
                        <div className="text-left leading-tight hidden sm:block">
                            <p className="text-lg font-bold tracking-tight text-accent dark:text-accent-light">
                                Soumyadeep
                            </p>
                        </div>
                    </div>
                </button>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-8 text-text-primary font-medium text-base">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => scrollToSection(item.id)}
                            className={clsx(
                                "cursor-pointer transition-colors duration-300 relative",
                                "hover:text-accent-light dark:hover:text-accent", // Hover color
                                // NOTE: In a full scroll-spy implementation, a class like 'is-active' would be added here
                                // For now, we rely on the hover effect.
                            )}
                        >
                            {/* 2. USABILITY: Underline effect on hover (for polish) */}
                             <span className="relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-accent-light before:transition-all before:duration-300 hover:before:w-full">
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Dark Mode & Hamburger */}
                <div className="flex items-center gap-2">
                    <DarkModeToggle />
                    <div className="md:hidden">
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-1 text-text-primary"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full px-4 pb-4 bg-card-background/90 backdrop-blur-md shadow-2xl transition-all duration-300">
                    <ul className="flex flex-col gap-4 text-text-primary font-medium text-base">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                onClick={() => scrollToSection(item.id)}
                                className="cursor-pointer hover:text-accent transition-colors duration-300 py-2 border-b border-accent/10 last:border-b-0"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default memo(Navbar);
