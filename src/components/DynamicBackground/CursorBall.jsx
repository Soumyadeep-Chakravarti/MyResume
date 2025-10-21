// src/components/DynamicBackground/CursorBall.jsx
import React, { useEffect, forwardRef } from "react";
import "./CursorBall.css";

const CursorBall = forwardRef(({ radius = 40 }, ref) => {
  const ballRef = React.useRef(null);

  useEffect(() => {
    if (!ref) return;
    const cursor = ref.current;

    const handleMouseMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(${cursor.x - radius}px, ${cursor.y - radius}px, 0)`;
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [ref, radius]);

  return <div ref={ballRef} className="cursor-ball" />;
});

export default CursorBall;

