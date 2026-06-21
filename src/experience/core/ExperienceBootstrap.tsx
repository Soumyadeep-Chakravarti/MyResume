// src/experience/core/ExperienceBootstrap.tsx
// Bootstrap bridge — initializes runtime services for the experience layer.
// Phase A: Heartbeat + ScrollService only. No simulation, no pointer.

import { onCleanup, onMount, type JSX } from "solid-js";
import { createHeartbeat, type Heartbeat } from "@/experience/runtime/Heartbeat";
import { createScrollService, type ScrollService } from "@/experience/input/ScrollService";

export interface BootstrapContext {
  heartbeat: Heartbeat;
  scrollService: ScrollService;
}

let ctx: BootstrapContext | null = null;

/** Access the bootstrap context. Only valid after ExperienceBootstrap has mounted. */
export function useBootstrap(): BootstrapContext {
  if (!ctx) {
    throw new Error("useBootstrap() called before ExperienceBootstrap mounted");
  }
  return ctx;
}

interface ExperienceBootstrapProps {
  children: (ctx: BootstrapContext) => JSX.Element;
}

export function ExperienceBootstrap(props: ExperienceBootstrapProps) {
  const heartbeat = createHeartbeat();
  const scrollService = createScrollService();

  // Wire scroll service to heartbeat tick.
  const unsubscribeScroll = heartbeat.subscribe((delta) => {
    scrollService.tick(delta);
  });

  // Start runtime.
  heartbeat.start();
  scrollService.start();

  // Store context for useBootstrap().
  ctx = { heartbeat, scrollService };

  onCleanup(() => {
    unsubscribeScroll();
    scrollService.stop();
    heartbeat.stop();
    ctx = null;
  });

  return <>{props.children({ heartbeat, scrollService })}</>;
}
