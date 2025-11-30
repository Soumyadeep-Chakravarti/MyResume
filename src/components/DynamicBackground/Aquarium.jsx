// src/components/DynamicBackground/Aquarium.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Aquarium.css";

// Constants (unchanged)
const BALL_SIZE_MIN = 8;
const BALL_SIZE_MAX = 20;
const INITIAL_OFFSET = -50; // Balls start off-screen at the top
const CURSOR_REPEL_RADIUS_SQ = 150 * 150; // Radius in pixels squared
const REPEL_FORCE = 0.5;

export default function Aquarium({ numBalls = 8, cursorRef }) {
    const containerRef = useRef(null);
    const animationRef = useRef();
    // Ref to store mutable ball state (x, y, speed, element)
    const ballStateRef = useRef([]);

    // --- State for dynamic screen dimensions ---
    const [dimensions, setDimensions] = useState({ 
        width: 0, 
        height: 0 
    });

    // Handle screen resize to keep animation contained
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        if (typeof window !== 'undefined') {
            handleResize(); // Initial call
            window.addEventListener('resize', handleResize);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []); // Run only once

    // Main animation and setup effect
    useEffect(() => {
        const container = containerRef.current;
        const { width, height } = dimensions;

        if (!container || width === 0 || height === 0) return;

        // 1. Initial Setup: Create and initialize balls and state
        container.innerHTML = "";
        const newBalls = Array.from({ length: numBalls }).map(() => {
            const ball = document.createElement("div");
            ball.className = "aquarium-ball";

            const size = Math.random() * (BALL_SIZE_MAX - BALL_SIZE_MIN) + BALL_SIZE_MIN;
            ball.style.width = `${size}px`;
            ball.style.height = `${size}px`;
            ball.style.opacity = (Math.random() * 0.5 + 0.5).toString();

            const state = {
                element: ball,
                // Initial position spread across the width
                x: Math.random() * width,
                // Initial position starting slightly above the screen
                y: Math.random() * height * 0.5 + INITIAL_OFFSET, 
                speed: Math.random() * 0.5 + 0.2, // Random vertical speed
            };

            // Initial transform
            ball.style.transform = `translate(${state.x}px, ${state.y}px)`;
            container.appendChild(ball);

            return state;
        });

        ballStateRef.current = newBalls; 

        // --- 2. Animation Loop ---
        const animate = () => {
            // Get latest cursor position and window height inside the loop
            const cursor = cursorRef?.current;
            const hasCursor = cursor && cursor.x !== undefined && cursor.y !== undefined;
            const currentWindowHeight = window.innerHeight; // Get latest height for boundary

            ballStateRef.current.forEach((state) => {
                let { element, x: currentX, y: currentY, speed } = state;

                let newY = currentY + speed;
                let newX = currentX;

                // --- Cursor Repulsion Logic ---
                let repelX = 0;
                let repelY = 0;

                if (hasCursor) {
                    const dx = currentX - cursor.x; 
                    const dy = currentY - cursor.y;
                    const distanceSq = dx * dx + dy * dy;

                    // Check if within repulsion radius and not exactly at the center (distanceSq > 1)
                    if (distanceSq < CURSOR_REPEL_RADIUS_SQ && distanceSq > 1) {
                        const distance = Math.sqrt(distanceSq);
                        // Repel factor: strongest near the center (distance=0) and weakest at the edge (distance=sqrt(radius_sq))
                        const factor = Math.max(0, 1 - distance / Math.sqrt(CURSOR_REPEL_RADIUS_SQ)); 

                        // Calculate repulsion vectors
                        repelX = (dx / distance) * factor * REPEL_FORCE;
                        repelY = (dy / distance) * factor * REPEL_FORCE;
                    }
                }

                // Apply repulsion
                newX += repelX;
                newY += repelY;

                // --- Boundary Check and Loop ---
                if (newY > currentWindowHeight) {
                    // Reset to the top, giving a small variance
                    newY = INITIAL_OFFSET + (Math.random() * 20); 
                    // New random horizontal starting position
                    newX = Math.random() * window.innerWidth; 
                }
                
                // Keep X within bounds (optional: prevents balls from being pushed permanently off-screen)
                newX = Math.max(0, Math.min(newX, window.innerWidth - element.offsetWidth));

                // Update state object
                state.x = newX;
                state.y = newY;

                // Apply new position using transform (optimizes rendering)
                element.style.transform = `translate(${newX}px, ${newY}px)`;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        // 3. Cleanup
        return () => cancelAnimationFrame(animationRef.current);
    }, [numBalls, dimensions.width, dimensions.height]); // Re-run setup if dimensions change

    return (
        <div
            ref={containerRef}
            // Ensure background takes up the full viewport and sits beneath content
            className="fixed inset-0 pointer-events-none z-0 bg-transparent"
        />
    );
}
