import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import DarkModeToggle from "../../Darkmode/DarkModeToggle";
import { useLenis } from "../../../context/LenisContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const lenis = useLenis();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      lenis?.scrollTo(0);
    } else {
      navigate("/");
      window.scrollTo(0, 0);
    }
  };

  const navItems = [
    { name: "Hero", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el.offsetTop, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-card-background/60 backdrop-blur-md shadow-md transition-colors px-4 py-2">
      <div className="flex justify-between items-center w-full">
        {/* Logo */}
        <h1 onClick={handleLogoClick} className="cursor-pointer transition-colors">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10">
              <User size={18} className="text-accent" />
            </div>
            <div className="text-center leading-tight">
              <p className="text-sm font-semibold text-accent">Soumyadeep</p>
              <p className="text-sm font-semibold text-accent">Chakravarti</p>
            </div>
          </div>
        </h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-4 text-text-primary font-medium text-sm">
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
        <div className="flex items-center gap-2 relative group">
          <DarkModeToggle />
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} className="text-text-primary" /> : <Menu size={24} className="text-text-primary" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-3 bg-card-background/50 backdrop-blur-md rounded-b-lg shadow-md mt-2">
          <ul className="flex flex-col gap-3 text-text-primary font-medium text-sm">
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  scrollToSection(item.id);
                  setMenuOpen(false);
                }}
                className="cursor-pointer hover:text-accent transition-colors duration-300"
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

export default Navbar;

