// src/components/DynamicBackground/Aquarium.jsx
import React, { useEffect, useRef } from "react";
import "./Aquarium.css";

export default function Aquarium({ numBalls = 8, cursor }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = ""; // clear previous balls

    const balls = Array.from({ length: numBalls }).map(() => {
      const ball = document.createElement("div");
      ball.className = "aquarium-ball";
      ball.style.top = `${Math.random() * window.innerHeight}px`;
      ball.style.left = `${Math.random() * window.innerWidth}px`;
      container.appendChild(ball);
      return ball;
    });

    // Optional: JS physics or tangential movement can be added here
  }, [numBalls]);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0" />;
}

