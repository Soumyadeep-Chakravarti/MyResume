import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const InkBleedMaterial = shaderMaterial(
    {
        uTime: 0,
        uProgress: 0,
        uAspectRatio: 1,
        uInkColor: new THREE.Color(0x19273c),
    },
    `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    `
        precision highp float;
        varying vec2 vUv;
        uniform float uTime;
        uniform float uProgress;
        uniform float uAspectRatio;
        uniform vec3 uInkColor;

        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        void main() {
            vec2 centeredUv = vUv - 0.5;
            centeredUv.x *= uAspectRatio;

            float distance = length(centeredUv);
            float normalizedDist = distance / (uProgress * 1.5 + 0.1);
            float edgeNoise = rand(centeredUv * 20.0 + uTime * 0.2) * 0.1;

            float inkCoverage = smoothstep(1.0 - edgeNoise, 1.0 + edgeNoise, normalizedDist);
            inkCoverage = 1.0 - inkCoverage;
            inkCoverage = smoothstep(0.0, 1.0, inkCoverage);

            gl_FragColor = vec4(uInkColor, inkCoverage);
        }
    `
);

// Export both ways for compatibility
export { InkBleedMaterial };
export default InkBleedMaterial;

extend({ InkBleedMaterial });

