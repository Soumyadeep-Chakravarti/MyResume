// src/hooks/useSectionObserver.js

import { useState, useEffect, useRef } from "react";

const OBSERVER_OPTIONS = {
  root: null,
  // The section is considered "active" when it crosses the middle 50% of the viewport.
  rootMargin: "0px 0px -50% 0px",
  threshold: 0.05,
};

/**
 * Hook to determine which scrollable section is currently visible in the viewport.
 */
export const useSectionObserver = (sectionIds) => {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] || "");
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    }, OBSERVER_OPTIONS);

    observerRef.current = observer;

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      } else {
        console.warn(`Section element with ID "${id}" not found.`);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds]);

  return activeSectionId;
};
