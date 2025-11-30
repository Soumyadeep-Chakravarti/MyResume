// src/components/DynamicBackground/InkBleed.jsx
import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three'; 

// --- 1. Define the Shader Material (InkBleedMaterial) ---
export const InkBleedMaterial = shaderMaterial(
    // Uniforms 
    { 
        uTime: 0, 
        uProgress: 0, 
        uAspectRatio: 1, 
        uInkColor: new THREE.Color(0x19273c), // Use THREE.Color for consistency
    },
    // Vertex Shader (Simple pass-through)
    `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    // Fragment Shader (Creates the organic bleed texture)
    `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uProgress;
        uniform float uAspectRatio;
        uniform vec3 uInkColor;
        
        // Pseudo-Random/Noise Function
        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        void main() {
            // Center UV coordinates (0.0 to 1.0) to (-0.5 to 0.5)
            vec2 centeredUv = vUv - 0.5;
            // Correct for viewport aspect ratio to make the shape circular
            centeredUv.x *= uAspectRatio; 

            float distance = length(centeredUv);
            
            // Normalize distance based on progress. The denominator controls the spread.
            float normalizedDist = distance / (uProgress * 1.5 + 0.1); 
            
            // Add noise to the edge based on UV and time for the organic, bleeding effect
            float edgeNoise = rand(centeredUv * 20.0 + uTime * 0.2) * 0.1;
            
            // Smoothly transition the ink coverage. 
            // The noise shifts the edge (1.0) slightly, creating an uneven boundary.
            float inkCoverage = smoothstep(
                1.0 - edgeNoise, // Start transition earlier
                1.0 + edgeNoise, // End transition later
                normalizedDist
            );
            
            // Invert coverage (ink is at the center, not the edges)
            inkCoverage = 1.0 - inkCoverage;
            // Ensure a sharp, clean cut-off
            inkCoverage = smoothstep(0.0, 1.0, inkCoverage);
            
            vec3 color = uInkColor;
            
            // Output color with inkCoverage as the alpha channel
            gl_FragColor = vec4(color, inkCoverage); 
        }
    `
);

// --- 2. Extend/Register Components (Required by R3F) ---
// Register the custom material
extend({ InkBleedMaterial });

// Register standard THREE.js classes to be used as JSX elements
extend({ 
    Color: THREE.Color, 
    AmbientLight: THREE.AmbientLight, 
    PointLight: THREE.PointLight 
});


// --- 3. InkBleed Component ---
export default function InkBleed({ progress }) {
    const materialRef = useRef();
    
    // Optimization: Skip rendering if the effect is not active
    if (progress <= 0.0) return null;

    useFrame(({ viewport, clock }) => {
        if (materialRef.current) {
            // Update uniforms every frame
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
            materialRef.current.uniforms.uProgress.value = progress;
            materialRef.current.uniforms.uAspectRatio.value = viewport.width / viewport.height;
        }
    });

    // Render a screen-filling plane with the custom material
    return (
        <mesh scale={[10, 10, 1]} rotation={[0, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[1, 1]} />
            {/* Apply the custom shader material */}
            <inkBleedMaterial 
                ref={materialRef} 
                transparent // Must be true to use alpha channel
                depthTest={false} // Prevent depth conflicts with other objects
                depthWrite={false}
            />
        </mesh>
    );
}
