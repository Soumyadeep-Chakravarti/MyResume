// src/experience/input/ScrollService.ts
// Scroll authority — owns Lenis lifecycle and scroll state.
// Driven by external heartbeat tick, no internal rAF loop.
// Uses Solid signals for reactive state access.

import { createSignal } from "solid-js";
import Lenis from "lenis";
import type { ScrollState } from "@/types/input";

export interface ScrollServiceConfig {
  lerp?: number;
  smoothWheel?: boolean;
}

export interface ScrollService {
  /** Call this from heartbeat tick. Advances Lenis and updates scroll state. */
  tick(delta: number): void;
  /** Reactively read scroll state. */
  readonly state: () => ScrollState;
  /** Get current scroll state (non-reactive snapshot). */
  getState(): ScrollState;
  /** Start Lenis. Called by bootstrap. */
  start(): void;
  /** Destroy Lenis and reset state. Called by bootstrap cleanup. */
  stop(): void;
}

export function createScrollService(config?: ScrollServiceConfig): ScrollService {
  let lenis: Lenis | null = null;
  const [state, setState] = createSignal<ScrollState>({
    velocity: 0,
    progress: 0,
    direction: "none",
  });

  return {
    tick(_delta: number): void {
      if (!lenis) return;
      lenis.raf(performance.now());

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      const velocity = lenis.velocity ?? 0;

      setState({
        velocity,
        progress,
        direction: velocity > 0.5 ? "down" : velocity < -0.5 ? "up" : "none",
      });
    },

    state,
    getState: state,

    start(): void {
      if (lenis) return;
      lenis = new Lenis({
        lerp: config?.lerp ?? 0.1,
        smoothWheel: config?.smoothWheel ?? true,
      });
    },

    stop(): void {
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      setState({ velocity: 0, progress: 0, direction: "none" });
    },
  };
}
