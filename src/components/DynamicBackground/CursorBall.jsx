// src/components/DynamicBackground/CursorBall.jsx
import React, { useEffect, useRef } from "react";
import "./CursorBall.css";

export default function CursorBall({ radius = 35, trailing = 0.18 }) {
  const ballRef = useRef(null);
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;
    const animate = () => {
      // Smooth trailing
      pos.current.x += (cursor.current.x - pos.current.x) * trailing;
      pos.current.y += (cursor.current.y - pos.current.y) * trailing;

      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(${pos.current.x - radius}px, ${pos.current.y - radius}px, 0)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [radius, trailing]);

  return (
    <div ref={ballRef} className="cursor-ball">
      <span className="cursor-ball-inner" />
    </div>
  );
}

