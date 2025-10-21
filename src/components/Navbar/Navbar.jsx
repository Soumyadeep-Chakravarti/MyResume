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
      window.scrollTo(0, 0);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Previous Work", path: "/previous-work" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-card-background/60 backdrop-blur-md shadow-sm transition-colors">
      <div className="w-full px-4 py-2 flex justify-between items-center">
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

        <ul className="hidden md:flex gap-4 text-text-primary font-medium text-sm">
          {navItems.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`cursor-pointer transition-colors duration-300 ${
                location.pathname === item.path
                  ? "text-accent font-semibold"
                  : "hover:text-accent"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 relative group">
          <DarkModeToggle />
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={24} className="text-text-primary" />
            ) : (
              <Menu size={24} className="text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-3 bg-card-background/50 backdrop-blur-md rounded-b-lg shadow-md">
          <ul className="flex flex-col gap-3 text-text-primary font-medium text-sm">
            {navItems.map((item) => (
              <li
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                className={`cursor-pointer hover:text-accent transition-colors duration-300 ${
                  location.pathname === item.path
                    ? "text-accent font-semibold"
                    : ""
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

