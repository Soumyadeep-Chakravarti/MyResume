// src/components/DynamicBackground/PreviousWorkBG.jsx
import React, { useRef, useEffect } from "react";
import "./PreviousWorkBG.css"; // For CSS gradient animation

const DynamicBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Only a few subtle blobs for depth
    const blobs = Array.from({ length: 10 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 100 + 50,
      dx: Math.random() * 0.3 - 0.15,
      dy: Math.random() * 0.3 - 0.15,
      color: `rgba(${Math.random()*100+50}, ${Math.random()*100+50}, ${Math.random()*150+100}, 0.15)`
    }));

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw blobs
      blobs.forEach(blob => {
        blob.x += blob.dx;
        blob.y += blob.dy;

        if (blob.x - blob.r > width) blob.x = -blob.r;
        if (blob.x + blob.r < 0) blob.x = width + blob.r;
        if (blob.y - blob.r > height) blob.y = -blob.r;
        if (blob.y + blob.r < 0) blob.y = height + blob.r;

        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fillStyle = blob.color;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default DynamicBackground;

