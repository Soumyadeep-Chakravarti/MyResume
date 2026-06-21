// src/experience/core/ExperienceCanvas.tsx
// Canvas host — the only component that touches the canvas DOM element.
// Phase A: bare canvas, no renderer wiring yet (Commit 2 adds Three.js).

import { onMount } from "solid-js";

export function ExperienceCanvas() {
  let canvas!: HTMLCanvasElement;

  onMount(() => {
    // Phase A, Commit 2 will attach Three.js renderer here.
    // For now, just log that the canvas is ready.
    console.log("[ExperienceCanvas] Canvas mounted, dimensions:", canvas.width, canvas.height);
  });

  return (
    <canvas
      ref={canvas}
      class="absolute inset-0 h-full w-full"
      style={{ display: "block", "touch-action": "none" }}
    />
  );
}
