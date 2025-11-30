import { useState, useEffect, useRef } from "react";

/**
 * A custom hook to track whether a referenced DOM element is currently
 * within the viewport (in view), using the Intersection Observer API.
 *
 * @param {number | number[]} threshold - A single number or an array of numbers
 * indicating the percentage of the target element's visibility needed to trigger
 * the callback (0.0 to 1.0).
 * @returns {[React.MutableRefObject<null>, boolean]} A ref to attach to the target
 * element and a boolean indicating if the element is currently in view.
 */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current; // Capture current ref value

    if (!currentRef) return; // Ensure element exists

    const observer = new IntersectionObserver(
      // FIX: Update state with the entry.isIntersecting value every time
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        // rootMargin: '0px', // Optionally specify a root margin
        threshold: threshold,
      }
    );

    observer.observe(currentRef);

    // Clean up the observer when the component unmounts or the ref changes
    return () => {
      // Ensure we disconnect from the same element we observed
      observer.unobserve(currentRef); 
      observer.disconnect();
    };
  }, [threshold]); // threshold is a dependency

  return [ref, isInView];
}
