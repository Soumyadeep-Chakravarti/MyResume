// src/state/environment.ts
// Atmospheric environment state — scene presets only.

import { createSignal } from "solid-js";
import type { EnvironmentPreset, EnvironmentConfig } from "@/types/environment";

const [preset, setPreset] = createSignal<EnvironmentPreset>("clear");
const [intensity, setIntensity] = createSignal(0.5);

export function getEnvironmentPreset(): EnvironmentPreset {
  return preset();
}

export function getEnvironmentIntensity(): number {
  return intensity();
}

export function setEnvironment(newPreset: EnvironmentPreset): void {
  setPreset(newPreset);
}

export function setEnvironmentIntensity(value: number): void {
  setIntensity(Math.max(0, Math.min(1, value)));
}

export function getEnvironmentConfig(): EnvironmentConfig {
  return {
    preset: preset(),
    intensity: intensity(),
    animated: true,
  };
}
