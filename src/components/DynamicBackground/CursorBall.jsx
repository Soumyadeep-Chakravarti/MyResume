// src/components/DynamicBackground/CursorBall.jsx
import React, { useEffect, useRef } from "react";
import "./CursorBall.css";

export default function CursorBall({ radius = 35, trailing = 0.18 }) {
  const ballRef = useRef(null);
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isDimmed = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursor.current.x = e.clientX;
      cursor.current.y = e.clientY;

      const target = e.target;
      // Elements that should dim the glow
      const dimSelectors = ["a", "button", "input", "textarea", "p", "h1", "h2", "h3", "span"];
      const shouldDim = dimSelectors.some(sel => target.closest(sel));

      if (ballRef.current) {
        if (shouldDim && !isDimmed.current) {
          ballRef.current.classList.add("dimmed");
          isDimmed.current = true;
        } else if (!shouldDim && isDimmed.current) {
          ballRef.current.classList.remove("dimmed");
          isDimmed.current = false;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame;
    const animate = () => {
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

