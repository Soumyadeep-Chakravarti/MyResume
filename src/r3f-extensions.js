import { extend } from "@react-three/fiber";
import * as THREE from "three";
// Import the custom component that we just EXPORTED
import { InkBleedMaterial } from "./components/Transition/InkBleed.jsx";

// Register all necessary components globally for R3F.
// This file must be imported at your application's root (e.g., main.jsx).
extend({
  // Three.js primitives (Fixes the "Color is not defined" ReferenceError)
  Color: THREE.Color,
  AmbientLight: THREE.AmbientLight,
  PointLight: THREE.PointLight,

  // Custom Materials (Fixes the custom shader material tag)
  InkBleedMaterial: InkBleedMaterial,
});

// Note: No export needed, the purpose is to run the extend calls on import.
