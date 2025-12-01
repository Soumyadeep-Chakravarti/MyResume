// src/components/DynamicBackground/AnimatedSphere.jsx
import React, { useRef, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AnimatedSphere = forwardRef(function AnimatedSphere(
  { isTransitioning, isActive }, // Props
  ref // Forwarded ref
) {
  const materialRef = useRef();
  const opacityRef = useRef(0);
  const scaleRef = useRef(0.1);

  useFrame((state, delta) => {
    if (!ref.current || !materialRef.current) return;

    // 1. Continuous rotation
    ref.current.rotation.y += delta * 0.5;
    ref.current.rotation.x += delta * 0.3;

    // 2. Animate opacity & scale
    const transitionSpeed = 5;

    const targetOpacity = isActive || isTransitioning ? 1 : 0;
    const targetScale = isActive || isTransitioning ? 1 : 0.1;

    opacityRef.current += (targetOpacity - opacityRef.current) * delta * transitionSpeed;
    scaleRef.current += (targetScale - scaleRef.current) * delta * transitionSpeed;

    // 3. Apply values
    materialRef.current.opacity = opacityRef.current;
    ref.current.scale.setScalar(scaleRef.current);
  });

  return (
    <mesh
      ref={ref}
      position={[0, 0, -5]}
      scale={scaleRef.current} // initial scale
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color={isTransitioning ? "cyan" : "gold"}
        wireframe={isTransitioning}
        transparent
        opacity={0} // start fully transparent
      />
    </mesh>
  );
});

export default AnimatedSphere;

