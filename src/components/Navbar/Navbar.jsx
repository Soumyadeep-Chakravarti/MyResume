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
            lenis?.scrollTo(0);
        } else {
            navigate("/");
            window.scrollTo(0);
        }
    };

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-card-background/70 backdrop-blur-sm shadow-sm transition-colors"> {/* Reduced opacity to /70 and blur to -sm */}
            <div className="w-full px-6 py-4 flex justify-between items-center">
                <h1
                    onClick={handleLogoClick}
                    className="text-2xl font-bold text-accent-dark cursor-pointer transition-colors" // Using new theme colors
                >
                    <span className="flex items-center gap-2">
                        <User size={24} className="relative top-[1px]" />
                        <span>Soumyadeep Chakravarti</span>
                    </span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-6 text-text-primary font-medium"> {/* Using new theme colors */}
                    {navItems.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`cursor-pointer hover:text-accent transition ${location.pathname === item.path ? "text-accent font-semibold" : "" // Using new theme colors
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
                        {menuOpen ? <X size={28} className="text-text-primary" /> : <Menu size={28} className="text-text-primary" />} {/* Ensure icons pick up text color */}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden px-6 pb-4">
                    <ul className="flex flex-col gap-4 text-text-primary font-medium"> {/* Using new theme colors */}
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    setMenuOpen(false);
                                }}
                                className={`cursor-pointer hover:text-accent transition ${location.pathname === item.path ? "text-accent font-semibold" : "" // Using new theme colors
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
