import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Aquarium.css";

const DEBOUNCE_DELAY_MS = 150;
const NUM_MOTES = 80;
const NUM_FIREFLIES = 40;
const CURSOR_REPEL_RADIUS_SQ = 220 * 220;
const REPEL_FORCE = 3;
const WIND_FORCE = 0.6;
const SETTLE_RATE = 0.92;

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const createMoteSVG = (size) => {
  return `<svg viewBox="0 0 20 20" width="${size}" height="${size}">
    <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.4"/>
  </svg>`;
};

const createFireflySVG = (size) => {
  return `<svg viewBox="0 0 12 12" width="${size}" height="${size}">
    <circle cx="6" cy="6" r="4" fill="currentColor"/>
    <circle cx="6" cy="6" r="2" fill="white" opacity="0.8"/>
  </svg>`;
};

const darkModeColors = {
  mote: ["oklch(60% 0.08 140)", "oklch(55% 0.1 130)", "oklch(65% 0.06 150)"],
  firefly: ["oklch(85% 0.15 90)", "oklch(75% 0.18 85)", "oklch(80% 0.12 95)"],
  glow: "oklch(85% 0.15 90)",
};

const lightModeColors = {
  mote: ["oklch(45% 0.08 130)", "oklch(40% 0.1 120)", "oklch(50% 0.06 140)"],
  firefly: ["oklch(55% 0.12 100)", "oklch(50% 0.15 95)", "oklch(60% 0.1 105)"],
  glow: "oklch(70% 0.12 140)",
};

export default function Aquarium({ cursorRef }) {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const animationRef = useRef();
  const moteStateRef = useRef([]);
  const fireflyStateRef = useRef([]);
  const mouseVelocityRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: null, y: null });

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }, DEBOUNCE_DELAY_MS);
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const { width, height } = dimensions;

    if (!container || width === 0 || height === 0) return;

    container.innerHTML = "";
    moteStateRef.current = [];
    fireflyStateRef.current = [];

    const colors = darkMode ? darkModeColors : lightModeColors;

    // === LAYER 1: MOTES (slow drift upward) ===
    const motes = Array.from({ length: NUM_MOTES }).map((_, i) => {
      const mote = document.createElement("div");
      mote.className = "aquarium-mote";
      
      const size = 15 + Math.random() * 35;
      mote.innerHTML = createMoteSVG(size);
      
      const color = colors.mote[Math.floor(Math.random() * colors.mote.length)];
      mote.style.color = color;
      mote.style.opacity = (0.15 + Math.random() * 0.2).toString();
      mote.style.filter = `blur(${2 + Math.random() * 4}px)`;
      mote.style.zIndex = "1";

      const state = {
        element: mote,
        x: Math.random() * width,
        y: Math.random() * height,
        baseSpeed: 0.15 + Math.random() * 0.25,
        drift: (Math.random() - 0.5) * 0.3,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.005 + Math.random() * 0.01,
        repelX: 0,
        repelY: 0,
      };

      mote.style.transform = `translate(${state.x}px, ${state.y}px)`;
      container.appendChild(mote);
      
      return state;
    });
    
    moteStateRef.current = motes;

    // === LAYER 2: FIREFLIES (Brownian motion) ===
    const fireflies = Array.from({ length: NUM_FIREFLIES }).map((_, i) => {
      const firefly = document.createElement("div");
      firefly.className = "aquarium-firefly";
      
      const size = 4 + Math.random() * 8;
      firefly.innerHTML = createFireflySVG(size);
      
      const color = colors.firefly[Math.floor(Math.random() * colors.firefly.length)];
      firefly.style.color = color;
      firefly.style.opacity = (0.6 + Math.random() * 0.4).toString();
      firefly.style.zIndex = "2";
      
      // Glow effect
      firefly.style.textShadow = `0 0 ${6 + Math.random() * 8}px ${colors.glow}`;

      const state = {
        element: firefly,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        brownianX: (Math.random() - 0.5) * 1.5,
        brownianY: (Math.random() - 0.5) * 1.5,
        brownianRate: 0.8 + Math.random() * 0.6,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.03 + Math.random() * 0.05,
        pulseAmp: 0.3 + Math.random() * 0.5,
        repelX: 0,
        repelY: 0,
        baseX: 0,
        baseY: 0,
      };

      state.baseX = state.x;
      state.baseY = state.y;
      firefly.style.transform = `translate(${state.x}px, ${state.y}px) scale(${state.pulseAmp})`;
      container.appendChild(firefly);
      
      return state;
    });
    
    fireflyStateRef.current = fireflies;

    let time = 0;
    const animate = () => {
      const cursor = cursorRef?.current;
      const hasCursor = cursor && cursor.x !== undefined && cursor.y !== undefined;
      
      // Calculate mouse velocity for wind effect
      if (hasCursor && prevMouseRef.current.x !== null) {
        mouseVelocityRef.current = {
          x: (cursor.x - prevMouseRef.current.x) * WIND_FORCE,
          y: (cursor.y - prevMouseRef.current.y) * WIND_FORCE,
        };
      }
      if (hasCursor) {
        prevMouseRef.current = { x: cursor.x, y: cursor.y };
      }
      
      const windX = mouseVelocityRef.current.x;
      const windY = mouseVelocityRef.current.y;
      
      // Decay mouse velocity
      mouseVelocityRef.current.x *= 0.95;
      mouseVelocityRef.current.y *= 0.95;
      
      time += 0.016;

      // === UPDATE MOTES ===
      moteStateRef.current.forEach((state) => {
        const { element, baseSpeed, drift, wobblePhase, wobbleSpeed, repelX, repelY } = state;
        
        state.wobblePhase += wobbleSpeed;
        const wobble = Math.sin(state.wobblePhase) * 0.5;
        
        let newY = state.y - baseSpeed + wobble + windY * 0.3;
        let newX = state.x + drift + windX * 0.3;
        
        // Mouse repulsion for motes
        if (hasCursor) {
          const dx = state.x - cursor.x;
          const dy = state.y - cursor.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < CURSOR_REPEL_RADIUS_SQ && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const factor = Math.max(0, 1 - dist / Math.sqrt(CURSOR_REPEL_RADIUS_SQ));
            const repelStrength = factor * REPEL_FORCE * 1.5;
            
            newX += (dx / dist) * repelStrength + repelX * 0.8;
            newY += (dy / dist) * repelStrength + repelY * 0.8;
            
            state.repelX = (dx / dist) * repelStrength * 0.5;
            state.repelY = (dy / dist) * repelStrength * 0.5;
          }
        }
        
        // Settle back
        state.repelX *= SETTLE_RATE;
        state.repelY *= SETTLE_RATE;
        
        // Reset when off screen
        if (newY < -50) {
          newY = height + 50;
          newX = Math.random() * width;
          state.repelX = 0;
          state.repelY = 0;
        }
        
        newX = Math.max(-30, Math.min(newX, width + 30));
        
        state.x = newX;
        state.y = newY;
        element.style.transform = `translate(${newX}px, ${newY}px)`;
      });

      // === UPDATE FIREFLIES ===
      fireflyStateRef.current.forEach((state) => {
        const { element, brownianX, brownianY, brownianRate, pulsePhase, pulseSpeed, pulseAmp, repelX, repelY, baseX, baseY } = state;
        
        // Brownian motion
        const brownianForceX = (Math.random() - 0.5) * brownianRate;
        const brownianForceY = (Math.random() - 0.5) * brownianRate;
        
        state.vx += brownianForceX + brownianX * 0.1;
        state.vy += brownianForceY + brownianY * 0.1;
        
        // Damping
        state.vx *= 0.92;
        state.vy *= 0.92;
        
        // Apply velocity
        let newX = state.x + state.vx + windX * 0.5;
        let newY = state.y + state.vy + windY * 0.5;
        
        // Mouse repulsion for fireflies (stronger)
        if (hasCursor) {
          const dx = state.x - cursor.x;
          const dy = state.y - cursor.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < CURSOR_REPEL_RADIUS_SQ * 0.8 && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const factor = Math.max(0, 1 - dist / Math.sqrt(CURSOR_REPEL_RADIUS_SQ * 0.8));
            const repelStrength = factor * REPEL_FORCE * 2;
            
            newX += (dx / dist) * repelStrength + repelX;
            newY += (dy / dist) * repelStrength + repelY;
            
            state.repelX = (dx / dist) * repelStrength * 0.6;
            state.repelY = (dy / dist) * repelStrength * 0.6;
            
            // Add burst velocity
            state.vx += (dx / dist) * factor * 2;
            state.vy += (dy / dist) * factor * 2;
          }
        }
        
        // Settle back to base position
        state.repelX *= SETTLE_RATE;
        state.repelY *= SETTLE_RATE;
        
        // Update base gradually
        state.baseX = state.baseX * 0.995 + newX * 0.005;
        state.baseY = state.baseY * 0.995 + newY * 0.005;
        
        // Pulse animation
        state.pulsePhase += pulseSpeed;
        const pulseScale = pulseAmp * (0.7 + Math.sin(state.pulsePhase) * 0.3);
        
        // Keep in bounds
        if (newX < -20 || newX > width + 20 || newY < -20 || newY > height + 20) {
          newX = Math.random() * width;
          newY = Math.random() * height;
          state.vx = 0;
          state.vy = 0;
          state.baseX = newX;
          state.baseY = newY;
        }
        
        state.x = newX;
        state.y = newY;
        element.style.transform = `translate(${newX}px, ${newY}px) scale(${pulseScale})`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [dimensions.width, dimensions.height, cursorRef, darkMode]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 bg-transparent" 
    />
  );
}