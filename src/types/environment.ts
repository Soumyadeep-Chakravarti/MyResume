// src/types/environment.ts
// Environment/atmospheric preset contracts — scene presets only.

// ─── Environment Presets ───────────────────────────────────────────────────

export type EnvironmentPreset = "storm" | "mist" | "sunrise" | "clear";

export interface EnvironmentConfig {
  preset: EnvironmentPreset;
  intensity: number; // 0-1
  animated: boolean;
}

export interface EnvironmentState {
  current: EnvironmentPreset;
  transitioning: boolean;
}
