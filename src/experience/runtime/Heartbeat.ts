// src/experience/runtime/Heartbeat.ts
// Timing substrate — single rAF-backed clock for the experience layer.
// No eager start. Explicit lifecycle. Typed subscription API.

export type HeartbeatTickCallback = (delta: number) => void;

export interface Heartbeat {
  start(): void;
  stop(): void;
  subscribe(cb: HeartbeatTickCallback): () => void;
  readonly running: boolean;
}

export function createHeartbeat(): Heartbeat {
  let frameId = 0;
  let lastTime = 0;
  let running = false;
  const listeners = new Set<HeartbeatTickCallback>();

  function loop(now: number): void {
    if (!running) return;
    const delta = lastTime > 0 ? (now - lastTime) / 1000 : 0;
    lastTime = now;
    listeners.forEach((cb) => cb(delta));
    frameId = requestAnimationFrame(loop);
  }

  return {
    start() {
      if (running) return;
      running = true;
      lastTime = 0;
      frameId = requestAnimationFrame(loop);
    },

    stop() {
      running = false;
      if (frameId > 0) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    },

    subscribe(cb: HeartbeatTickCallback): () => void {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },

    get running() {
      return running;
    },
  };
}
