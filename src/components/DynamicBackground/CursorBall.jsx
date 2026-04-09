// src/components/DynamicBackground/CursorBall.jsx
import { useEffect, useRef, useContext, useState, useMemo } from "react";
import { CursorContext } from '../../context/CursorContext.jsx';
import "./CursorBall.css";

const THROTTLE_MS = 16;

const throttle = (fn, limit) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
};

export default function CursorBall({ radius = 35, trailing = 0.18 }) {
  const ballRef = useRef(null);
  const cursorRef = useContext(CursorContext); 
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isDimmed, setIsDimmed] = useState(false);
  const animationRef = useRef();

  const throttledCheck = useMemo(
    () => throttle((e) => {
      const target = e.target;
      const dimSelectors = ["a", "button", "input", "textarea", "p", "h1", "h2", "h3", "span"];
      setIsDimmed(dimSelectors.some(sel => target.closest(sel)));
    }, THROTTLE_MS),
    []
  );

  useEffect(() => {
    if (!cursorRef?.current) return;
    
    const initialCursorPos = cursorRef.current; 
    pos.current.x = initialCursorPos.x;
    pos.current.y = initialCursorPos.y;

    const animate = () => {
      if (cursorRef?.current) {
        pos.current.x += (cursorRef.current.x - pos.current.x) * trailing; 
        pos.current.y += (cursorRef.current.y - pos.current.y) * trailing;
      }
      
      if (ballRef.current) {
        ballRef.current.style.transform = `translate3d(${pos.current.x - radius}px, ${pos.current.y - radius}px, 0)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [radius, trailing, cursorRef]);

  useEffect(() => {
    window.addEventListener("mousemove", throttledCheck);
    return () => window.removeEventListener("mousemove", throttledCheck);
  }, [throttledCheck]);

  return (
    <div 
      ref={ballRef} 
      className={`cursor-ball ${isDimmed ? "dimmed" : ""}`}
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
      }}
    >
      <span className="cursor-ball-inner" />
    </div>
  );
}
