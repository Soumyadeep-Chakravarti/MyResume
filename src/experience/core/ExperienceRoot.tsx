// src/experience/core/ExperienceRoot.tsx
// Composition root for the experience layer — mounted by App.tsx.
// Phase A: full viewport canvas + scroll debug overlay. No hero, no content sections.

import { Show, createSignal, onMount } from "solid-js";
import {
  ExperienceBootstrap,
  useBootstrap,
} from "./ExperienceBootstrap";
import { ExperienceCanvas } from "./ExperienceCanvas";

function ExperienceContent() {
  const ctx = useBootstrap();

  return (
    <>
      {/* ─── 3D Canvas — full viewport ─────────────────────────────────── */}
      <div class="fixed inset-0 z-0">
        <ExperienceCanvas />
      </div>

      {/* ─── Scroll debug ─────────────────────────────────────────────── */}
      <div class="fixed bottom-4 left-4 z-50 rounded bg-black/70 px-3 py-2 text-xs text-white backdrop-blur">
        Scroll: {Math.round(ctx.scrollService.state().progress * 100)}%
      </div>
    </>
  );
}

export function ExperienceRoot() {
  const [ready, setReady] = createSignal(false);

  onMount(() => {
    setReady(true);
  });

  return (
    <div class="experience-root h-full bg-black text-white">
      <Show when={ready()}>
        <ExperienceBootstrap>
          {() => <ExperienceContent />}
        </ExperienceBootstrap>
      </Show>
    </div>
  );
}
