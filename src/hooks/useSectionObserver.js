// src/hooks/useSectionObserver.js

import { useState, useEffect, useRef } from "react";

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -50% 0px",
  threshold: 0.05,
};

export const useSectionObserver = (sectionIds) => {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] || "");
  const intersectionMap = useRef({});

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window))
      return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectionMap.current[entry.target.id] = entry.intersectionRatio;
        } else {
          delete intersectionMap.current[entry.target.id];
        }
      });

      const visibleIds = Object.keys(intersectionMap.current);

      if (visibleIds.length > 0) {
        let bestMatchId = visibleIds[0];
        let maxRatio = intersectionMap.current[bestMatchId];

        for (let i = 1; i < visibleIds.length; i++) {
          const id = visibleIds[i];
          const ratio = intersectionMap.current[id];
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestMatchId = id;
          }
        }

        setActiveSectionId(bestMatchId);
      }
    }, OBSERVER_OPTIONS);

    const observedElements = new Set();

    // Function to attempt observing elements, retries until they exist
    const observeElement = (id) => {
      const el = document.getElementById(id);
      if (el && !observedElements.has(id)) {
        observer.observe(el);
        observedElements.add(id);
      }
    };

    // Initial attempt
    sectionIds.forEach(observeElement);

    // Retry periodically (for lazy-loaded sections)
    const interval = setInterval(() => {
      sectionIds.forEach(observeElement);
      if (observedElements.size === sectionIds.length) clearInterval(interval);
    }, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [sectionIds]);

  return activeSectionId;
};
