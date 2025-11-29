// src/components/DynamicBackground/CursorBall.jsx
import React, { useEffect, useRef, useContext } from "react"; 
import { CursorContext } from '../../context/CursorContext.jsx'; 
import "./CursorBall.css";

// The component uses Context to get position and interaction state
export default function CursorBall({ radius = 35, trailing = 0.18 }) {
    const ballRef = useRef(null);
    
    // Get the shared cursor ref (x, y, r) and the isInteractive state from the context
    const { cursorRef, isInteractive } = useContext(CursorContext); 
    
    // Local ref for the ball's position, allowing smooth trailing
    const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    
    // --- Effect for the Trailing Animation (rAF) ---
    useEffect(() => {
        if (!cursorRef?.current) return;
        
        // Initial position setup
        const initialCursorPos = cursorRef.current; 
        pos.current.x = initialCursorPos.x;
        pos.current.y = initialCursorPos.y;

        let animationFrame;
        const animate = () => {
            // Smoothly trail the target position from the shared ref
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
    // Dependencies only include props that affect the animation math
    }, [radius, trailing]); 

    // The dimming logic (previously in a second useEffect) is now entirely managed by the Provider.

    return (
        <div 
            ref={ballRef} 
            // Apply the 'dimmed' class based on the state received from the Context
            className={`cursor-ball ${isInteractive ? "dimmed" : ""}`} 
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
            }}
        >
            <span className="cursor-ball-inner" />
        </div>
    );
}
