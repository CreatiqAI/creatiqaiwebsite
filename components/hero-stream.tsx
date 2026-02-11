"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleStream({ count = 1000, speed = 0.1 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const [hovered, setHovered] = useState(false);

    // Store scroll progress (0 to 1)
    const scrollProgress = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate relative scroll position (0 at top, 1 at 2000px down)
            const maxScroll = 2000;
            scrollProgress.current = Math.min(window.scrollY / maxScroll, 1);
        };

        window.addEventListener("scroll", handleScroll);
        // Trigger once to set initial state
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Target speed multiplier
    const speedMultiplier = useRef(1);

    // Generate initial particles in a long tunnel
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Distribute radius: more on the outside, fewer in the center
            const radius = 5 + Math.pow(Math.random(), 1.5) * 25;
            const z = -Math.random() * 100; // Start mostly in front of camera

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            temp.push({
                pos: new THREE.Vector3(x, y, z),
                // Vary speed slightly for parallax
                speedOffset: Math.random() * 0.5 + 0.8,
                size: Math.random() * 0.5 + 0.1
            });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Base speed (cruising) vs Warp speed (scrolling)
        // Scroll can boost speed up to 20x
        const warpFactor = scrollProgress.current * 15;
        const hoverFactor = hovered ? 2.0 : 1.0;

        const targetSpeed = (1.0 + warpFactor) * hoverFactor;

        // Smoothly interpolate current speed to target speed
        speedMultiplier.current = THREE.MathUtils.lerp(speedMultiplier.current, targetSpeed, 0.05);

        particles.forEach((particle, i) => {
            // Move particle towards camera (positive Z)
            // Combined: Base Speed (0.1) * Individual Variance * Global Multiplier
            particle.pos.z += speed * particle.speedOffset * speedMultiplier.current;

            // Reset if passes camera (camera is at z=15)
            // We reset far back (-100) to create endless loop
            if (particle.pos.z > 20) {
                particle.pos.z = -100;
            }

            // NO SPINNING: We removed the angle rotation math.
            // Just pure forward motion.

            // Apply coordinates
            dummy.position.x = particle.pos.x;
            dummy.position.y = particle.pos.y;
            dummy.position.z = particle.pos.z;

            // Warp Streak Effect
            // As speed increases, stretch the particle in Z axis
            const stretch = Math.max(1, speedMultiplier.current * 0.5);
            dummy.scale.set(particle.size, particle.size, particle.size * stretch);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.15, 0.15, 1]} />
            <meshBasicMaterial
                color="#00f2ff"
                transparent
                opacity={0.8}
                // Add additive blending for "light" effect
                blending={THREE.AdditiveBlending}
            />
        </instancedMesh>
    );
}

export default function HeroStream() {
    return (
        <div className="absolute inset-0 z-0 bg-[#050510]">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                gl={{ antialias: true, alpha: false }}
                dpr={[1, 2]}
            >
                <fog attach="fog" args={['#050510', 10, 60]} />
                {/* Add a plane to capture mouse events for hover state */}
                <mesh position={[0, 0, 0]} visible={false}>
                    <planeGeometry args={[100, 100]} />
                </mesh>

                <ParticleStream />
            </Canvas>
        </div>
    );
}
