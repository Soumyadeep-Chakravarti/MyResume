import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Import MATERIAL (not the component)
import { InkBleedMaterial } from "./components/Transition/InkBleed.jsx";

extend({
  Color: THREE.Color,
  AmbientLight: THREE.AmbientLight,
  PointLight: THREE.PointLight,

  InkBleedMaterial,
});
