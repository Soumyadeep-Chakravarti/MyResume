import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Komorebi.css";

const DEBOUNCE_DELAY_MS = 100;

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default function Komorebi() {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const animationRef = useRef();
  const shadowRefs = useRef([]);

  useEffect(() => {
    if (darkMode || !containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create shadow patches
    const numShadows = 12;
    shadowRefs.current = [];

    for (let i = 0; i < numShadows; i++) {
      const shadow = document.createElement("div");
      shadow.className = "komorebi-shadow";
      
      const size = 150 + Math.random() * 250;
      const x = Math.random() * width;
      const y = Math.random() * height;
      
      shadow.style.width = `${size}px`;
      shadow.style.height = `${size * 0.7}px`;
      shadow.style.left = `${x}px`;
      shadow.style.top = `${y}px`;
      shadow.style.opacity = 0.03 + Math.random() * 0.05;
      shadow.style.animationDelay = `${Math.random() * 5}s`;
      shadow.style.animationDuration = `${8 + Math.random() * 6}s`;
      
      container.appendChild(shadow);
      shadowRefs.current.push({ element: shadow, baseX: x, baseY: y, speed: 0.02 + Math.random() * 0.03 });
    }

    let scrollY = 0;
    const handleScroll = debounce(() => {
      scrollY = window.scrollY;
    }, DEBOUNCE_DELAY_MS);

    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const animate = () => {
      time += 0.01;
      
      shadowRefs.current.forEach((shadow, i) => {
        // Parallax effect - shadows move slower than scroll
        const parallaxY = scrollY * (0.1 + shadow.speed * 0.5);
        
        // Gentle floating movement
        const floatX = Math.sin(time * 0.3 + i) * 15;
        const floatY = Math.cos(time * 0.25 + i * 0.7) * 10;
        
        const newX = shadow.baseX + floatX;
        const newY = shadow.baseY + floatY - parallaxY;
        
        shadow.element.style.transform = `translate(${newX}px, ${newY}px)`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationRef.current);
      if (container) container.innerHTML = "";
    };
  }, [darkMode]);

  // Only show in light mode
  if (darkMode) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-[1] komorebi-container" 
    />
  );
}