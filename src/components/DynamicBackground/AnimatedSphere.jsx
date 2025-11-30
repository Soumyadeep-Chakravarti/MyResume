// src/components/DynamicBackground/AnimatedSphere.jsx

import React, { useRef, useMemo, forwardRef } from 'react'; 
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three'; 

// Use forwardRef to allow the parent component (CinematicWorld) to pass a ref 
// to this component, which we attach to the <mesh>.
const AnimatedSphere = forwardRef(function AnimatedSphere(
    { isTransitioning, isActive }, // Props
    ref // The forwarded ref
) {
    // We still use local refs for internal logic that doesn't need external access
    const materialRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const opacityRef = useRef(0);
    const scaleRef = useRef(0.1);

    useFrame((state, delta) => {
        if (!ref.current || !materialRef.current) return;

        // 1. Continuous Rotation
        ref.current.rotation.y += delta * 0.5;
        ref.current.rotation.x += delta * 0.3;

        // 2. Animate Opacity and Scale
        const transitionSpeed = 5;

        if (isActive) {
            opacityRef.current = Math.min(1, opacityRef.current + delta * transitionSpeed);
            scaleRef.current = Math.min(1, scaleRef.current + delta * transitionSpeed);
        } else {
            opacityRef.current = Math.max(0, opacityRef.current - delta * transitionSpeed);
            scaleRef.current = Math.max(0.1, scaleRef.current - delta * transitionSpeed);
        }
        
        // 3. Apply values
        materialRef.current.opacity = opacityRef.current;
        ref.current.scale.setScalar(scaleRef.current);
    });

    return (
        <mesh
            ref={ref} // CRITICAL: Attach the forwarded ref to the Three.js mesh
            position={[0, 0, -5]}
            scale={scaleRef.current}
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                ref={materialRef}
                color={isTransitioning ? "cyan" : "gold"}
                wireframe={isTransitioning}
                transparent
                opacity={0}
            />
        </mesh>
    );
});

export default AnimatedSphere;