// src/labs/rain-test/RainCanvas.tsx
import { onMount, onCleanup } from 'solid-js';

export function RainCanvas() {
  let canvasRef: HTMLCanvasElement | undefined;

  onMount(() => {
    // 1. Initialize WebGL Context
    // 2. Load "Cliff" texture
    // 3. Compile Shaders
    // 4. Start the "Heartbeat" loop for this specific experiment
    console.log("Initializing Rain Laboratory...");
  });

  onCleanup(() => {
    // Crucial: Dispose textures and shaders to prevent memory leaks
  });

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}
