import React, { useState, useCallback, memo } from "react"; // Added useCallback, memo
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import DarkModeToggle from "../../Darkmode/DarkModeToggle";
import { useLenis } from "../../../context/LenisContext";

// Define throttle here if it's used elsewhere in the project,
// otherwise, define a simple utility here for the click handler.
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
      lenis.scrollTo(el.offsetTop, { duration: SCROLL_DURATION });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // Close menu automatically after selection
  }, [lenis]);

  // Memoize the logo click logic
  const handleLogoClick = useCallback(() => {
    if (location.pathname === "/") {
      lenis?.scrollTo(0, { duration: SCROLL_DURATION });
    } else {
      // Navigating automatically handles the new page's scroll position
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
      <div className="flex justify-between items-center w-full">
        {/* Logo (Semantically changed to a button for better A11y) */}
        <button 
          onClick={handleLogoClick} 
          className="cursor-pointer transition-colors p-1" // Added p-1 for hit area
          aria-label="Go to homepage and scroll to top"
        >
          <div className="flex items-center gap-2"> {/* Simplified structure */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
              <User size={18} className="text-accent" />
            </div>
            <div className="text-left leading-tight hidden sm:block"> {/* Hide on extra small screens for space */}
              <p className="text-sm font-semibold text-accent">Soumyadeep</p>
              <p className="text-xs font-medium text-accent/80">Chakravarti</p> {/* Slightly toned down second line */}
            </div>
          </div>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-text-primary font-medium text-sm">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="cursor-pointer transition-colors duration-300 hover:text-accent"
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
              aria-label={menuOpen ? "Close menu" : "Open menu"} // Added A11y
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} className="text-text-primary" /> : <Menu size={24} className="text-text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 bg-card-background/50 backdrop-blur-lg rounded-b-lg shadow-xl mt-2">
          <ul className="flex flex-col gap-3 text-text-primary font-medium text-base"> {/* Slightly larger text for mobile touch targets */}
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => scrollToSection(item.id)} // scrollToSection now handles closing the menu
                className="cursor-pointer hover:text-accent transition-colors duration-300 py-1"
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

export default memo(Navbar); // <-- Memoize the component
