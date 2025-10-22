// src/components/DynamicBackground/Aquarium.jsx
import React, { useEffect, useRef } from "react";
// Assuming Aquarium.css contains:
// .aquarium-ball {
//   position: absolute;
//   border-radius: 50%;
//   background: radial-gradient(circle at 30% 30%, rgba(120, 190, 255, 0.8), rgba(0, 100, 200, 0.5));
//   box-shadow: 0 0 5px rgba(0, 150, 255, 0.8);
//   will-change: transform; /* Critical for performance */
// }
import "./Aquarium.css";

// Constants for configuration
const BALL_SIZE_MIN = 8;
const BALL_SIZE_MAX = 20;
const INITIAL_OFFSET = -50; // Start position above the screen
const CURSOR_REPEL_RADIUS_SQ = 150 * 150; // Repel radius squared (150px)
const REPEL_FORCE = 0.5;

export default function Aquarium({ numBalls = 8, cursor }) {
  const containerRef = useRef(null);
  const animationRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initial Setup: Create and initialize balls
    // Use data attributes to store initial positions, simplifying animation logic
    container.innerHTML = "";
    
    const balls = Array.from({ length: numBalls }).map(() => {
      const ball = document.createElement("div");
      ball.className = "aquarium-ball";
      
      const size = Math.random() * (BALL_SIZE_MAX - BALL_SIZE_MIN) + BALL_SIZE_MIN;
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      
      const initialX = Math.random() * window.innerWidth;
      const initialY = Math.random() * window.innerHeight + INITIAL_OFFSET;

      // Store state in data attributes for simple access during animation
      ball.dataset.x = initialX.toString();
      ball.dataset.y = initialY.toString();
      ball.dataset.speed = (Math.random() * 0.5 + 0.2).toString();
      
      ball.style.opacity = (Math.random() * 0.5 + 0.5).toString();

      // Initial transform (GPU-accelerated positioning)
      ball.style.transform = `translate(${initialX}px, ${initialY}px)`;
      
      container.appendChild(ball);
      return ball;
    });

    // 2. Animation Loop
    const animate = () => {
      const { x: cursorX, y: cursorY } = cursor || {};
      const hasCursor = cursorX !== undefined && cursorY !== undefined;

      balls.forEach((ball) => {
        let currentX = parseFloat(ball.dataset.x);
        let currentY = parseFloat(ball.dataset.y);
        const speed = parseFloat(ball.dataset.speed);
        
        // --- 3. GPU-Accelerated Movement ---
        let newY = currentY + speed;

        // --- 4. Cursor Repulsion Logic (The improvement) ---
        let repelX = 0;
        let repelY = 0;

        if (hasCursor) {
          const dx = currentX - cursorX;
          const dy = currentY - cursorY;
          const distanceSq = dx * dx + dy * dy;
          
          if (distanceSq < CURSOR_REPEL_RADIUS_SQ && distanceSq > 1) {
            const distance = Math.sqrt(distanceSq);
            const factor = Math.max(0, 1 - distance / Math.sqrt(CURSOR_REPEL_RADIUS_SQ));
            
            // Apply repulsion force away from the cursor
            repelX = (dx / distance) * factor * REPEL_FORCE;
            repelY = (dy / distance) * factor * REPEL_FORCE;
          }
        }
        
        currentX += repelX;
        newY += repelY;
        
        // --- 5. Boundary Check ---
        if (newY > window.innerHeight) {
          newY = INITIAL_OFFSET; // Reset to top
          currentX = Math.random() * window.innerWidth; // New horizontal position
        }
        
        // Update state in dataset
        ball.dataset.x = currentX.toString();
        ball.dataset.y = newY.toString();

        // Apply new position using transform for GPU performance
        ball.style.transform = `translate(${currentX}px, ${newY}px)`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // 6. Cleanup
    return () => cancelAnimationFrame(animationRef.current);
  }, [numBalls, cursor]); // Re-run effect if numBalls or cursor object changes

  return (
    <div 
      ref={containerRef} 
      // Ensure the background is transparent (if needed for active background)
      className="absolute inset-0 pointer-events-none z-0 bg-transparent" 
    />
  );
}
