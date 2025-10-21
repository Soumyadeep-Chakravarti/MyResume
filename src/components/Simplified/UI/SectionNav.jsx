import React, { useEffect, useState } from 'react';
import { useLenis } from '../../../context/LenisContext.jsx';

const sections = ['hero', 'about', 'skills', 'projects', 'contact'];

export default function SectionNav() {
  const [active, setActive] = useState('hero');
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; // fallback if Lenis not yet ready
      let current = 'hero';

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - window.innerHeight / 2) {
          current = id;
        }
      });

      setActive(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && lenis) {
      lenis.scrollTo(el.offsetTop, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-3 z-50 bg-card-background/50 backdrop-blur-md p-2 rounded-lg shadow-sm">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollToSection(section)}
          className={`w-3 h-3 rounded-full transition-all ${
            active === section ? 'bg-accent scale-125' : 'bg-gray-400'
          }`}
          aria-label={section}
        />
      ))}
    </nav>
  );
}

