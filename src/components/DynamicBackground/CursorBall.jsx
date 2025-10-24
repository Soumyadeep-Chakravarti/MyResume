// src/components/DynamicBackground/CursorBall.jsx
import React, { useEffect, useRef, useContext, useState } from "react"; // Added useContext, useState
import { CursorContext } from '../../context/CursorContext.jsx'; // <-- New Import
import "./CursorBall.css";

// The component no longer needs to accept props if it uses Context
export default function CursorBall({ radius = 35, trailing = 0.18 }) {
  const ballRef = useRef(null);
  // Get the shared cursor ref (x, y, r) from the context
  const cursorRef = useContext(CursorContext); 
  
  // Local ref for the ball's position, allowing smooth trailing
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  // Use React state to manage the dimmed status for clean class application
  const [isDimmed, setIsDimmed] = useState(false); 

  // --- 1. Effect for the Trailing Animation (rAF) ---
  useEffect(() => {
    // If the context is not yet available, exit.
    if (!cursorRef?.current) return;
    
    // Initial position setup using the shared cursor data
    const initialCursorPos = cursorRef.current; 
    pos.current.x = initialCursorPos.x;
    pos.current.y = initialCursorPos.y;

    let animationFrame;
    const animate = () => {
      // Use the shared cursor data for the target position
      pos.current.x += (cursorRef.current.x - pos.current.x) * trailing; 
      pos.current.y += (cursorRef.current.y - pos.current.y) * trailing;
      
      if (ballRef.current) {
        // Use translate3d for GPU acceleration
        ballRef.current.style.transform = `translate3d(${pos.current.x - radius}px, ${pos.current.y - radius}px, 0)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [radius, trailing, cursorRef]); // Depend on cursorRef to ensure effect restarts if context changes

  // --- 2. Effect for the Dimming Logic (Consuming Context Updates) ---
  useEffect(() => {
    if (!cursorRef?.current) return;
    
    // Add a debounced or throttled listener to the window/document for the target check
    // NOTE: This listener is for the *dimming logic only* and still runs frequently.
    // The preferred solution is to use the mouse handler in the *parent* component
    // to update the Context with a target/isInteractive flag, but if this component 
    // must handle target checking, this is the way:
    
    const handleTargetCheck = (e) => {
      const target = e.target;
      const dimSelectors = ["a", "button", "input", "textarea", "p", "h1", "h2", "h3", "span"];
      const shouldDim = dimSelectors.some(sel => target.closest(sel));

      // Use the state setter instead of direct DOM manipulation
      setIsDimmed(shouldDim); 
    };

    // To avoid excessive calls, you should apply the throttle utility here too, 
    // but for simplicity and responsiveness of dimming, a standard listener is used.
    window.addEventListener("mousemove", handleTargetCheck);
    
    return () => {
      window.removeEventListener("mousemove", handleTargetCheck);
    }
  }, [cursorRef]);


  return (
    <div 
      ref={ballRef} 
      className={`cursor-ball ${isDimmed ? "dimmed" : ""}`} // Use state for class management
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      <span className="cursor-ball-inner" />
    </div>
  );
}
