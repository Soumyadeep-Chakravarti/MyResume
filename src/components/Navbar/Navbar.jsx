// src/components/Navbar/Navbar.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import DarkModeToggle from "../Darkmode/DarkModeToggle";
import { useLenis } from "../../context/LenisContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const lenis = useLenis();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      // Smooth scroll to top on home
      lenis?.scrollTo(0);
    } else {
      navigate("/");
      // After navigating, jump to top of page
      window.scrollTo(0, 0); // ✅ two numbers
      // or, if you want smooth scroll:
      // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Contact", path: "/contact" },
    { name: "Previous Work", path: "/previous-work" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-card-background/70 backdrop-blur-sm shadow-sm transition-colors">
      {" "}
      {/* Reduced opacity to /70 and blur to -sm */}
      <div className="w-full px-6 py-4 flex justify-between items-center">
        <h1
          onClick={handleLogoClick}
          className="cursor-pointer transition-colors"
        >
          <div className="flex flex-col items-center gap-2">
            {/* Circle icon */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
              <User size={22} className="text-accent" />
            </div>

            {/* Name block */}
            <div className="text-center leading-tight">
              <p className="text-lg font-semibold text-accent">Soumyadeep</p>
              <p className="text-lg font-semibold text-accent">Chakravarti</p>
            </div>
          </div>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-text-primary font-medium">
          {" "}
          {/* Using new theme colors */}
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer hover:text-accent transition ${
                location.pathname === item.path
                  ? "text-accent font-semibold"
                  : "" // Using new theme colors
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Actions: Dark mode + Try Now */}
        <div className="flex items-center gap-4 relative group">
          <DarkModeToggle />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={28} className="text-text-primary" />
            ) : (
              <Menu size={28} className="text-text-primary" />
            )}{" "}
            {/* Ensure icons pick up text color */}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4">
          <ul className="flex flex-col gap-4 text-text-primary font-medium">
            {" "}
            {/* Using new theme colors */}
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className={`cursor-pointer hover:text-accent transition ${
                  location.pathname === item.path
                    ? "text-accent font-semibold"
                    : "" // Using new theme colors
                }`}
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
