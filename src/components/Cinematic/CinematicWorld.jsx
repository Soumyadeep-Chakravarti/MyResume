// src/components/Cinematic/CinematicWorld.jsx
import React, { useRef, useMemo, useEffect } from "react";
import { useCinematic } from "../../context/CinematicModeContext.jsx";
import InkBleed from "../Transition/InkBleed.jsx";
import { OrbitControls } from "@react-three/drei";
import AnimatedSphere from "../DynamicBackground/AnimatedSphere.jsx";

export default function CinematicWorld() {
  const { isCinematic, isTransitioning, transitionProgress } = useCinematic();
  const sphereRef = useRef(null);

  const rotationalLimit = useMemo(() => Math.PI / 12, []);

  // GPU Cleanup
  useEffect(() => {
    return () => {
      const mesh = sphereRef.current;
      if (!mesh) return;

      if (mesh.geometry?.dispose) mesh.geometry.dispose();

      const material = mesh.material;
      if (material) {
        if (Array.isArray(material)) material.forEach((m) => m?.dispose?.());
        else material.dispose?.();
      }
    };
  }, []);

  return (
    <>
      {/* Background */}
      <color attach="background" args={["#000000"]} />

      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <pointLight position={[10, 10, 10]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-8, -8, -5]} intensity={0.8} color="#7fa7ff" />

      {/* Camera Controls */}
      <OrbitControls
        enabled={isCinematic}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        enableDamping={true}
        dampingFactor={0.1}
        minPolarAngle={Math.PI / 2 - rotationalLimit}
        maxPolarAngle={Math.PI / 2 + rotationalLimit}
        minAzimuthAngle={-rotationalLimit}
        maxAzimuthAngle={rotationalLimit}
      />

      {/* Ink Bleed */}
      <InkBleed progress={transitionProgress} />

      {/* Sphere (always mounted) */}
      <AnimatedSphere
        ref={sphereRef}
        isTransitioning={isTransitioning}
        isActive={isCinematic}
      />
    </>
  );
}

