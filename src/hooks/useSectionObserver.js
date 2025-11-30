// src/hooks/useSectionObserver.js

import { useState, useEffect, useRef } from "react";

const OBSERVER_OPTIONS = {
  root: null,
  // The section is considered "active" when its boundary crosses a specific point.
  // Setting rootMargin to the middle of the viewport (e.g., -50%) makes the trigger line
  // in the center, which is often a better UX for navigation tracking.
  rootMargin: "0px 0px -50% 0px",
  // Set threshold to 0.05 (or 0) to track intersection as soon as the element crosses the margin.
  threshold: 0.05,
};

/**
 * Hook to determine which scrollable section is currently visible in the viewport.
 * It uses the intersectionRatio to identify the most prominent section.
 * * @param {string[]} sectionIds - An array of element IDs to observe.
 * @returns {string} The ID of the currently most prominent active section.
 */
export const useSectionObserver = (sectionIds) => {
  // State to hold the ID of the currently active section
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0] || "");

  // Ref to hold a map of currently intersecting sections and their ratios
  const intersectionMap = useRef({});

  useEffect(() => {
    // Guard against non-browser environments
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Update the map for all entries
        if (entry.isIntersecting) {
          // Store the intersection ratio as the measure of prominence
          intersectionMap.current[entry.target.id] = entry.intersectionRatio;
        } else {
          // Remove the section from the map when it leaves the viewport (or margin)
          delete intersectionMap.current[entry.target.id];
        }
      });

      // 1. Get the IDs of all currently visible sections
      const visibleIds = Object.keys(intersectionMap.current);

      if (visibleIds.length > 0) {
        // 2. Find the ID with the highest intersection ratio (most prominent)
        let bestMatchId = visibleIds[0];
        let maxRatio = intersectionMap.current[bestMatchId];

        for (let i = 1; i < visibleIds.length; i++) {
          const currentId = visibleIds[i];
          const currentRatio = intersectionMap.current[currentId];

          if (currentRatio > maxRatio) {
            maxRatio = currentRatio;
            bestMatchId = currentId;
          }
        }

        // 3. Update the state only if the best match has changed
        setActiveSectionId(bestMatchId);
      }
      // Optional: If no sections are intersecting, you might reset to the first section,
      // but usually, it's best to maintain the last known active section.
    }, OBSERVER_OPTIONS);

    // Start observing elements
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      } else {
        // Keep the original warning but ensure it doesn't break the cleanup logic
        console.warn(`Section element with ID "${id}" not found.`);
      }
    });

    // Cleanup function: Disconnect the observer
    return () => {
      observer.disconnect();
    };
  }, [sectionIds]); // Depend on sectionIds

  return activeSectionId;
};
