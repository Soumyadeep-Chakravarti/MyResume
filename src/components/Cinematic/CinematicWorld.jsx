import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { useCinematic } from '../../context/CinematicModeContext';

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="cyan" wireframe />
            </mesh>

            <Text
                position={[0, 2, 0]}
                fontSize={0.5}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                WELCOME TO THE VOID
            </Text>
        </>
    );
}

export default function CinematicWorld() {
    const { exitCinematic } = useCinematic();

    return (
        <div className="w-full h-screen bg-black relative">
            {/* Exit Button (Temporary) */}
            <button
                onClick={exitCinematic}
                className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 backdrop-blur-sm"
            >
                Exit Simulation
            </button>

            <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]}>
                <Suspense fallback={null}>
                    <Scene />
                    <OrbitControls autoRotate />
                </Suspense>
            </Canvas>
        </div>
    );
}
