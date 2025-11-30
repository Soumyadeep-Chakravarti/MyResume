import React, { useState, useCallback, memo } from "react"; 
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import DarkModeToggle from "../../Darkmode/DarkModeToggle";
import { useLenis } from "../../../context/LenisContext";

// Define scroll duration constant
const SCROLL_DURATION = 1.2;

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const lenis = useLenis();

    // Memoize the scroll logic
    const scrollToSection = useCallback((id) => {
        const el = document.getElementById(id);
        if (el && lenis) {
            // Use Lenis smooth scrolling if available
            lenis.scrollTo(el.offsetTop, { duration: SCROLL_DURATION });
        } else if (el) {
            // Fallback to native smooth scrolling
            el.scrollIntoView({ behavior: "smooth" });
        }
        setMenuOpen(false); // Close menu automatically after selection
    }, [lenis]);

    // Memoize the logo click logic
    const handleLogoClick = useCallback(() => {
        if (location.pathname === "/") {
            // Scroll to the top of the current page
            lenis?.scrollTo(0, { duration: SCROLL_DURATION });
        } else {
            // Navigate to the homepage, which resets scroll
            navigate("/");
        }
    }, [location.pathname, lenis, navigate]);

    const navItems = [
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Contact", id: "contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-card-background/60 backdrop-blur-md shadow-md transition-colors px-4 py-2">
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto"> {/* Added max-width and center alignment */}
                {/* Logo (Button for A11y and click handler) */}
                <button 
                    onClick={handleLogoClick} 
                    className="cursor-pointer transition-colors p-1" 
                    aria-label="Go to homepage and scroll to top"
                >
                    <div className="flex items-center gap-2"> 
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
                            <User size={18} className="text-accent" />
                        </div>
                        <div className="text-left leading-tight hidden sm:block"> 
                            <p className="text-sm font-semibold text-accent">Soumyadeep</p>
                            <p className="text-xs font-medium text-accent/80">Chakravarti</p>
                        </div>
                    </div>
                </button>

                {/* Desktop Nav */}
                <ul className="hidden md:flex gap-6 text-text-primary font-medium text-sm" role="menubar">
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => scrollToSection(item.id)}
                            className="cursor-pointer transition-colors duration-300 hover:text-accent"
                            role="menuitem"
                            tabIndex={0} // Added tabIndex for keyboard focus
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    scrollToSection(item.id);
                                }
                            }}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>

                {/* Dark Mode & Hamburger */}
                <div className="flex items-center gap-2">
                    <DarkModeToggle />
                    <div className="md:hidden">
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-1"
                            aria-label={menuOpen ? "Close menu" : "Open menu"} 
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X size={24} className="text-text-primary" /> : <Menu size={24} className="text-text-primary" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {menuOpen && (
                <motion.div // Added motion for smooth reveal
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden px-4 pb-3 bg-card-background/50 backdrop-blur-lg rounded-b-lg shadow-xl mt-2"
                >
                    <ul className="flex flex-col gap-3 text-text-primary font-medium text-base" role="menu">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                onClick={() => scrollToSection(item.id)}
                                className="cursor-pointer hover:text-accent transition-colors duration-300 py-1"
                                role="menuitem"
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </nav>
    );
};

export default memo(Navbar);
