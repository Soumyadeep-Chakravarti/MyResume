// src/components/DynamicBackground/Aquarium.jsx
import React, { useEffect, useRef } from "react";
import "./Aquarium.css";

// Constants (unchanged)
const BALL_SIZE_MIN = 8;
const BALL_SIZE_MAX = 20;
const INITIAL_OFFSET = -50;
const CURSOR_REPEL_RADIUS_SQ = 150 * 150;
const REPEL_FORCE = 0.5;

export default function Aquarium({ numBalls = 8, cursorRef }) {
  const containerRef = useRef(null);
  const animationRef = useRef();
  // --- NEW: Ref to store mutable ball state as native JavaScript numbers ---
  const ballStateRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Initial Setup: Create and initialize balls and state
    container.innerHTML = "";
    ballStateRef.current = [];

    const balls = Array.from({ length: numBalls }).map(() => {
      const ball = document.createElement("div");
      ball.className = "aquarium-ball";

      const size = Math.random() * (BALL_SIZE_MAX - BALL_SIZE_MIN) + BALL_SIZE_MIN;
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      ball.style.opacity = (Math.random() * 0.5 + 0.5).toString();

      const state = {
        element: ball, // Store the DOM element reference
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight + INITIAL_OFFSET,
        speed: Math.random() * 0.5 + 0.2,
      };

      // Initial transform
      ball.style.transform = `translate(${state.x}px, ${state.y}px)`;
      container.appendChild(ball);

      return state; // Return the state object, not the DOM element
    });

    ballStateRef.current = balls; // Store the array of state objects

    // --- 2. Animation Loop ---
    const animate = () => {
      // Get latest cursor position from ref inside the loop
      const cursor = cursorRef?.current;
      const hasCursor = cursor && cursor.x !== undefined && cursor.y !== undefined;

      ballStateRef.current.forEach((state) => {
        let { element, x: currentX, y: currentY, speed } = state;

        let newY = currentY + speed;

        // --- Cursor Repulsion Logic ---
        let repelX = 0;
        let repelY = 0;

        if (hasCursor) {
          const dx = currentX - cursor.x; // Use the direct object properties
          const dy = currentY - cursor.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < CURSOR_REPEL_RADIUS_SQ && distanceSq > 1) {
            const distance = Math.sqrt(distanceSq);
            const factor = Math.max(0, 1 - distance / Math.sqrt(CURSOR_REPEL_RADIUS_SQ));

            repelX = (dx / distance) * factor * REPEL_FORCE;
            repelY = (dy / distance) * factor * REPEL_FORCE;
          }
        }

        // Apply repulsion
        let newX = currentX + repelX;
        newY += repelY;

        // --- Boundary Check ---
        if (newY > window.innerHeight) {
          newY = INITIAL_OFFSET;
          newX = Math.random() * window.innerWidth;
        }

        // Update state in ref (using a simple object mutation for performance in rAF)
        state.x = newX;
        state.y = newY;

        // Apply new position using transform
        element.style.transform = `translate(${newX}px, ${newY}px)`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // 6. Cleanup
    return () => cancelAnimationFrame(animationRef.current);
  }, [numBalls]); // Removed cursor from dependencies to prevent re-init

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 bg-transparent"
    />
  );
}
