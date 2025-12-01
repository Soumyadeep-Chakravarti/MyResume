// src/context/CursorContext.jsx
import React, { createContext, useRef, useState, useEffect, useMemo } from "react";

export const CursorContext = createContext(null);

const INTERACTIVE_SELECTORS = [
    "a", "button", "input", "textarea",
    "p", "span", "li",
    "h1","h2","h3","h4","h5","h6",
    ".group",
    "[data-cursor-interactive='true']"
];

const INTERACTIVE_QUERY = INTERACTIVE_SELECTORS.join(",");

export const CursorProvider = ({ children }) => {
    const cursorRef = useRef({
        x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
        y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
        r: 40,
    });

    const [isInteractive, setIsInteractive] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            cursorRef.current.x = e.clientX;
            cursorRef.current.y = e.clientY;

            // Ensure target is an Element
            let target = e.target;
            if (target.nodeType !== 1) {
                target = target.parentElement;
            }

            const shouldBeInteractive = !!target.closest(INTERACTIVE_QUERY);

            setIsInteractive((prev) =>
                prev !== shouldBeInteractive ? shouldBeInteractive : prev
            );
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const contextValue = useMemo(() => {
        return { cursorRef, isInteractive };
    }, [isInteractive]);

    return (
        <CursorContext.Provider value={contextValue}>
            {children}
        </CursorContext.Provider>
    );
};

