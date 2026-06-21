// src/App.tsx
// Thin composition root — renders ExperienceRoot with theme state.
//
// Tradeoff: Using signal-module-based theme (state/theme.ts) instead of
// a provider. This means theme is global singleton state, not scoped.
// Acceptable because: theme is app-wide, not per-tree, and the signal
// module is simpler to use from any component without context nesting.

import { createMemo } from "solid-js";
import { getTheme } from "@/state/theme";
import { ExperienceRoot } from "@/experience/core/ExperienceRoot";

export default function App() {
  const themeClass = createMemo(() => `theme-${getTheme()} h-full`);

  return (
    <div class={themeClass()}>
      <ExperienceRoot />
    </div>
  );
}
