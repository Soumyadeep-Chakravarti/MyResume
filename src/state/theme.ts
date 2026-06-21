// src/state/theme.ts
// UI theme state — light/dark mode only.
// Singleton signal store, no provider required.
//
// Tradeoff vs provider: global singleton is simpler to use from any
// component without nesting. Acceptable because theme is app-wide,
// not scoped to a component subtree.

import { createSignal } from "solid-js";
import type { ThemeMode } from "@/types/theme";

// Module-scope singleton signal — created once, shared across all importers.
const [getTheme, setTheme] = createSignal<ThemeMode>("dark");

export function toggleTheme(): void {
  setTheme((prev) => (prev === "light" ? "dark" : "light"));
}

export function setThemeMode(mode: ThemeMode): void {
  setTheme(mode);
}

export { getTheme };
