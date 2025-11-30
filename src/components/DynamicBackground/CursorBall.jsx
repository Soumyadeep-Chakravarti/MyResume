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
        // We only proceed if the cursorRef object has been initialized by the Provider
        if (!cursorRef?.current) return;
        
        // Initial position setup: Start the local ball position at the cursor's current position
        const initialCursorPos = cursorRef.current; 
        pos.current.x = initialCursorPos.x;
        pos.current.y = initialCursorPos.y;

        let animationFrame;
        
        // The core animation loop
        const animate = () => {
            const targetX = cursorRef.current.x;
            const targetY = cursorRef.current.y;

            // Smoothly trail the target position using the 'trailing' factor
            pos.current.x += (targetX - pos.current.x) * trailing; 
            pos.current.y += (targetY - pos.current.y) * trailing;
            
            if (ballRef.current) {
                // Use translate3d for GPU acceleration (always preferred over translate)
                // We subtract 'radius' to center the ball element (whose size is 2*radius) 
                ballRef.current.style.transform = `translate3d(${pos.current.x - radius}px, ${pos.current.y - radius}px, 0)`;
            }
            animationFrame = requestAnimationFrame(animate);
        };
        
        animate(); // Start the loop

        return () => {
            // Cleanup on unmount or dependency change
            cancelAnimationFrame(animationFrame); 
        };
    // Dependencies only include props that affect the animation math
    }, [radius, trailing]); 

    return (
        <div 
            ref={ballRef} 
            // Apply the 'dimmed' class based on the state received from the Context
            className={`cursor-ball ${isInteractive ? "dimmed" : ""}`} 
            style={{
                // Set the size dynamically
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
            }}
        >
            <span className="cursor-ball-inner" />
        </div>
    );
}
