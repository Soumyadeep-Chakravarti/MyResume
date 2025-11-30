// src/components/Cinematic/CinematicWorld.jsx

import React, { useRef, useMemo, useEffect } from 'react'; // <-- Ensure useEffect is imported
import { useCinematic } from '../../context/CinematicModeContext.jsx';
import InkBleed from '../Transition/InkBleed.jsx';
import { OrbitControls } from '@react-three/drei';
import AnimatedSphere from '../DynamicBackground/AnimatedSphere.jsx'; // <-- Assuming this is the new path

// --- CinematicWorld Component ---
export default function CinematicWorld() {
    const { isCinematic, isTransitioning, transitionProgress } = useCinematic();

    // Ref to hold the AnimatedSphere's mesh instance
    const sphereRef = useRef(null); 
    const isSceneActive = isCinematic; 
    
    const rotationalLimit = useMemo(() => Math.PI / 12, []);

    // 🧹 CRITICAL FIX: DISPOSAL OF GPU RESOURCES 🧹
    // This useEffect cleanup function runs when CinematicWorld unmounts,
    // ensuring Three.js resources are explicitly freed from the GPU memory (VRAM).
    useEffect(() => {
        // The cleanup function
        return () => {
            const sphereMesh = sphereRef.current;
            if (sphereMesh) {
                // Explicitly call dispose() on geometry and material
                // to prevent memory leaks, which are the root cause of Context Lost.
                if (sphereMesh.geometry) sphereMesh.geometry.dispose();
                if (sphereMesh.material) sphereMesh.material.dispose();
            }
        };
    }, []); 

    return (
        <>
            {/* 1. Scene Setup */}
            <color attach="background" args={['#000000']} />
            <ambientLight intensity={0.3} /> 
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#99aadd" />

            {/* 2. Camera Control (OrbitControls) */}
            <OrbitControls
                enabled={isCinematic}
                enableZoom={false}
                enablePan={false}
                enableDamping={true} 
                dampingFactor={0.1}
                minPolarAngle={Math.PI / 2 - rotationalLimit}
                maxPolarAngle={Math.PI / 2 + rotationalLimit}
                minAzimuthAngle={-rotationalLimit}
                maxAzimuthAngle={rotationalLimit}
            />

            {/* 3. The 2.5D Ink Bleed Effect */}
            <InkBleed progress={transitionProgress} />

            {/* 4. The Actual Cinematic 3D Scene */}
            <AnimatedSphere
                ref={sphereRef} // <-- Pass the ref here
                isTransitioning={isTransitioning}
                isActive={isSceneActive}
            />
        </>
    );
}