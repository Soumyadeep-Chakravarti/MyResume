// src/types/input.ts
// Input/interaction contracts — scroll, pointer, and input state.

// ─── Coordinates ───────────────────────────────────────────────────────────

export interface Coordinates {
  x: number;
  y: number;
}

// ─── Scroll ────────────────────────────────────────────────────────────────

export interface ScrollState {
  velocity: number;
  progress: number;
  direction: "up" | "down" | "none";
}

// ─── Pointer ───────────────────────────────────────────────────────────────

export interface PointerState {
  position: Coordinates;
  velocity: Coordinates;
  isInteracting: boolean;
}
